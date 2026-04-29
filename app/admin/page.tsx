import Link from 'next/link';
import { getSurveys, getResponseCountsBySurvey } from '@/lib/db';

export const dynamic = 'force-dynamic';
import type { DbSurvey } from '@/types/survey';

export default async function AdminDashboard() {
  const [surveys, responseCounts] = await Promise.all([
    getSurveys(),
    getResponseCountsBySurvey(),
  ]);

  const totalResponses = Object.values(responseCounts).reduce((s, c) => s + c.total, 0);
  const totalCompleted = Object.values(responseCounts).reduce((s, c) => s + c.completed, 0);

  return (
    <div className="p-6 md:p-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-zdark">Surveys</h1>
        <p className="text-zdark/50 font-semibold mt-1 text-sm">
          {surveys.length} survey{surveys.length !== 1 ? 's' : ''} · {totalCompleted} completed response{totalCompleted !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Surveys',    value: surveys.length, icon: '📋', accent: 'text-zpurple bg-zpurple/10' },
          { label: 'Total Responses',  value: totalResponses, icon: '👥', accent: 'text-zteal bg-zteal/10'    },
          { label: 'Completed',        value: totalCompleted, icon: '✅', accent: 'text-zorange bg-zorange/10' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3 ${card.accent}`}>
              {card.icon}
            </div>
            <div className="text-2xl font-black text-zdark">{card.value}</div>
            <div className="text-xs font-bold text-zdark/50 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Survey list */}
      {surveys.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-zdark mb-2">No surveys yet</h3>
          <p className="text-zdark/50 font-semibold">Surveys you create will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {surveys.map(survey => {
            const counts = responseCounts[survey.id] ?? { total: 0, completed: 0 };
            return <SurveyRow key={survey.id} survey={survey} counts={counts} />;
          })}
        </div>
      )}
    </div>
  );
}

function SurveyRow({
  survey,
  counts,
}: {
  survey: DbSurvey;
  counts: { total: number; completed: number };
}) {
  const statusStyle =
    survey.status === 'published' ? 'bg-green-50 text-green-700'  :
    survey.status === 'archived'  ? 'bg-amber-50 text-amber-700'  :
                                    'bg-gray-100 text-gray-500';

  const audienceStyle =
    survey.audience_type === 'student' ? 'bg-zpurple/10 text-zpurple' : 'bg-zteal/10 text-zteal';

  const created = new Date(survey.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${survey.color}22` }}
      >
        {survey.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-black text-zdark text-sm">{survey.title}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle}`}>
            {survey.status}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${audienceStyle}`}>
            {survey.audience_type}
          </span>
        </div>
        <div className="text-xs text-zdark/40 font-semibold">
          Created {created}
          {counts.total > 0 && (
            <> · {counts.total} started · {counts.completed} completed</>
          )}
          {counts.total === 0 && <> · No responses yet</>}
        </div>
      </div>

      {survey.public_slug && (
        <Link
          href={`/s/${survey.public_slug}`}
          target="_blank"
          className="text-xs font-bold text-zdark/40 hover:text-zdark px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          Preview ↗
        </Link>
      )}

      <Link
        href={`/admin/surveys/${survey.id}`}
        className="flex-shrink-0 px-4 py-2 bg-zpurple text-white font-bold text-xs rounded-xl hover:bg-zpurple-dark transition-colors shadow-game-sm"
      >
        View Results
      </Link>
    </div>
  );
}
