'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSurveyById, AVATARS } from '@/lib/sample-data';
import { Survey } from '@/lib/types';
import { AVATAR_COMPONENTS } from '@/components/avatars';
import ConfettiBlast from '@/components/survey/ConfettiBlast';

function StarRating({ score, max }: { score: number; max: number }) {
  const stars = Math.round((score / max) * 3);
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`text-5xl star-pop ${i > stars ? 'opacity-20' : ''}`} style={{ animationDelay: `${(i - 1) * 0.15}s` }}>⭐</span>
      ))}
    </div>
  );
}

export default function CompletePage() {
  const params = useParams();
  const id = params.id as string;
  const [score, setScore] = useState(0);
  const [avatarId, setAvatarId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const survey = getSurveyById(id);

  useEffect(() => {
    const savedScore = sessionStorage.getItem(`zibbo_score_${id}`);
    const savedAvatar = sessionStorage.getItem(`zibbo_avatar_${id}`);
    setScore(savedScore ? parseInt(savedScore, 10) : 0);
    setAvatarId(savedAvatar);
    setMounted(true);
  }, [id]);

  if (!survey) return null;

  const isYouth = survey.audience === 'youth';

  if (isYouth) {
    return <YouthComplete survey={survey} score={score} avatarId={avatarId} mounted={mounted} />;
  }
  return <AdultComplete survey={survey} mounted={mounted} />;
}

/* ─── Youth complete ─────────────────────────────────────── */

function YouthComplete({ survey, score, avatarId, mounted }: {
  survey: Survey;
  score: number;
  avatarId: string | null;
  mounted: boolean;
}) {
  const maxScore = survey.questions.length * 10;
  const avatar = AVATARS.find((a) => a.id === avatarId);
  const AvatarSvg = avatarId ? AVATAR_COMPONENTS[avatarId] : null;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  const getMessage = () => {
    if (percentage >= 100) return { title: 'Perfect Score! 🏆', sub: 'You answered every single question!' };
    if (percentage >= 60) return { title: 'Amazing Job! 🌟', sub: "You're on fire! Keep it up!" };
    return { title: 'Great Work! 🎉', sub: 'Thanks for sharing your thoughts!' };
  };

  const { title, sub } = getMessage();

  return (
    <div className="min-h-screen bg-zbg flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden">
      {mounted && <ConfettiBlast />}

      <div className="absolute top-0 left-0 w-64 h-64 bg-zpurple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-zblue/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-sm w-full text-center">
        {/* Avatar with celebration */}
        {avatar && AvatarSvg && (
          <div className="relative inline-block mb-6 animate-pop">
            <div className="w-24 h-24 rounded-3xl mx-auto overflow-hidden shadow-xl border-4 border-zpurple/30">
              <AvatarSvg size={96} />
            </div>
            <div className="absolute -top-3 -right-3 text-3xl animate-wiggle">🎉</div>
          </div>
        )}

        <div className="mb-4">
          <StarRating score={score} max={maxScore} />
        </div>

        <h1 className="text-3xl font-black text-zdark mb-2">{title}</h1>
        <p className="text-zdark/60 font-semibold text-lg mb-6">{sub}</p>

        {/* Score card */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-black text-zyellow">{score}</div>
              <div className="text-sm text-zdark/50 font-semibold">Points earned</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-4xl font-black text-zpurple">{survey.questions.length}</div>
              <div className="text-sm text-zdark/50 font-semibold">Answered</div>
            </div>
            <div className="w-px h-12 bg-gray-100" />
            <div className="text-center">
              <div className="text-4xl font-black text-zblue">{percentage}%</div>
              <div className="text-sm text-zdark/50 font-semibold">Score</div>
            </div>
          </div>
          <div className="w-full bg-gray-50 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-brand rounded-full progress-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="bg-gradient-brand rounded-3xl p-5 text-white mb-6">
          <p className="font-black text-lg mb-1">🙏 Thank you!</p>
          <p className="opacity-80 font-semibold text-sm leading-relaxed">
            Your answers help make the program even better for everyone. You rock!
          </p>
        </div>

        <div className="space-y-3">
          <Link href={`/survey/${survey.id}`} className="block w-full py-4 bg-zpurple text-white font-black rounded-2xl shadow-game hover:bg-zpurple-dark transition-all btn-game text-lg">
            Do It Again! 🔄
          </Link>
          <Link href="/" className="block w-full py-4 border-2 border-gray-200 text-zdark/60 font-bold rounded-2xl hover:border-zpurple hover:text-zpurple transition-all">
            Done 👋
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Adult complete ─────────────────────────────────────── */

function AdultComplete({ survey, mounted: _ }: {
  survey: Survey;
  mounted: boolean;
}) {
  return (
    <div className="min-h-screen bg-zbg flex flex-col">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/zanmi-icon.png" alt="Zanmi" className="h-8 w-auto" />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-slide-up">
          {/* Checkmark illustration */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${survey.color}15` }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill={survey.color} opacity="0.15"/>
              <path d="M12 24 L20 32 L36 16" stroke={survey.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-3xl font-black text-zdark mb-2">Thank You!</h1>
          <p className="text-zdark/60 font-semibold text-lg mb-2">Your response has been recorded.</p>
          <p className="text-zdark/40 font-semibold text-sm mb-8 max-w-xs mx-auto">
            Your feedback helps us improve our programs and better support everyone in our community.
          </p>

          {/* Summary card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${survey.color}15` }}>
                {survey.emoji}
              </div>
              <div>
                <p className="font-black text-zdark text-sm">{survey.title}</p>
                <p className="text-xs text-zdark/40 font-semibold">
                  {survey.questions.length} questions completed · Anonymous
                </p>
              </div>
            </div>
            <div className="h-px bg-gray-100 mb-4" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-semibold text-zdark/60">Response submitted successfully</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block w-full py-4 text-white font-bold rounded-2xl transition-all hover:opacity-90" style={{ backgroundColor: survey.color }}>
              Done
            </Link>
            <Link href={`/survey/${survey.id}`} className="block w-full py-4 border-2 border-gray-200 text-zdark/60 font-semibold rounded-2xl hover:border-gray-300 transition-all text-sm">
              Take Survey Again
            </Link>
          </div>

          <p className="text-xs text-zdark/30 font-semibold mt-6">
            Powered by <span className="font-black text-zdark/40">Zanmi</span>
          </p>
        </div>
      </div>
    </div>
  );
}
