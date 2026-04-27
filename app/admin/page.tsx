import Link from 'next/link';
import { SAMPLE_SURVEYS } from '@/lib/sample-data';

const STAT_CARDS = [
  { label: 'Total Responses', value: '182', delta: '+12 this week', icon: '👥', accent: 'bg-zpurple/10 text-zpurple border-zpurple/20' },
  { label: 'Completion Rate', value: '89%', delta: '+4% vs last month', icon: '✅', accent: 'bg-zteal/10 text-zteal border-zteal/20' },
  { label: 'Avg Satisfaction', value: '4.2 / 5', delta: 'Based on scale questions', icon: '⭐', accent: 'bg-zorange/10 text-zorange border-zorange/20' },
  { label: 'Active Surveys', value: '4', delta: '2 youth · 2 adult', icon: '📋', accent: 'bg-zdark/5 text-zdark border-zdark/10' },
  { label: 'Youth Responses', value: '124', delta: '68% of total', icon: '🎮', accent: 'bg-zpurple/10 text-zpurple border-zpurple/20' },
  { label: 'Adult Responses', value: '58', delta: '32% of total', icon: '💼', accent: 'bg-zteal/10 text-zteal border-zteal/20' },
];

const TREND_DATA = [
  { label: 'Mon', youth: 18, adult: 8 },
  { label: 'Tue', youth: 24, adult: 11 },
  { label: 'Wed', youth: 15, adult: 6 },
  { label: 'Thu', youth: 29, adult: 14 },
  { label: 'Fri', youth: 22, adult: 9 },
  { label: 'Sat', youth: 10, adult: 4 },
  { label: 'Sun', youth: 6, adult: 6 },
];

const TOP_INSIGHTS = [
  { icon: '🏆', label: 'Highest-rated experience', value: 'Arts & Crafts activities', tag: 'Youth' },
  { icon: '📈', label: 'Best completion rate', value: 'Monthly Wellbeing Check', tag: '94%' },
  { icon: '⚠️', label: 'Needs attention', value: 'Session timing feedback', tag: 'Adult' },
  { icon: '💬', label: 'Top staff rating area', value: 'Connecting with others', tag: '4.7/5' },
];

const recentActivity = [
  { icon: '👥', text: '3 new responses on "How Was Your Week?"', time: '5 min ago' },
  { icon: '📋', text: 'New response on "Staff Experience Survey"', time: '1 hour ago' },
  { icon: '✏️', text: 'Survey "Summer Camp Check-In" was updated', time: '2 hours ago' },
  { icon: '🎉', text: '"Monthly Wellbeing Check" reached 60 responses', time: 'Yesterday' },
];

const AUDIENCE_STYLES = {
  youth: { label: 'Youth', bg: 'bg-zpurple/10', text: 'text-zpurple', icon: '🎮' },
  adult: { label: 'Adult', bg: 'bg-zteal/10', text: 'text-zteal-dark', icon: '💼' },
};

const maxVal = Math.max(...TREND_DATA.map((d) => d.youth + d.adult));

export default function AdminDashboard() {
  const allSurveys = SAMPLE_SURVEYS;
  const youthSurveys = allSurveys.filter((s) => s.audience === 'youth');
  const adultSurveys = allSurveys.filter((s) => s.audience === 'adult');
  const youthPct = Math.round((youthSurveys.length / allSurveys.length) * 100);
  const adultPct = 100 - youthPct;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-zdark">Dashboard</h1>
          <p className="text-zdark/50 font-semibold mt-1">Here&apos;s a snapshot of your engagement data.</p>
        </div>
        <Link
          href="/admin/surveys/new"
          className="flex items-center gap-2 px-6 py-3 bg-zpurple text-white font-bold rounded-2xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game"
        >
          <span>+</span> New Survey
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl p-5 border shadow-card flex items-start gap-4 ${s.accent.split(' ')[2]}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${s.accent.split(' ').slice(0, 2).join(' ')}`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-black text-zdark leading-none mb-0.5">{s.value}</div>
              <div className="text-xs font-bold text-zdark/50 mb-1">{s.label}</div>
              <div className="text-xs text-zdark/40 font-semibold">{s.delta}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Charts + surveys */}
        <div className="lg:col-span-2 space-y-6">

          {/* Response trend chart */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-black text-zdark text-lg">Response Trend</h2>
                <p className="text-sm text-zdark/40 font-semibold">Last 7 days</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-zpurple inline-block" /> Youth</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-zteal inline-block" /> Adult</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {TREND_DATA.map((d) => {
                const youthH = Math.round((d.youth / maxVal) * 100);
                const adultH = Math.round((d.adult / maxVal) * 100);
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col-reverse gap-0.5 h-32">
                      <div
                        className="w-full rounded-sm bg-zpurple chart-bar opacity-90"
                        style={{ height: `${youthH}%` }}
                      />
                      <div
                        className="w-full rounded-sm bg-zteal chart-bar opacity-80"
                        style={{ height: `${adultH}%` }}
                      />
                    </div>
                    <span className="text-xs text-zdark/40 font-semibold">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Surveys list */}
          <div className="space-y-6">
            {/* Youth surveys */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🎮</span>
                <h2 className="text-lg font-black text-zdark">Youth Surveys</h2>
                <span className="text-xs font-bold bg-zpurple/10 text-zpurple px-2.5 py-1 rounded-full">{youthSurveys.length}</span>
                <Link href="/admin/surveys/new" className="ml-auto text-sm font-bold text-zpurple hover:underline">+ Create</Link>
              </div>
              <div className="space-y-3">
                {youthSurveys.map((survey) => (
                  <SurveyCard key={survey.id} survey={survey} />
                ))}
              </div>
            </div>

            {/* Adult surveys */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">💼</span>
                <h2 className="text-lg font-black text-zdark">Adult Surveys</h2>
                <span className="text-xs font-bold bg-zteal/10 text-zteal-dark px-2.5 py-1 rounded-full">{adultSurveys.length}</span>
                <Link href="/admin/surveys/new" className="ml-auto text-sm font-bold text-zpurple hover:underline">+ Create</Link>
              </div>
              <div className="space-y-3">
                {adultSurveys.map((survey) => (
                  <SurveyCard key={survey.id} survey={survey} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Top insights */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-4">Top Insights</h3>
            <div className="space-y-3">
              {TOP_INSIGHTS.map((ins) => (
                <div key={ins.label} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{ins.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zdark/40 font-bold uppercase tracking-wider">{ins.label}</p>
                    <p className="text-sm font-bold text-zdark truncate">{ins.value}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 bg-zbg rounded-full text-zdark/50 flex-shrink-0">{ins.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience breakdown */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-4">Audience Breakdown</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-3 rounded-full overflow-hidden bg-gray-50 flex">
                <div className="h-full bg-zpurple rounded-l-full transition-all" style={{ width: `${youthPct}%` }} />
                <div className="h-full bg-zteal rounded-r-full transition-all" style={{ width: `${adultPct}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-sm font-bold text-zdark/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-zpurple inline-block" /> Youth
                </span>
                <span className="text-sm font-black text-zdark">{youthPct}% · {youthSurveys.length} surveys</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-sm font-bold text-zdark/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-zteal inline-block" /> Adult
                </span>
                <span className="text-sm font-black text-zdark">{adultPct}% · {adultSurveys.length} surveys</span>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-base flex-shrink-0">{a.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-zdark leading-snug">{a.text}</p>
                    <p className="text-xs text-zdark/40 font-semibold mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick share */}
          <div className="bg-zdark rounded-2xl p-5 text-white">
            <h3 className="font-black text-base mb-1">Share a Survey</h3>
            <p className="text-sm opacity-60 font-semibold mb-4">Copy the link and share it instantly.</p>
            <div className="bg-white/10 rounded-xl px-3 py-2 text-sm font-mono break-all mb-3 text-white/70">
              zanmi.app/survey/survey-1
            </div>
            <button className="w-full bg-zpurple text-white font-bold py-2 rounded-xl text-sm hover:bg-zpurple-dark transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SurveyCard({ survey }: { survey: typeof SAMPLE_SURVEYS[0] }) {
  const audienceStyle = AUDIENCE_STYLES[survey.audience];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 card-hover">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: `${survey.color}18` }}>
          {survey.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-black text-zdark text-sm truncate">{survey.title}</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${audienceStyle.bg} ${audienceStyle.text}`}>
              {audienceStyle.icon} {audienceStyle.label}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${survey.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
              {survey.is_active ? '● Active' : '○ Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zdark/50 font-semibold mt-1">
            <span>{survey.response_count} responses</span>
            <span>{survey.completion_rate}% complete</span>
            <span>{survey.questions.length} questions</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <Link href={`/admin/surveys/${survey.id}/results`} className="px-3 py-1.5 text-xs font-bold text-zpurple bg-zpurple/10 rounded-xl hover:bg-zpurple/20 transition-colors whitespace-nowrap">
            Results
          </Link>
          <Link href={`/survey/${survey.id}`} className="px-3 py-1.5 text-xs font-bold text-zdark/50 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center" target="_blank">
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
