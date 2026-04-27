'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSurveyById, AVATARS } from '@/lib/sample-data';
import { AVATAR_COMPONENTS } from '@/components/avatars';
import ProgressBar from '@/components/survey/ProgressBar';
import { Question, Survey, QuestionOption } from '@/lib/types';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const num = parseInt(params.num as string, 10);

  const survey = getSurveyById(id);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [avatarId, setAvatarId] = useState<string | null>(null);

  useEffect(() => {
    const savedAvatar = sessionStorage.getItem(`zibbo_avatar_${id}`);
    const savedScore = sessionStorage.getItem(`zibbo_score_${id}`);
    setAvatarId(savedAvatar);
    setScore(savedScore ? parseInt(savedScore, 10) : 0);
  }, [id]);

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-zdark/60">Survey not found.</p>
      </div>
    );
  }

  const question = survey.questions[num - 1];
  const totalQuestions = survey.questions.length;
  const isLast = num === totalQuestions;
  const isYouth = survey.audience === 'youth';
  const avatar = AVATARS.find((a) => a.id === avatarId);
  const AvatarSvg = avatarId ? AVATAR_COMPONENTS[avatarId] : null;

  if (!question) {
    router.replace(`/survey/${id}/complete`);
    return null;
  }

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);

    const newScore = score + (isYouth ? question.points : 0);
    setScore(newScore);
    if (isYouth) sessionStorage.setItem(`zibbo_score_${id}`, String(newScore));

    const answers = JSON.parse(sessionStorage.getItem(`zibbo_answers_${id}`) || '{}');
    answers[question.id] = optionId;
    sessionStorage.setItem(`zibbo_answers_${id}`, JSON.stringify(answers));
  }

  function handleNext() {
    if (!answered) return;
    if (isLast) {
      router.push(`/survey/${id}/complete`);
    } else {
      setSelected(null);
      setAnswered(false);
      router.push(`/survey/${id}/question/${num + 1}`);
    }
  }

  if (isYouth) {
    return (
      <YouthQuestionLayout
        surveyId={id}
        num={num}
        totalQuestions={totalQuestions}
        score={score}
        question={question}
        selected={selected}
        answered={answered}
        isLast={isLast}
        avatar={avatar ?? null}
        AvatarSvg={AvatarSvg}
        onSelect={handleSelect}
        onNext={handleNext}
      />
    );
  }

  return (
    <AdultQuestionLayout
      survey={survey}
      num={num}
      totalQuestions={totalQuestions}
      question={question}
      selected={selected}
      answered={answered}
      isLast={isLast}
      onSelect={handleSelect}
      onNext={handleNext}
    />
  );
}

/* ─── Youth layout ─────────────────────────────────────────── */

function YouthQuestionLayout({
  surveyId, num, totalQuestions, score, question, selected, answered, isLast,
  avatar, AvatarSvg, onSelect, onNext,
}: {
  surveyId: string;
  num: number;
  totalQuestions: number;
  score: number;
  question: Question;
  selected: string | null;
  answered: boolean;
  isLast: boolean;
  avatar: typeof AVATARS[0] | null;
  AvatarSvg: React.ComponentType<{ size?: number }> | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen bg-zbg flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-4">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-4">
            {avatar && AvatarSvg ? (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-zpurple/20">
                  <AvatarSvg size={36} />
                </div>
                <span className="font-bold text-zdark/60 text-sm">{avatar.name}</span>
              </div>
            ) : (
              <div className="w-9 h-9 bg-zbg rounded-xl flex items-center justify-center text-xl">🎮</div>
            )}
            <div className="w-7 h-7 bg-gradient-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">Z</span>
            </div>
          </div>
          <ProgressBar current={num} total={totalQuestions} score={score} />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-start px-5 pt-8 pb-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center animate-slide-up">
            <div className="text-4xl mb-3">
              {question.type === 'emoji_rating' ? '😊' : question.type === 'yes_no' ? '🤔' : question.type === 'scale' ? '🔢' : '❓'}
            </div>
            <h2 className="text-2xl font-black text-zdark leading-snug">{question.text}</h2>
          </div>

          <div className={`${question.type === 'emoji_rating' || question.type === 'scale' ? 'flex gap-2 justify-center flex-wrap' : 'space-y-3'} mb-6`}>
            {question.type === 'emoji_rating' && question.options?.map((opt) => (
              <EmojiOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} />
            ))}
            {question.type === 'scale' && question.options?.map((opt) => (
              <ScaleOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} />
            ))}
            {(question.type === 'multiple_choice' || question.type === 'yes_no') && question.options?.map((opt) => (
              <ChoiceOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} />
            ))}
          </div>

          {answered && (
            <div className="bg-zyellow/20 border border-zyellow/40 rounded-2xl px-4 py-3 text-center mb-4 animate-pop">
              <p className="font-black text-zdark text-lg">+{question.points} points! ⭐</p>
              <p className="text-zdark/60 font-semibold text-sm">
                {isLast ? "Last question — you're almost there!" : 'Great job! Keep going!'}
              </p>
            </div>
          )}

          <button
            onClick={onNext}
            disabled={!answered}
            className={`w-full py-5 text-xl font-black rounded-3xl shadow-game btn-game transition-all ${answered ? 'bg-zpurple text-white hover:bg-zpurple-dark' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
          >
            {!answered ? 'Pick an answer' : isLast ? 'Finish! 🎉' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Adult layout ─────────────────────────────────────────── */

function AdultQuestionLayout({
  survey, num, totalQuestions, question, selected, answered, isLast, onSelect, onNext,
}: {
  survey: Survey;
  num: number;
  totalQuestions: number;
  question: Question;
  selected: string | null;
  answered: boolean;
  isLast: boolean;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  const percent = Math.round((num / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-zbg flex flex-col">
      {/* Professional nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">Z</span>
          </div>
          <span className="font-black text-zdark">{survey.title}</span>
        </div>
        <span className="text-sm font-semibold text-zdark/40">
          {num} / {totalQuestions}
        </span>
      </nav>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 px-6 pb-3">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full progress-fill"
            style={{ width: `${percent}%`, backgroundColor: survey.color }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-5 pt-10 pb-8">
        <div className="w-full max-w-lg">
          <div className="mb-8 animate-slide-up">
            <p className="text-xs font-bold text-zdark/40 uppercase tracking-widest mb-3">
              Question {num} of {totalQuestions}
            </p>
            <h2 className="text-xl md:text-2xl font-black text-zdark leading-snug">{question.text}</h2>
          </div>

          {/* Adult answer options */}
          <div className="space-y-2.5 mb-8">
            {question.type === 'emoji_rating' && question.options?.map((opt) => (
              <AdultEmojiOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} />
            ))}
            {question.type === 'scale' && (
              <div>
                <div className="flex gap-2">
                  {question.options?.map((opt) => (
                    <AdultScaleOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} color={survey.color} />
                  ))}
                </div>
                {question.options && question.options.length > 0 && (
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-xs text-zdark/40 font-semibold">{question.options[0].text}</span>
                    <span className="text-xs text-zdark/40 font-semibold">{question.options[question.options.length - 1].text}</span>
                  </div>
                )}
              </div>
            )}
            {(question.type === 'multiple_choice' || question.type === 'yes_no') && question.options?.map((opt) => (
              <AdultChoiceOption key={opt.id} option={opt} isSelected={selected === opt.id} isAnswered={answered} onSelect={() => onSelect(opt.id)} color={survey.color} />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={!answered}
            className={`w-full py-4 text-base font-bold rounded-2xl transition-all ${answered ? 'text-white hover:opacity-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            style={answered ? { backgroundColor: survey.color } : {}}
          >
            {!answered ? 'Select an option to continue' : isLast ? 'Submit →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Youth option components ──────────────────────────────── */

function EmojiOption({ option, isSelected, isAnswered, onSelect }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all answer-option ${isSelected ? 'border-zpurple bg-zpurple/10 scale-110 selected' : isAnswered ? 'border-gray-100 bg-white opacity-40' : 'border-gray-100 bg-white hover:border-zpurple/40'}`}>
      <span className={`transition-all ${isSelected ? 'text-5xl' : 'text-4xl'}`}>{option.emoji}</span>
      <span className={`text-xs font-bold ${isSelected ? 'text-zpurple' : 'text-zdark/60'}`}>{option.text}</span>
      {isSelected && <span className="text-xs font-black text-zpurple">✓</span>}
    </button>
  );
}

function ScaleOption({ option, isSelected, isAnswered, onSelect }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-2xl transition-all answer-option ${isSelected ? 'border-zpurple bg-zpurple text-white scale-110 shadow-lg selected' : isAnswered ? 'border-gray-100 bg-white text-zdark/30' : 'border-gray-100 bg-white text-zdark hover:border-zpurple/40'}`}>
      {option.text}
    </button>
  );
}

function ChoiceOption({ option, isSelected, isAnswered, onSelect }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all answer-option text-left ${isSelected ? 'border-zpurple bg-zpurple/10 selected' : isAnswered ? 'border-gray-100 bg-white opacity-40' : 'border-gray-100 bg-white hover:border-zpurple/30 hover:bg-zpurple/5'}`}>
      {option.emoji && (
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${isSelected ? 'bg-zpurple/20' : 'bg-gray-50'}`}>
          {option.emoji}
        </div>
      )}
      <span className={`font-bold text-lg flex-1 ${isSelected ? 'text-zpurple' : 'text-zdark'}`}>{option.text}</span>
      {isSelected && <div className="w-7 h-7 bg-zpurple rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">✓</div>}
    </button>
  );
}

/* ─── Adult option components ──────────────────────────────── */

function AdultChoiceOption({ option, isSelected, isAnswered, onSelect, color }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void; color: string }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-current' : isAnswered ? 'border-gray-100 bg-white opacity-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
      style={isSelected ? { borderColor: color, backgroundColor: `${color}08` } : {}}>
      {/* Radio circle */}
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'border-current' : 'border-gray-300'}`}
        style={isSelected ? { borderColor: color } : {}}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />}
      </div>
      <span className={`font-semibold text-base ${isSelected ? 'text-zdark' : 'text-zdark/70'}`}>{option.text}</span>
    </button>
  );
}

function AdultEmojiOption({ option, isSelected, isAnswered, onSelect }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-zpurple bg-zpurple/5' : isAnswered ? 'border-gray-100 bg-white opacity-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-zpurple' : 'border-gray-300'}`}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-zpurple" />}
      </div>
      <span className="text-2xl">{option.emoji}</span>
      <span className={`font-semibold text-base ${isSelected ? 'text-zdark' : 'text-zdark/70'}`}>{option.text}</span>
    </button>
  );
}

function AdultScaleOption({ option, isSelected, isAnswered, onSelect, color }: { option: QuestionOption; isSelected: boolean; isAnswered: boolean; onSelect: () => void; color: string }) {
  return (
    <button onClick={onSelect} disabled={isAnswered && !isSelected}
      className={`flex-1 py-4 rounded-xl border-2 font-bold text-lg transition-all ${isAnswered && !isSelected ? 'opacity-40' : ''}`}
      style={isSelected ? { borderColor: color, backgroundColor: color, color: 'white' } : { borderColor: '#E5E7EB', backgroundColor: 'white', color: '#1F2A44' }}>
      {option.id}
    </button>
  );
}
