'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Question, QuestionType, SurveyAudience } from '@/lib/types';

const QUESTION_TYPES: { type: QuestionType; label: string; icon: string; desc: string }[] = [
  { type: 'emoji_rating', label: 'Emoji Rating', icon: '😊', desc: 'Pick an emoji that matches how they feel' },
  { type: 'multiple_choice', label: 'Multiple Choice', icon: '☑️', desc: 'Choose one answer from several options' },
  { type: 'yes_no', label: 'Yes / No', icon: '👍', desc: 'Simple yes or no question' },
  { type: 'scale', label: 'Number Scale', icon: '🔢', desc: 'Rate from 1 to 5' },
];

const SURVEY_EMOJIS = ['⭐', '🏕️', '💙', '📋', '🎯', '🌈', '🎉', '🔥', '💪', '🤝', '📊', '🌟'];
const SURVEY_COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E8C'];

function defaultOptions(type: QuestionType) {
  switch (type) {
    case 'emoji_rating':
      return [
        { id: 'awful', text: 'Awful', emoji: '😢' },
        { id: 'bad', text: 'Not Great', emoji: '😕' },
        { id: 'okay', text: 'Okay', emoji: '😐' },
        { id: 'good', text: 'Good', emoji: '😊' },
        { id: 'great', text: 'Amazing!', emoji: '🤩' },
      ];
    case 'yes_no':
      return [
        { id: 'yes', text: 'Yes', emoji: '' },
        { id: 'no', text: 'No', emoji: '' },
      ];
    case 'scale':
      return [
        { id: '1', text: '1', emoji: '' },
        { id: '2', text: '2', emoji: '' },
        { id: '3', text: '3', emoji: '' },
        { id: '4', text: '4', emoji: '' },
        { id: '5', text: '5', emoji: '' },
      ];
    default:
      return [
        { id: 'opt1', text: 'Option 1', emoji: '' },
        { id: 'opt2', text: 'Option 2', emoji: '' },
      ];
  }
}

let qCounter = 1;

export default function CreateSurveyPage() {
  const [audience, setAudience] = useState<SurveyAudience | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('⭐');
  const [color, setColor] = useState('#7C3AED');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [addingType, setAddingType] = useState(false);
  const [saved, setSaved] = useState(false);

  function addQuestion(type: QuestionType) {
    const id = `q${qCounter++}`;
    setQuestions((prev) => [...prev, { id, text: '', type, options: defaultOptions(type), required: true, points: audience === 'youth' ? 10 : 0 }]);
    setAddingType(false);
  }

  function updateQuestion(id: string, updates: Partial<Question>) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function updateOption(qId: string, optIdx: number, text: string) {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId || !q.options) return q;
        const opts = [...q.options];
        opts[optIdx] = { ...opts[optIdx], text };
        return { ...q, options: opts };
      })
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Step 1: Choose audience
  if (!audience) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin" className="text-zdark/40 hover:text-zdark transition-colors font-bold">← Dashboard</Link>
          <span className="text-zdark/20">/</span>
          <h1 className="text-2xl font-black text-zdark">Create Survey</h1>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-zdark mb-2">Who is this survey for?</h2>
          <p className="text-zdark/50 font-semibold">Each audience type gets a different survey experience.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Youth option */}
          <button
            onClick={() => setAudience('youth')}
            className="group p-6 bg-white rounded-3xl border-2 border-gray-100 shadow-card text-left hover:border-zpurple hover:shadow-card-hover transition-all card-hover"
          >
            <div className="w-14 h-14 bg-zpurple/10 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:bg-zpurple/20 transition-colors">
              🎮
            </div>
            <h3 className="text-xl font-black text-zdark mb-2">Youth Survey</h3>
            <p className="text-zdark/60 font-semibold text-sm leading-relaxed mb-5">
              For kids and teens in your program. Game-like experience with avatar selection, points, and a playful question flow.
            </p>
            <ul className="space-y-2 text-sm">
              {['Character avatar selection', 'Points & stars earned per answer', 'Big, colorful question cards', 'Confetti celebration at the end'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-zdark/60 font-semibold">
                  <span className="text-zpurple">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <span className="text-sm font-black text-zpurple group-hover:underline">Select Youth →</span>
            </div>
          </button>

          {/* Adult option */}
          <button
            onClick={() => setAudience('adult')}
            className="group p-6 bg-white rounded-3xl border-2 border-gray-100 shadow-card text-left hover:border-zblue hover:shadow-card-hover transition-all card-hover"
          >
            <div className="w-14 h-14 bg-zblue/10 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:bg-zblue/20 transition-colors">
              💼
            </div>
            <h3 className="text-xl font-black text-zdark mb-2">Adult Survey</h3>
            <p className="text-zdark/60 font-semibold text-sm leading-relaxed mb-5">
              For staff, caregivers, teachers, or program partners. Clean, professional layout optimized for clarity and completion.
            </p>
            <ul className="space-y-2 text-sm">
              {['No avatar selection required', 'Clean, professional question layout', 'Simple progress indicator', 'Polished confirmation screen'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-zdark/60 font-semibold">
                  <span className="text-zblue-dark">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <span className="text-sm font-black text-zblue-dark group-hover:underline">Select Adult →</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const isYouth = audience === 'youth';
  const accentColor = isYouth ? '#7C3AED' : '#14B8A6';

  // Step 2: Build the survey
  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark transition-colors font-bold">← Dashboard</Link>
        <span className="text-zdark/20">/</span>
        <button onClick={() => setAudience(null)} className="text-zdark/40 hover:text-zdark transition-colors font-bold">
          Choose Audience
        </button>
        <span className="text-zdark/20">/</span>
        <h1 className="text-xl font-black text-zdark">
          {isYouth ? '🎮 Youth Survey' : '💼 Adult Survey'}
        </h1>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        >
          {isYouth ? 'Game-like experience' : 'Professional layout'}
        </span>
      </div>

      {/* Survey info */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 mb-6">
        <h2 className="font-black text-zdark mb-5">Survey Details</h2>

        <div className="flex gap-4 mb-5 flex-wrap">
          <div>
            <label className="text-sm font-bold text-zdark/60 block mb-2">Icon</label>
            <div className="flex gap-2 flex-wrap">
              {SURVEY_EMOJIS.map((e) => (
                <button key={e} onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-xl text-xl transition-all ${emoji === e ? 'ring-2 ring-offset-1 scale-110' : 'bg-gray-50 hover:bg-gray-100'}`}
                  style={emoji === e ? { backgroundColor: `${accentColor}20`, outline: `2px solid ${accentColor}` } : {}}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-zdark/60 block mb-2">Color</label>
            <div className="flex gap-2">
              {SURVEY_COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-xl transition-all ${color === c ? 'ring-2 ring-zdark ring-offset-2 scale-110' : ''}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* Preview badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white font-bold text-sm mb-5" style={{ backgroundColor: color }}>
          {emoji} {title || 'Survey Title'}
          <span className="opacity-60 text-xs">· {isYouth ? '🎮 Youth' : '💼 Adult'}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-zdark/60 block mb-1.5">Survey Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={isYouth ? 'e.g. How Was Your Week?' : 'e.g. Staff Experience Survey'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-zpurple outline-none font-semibold text-zdark transition-colors"/>
          </div>
          <div>
            <label className="text-sm font-bold text-zdark/60 block mb-1.5">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder={isYouth ? 'A fun description for kids' : 'What this survey is about and why it matters'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-zpurple outline-none font-semibold text-zdark transition-colors"/>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-zdark text-xl">Questions ({questions.length})</h2>
          {isYouth && <span className="text-sm text-zdark/40 font-semibold">10 pts per question</span>}
        </div>

        {questions.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-gray-200 text-center">
            <div className="text-4xl mb-3">❓</div>
            <p className="font-bold text-zdark/50">No questions yet. Add your first one below!</p>
          </div>
        )}

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-3xl p-5 shadow-card border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: accentColor }}>
                  {idx + 1}
                </div>
                <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                  {QUESTION_TYPES.find((t) => t.type === q.type)?.icon}{' '}
                  {QUESTION_TYPES.find((t) => t.type === q.type)?.label}
                </span>
                <button onClick={() => removeQuestion(q.id)} className="ml-auto text-sm font-bold text-red-400 hover:text-red-600 transition-colors">
                  Remove
                </button>
              </div>

              <input type="text" value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                placeholder="Type your question here..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-zpurple outline-none font-bold text-zdark mb-4 transition-colors"/>

              {q.options && q.type === 'multiple_choice' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zdark/40 uppercase tracking-wider">Options</p>
                  {q.options.map((opt, oi) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      {opt.emoji && <span className="text-lg">{opt.emoji}</span>}
                      <input type="text" value={opt.text} onChange={(e) => updateOption(q.id, oi, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-zpurple outline-none text-sm font-semibold text-zdark transition-colors"/>
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'emoji_rating' && (
                <div className="flex gap-3 justify-center mt-2 flex-wrap">
                  {q.options?.map((opt) => (
                    <div key={opt.id} className="text-center">
                      <div className="text-3xl mb-1">{opt.emoji}</div>
                      <div className="text-xs font-semibold text-zdark/50">{opt.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {q.type === 'yes_no' && (
                <div className="flex gap-4 justify-center mt-2">
                  {q.options?.map((opt) => (
                    <div key={opt.id} className="px-6 py-3 bg-gray-50 rounded-xl font-bold text-zdark text-sm">{opt.text}</div>
                  ))}
                </div>
              )}

              {q.type === 'scale' && (
                <div className="flex gap-2 justify-center mt-2">
                  {q.options?.map((opt) => (
                    <div key={opt.id} className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-xl text-zdark">{opt.text}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add question */}
      {!addingType ? (
        <button onClick={() => setAddingType(true)}
          className="w-full py-4 border-2 border-dashed rounded-3xl font-bold hover:opacity-80 transition-colors mb-8"
          style={{ borderColor: `${accentColor}50`, color: accentColor }}>
          + Add Question
        </button>
      ) : (
        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-zdark">Choose question type</h3>
            <button onClick={() => setAddingType(false)} className="text-zdark/40 hover:text-zdark font-bold">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUESTION_TYPES.map((qt) => (
              <button key={qt.type} onClick={() => addQuestion(qt.type)}
                className="flex items-start gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-zpurple hover:bg-zpurple/5 transition-all text-left">
                <span className="text-2xl">{qt.icon}</span>
                <div>
                  <p className="font-bold text-zdark text-sm">{qt.label}</p>
                  <p className="text-xs text-zdark/50 font-semibold">{qt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button onClick={handleSave} disabled={!title || questions.length === 0}
          className="flex-1 py-4 text-white font-black rounded-2xl shadow-game hover:opacity-90 transition-all btn-game disabled:opacity-40 disabled:cursor-not-allowed text-lg"
          style={{ backgroundColor: accentColor }}>
          {saved ? '✅ Saved!' : '💾 Save Survey'}
        </button>
        <Link href={questions.length > 0 ? '/survey/survey-1' : '#'}
          className="px-6 py-4 border-2 border-gray-200 text-zdark/60 font-bold rounded-2xl hover:border-zpurple hover:text-zpurple transition-all">
          Preview
        </Link>
      </div>

      {!title && (
        <p className="text-center text-sm text-zdark/40 font-semibold mt-3">Add a title and at least one question to save</p>
      )}
    </div>
  );
}
