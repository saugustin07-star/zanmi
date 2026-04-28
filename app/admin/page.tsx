import Link from 'next/link';
import { SAMPLE_SURVEYS } from '@/lib/sample-data';

const OVERVIEW_CARDS = [
  {
    label: 'Total Responses',
    value: '182',
    delta: '+12 this week',
    icon: '👥',
    accent: 'bg-zpurple/10 text-zpurple',
    border: 'border-zpurple/20',
  },
  {
    label: 'Completion Rate',
    value: '89%',
    delta: '+4% vs last month',
    icon: '✅',
    accent: 'bg-zteal/10 text-zteal',
    border: 'border-zteal/20',
  },
  {
    label: 'Avg Student Experience Score',
    value: '4.2 / 5',
    delta: 'Based on rating questions',
    icon: '⭐',
    accent: 'bg-zorange/10 text-zorange',
    border: 'border-zorange/20',
  },
  {
    label: 'Priority Action Areas',
    value: '3',
    delta: 'Based on low scores & drop-off',
    icon: '🎯',
    accent: 'bg-red-50 text-red-500',
    border: 'border-red-100',
  },
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

const COMPLETION_BY_SITE = [
  { site: 'Main Campus', rate: 94, responses: 68 },
  { site: 'East Site', rate: 87, responses: 52 },
  { site: 'West Site', rate: 81, responses: 39 },
  { site: 'Virtual', rate: 76, responses: 23 },
];

const SENTIMENT = [
  { label: 'Positive', pct: 62, color: 'bg-green-400' },
  { label: 'Neutral', pct: 24, color: 'bg-yellow-400' },
  { label: 'Negative', pct: 14, color: 'bg-red-400' },
];

const PROGRAM_INSIGHTS = [
  { icon: '🏆', label: 'Highest-rated area', value: 'Staff support & relationships', score: '4.7/5', type: 'positive' },
  { icon: '🎨', label: 'Second highest', value: 'Arts & Crafts activities', score: '4.5/5', type: 'positive' },
  { icon: '⚠️', label: 'Lowest-rated area', value: 'Session timing and pacing', score: '3.1/5', type: 'negative' },
  { icon: '📉', label: 'Needs attention', value: 'Older student engagement (grades 7–8)', score: '2.9/5', type: 'negative' },
];

const STUDENT_NEEDS = [
  'More hands-on and project-based activities',
  'More choice in what they do during program time',
  'Longer sessions for activities they enjoy',
  'More opportunities to lead or teach others',
];

const OPEN_THEMES = [
  {
    theme: 'Belonging',
    summary: 'Many students feel connected to staff but less connected to peers.',
    pct: 71,
    quote: '"I like my counselors. They always check on me."',
  },
  {
    theme: 'Safety',
    summary: 'Students generally feel physically safe; emotional safety scores lower.',
    pct: 84,
    quote: '"I feel safe here but sometimes kids say mean things."',
  },
  {
    theme: 'Program Activities',
    summary: 'Students want more variety and hands-on options.',
    pct: 58,
    quote: '"I wish we could do more art and less sitting."',
  },
  {
    theme: 'Student Voice',
    summary: 'Students want more say in what the program looks like.',
    pct: 44,
    quote: '"Nobody asks us what we want to do."',
  },
  {
    theme: 'Support from Adults',
    summary: 'Staff support is the most consistently positive theme across all sites.',
    pct: 89,
    quote: '"Ms. Johnson always helps me when I am struggling."',
  },
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

  return (
    <div className="p-6 md:p-8 space-y-8">

      {/* Sample data notice */}
      <div className="bg-zorange/10 border border-zorange/20 rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-zorange text-lg flex-shrink-0">ℹ️</span>
        <p className="text-sm font-semibold text-zdark/70">
          <span className="font-black text-zdark">Demo dashboard</span> — All data shown below is sample data for demonstration purposes only. It is not real response data.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zdark">Dashboard</h1>
          <p className="text-zdark/50 font-semibold mt-1 text-sm">Program feedback snapshot · Sample data</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filters */}
          <select className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 text-zdark/60 bg-white focus:outline-none focus:border-zpurple">
            <option>All Surveys</option>
            <option>How Was Your Week?</option>
            <option>Summer Camp Check-In</option>
          </select>
          <select className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 text-zdark/60 bg-white focus:outline-none focus:border-zpurple">
            <option>All Sites</option>
            <option>Main Campus</option>
            <option>East Site</option>
            <option>West Site</option>
          </select>
          <select className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 text-zdark/60 bg-white focus:outline-none focus:border-zpurple">
            <option>All Grades</option>
            <option>K–2</option>
            <option>3–5</option>
            <option>6–8</option>
          </select>
          <Link
            href="/admin/surveys/new"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-zpurple text-white font-bold rounded-xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game text-sm"
          >
            + New Survey
          </Link>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {OVERVIEW_CARDS.map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl p-5 border shadow-card flex items-start gap-3 ${s.border}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${s.accent}`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xl font-black text-zdark leading-none mb-0.5">{s.value}</div>
              <div className="text-xs font-bold text-zdark/50 leading-tight mb-1">{s.label}</div>
              <div className="text-xs text-zdark/35 font-semibold">{s.delta}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          {/* Completion & Engagement */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2 className="font-black text-zdark text-lg mb-1">Completion & Engagement</h2>
            <p className="text-xs text-zdark/40 font-semibold mb-5">Last 30 days · Sample data</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Avg time to complete', value: '4.2 min', icon: '⏱' },
                { label: 'Drop-off question', value: 'Q4 — Open response', icon: '📉' },
                { label: 'Most skipped', value: 'Q3 — Grade level', icon: '⏭' },
              ].map((m) => (
                <div key={m.label} className="bg-zbg rounded-xl p-4">
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="font-black text-zdark text-base">{m.value}</div>
                  <div className="text-xs text-zdark/50 font-semibold mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <h3 className="font-black text-zdark text-sm mb-3">Completion Rate by Site</h3>
            <div className="space-y-2.5">
              {COMPLETION_BY_SITE.map((s) => (
                <div key={s.site} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zdark/60 w-24 flex-shrink-0">{s.site}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-zpurple rounded-full" style={{ width: `${s.rate}%` }} />
                  </div>
                  <span className="text-xs font-black text-zdark w-10 text-right">{s.rate}%</span>
                  <span className="text-xs text-zdark/40 font-semibold w-16 text-right">{s.responses} resp.</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response trend */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-black text-zdark text-lg">Response Trend</h2>
                <p className="text-xs text-zdark/40 font-semibold">Last 7 days</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-zpurple inline-block" /> Youth</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-zteal inline-block" /> Adult</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-36">
              {TREND_DATA.map((d) => {
                const youthH = Math.round((d.youth / maxVal) * 100);
                const adultH = Math.round((d.adult / maxVal) * 100);
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col-reverse gap-0.5 h-28">
                      <div className="w-full rounded-sm bg-zpurple opacity-90" style={{ height: `${youthH}%` }} />
                      <div className="w-full rounded-sm bg-zteal opacity-80" style={{ height: `${adultH}%` }} />
                    </div>
                    <span className="text-xs text-zdark/40 font-semibold">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student Sentiment */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2 className="font-black text-zdark text-lg mb-1">Student Sentiment</h2>
            <p className="text-xs text-zdark/40 font-semibold mb-5">Positive / Neutral / Negative breakdown · Sample data</p>
            <div className="flex items-center gap-2 mb-4">
              {SENTIMENT.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <div className={`h-3 rounded-full ${s.color} mb-2`} style={{ opacity: 0.85 }} />
                  <div className="font-black text-zdark text-lg">{s.pct}%</div>
                  <div className="text-xs text-zdark/50 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex h-4 rounded-full overflow-hidden gap-0.5 mt-2">
              {SENTIMENT.map((s) => (
                <div key={s.label} className={`${s.color}`} style={{ width: `${s.pct}%`, opacity: 0.8 }} />
              ))}
            </div>
          </div>

          {/* Open-Ended Themes */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2 className="font-black text-zdark text-lg mb-1">Open-Ended Themes</h2>
            <p className="text-xs text-zdark/40 font-semibold mb-5">Themes identified from short-answer responses · Sample data</p>
            <div className="space-y-4">
              {OPEN_THEMES.map((t) => (
                <div key={t.theme} className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-zdark">{t.theme}</span>
                    <span className="text-xs font-bold bg-zpurple/10 text-zpurple px-2.5 py-1 rounded-full">{t.pct}% of responses</span>
                  </div>
                  <p className="text-sm text-zdark/60 font-semibold mb-2">{t.summary}</p>
                  <p className="text-xs text-zdark/40 font-semibold italic border-l-2 border-zpurple/30 pl-3">{t.quote}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Surveys list */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span>🎮</span>
                <h2 className="text-lg font-black text-zdark">Youth Surveys</h2>
                <span className="text-xs font-bold bg-zpurple/10 text-zpurple px-2.5 py-1 rounded-full">{youthSurveys.length}</span>
                <Link href="/admin/surveys/new" className="ml-auto text-sm font-bold text-zpurple hover:underline">+ Create</Link>
              </div>
              <div className="space-y-3">
                {youthSurveys.map((survey) => <SurveyCard key={survey.id} survey={survey} />)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span>💼</span>
                <h2 className="text-lg font-black text-zdark">Adult Surveys</h2>
                <span className="text-xs font-bold bg-zteal/10 text-zteal-dark px-2.5 py-1 rounded-full">{adultSurveys.length}</span>
                <Link href="/admin/surveys/new" className="ml-auto text-sm font-bold text-zpurple hover:underline">+ Create</Link>
              </div>
              <div className="space-y-3">
                {adultSurveys.map((survey) => <SurveyCard key={survey.id} survey={survey} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Program Insights */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-1">Program Insights</h3>
            <p className="text-xs text-zdark/40 font-semibold mb-4">Sample data</p>
            <div className="space-y-3">
              {PROGRAM_INSIGHTS.map((ins) => (
                <div key={ins.label} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{ins.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zdark/40 font-bold uppercase tracking-wider">{ins.label}</p>
                    <p className="text-sm font-bold text-zdark leading-tight">{ins.value}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ins.type === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {ins.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Needs */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-1">Student Needs Identified</h3>
            <p className="text-xs text-zdark/40 font-semibold mb-4">Sample data</p>
            <ul className="space-y-2.5">
              {STUDENT_NEEDS.map((need) => (
                <li key={need} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 bg-zorange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-zorange text-xs font-black">→</span>
                  </span>
                  <span className="text-sm font-semibold text-zdark/70 leading-snug">{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reporting */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-4">Reporting</h3>
            <div className="space-y-2.5">
              <button className="w-full flex items-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-zdark/70 hover:border-zpurple hover:text-zpurple transition-colors text-left">
                <span>📥</span> Export CSV
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-zdark/70 hover:border-zpurple hover:text-zpurple transition-colors text-left">
                <span>📄</span> Download Summary Report
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-zdark/70 hover:border-zpurple hover:text-zpurple transition-colors text-left">
                <span>🔗</span> Share Dashboard
              </button>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <h3 className="font-black text-zdark mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { icon: '👥', text: '3 new responses on "How Was Your Week?"', time: '5 min ago' },
                { icon: '📋', text: 'New response on "Staff Experience Survey"', time: '1 hour ago' },
                { icon: '✏️', text: '"Summer Camp Check-In" was updated', time: '2 hours ago' },
                { icon: '🎉', text: '"Monthly Wellbeing Check" hit 60 responses', time: 'Yesterday' },
              ].map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-base flex-shrink-0">{a.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-zdark leading-snug">{a.text}</p>
                    <p className="text-xs text-zdark/40 font-semibold mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: `${survey.color}18` }}>
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
          <div className="flex items-center gap-3 text-xs text-zdark/50 font-semibold mt-1">
            <span>{survey.response_count} responses</span>
            <span>{survey.completion_rate}% complete</span>
            <span>{survey.questions.length}q</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <Link href={`/admin/surveys/${survey.id}/results`} className="px-3 py-1.5 text-xs font-bold text-zpurple bg-zpurple/10 rounded-xl hover:bg-zpurple/20 transition-colors">
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
