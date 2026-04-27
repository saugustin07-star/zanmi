'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AVATARS, getSurveyById } from '@/lib/sample-data';
import { AVATAR_COMPONENTS } from '@/components/avatars';
import AvatarGrid from '@/components/survey/AvatarGrid';

export default function AvatarPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const survey = getSurveyById(id);

  // Redirect adult surveys away from avatar selection
  if (survey && survey.audience === 'adult') {
    router.replace(`/survey/${id}/question/1`);
    return null;
  }

  const selectedAvatar = AVATARS.find((a) => a.id === selected);
  const AvatarSvg = selected ? AVATAR_COMPONENTS[selected] : null;

  function handleContinue() {
    if (!selected) return;
    sessionStorage.setItem(`zibbo_avatar_${id}`, selected);
    sessionStorage.setItem(`zibbo_score_${id}`, '0');
    router.push(`/survey/${id}/question/1`);
  }

  return (
    <div className="min-h-screen bg-zbg flex flex-col items-center justify-start pt-8 px-4 pb-8">
      {/* Top bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="text-zdark/40 hover:text-zdark transition-colors font-bold text-sm">
          ← Back
        </button>
        <div className="w-7 h-7 bg-gradient-brand rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-sm">Z</span>
        </div>
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-6">
          {selected && selectedAvatar && AvatarSvg ? (
            <div className="animate-pop">
              <div className="w-24 h-24 rounded-3xl mx-auto mb-4 overflow-hidden shadow-lg border-4 border-zpurple/30">
                <AvatarSvg size={96} />
              </div>
              <h1 className="text-2xl font-black text-zdark">
                Hey, {selectedAvatar.name}! 🎉
              </h1>
              <p className="text-zdark/50 font-semibold mt-1 text-sm">{selectedAvatar.theme} · Ready to answer?</p>
            </div>
          ) : (
            <>
              <div className="text-5xl mb-3">🦸</div>
              <h1 className="text-2xl font-black text-zdark">Pick Your Character!</h1>
              <p className="text-zdark/50 font-semibold mt-1">Choose who you&apos;ll be during this survey.</p>
            </>
          )}
        </div>

        {/* Avatar grid */}
        <div className="bg-white rounded-3xl p-4 shadow-card border border-gray-100 mb-5">
          <AvatarGrid avatars={AVATARS} selected={selected} onSelect={setSelected} />
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`
            w-full py-5 text-xl font-black rounded-3xl shadow-game btn-game transition-all
            ${selected
              ? 'bg-zpurple text-white hover:bg-zpurple-dark'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }
          `}
        >
          {selected ? `Play as ${selectedAvatar?.name}! →` : 'Pick a character first'}
        </button>

        <p className="text-center text-xs text-zdark/30 font-semibold mt-4">
          Your character is just for fun — we don&apos;t save your name
        </p>
      </div>
    </div>
  );
}
