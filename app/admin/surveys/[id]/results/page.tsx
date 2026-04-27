import Link from 'next/link';
import { getSurveyById, getResultsById } from '@/lib/sample-data';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const BAR_COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E8C', '#607D8B'];

export default function ResultsPage({ params }: Props) {
  const survey = getSurveyById(params.id);
  if (!survey) notFound();

  const results = getResultsById(params.id);
  const hasResults = results.length > 0;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark transition-colors font-bold">
          ← Dashboard
        </Link>
        <span className="text-zdark/20">/</span>
        <span className="font-bold text-zdark/60">Results</span>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${survey.color}20` }}
          >
            {survey.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-black text-zdark">{survey.title}</h1>
            <p className="text-zdark/50 font-semibold">{survey.description}</p>
          </div>
        </div>
        <Link
          href={`/survey/${survey.id}`}
          target="_blank"
          className="px-5 py-2.5 text-sm font-bold text-zpurple bg-zpurple/10 rounded-xl hover:bg-zpurple/20 transition-colors"
        >
          Open Survey ↗
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Responses', value: String(survey.response_count), icon: '👥' },
          { label: 'Completion Rate', value: `${survey.completion_rate}%`, icon: '✅' },
          { label: 'Questions', value: String(survey.questions.length), icon: '❓' },
          { label: 'Status', value: survey.is_active ? 'Active' : 'Closed', icon: survey.is_active ? '🟢' : '⚫' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-black text-zdark">{s.value}</div>
            <div className="text-xs text-zdark/50 font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {!hasResults && (
        <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-zdark mb-2">No results yet</h3>
          <p className="text-zdark/50 font-semibold mb-6">Share your survey link to start collecting responses.</p>
          <Link
            href={`/survey/${survey.id}`}
            className="inline-block px-6 py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all"
          >
            Preview Survey
          </Link>
        </div>
      )}

      {/* Question results */}
      {hasResults && (
        <div className="space-y-6">
          {results.map((result, qi) => (
            <div key={result.question_id} className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-8 h-8 bg-zpurple rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {qi + 1}
                </div>
                <div>
                  <h3 className="font-black text-zdark text-lg">{result.question_text}</h3>
                  <p className="text-sm text-zdark/50 font-semibold">
                    {result.total_responses} responses
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {result.answers.map((ans, ai) => (
                  <div key={ans.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-zdark">{ans.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-zdark/50">{ans.count} responses</span>
                        <span className="text-sm font-black text-zdark w-10 text-right">{ans.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full h-8 bg-gray-50 rounded-xl overflow-hidden">
                      <div
                        className="h-full rounded-xl flex items-center px-3 transition-all duration-700"
                        style={{
                          width: `${ans.percentage}%`,
                          backgroundColor: `${BAR_COLORS[ai % BAR_COLORS.length]}`,
                          minWidth: ans.percentage > 0 ? '2rem' : '0',
                        }}
                      >
                        {ans.percentage >= 10 && (
                          <span className="text-white font-black text-xs">{ans.percentage}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top answer callout */}
              {result.answers.length > 0 && (
                <div className="mt-4 bg-zbg rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-zpurple font-black text-sm">
                    🏆 Top answer:
                  </span>
                  <span className="font-bold text-sm text-zdark">
                    {[...result.answers].sort((a, b) => b.count - a.count)[0]?.label}
                    {' '}
                    <span className="text-zdark/50">
                      ({[...result.answers].sort((a, b) => b.count - a.count)[0]?.percentage}%)
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Export prompt */}
      {hasResults && (
        <div className="mt-8 bg-zdark rounded-3xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-black text-white">Ready to share with your team?</h3>
            <p className="text-white/60 font-semibold text-sm mt-1">Export results as a PDF or CSV report.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-white text-zdark font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
              📄 Export PDF
            </button>
            <button className="px-5 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/20">
              📊 Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
