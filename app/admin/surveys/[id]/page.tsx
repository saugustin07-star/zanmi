'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { DbSurvey, DbQuestion, DbSurveyResponse, DbAnswer } from '@/types/survey';
import type { AdminSurveyPayload } from '@/app/api/admin/surveys/[id]/route';

// ── Types ──────────────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error'; msg: string }
  | {
      phase: 'ready';
      survey: DbSurvey;
      questions: DbQuestion[];
      responses: DbSurveyResponse[];
      answers: DbAnswer[];
    };

const BAR_COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E63', '#607D8B'];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SurveyResultsPage() {
  const params  = useParams();
  const id      = typeof params.id === 'string' ? params.id : String(params.id ?? '');
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  const load = useCallback(async () => {
    if (!id) {
      setState({ phase: 'error', msg: 'No survey ID in route params.' });
      return;
    }
    setState({ phase: 'loading' });

    console.log('[Zanmi] results: fetching /api/admin/surveys/', id);
    try {
      const res = await fetch(`/api/admin/surveys/${id}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body.error ?? `HTTP ${res.status}`;
        console.error('[Zanmi] results: API error:', msg);
        setState({ phase: 'error', msg });
        return;
      }
      const data: AdminSurveyPayload = await res.json();
      console.log('[Zanmi] results: loaded — questions:', data.questions.length,
        '| responses:', data.responses.length, '| answers:', data.answers.length);
      setState({
        phase: 'ready',
        survey:    data.survey,
        questions: data.questions,
        responses: data.responses,
        answers:   data.answers,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Zanmi] results: fetch failed:', msg);
      setState({ phase: 'error', msg });
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  // ── Loading ────────────────────────────────────────────────────────────────

  if (state.phase === 'loading') {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark font-bold text-sm transition-colors">
          ← Dashboard
        </Link>
        <div className="animate-pulse space-y-4 mt-6">
          <div className="h-14 w-14 bg-gray-200 rounded-2xl" />
          <div className="h-7 w-64 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[0, 1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
          </div>
          {[0, 1].map(i => <div key={i} className="h-32 bg-gray-100 rounded-3xl" />)}
        </div>
        <p className="text-zdark/40 font-semibold text-sm mt-4">Loading results…</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (state.phase === 'error') {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark font-bold text-sm transition-colors">
          ← Dashboard
        </Link>
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-black text-red-700 text-lg mb-2">Error loading results</h2>
          <p className="text-red-600 font-semibold text-sm font-mono break-all">{state.msg}</p>
          <p className="text-red-400 text-xs font-semibold mt-3">
            Check the browser console for details. If this says &quot;Unauthorized&quot;, return to the{' '}
            <Link href="/admin" className="underline">dashboard</Link> and log in again.
          </p>
          <button
            onClick={load}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── Ready ──────────────────────────────────────────────────────────────────

  const { survey, questions, responses, answers } = state;
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
          style={{ backgroundColor: survey.color ? `${survey.color}22` : '#7C3AED22' }}
        >
          {survey.emoji ?? '📋'}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-zdark">{survey.title}</h1>
          {survey.description && (
            <p className="text-zdark/50 font-semibold text-sm mt-0.5">{survey.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              survey.status === 'published' ? 'bg-green-50 text-green-700' :
              survey.status === 'archived'  ? 'bg-amber-50 text-amber-700' :
                                              'bg-gray-100 text-gray-500'
            }`}>{survey.status}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zpurple/10 text-zpurple">
              {survey.audience_type}
            </span>
          </div>
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

      {/* No responses */}
      {started === 0 && (
        <div className="bg-white rounded-3xl p-10 shadow-card border border-gray-100">
          <p className="text-zdark/60 font-semibold text-center leading-relaxed">
            No responses yet. Once students complete this survey, results will appear here.
          </p>
          {survey.public_slug && (
            <div className="text-center mt-5">
              <Link
                href={`/s/${survey.public_slug}`}
                target="_blank"
                className="inline-block px-6 py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all text-sm"
              >
                Open Survey Link ↗
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Warnings */}
      {started > 0 && questions.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <p className="font-bold text-amber-800 text-sm">
            {responses.length} response{responses.length !== 1 ? 's' : ''} found, but no questions were returned for this survey.
            Check that questions exist in the database with <code className="font-mono">survey_id = {id}</code>.
          </p>
        </div>
      )}

      {/* Per-question aggregate results */}
      {started > 0 && questions.length > 0 && (
        <>
          <h2 className="text-lg font-black text-zdark mb-4">Results by Question</h2>
          <div className="space-y-5 mb-10">
            {questions.map((question, qi) => (
              <QuestionResult
                key={question.id}
                question={question}
                index={qi}
                answers={answers.filter(a => a.question_id === question.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* Individual responses */}
      {started > 0 && (
        <>
          <h2 className="text-lg font-black text-zdark mb-4">
            Responses
            <span className="ml-2 text-sm font-bold text-zdark/40">({started})</span>
          </h2>
          <div className="space-y-4">
            {responses.map(resp => (
              <ResponseCard
                key={resp.id}
                response={resp}
                questions={questions}
                answers={answers.filter(a => a.response_id === resp.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Response card ──────────────────────────────────────────────────────────────

function ResponseCard({
  response,
  questions,
  answers,
}: {
  response: DbSurveyResponse;
  questions: DbQuestion[];
  answers: DbAnswer[];
}) {
  const [open, setOpen] = useState(false);

  const started = new Date(response.started_at).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  const submitted = response.submitted_at
    ? new Date(response.submitted_at).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit',
      })
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-zbg flex items-center justify-center text-lg flex-shrink-0">
          {response.avatar ?? '👤'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-zdark text-sm">
            {response.respondent_nickname ?? 'Anonymous'}
          </div>
          <div className="text-xs text-zdark/40 font-semibold">
            Started {started}
            {submitted && <> · Submitted {submitted}</>}
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mr-2 ${
          response.completed ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {response.completed ? 'Completed' : 'In progress'}
        </span>
        <span className="text-zdark/30 font-bold text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t border-gray-50 px-5 py-4 space-y-3">
          {answers.length === 0 ? (
            <p className="text-zdark/40 text-sm font-semibold italic">No answers recorded for this response.</p>
          ) : (
            questions.map((q, qi) => {
              const answer = answers.find(a => a.question_id === q.id);
              const value = answer?.answer_value;
              return (
                <div key={q.id} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-zpurple/10 text-zpurple font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {qi + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zdark/50 mb-0.5">{q.question_text}</p>
                    <p className="text-sm font-semibold text-zdark">
                      {value ? value : <span className="text-zdark/30 italic">No answer</span>}
                    </p>
                  </div>
                </div>
              );
            })
          )}
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

  if (total === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={0} />
        <p className="text-zdark/30 font-semibold text-sm italic mt-3">No responses for this question.</p>
      </div>
    );
  }

  if (question_type === 'short_answer' || question_type === 'long_answer') {
    const texts = answers.map(a => (a.answer_value ?? '').trim()).filter(Boolean);
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={total} />
        <div className="space-y-2 mt-4">
          {texts.length === 0
            ? <p className="text-zdark/30 font-semibold text-sm italic">No text responses recorded.</p>
            : texts.map((text, i) => (
                <div key={i} className="bg-zbg rounded-xl px-4 py-3 text-sm font-semibold text-zdark leading-relaxed">
                  {text}
                </div>
              ))
          }
        </div>
      </div>
    );
  }

  const counts: Record<string, number> = {};
  for (const a of answers) {
    const val = (a.answer_value ?? '').trim();
    if (val) counts[val] = (counts[val] ?? 0) + 1;
  }

  let entries: [string, number][];
  if (question_type === 'yes_no') {
    const order = ['yes', 'no'];
    entries = order.filter(k => k in counts).map(k => [k, counts[k]] as [string, number]);
    for (const [k, v] of Object.entries(counts)) {
      if (!order.includes(k)) entries.push([k, v]);
    }
  } else {
    entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }

  let avg: number | null = null;
  if (question_type === 'rating_scale' || question_type === 'scale') {
    const nums = answers
      .map(a => parseFloat((a.answer_value ?? '').trim()))
      .filter(n => Number.isFinite(n));
    if (nums.length > 0) avg = nums.reduce((s, n) => s + n, 0) / nums.length;
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={total} />
        <p className="text-zdark/30 font-semibold text-sm italic mt-3">No answer values recorded.</p>
      </div>
    );
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
                    width: `${Math.max(pct, 0)}%`,
                    backgroundColor: BAR_COLORS[ai % BAR_COLORS.length],
                    minWidth: pct > 0 ? '2rem' : '0',
                  }}
                >
                  {pct >= 12 && <span className="text-white font-black text-xs">{pct}%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Question header ────────────────────────────────────────────────────────────

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
        <h3 className="font-black text-zdark leading-snug">
          {question.question_text || <span className="text-zdark/30 italic font-semibold">Question text missing</span>}
        </h3>
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
