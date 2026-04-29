'use client';

import { useState } from 'react';
import Image from 'next/image';
import ConfettiBlast from '@/components/survey/ConfettiBlast';
import { AVATAR_COMPONENTS } from '@/components/avatars';
import type { SurveyWithQuestions, DbQuestion } from '@/types/survey';

// ── Avatar roster ─────────────────────────────────────────────────────────────

const AVATARS = [
  { id: 'zippy', label: 'Zippy', ringColor: 'border-zyellow' },
  { id: 'nova',  label: 'Nova',  ringColor: 'border-zpurple' },
  { id: 'milo',  label: 'Milo',  ringColor: 'border-zteal'   },
  { id: 'sunny', label: 'Sunny', ringColor: 'border-zyellow' },
  { id: 'jax',   label: 'Jax',   ringColor: 'border-zorange' },
  { id: 'luna',  label: 'Luna',  ringColor: 'border-zpurple' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// Supabase JSONB options may be plain strings, objects, or a JSON string.
// Always returns a plain string[] so rendering never depends on object shape.
function normalizeOptions(raw: unknown): string[] {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        return String(obj.label ?? obj.value ?? obj.text ?? '');
      }
      return String(item);
    }).filter(Boolean);
  }

  if (typeof raw === 'string') {
    try {
      return normalizeOptions(JSON.parse(raw));
    } catch {
      return raw.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  return [];
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 'nickname' | 'avatar' | 'question' | 'complete';

interface Props {
  survey: SurveyWithQuestions;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StudentSurveyFlow({ survey }: Props) {
  const [step, setStep]                 = useState<Step>('nickname');
  const [nickname, setNickname]         = useState('');
  const [avatarId, setAvatarId]         = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // All answers keyed by question ID — single source of truth, never undefined
  const [answers, setAnswers]           = useState<Record<string, string>>({});
  const [score, setScore]               = useState(0);
  const [justEarned, setJustEarned]     = useState<number | null>(null);

  const questions  = survey.questions;
  const question   = questions[currentIndex];
  const total      = questions.length;
  const AvatarComp = avatarId ? AVATAR_COMPONENTS[avatarId] : null;

  // Derive the current answer from the map — always a string, never undefined
  const currentAnswer = question ? (answers[question.id] ?? '') : '';
  const canAdvance    = String(currentAnswer).trim().length > 0;

  function setAnswer(questionId: string, value: string) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function flashPoints(pts: number) {
    setJustEarned(pts);
    setTimeout(() => setJustEarned(null), 1400);
  }

  function handleNicknameSubmit() {
    if (!nickname.trim()) return;
    setStep('avatar');
  }

  function handleAvatarSubmit() {
    if (!avatarId) return;
    setStep('question');
  }

  function handleNext() {
    if (!canAdvance || !question) return;
    const pts = (question.points ?? 0) > 0 ? question.points : 10;
    setScore(prev => prev + pts);
    flashPoints(pts);
    if (currentIndex + 1 >= total) {
      setStep('complete');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }

  // ── Nickname step ─────────────────────────────────────────────────────────

  if (step === 'nickname') {
    return (
      <div className="min-h-screen bg-zbg flex flex-col">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm animate-slide-up">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{survey.emoji || '👋'}</div>
              <h1 className="text-2xl font-black text-zdark mb-2 leading-tight">{survey.title}</h1>
              {survey.description && (
                <p className="text-zdark/55 font-semibold text-sm leading-relaxed">{survey.description}</p>
              )}
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <label className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-3">
                What should we call you?
              </label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNicknameSubmit()}
                placeholder="Enter a nickname…"
                maxLength={30}
                autoFocus
                className="w-full px-4 py-3 rounded-2xl border-2 border-zdark/10 focus:border-zpurple outline-none font-semibold text-zdark text-base transition-colors placeholder:text-zdark/30"
              />
              <button
                onClick={handleNicknameSubmit}
                disabled={!nickname.trim()}
                className="mt-4 w-full py-4 bg-zpurple text-white font-black text-base rounded-2xl shadow-game-sm hover:bg-zpurple-dark active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transition-all"
              >
                Let&apos;s Go! →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Avatar step ───────────────────────────────────────────────────────────

  if (step === 'avatar') {
    return (
      <div className="min-h-screen bg-zbg flex flex-col">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm animate-slide-up">
            <div className="text-center mb-7">
              <h2 className="text-2xl font-black text-zdark mb-1">
                Pick your avatar, {nickname}!
              </h2>
              <p className="text-zdark/50 font-semibold text-sm">Choose who you want to be today</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AVATARS.map(av => {
                const Comp       = AVATAR_COMPONENTS[av.id];
                const isSelected = avatarId === av.id;
                return (
                  <button
                    key={av.id}
                    onClick={() => setAvatarId(av.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-3xl border-2 transition-all ${
                      isSelected
                        ? `${av.ringColor} bg-zpurple/5 scale-105 shadow-game-sm`
                        : 'border-transparent bg-white hover:border-zdark/20'
                    }`}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Comp size={64} />
                    </div>
                    <span className="text-xs font-black text-zdark">{av.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleAvatarSubmit}
              disabled={!avatarId}
              className="w-full py-4 bg-zpurple text-white font-black text-base rounded-2xl shadow-game-sm hover:bg-zpurple-dark active:translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transition-all"
            >
              Start Survey →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Complete step ─────────────────────────────────────────────────────────

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-zdark flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        <ConfettiBlast />
        <div className="text-center max-w-sm relative z-10 animate-fade-in">
          {AvatarComp && (
            <div className="w-24 h-24 mx-auto mb-4">
              <AvatarComp size={96} />
            </div>
          )}
          <div className="text-5xl mb-5">🎉</div>
          <h1 className="text-3xl font-black text-white mb-3 leading-tight">
            Thanks for sharing your voice, {nickname}!
          </h1>
          <p className="text-white/55 font-semibold leading-relaxed mb-8">
            Your feedback helps make this program better for everyone.
          </p>
          <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
            <div className="text-5xl font-black text-zorange mb-1">{score}</div>
            <div className="text-white/55 font-semibold text-sm mb-3">points earned</div>
            <div className="w-full h-px bg-white/10 mb-3" />
            <div className="text-white/35 text-xs font-semibold">
              {total} question{total !== 1 ? 's' : ''} completed · {survey.title}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Question step ─────────────────────────────────────────────────────────

  if (!question) return null;

  const progressPct = (currentIndex / total) * 100;
  const isLast      = currentIndex + 1 === total;

  return (
    <div className="min-h-screen bg-zbg flex flex-col">

      {/* Sticky question header */}
      <div className="bg-zdark sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 pt-3 pb-0">

          {/* Name + score row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image
                src="/zanmi-icon.png"
                alt="Zanmi"
                width={24}
                height={24}
                className="brightness-0 invert opacity-70"
              />
              <span className="text-white/60 font-black text-sm">{nickname}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zyellow/15 border border-zyellow/20 px-3 py-1.5 rounded-full">
              <span className="text-sm leading-none">⭐</span>
              <span className="text-sm font-black text-zyellow">{score}</span>
              {justEarned !== null && (
                <span key={score} className="text-xs font-black text-zyellow animate-fade-in">
                  +{justEarned}
                </span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #7C3AED, #14B8A6)',
              }}
            />
          </div>
          <div className="flex justify-between py-2">
            <span className="text-white/35 text-xs font-semibold">
              Question {currentIndex + 1} of {total}
            </span>
            <span className="text-white/35 text-xs font-semibold">
              {Math.round(progressPct)}% done
            </span>
          </div>

        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 px-4 py-5">
        <div className="max-w-lg mx-auto" key={currentIndex}>
          <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 mb-4 animate-slide-up">

            {(question.points ?? 0) > 0 && (
              <div className="inline-flex items-center gap-1 bg-zyellow/10 border border-zyellow/20 px-2.5 py-1 rounded-full text-xs font-black text-zyellow mb-4">
                ⭐ +{question.points} pts
              </div>
            )}

            <h2 className="text-lg font-black text-zdark mb-6 leading-snug">
              {question.question_text || (
                <span className="text-zdark/30 italic">Question text missing</span>
              )}
            </h2>

            <QuestionInput
              question={question}
              value={currentAnswer}
              onChange={v => setAnswer(question.id, v)}
            />

          </div>

          <button
            onClick={handleNext}
            disabled={!canAdvance}
            className="w-full py-4 bg-zpurple text-white font-black text-base rounded-2xl shadow-game-sm hover:bg-zpurple-dark active:translate-y-1 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transition-all"
          >
            {isLast ? 'Submit 🎉' : 'Next →'}
          </button>
        </div>
      </div>

    </div>
  );
}

// ── Shared top bar (nickname + avatar steps) ──────────────────────────────────

function TopBar() {
  return (
    <div className="bg-zdark px-4 py-3">
      <div className="max-w-lg mx-auto">
        <Image
          src="/zanmi-icon.png"
          alt="Zanmi"
          width={28}
          height={28}
          className="brightness-0 invert"
        />
      </div>
    </div>
  );
}

// ── Question input — renders the right control per question type ───────────────

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: DbQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  const { question_type } = question;
  const optionLabels = normalizeOptions(question.options);

  // ── Rating scale ─────────────────────────────────────────────────────────
  // Use option labels when they exist; fall back to 1–5 buttons.
  if (question_type === 'rating_scale' || question_type === 'scale') {
    if (optionLabels.length > 0) {
      return (
        <div className="space-y-2.5">
          {optionLabels.map(label => (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 font-semibold text-left transition-all ${
                value === label
                  ? 'border-zpurple bg-zpurple/5 text-zpurple'
                  : 'border-slate-200 bg-white text-slate-900 hover:border-zpurple/40 hover:bg-zpurple/5'
              }`}
            >
              <span className="flex-1">{label}</span>
              {value === label && <span className="text-zpurple font-black text-sm flex-shrink-0">✓</span>}
            </button>
          ))}
        </div>
      );
    }
    // Fallback: numeric 1–5
    return (
      <div>
        <div className="grid grid-cols-5 gap-2">
          {['1', '2', '3', '4', '5'].map(n => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`aspect-square rounded-2xl text-lg font-black transition-all ${
                value === n
                  ? 'bg-zpurple text-white scale-110 shadow-game-sm'
                  : 'bg-slate-100 text-slate-900 hover:bg-zpurple/10 hover:text-zpurple'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-2.5 px-0.5">
          <span className="text-xs text-slate-400 font-semibold">Not at all</span>
          <span className="text-xs text-slate-400 font-semibold">Totally!</span>
        </div>
      </div>
    );
  }

  // ── Yes / No ─────────────────────────────────────────────────────────────
  if (question_type === 'yes_no') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {(['yes', 'no'] as const).map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`py-5 rounded-2xl font-black text-lg transition-all ${
              value === opt
                ? opt === 'yes'
                  ? 'bg-zteal text-white scale-[1.03] shadow-game-sm'
                  : 'bg-zyellow text-white scale-[1.03] shadow-game-sm'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            {opt === 'yes' ? '👍 Yes' : '👎 No'}
          </button>
        ))}
      </div>
    );
  }

  // ── Multiple choice / emoji rating ────────────────────────────────────────
  if (question_type === 'multiple_choice' || question_type === 'emoji_rating') {
    if (optionLabels.length === 0) {
      return (
        <p className="text-slate-400 italic text-sm">No answer options found for this question.</p>
      );
    }
    return (
      <div className="space-y-2.5">
        {optionLabels.map(label => (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 font-semibold text-left transition-all ${
              value === label
                ? 'border-zpurple bg-zpurple/5 text-zpurple'
                : 'border-slate-200 bg-white text-slate-900 hover:border-zpurple/40 hover:bg-zpurple/5'
            }`}
          >
            <span className="flex-1">{label}</span>
            {value === label && (
              <span className="text-zpurple font-black text-sm flex-shrink-0">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // ── Long answer ───────────────────────────────────────────────────────────
  if (question_type === 'long_answer') {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Share your thoughts…"
        rows={4}
        className="w-full px-4 py-3 rounded-2xl border-2 border-zdark/10 focus:border-zpurple outline-none font-semibold text-zdark resize-none transition-colors placeholder:text-zdark/30"
      />
    );
  }

  // ── Short answer (default) ────────────────────────────────────────────────
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Type your answer…"
      className="w-full px-4 py-3 rounded-2xl border-2 border-zdark/10 focus:border-zpurple outline-none font-semibold text-zdark transition-colors placeholder:text-zdark/30"
    />
  );
}
