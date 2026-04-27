import Link from 'next/link';
import { getSurveyById } from '@/lib/sample-data';
import { Survey } from '@/lib/types';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function SurveyStartPage({ params }: Props) {
  const survey = getSurveyById(params.id);
  if (!survey) notFound();

  const isYouth = survey.audience === 'youth';
  const totalPoints = survey.questions.length * 10;
  const estimatedMinutes = Math.ceil(survey.questions.length * 0.5);
  const nextHref = isYouth
    ? `/survey/${params.id}/avatar`
    : `/survey/${params.id}/question/1`;

  if (isYouth) {
    return <YouthStart survey={survey} nextHref={nextHref} totalPoints={totalPoints} estimatedMinutes={estimatedMinutes} />;
  }
  return <AdultStart survey={survey} nextHref={nextHref} estimatedMinutes={estimatedMinutes} />;
}

function YouthStart({ survey, nextHref, totalPoints, estimatedMinutes }: {
  survey: Survey;
  nextHref: string;
  totalPoints: number;
  estimatedMinutes: number;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${survey.color}15 0%, #F7F9FC 100%)` }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: survey.color }}/>
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-2xl" style={{ backgroundColor: survey.color }}/>

      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <Link href="/" className="text-zdark/40 hover:text-zdark transition-colors font-bold text-sm">← Back</Link>
        <div className="flex items-center gap-2">
          <img src="/zanmi-icon.png" alt="Zanmi" className="h-7 w-auto" />
        </div>
      </div>

      <div className="relative z-10 max-w-sm w-full text-center animate-slide-up">
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 rounded-4xl flex items-center justify-center text-6xl shadow-lg animate-float" style={{ backgroundColor: `${survey.color}25`, border: `3px solid ${survey.color}40` }}>
            {survey.emoji}
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md" style={{ backgroundColor: survey.color }}>
            <span className="text-white">⭐</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-zdark mb-3 leading-tight">{survey.title}</h1>
        <p className="text-zdark/60 font-semibold text-lg mb-8 leading-relaxed">{survey.description}</p>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <span className="text-lg">❓</span>
            <span className="font-bold text-zdark text-sm">{survey.questions.length} questions</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <span className="text-lg">⏱️</span>
            <span className="font-bold text-zdark text-sm">~{estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zyellow/20 px-4 py-2 rounded-full border border-zyellow/40">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-zdark text-sm">{totalPoints} pts to earn!</span>
          </div>
        </div>

        <Link href={nextHref} className="block w-full py-5 text-xl font-black text-white rounded-3xl shadow-game btn-game transition-all hover:opacity-90 mb-4" style={{ backgroundColor: survey.color }}>
          Let&apos;s Go! 🚀
        </Link>
        <p className="text-sm text-zdark/40 font-semibold">🔒 No name needed · Totally anonymous · Super quick</p>
      </div>

      <div className="fixed bottom-10 right-10 text-4xl animate-bounce-slow opacity-30 pointer-events-none">🌟</div>
      <div className="fixed top-20 left-10 text-3xl animate-float opacity-20 pointer-events-none">✨</div>
    </div>
  );
}

function AdultStart({ survey, nextHref, estimatedMinutes }: {
  survey: Survey;
  nextHref: string;
  estimatedMinutes: number;
}) {
  return (
    <div className="min-h-screen bg-zbg flex flex-col">
      {/* Professional nav bar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/zanmi-icon.png" alt="Zanmi" className="h-8 w-auto" />
        </div>
        <Link href="/" className="text-sm font-semibold text-zdark/40 hover:text-zdark transition-colors">← Exit</Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Survey card */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            {/* Color header strip */}
            <div className="h-2" style={{ backgroundColor: survey.color }}/>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${survey.color}15` }}>
                  {survey.emoji}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-zdark">{survey.title}</h1>
                  <p className="text-zdark/50 font-semibold text-sm mt-0.5">Anonymous survey</p>
                </div>
              </div>

              <p className="text-zdark/70 font-semibold leading-relaxed mb-6">{survey.description}</p>

              {/* Details */}
              <div className="flex gap-6 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-zdark/60 font-semibold">
                  <span className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center text-xs">❓</span>
                  {survey.questions.length} questions
                </div>
                <div className="flex items-center gap-2 text-sm text-zdark/60 font-semibold">
                  <span className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center text-xs">⏱</span>
                  About {estimatedMinutes} minutes
                </div>
                <div className="flex items-center gap-2 text-sm text-zdark/60 font-semibold">
                  <span className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center text-xs">🔒</span>
                  Anonymous
                </div>
              </div>

              <p className="text-xs text-zdark/40 font-semibold mb-5">
                Your responses are completely anonymous. No identifying information is collected.
              </p>

              <Link
                href={nextHref}
                className="block w-full py-4 text-center text-lg font-bold text-white rounded-2xl transition-all hover:opacity-90"
                style={{ backgroundColor: survey.color }}
              >
                Begin Survey →
              </Link>
            </div>
          </div>

          {/* Powered by Zibbo */}
          <p className="text-center text-xs text-zdark/30 font-semibold mt-6">
            Powered by <span className="font-black text-zdark/40">Zanmi</span> · Surveys that feel like a game, insights that feel human.
          </p>
        </div>
      </div>
    </div>
  );
}
