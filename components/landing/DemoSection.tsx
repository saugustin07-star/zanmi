'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'kids' | 'adult';

const KIDS_QUESTIONS = [
  {
    label: 'How are you feeling today?',
    type: 'emoji',
    options: [
      { emoji: '😢', text: 'Not good' },
      { emoji: '😕', text: 'Meh' },
      { emoji: '😐', text: 'Okay' },
      { emoji: '😊', text: 'Good!' },
      { emoji: '🤩', text: 'Amazing!' },
    ],
  },
  {
    label: 'Which activity did you like best?',
    type: 'choice',
    options: [
      { emoji: '🎨', text: 'Arts & Crafts' },
      { emoji: '⚽', text: 'Sports & Games' },
      { emoji: '🎵', text: 'Music' },
      { emoji: '📚', text: 'Reading' },
    ],
  },
  {
    label: 'Pick the badge that matches your experience!',
    type: 'badge',
    options: [
      { emoji: '🏆', text: 'Champion' },
      { emoji: '✨', text: 'Creator' },
      { emoji: '🧠', text: 'Learner' },
      { emoji: '🤝', text: 'Helper' },
    ],
  },
];

const ADULT_QUESTIONS = [
  {
    label: "How satisfied were you with today's experience?",
    type: 'scale',
    options: ['1', '2', '3', '4', '5'],
  },
  {
    label: 'What was most helpful?',
    type: 'radio',
    options: [
      'The content and curriculum',
      'The staff and facilitators',
      'Connecting with others',
      'Resources and materials',
    ],
  },
  {
    label: 'What would you improve?',
    type: 'radio',
    options: [
      'Session timing and length',
      'Communication beforehand',
      'Activities and engagement',
      'Nothing — it was great!',
    ],
  },
];

export default function DemoSection() {
  const [tab, setTab] = useState<Tab>('kids');
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  function switchTab(t: Tab) {
    setTab(t);
    setActiveQ(0);
    setSelected(null);
    setAnswered(false);
  }

  function handleSelect(val: string) {
    if (answered) return;
    setSelected(val);
    setAnswered(true);
  }

  function handleNext() {
    if (!answered) return;
    const total = tab === 'kids' ? KIDS_QUESTIONS.length : ADULT_QUESTIONS.length;
    if (activeQ < total - 1) {
      setActiveQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const isKids = tab === 'kids';
  const questions = isKids ? KIDS_QUESTIONS : ADULT_QUESTIONS;
  const q = questions[activeQ];
  const total = questions.length;
  const progress = Math.round(((activeQ + (answered ? 1 : 0)) / total) * 100);

  return (
    <div className="w-full">
      {/* Tab toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-card border border-slate-100">
          <button
            onClick={() => switchTab('kids')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              isKids ? 'bg-zpurple text-white shadow-sm' : 'text-zdark/60 hover:text-zdark'
            }`}
          >
            🎮 Kids Survey
          </button>
          <button
            onClick={() => switchTab('adult')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              !isKids ? 'bg-zdark text-white shadow-sm' : 'text-zdark/60 hover:text-zdark'
            }`}
          >
            💼 Adult Survey
          </button>
        </div>
      </div>

      {/* Phone frame preview */}
      <div className="max-w-sm mx-auto">
        <div className={`rounded-3xl overflow-hidden shadow-elevated border-4 transition-all duration-300 ${isKids ? 'border-zpurple/30' : 'border-zdark/20'}`}>

          {/* Status bar */}
          <div className={`px-5 pt-4 pb-3 ${isKids ? 'bg-gradient-accent' : 'bg-zdark'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                  <span className="text-white font-black text-xs">Z</span>
                </div>
                <span className="text-white font-bold text-xs opacity-80">Zanmi</span>
              </div>
              <span className="text-white/60 text-xs font-semibold">
                {activeQ + 1} / {total}
              </span>
            </div>
            {/* Progress */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            {isKids && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="text-white/80 text-xs font-bold">{answered ? activeQ * 10 + 10 : activeQ * 10} pts</span>
              </div>
            )}
          </div>

          {/* Question body */}
          <div className={`px-5 pt-5 pb-5 ${isKids ? 'bg-white' : 'bg-white'}`}>
            <p className={`font-black mb-4 leading-snug ${isKids ? 'text-lg text-zdark text-center' : 'text-base text-zdark'}`}>
              {q.label}
            </p>

            {/* Kids: emoji rating */}
            {isKids && q.type === 'emoji' && (
              <div className="flex justify-between gap-1 mb-4">
                {(q.options as { emoji: string; text: string }[]).map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleSelect(opt.text)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all flex-1 ${
                      selected === opt.text
                        ? 'border-zpurple bg-zpurple/10 scale-110'
                        : 'border-gray-100 hover:border-zpurple/30'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-xs font-bold text-zdark/60">{opt.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Kids: choice / badge */}
            {isKids && (q.type === 'choice' || q.type === 'badge') && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(q.options as { emoji: string; text: string }[]).map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleSelect(opt.text)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                      selected === opt.text
                        ? 'border-zpurple bg-zpurple/10'
                        : 'border-gray-100 hover:border-zpurple/20'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-xs font-bold text-zdark">{opt.text}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Adult: scale */}
            {!isKids && q.type === 'scale' && (
              <div className="mb-4">
                <div className="flex gap-1.5">
                  {(q.options as string[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        selected === opt
                          ? 'border-zteal bg-zteal text-white'
                          : 'border-gray-200 bg-white text-zdark hover:border-gray-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5 px-0.5">
                  <span className="text-xs text-zdark/40 font-semibold">Dissatisfied</span>
                  <span className="text-xs text-zdark/40 font-semibold">Very satisfied</span>
                </div>
              </div>
            )}

            {/* Adult: radio */}
            {!isKids && q.type === 'radio' && (
              <div className="space-y-2 mb-4">
                {(q.options as string[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      selected === opt
                        ? 'border-zteal bg-zteal/5'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === opt ? 'border-zteal' : 'border-gray-300'}`}>
                      {selected === opt && <div className="w-2 h-2 rounded-full bg-zteal" />}
                    </div>
                    <span className="text-sm font-semibold text-zdark">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Feedback + next */}
            {answered && isKids && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 text-center mb-3 animate-pop">
                <span className="text-sm font-black text-zdark">+10 points! ⭐</span>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={!answered || activeQ === total - 1}
              className={`w-full py-3 font-bold rounded-xl text-sm transition-all ${
                answered && activeQ < total - 1
                  ? isKids
                    ? 'bg-zpurple text-white btn-game shadow-game-sm'
                    : 'bg-zdark text-white hover:opacity-90'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {!answered
                ? 'Select an answer'
                : activeQ === total - 1
                ? activeQ === total - 1 && answered
                  ? isKids ? '🎉 Survey complete!' : '✓ All done!'
                  : 'Next'
                : isKids ? 'Next →' : 'Continue →'}
            </button>
          </div>
        </div>

        {/* Try full demo CTA */}
        <div className="text-center mt-6">
          <Link
            href={isKids ? '/survey/demo-kids' : '/survey/demo-adult'}
            className={`inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-2xl text-white shadow-game btn-game transition-all ${
              isKids ? 'bg-zpurple hover:bg-zpurple-dark' : 'bg-zdark hover:opacity-90'
            }`}
          >
            Try the Full {isKids ? 'Kids' : 'Adult'} Demo →
          </Link>
          <p className="text-zdark/40 text-xs font-semibold mt-2">No sign-up needed</p>
        </div>
      </div>
    </div>
  );
}
