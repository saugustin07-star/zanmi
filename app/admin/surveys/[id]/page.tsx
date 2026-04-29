import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
import {
  getSurveyById,
  getResponsesBySurveyId,
  getAnswersByResponseIds,
} from '@/lib/db';
import type { DbQuestion, DbAnswer } from '@/types/survey';

const BAR_COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E63', '#607D8B'];

export default async function SurveyResultsPage({ params }: { params: { id: string } }) {
  const [survey, responses] = await Promise.all([
    getSurveyById(params.id),
    getResponsesBySurveyId(params.id),
  ]);

  if (!survey) notFound();

  const answers = await getAnswersByResponseIds(responses.map(r => r.id));

  const started   = responses.length;
  const completed = responses.filter(r => r.completed).length;
  const rate      = started > 0 ? Math.round((completed / started) * 100) : 0;

  return (
    <div className="p-6 md:p-8 max-w-3xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark font-bold transition-colors">
          Dashboard
        </Link>
        <span className="text-zdark/20">/</span>
        <span className="font-bold text-zdark/60 truncate">{survey.title}</span>
      </div>

      {/* Survey header */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ backgroundColor: `${survey.color}22` }}
        >
          {survey.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-zdark">{survey.title}</h1>
          {survey.description && (
            <p className="text-zdark/50 font-semibold text-sm mt-0.5">{survey.description}</p>
          )}
        </div>
        {survey.public_slug && (
          <Link
            href={`/s/${survey.public_slug}`}
            target="_blank"
            className="flex-shrink-0 px-4 py-2 text-sm font-bold text-zpurple bg-zpurple/10 rounded-xl hover:bg-zpurple/20 transition-colors"
          >
            Open Survey ↗
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Started',         value: started,    icon: '👥' },
          { label: 'Completed',       value: completed,  icon: '✅' },
          { label: 'Completion Rate', value: `${rate}%`, icon: '📊' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-zdark">{s.value}</div>
            <div className="text-xs text-zdark/50 font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* No responses state */}
      {started === 0 && (
        <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-zdark mb-2">No responses yet</h3>
          <p className="text-zdark/50 font-semibold mb-6">
            Share the survey link to start collecting responses.
          </p>
          {survey.public_slug && (
            <Link
              href={`/s/${survey.public_slug}`}
              target="_blank"
              className="inline-block px-6 py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all text-sm"
            >
              Preview Survey ↗
            </Link>
          )}
        </div>
      )}

      {/* Per-question results */}
      {started > 0 && (
        <div className="space-y-5">
          {survey.questions.map((question, qi) => (
            <QuestionResult
              key={question.id}
              question={question}
              index={qi}
              answers={answers.filter(a => a.question_id === question.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Question result card ───────────────────────────────────────────────────────

function QuestionResult({
  question,
  index,
  answers,
}: {
  question: DbQuestion;
  index: number;
  answers: DbAnswer[];
}) {
  const { question_type } = question;
  const total = answers.length;

  // No answers at all
  if (total === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={0} />
        <p className="text-zdark/30 font-semibold text-sm italic mt-2">No responses for this question.</p>
      </div>
    );
  }

  // Free-text questions — list responses
  if (question_type === 'short_answer' || question_type === 'long_answer') {
    const texts = answers.map(a => a.answer_value ?? '').filter(Boolean);
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={total} />
        <div className="space-y-2 mt-4">
          {texts.map((text, i) => (
            <div key={i} className="bg-zbg rounded-xl px-4 py-3 text-sm font-semibold text-zdark leading-relaxed">
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Choice / scale / yes_no — bar chart
  const counts: Record<string, number> = {};
  for (const a of answers) {
    const val = a.answer_value ?? '';
    if (val) counts[val] = (counts[val] ?? 0) + 1;
  }

  // For yes_no, keep yes before no; otherwise sort by count descending
  let entries: [string, number][];
  if (question_type === 'yes_no') {
    const order = ['yes', 'no'];
    entries = order
      .filter(k => k in counts)
      .map(k => [k, counts[k]] as [string, number]);
    // append any unexpected values
    for (const [k, v] of Object.entries(counts)) {
      if (!order.includes(k)) entries.push([k, v]);
    }
  } else {
    entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }

  // Numeric average for rating questions
  let avg: number | null = null;
  if (question_type === 'rating_scale' || question_type === 'scale') {
    const nums = answers
      .map(a => parseFloat(a.answer_value ?? ''))
      .filter(n => !isNaN(n));
    if (nums.length > 0) avg = nums.reduce((s, n) => s + n, 0) / nums.length;
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
      <QuestionHeader question={question} index={index} total={total} avg={avg} />
      <div className="space-y-3 mt-4">
        {entries.map(([label, count], ai) => {
          const pct = Math.round((count / total) * 100);
          const displayLabel =
            question_type === 'yes_no'
              ? label === 'yes' ? '👍 Yes' : label === 'no' ? '👎 No' : label
              : label;
          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-zdark">{displayLabel}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zdark/40 font-semibold">{count} resp.</span>
                  <span className="text-sm font-black text-zdark w-10 text-right">{pct}%</span>
                </div>
              </div>
              <div className="w-full h-7 bg-gray-50 rounded-xl overflow-hidden">
                <div
                  className="h-full rounded-xl flex items-center px-3 transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: BAR_COLORS[ai % BAR_COLORS.length],
                    minWidth: pct > 0 ? '2rem' : '0',
                  }}
                >
                  {pct >= 12 && (
                    <span className="text-white font-black text-xs">{pct}%</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Shared question header ─────────────────────────────────────────────────────

function QuestionHeader({
  question,
  index,
  total,
  avg,
}: {
  question: DbQuestion;
  index: number;
  total: number;
  avg?: number | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-zpurple rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-zdark leading-snug">{question.question_text}</h3>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-xs text-zdark/40 font-semibold">
            {total} response{total !== 1 ? 's' : ''}
          </span>
          {avg != null && (
            <span className="text-xs font-bold bg-zpurple/10 text-zpurple px-2 py-0.5 rounded-full">
              avg {avg.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
