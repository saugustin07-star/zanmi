'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { DbSurvey, DbQuestion, DbSurveyResponse, DbAnswer } from '@/types/survey';

// ── Types ──────────────────────────────────────────────────────────────────────

type LoadState =
  | { phase: 'loading' }
  | { phase: 'error'; msg: string }
  | {
      phase: 'ready';
      survey: DbSurvey;
      questions: DbQuestion[];
      responses: DbSurveyResponse[];
      answers: DbAnswer[];
    };

const BAR_COLORS = ['#7C3AED', '#14B8A6', '#F97316', '#FF7043', '#4CAF50', '#E91E63', '#607D8B'];
const IS_DEV = process.env.NODE_ENV === 'development';

// ── Page ───────────────────────────────────────────────────────────────────────

export default function SurveyResultsPage() {
  const params  = useParams();
  const id      = typeof params.id === 'string' ? params.id : String(params.id ?? '');
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  const load = useCallback(async () => {
    if (!id) {
      setState({ phase: 'error', msg: 'No survey ID in route params.' });
      return;
    }
    setState({ phase: 'loading' });

    // 1. Survey row
    console.log('[Zanmi] results: fetching survey', id);
    const { data: surveyData, error: surveyErr } = await supabase
      .from('surveys')
      .select('*')
      .eq('id', id)
      .single();

    if (surveyErr || !surveyData) {
      const msg = surveyErr?.message ?? 'Survey not found.';
      console.error('[Zanmi] results: survey fetch failed:', JSON.stringify(surveyErr, null, 2));
      setState({ phase: 'error', msg: `Survey query failed: ${msg}` });
      return;
    }

    // 2. Questions
    console.log('[Zanmi] results: fetching questions for survey', id);
    const { data: questionsData, error: questionsErr } = await supabase
      .from('questions')
      .select('*')
      .eq('survey_id', id)
      .order('order_index');

    if (questionsErr) {
      console.error('[Zanmi] results: questions fetch failed:', JSON.stringify(questionsErr, null, 2));
    }

    // 3. Responses
    console.log('[Zanmi] results: fetching responses for survey', id);
    const { data: responsesData, error: responsesErr } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('survey_id', id)
      .order('created_at', { ascending: false });

    if (responsesErr) {
      console.error('[Zanmi] results: responses fetch failed:', JSON.stringify(responsesErr, null, 2));
    }

    const responses = (responsesData ?? []) as DbSurveyResponse[];

    // 4. Answers (only if there are responses)
    let answers: DbAnswer[] = [];
    if (responses.length > 0) {
      const responseIds = responses.map(r => r.id);
      console.log('[Zanmi] results: fetching answers for', responseIds.length, 'response(s)');
      const { data: answersData, error: answersErr } = await supabase
        .from('answers')
        .select('*')
        .in('response_id', responseIds);

      if (answersErr) {
        console.error('[Zanmi] results: answers fetch failed:', JSON.stringify(answersErr, null, 2));
      }
      answers = (answersData ?? []) as DbAnswer[];
    }

    console.log('[Zanmi] results: loaded — questions:', questionsData?.length ?? 0,
      '| responses:', responses.length, '| answers:', answers.length);

    setState({
      phase: 'ready',
      survey:    surveyData as DbSurvey,
      questions: ((questionsData ?? []) as DbQuestion[]).sort((a, b) => a.order_index - b.order_index),
      responses,
      answers,
    });
  }, [id]);

  useEffect(() => { load(); }, [load]);

  // ── Loading ────────────────────────────────────────────────────────────────

  if (state.phase === 'loading') {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <BackLink label="Dashboard" href="/admin" />
        <div className="animate-pulse space-y-4 mt-6">
          <div className="h-14 w-14 bg-gray-200 rounded-2xl" />
          <div className="h-7 w-64 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[0, 1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
          </div>
          {[0, 1].map(i => <div key={i} className="h-32 bg-gray-100 rounded-3xl" />)}
        </div>
        <p className="text-zdark/40 font-semibold text-sm mt-4">Loading results…</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (state.phase === 'error') {
    return (
      <div className="p-6 md:p-8 max-w-3xl">
        <BackLink label="Dashboard" href="/admin" />
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-black text-red-700 text-lg mb-2">Error loading results</h2>
          <p className="text-red-600 font-semibold text-sm font-mono break-all">{state.msg}</p>
          <p className="text-red-400 text-xs font-semibold mt-3">
            Check the browser console for the full Supabase error. This is often an RLS policy blocking SELECT.
          </p>
          <button
            onClick={load}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        </div>
        {IS_DEV && <DevDebug id={id} />}
      </div>
    );
  }

  // ── Ready ──────────────────────────────────────────────────────────────────

  const { survey, questions, responses, answers } = state;
  const started   = responses.length;
  const completed = responses.filter(r => r.completed).length;
  const rate      = started > 0 ? Math.round((completed / started) * 100) : 0;

  return (
    <div className="p-6 md:p-8 max-w-3xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/admin" className="text-zdark/40 hover:text-zdark font-bold transition-colors">
          Dashboard
        </Link>
        <span className="text-zdark/20">/</span>
        <span className="font-bold text-zdark/60 truncate">{survey.title}</span>
      </div>

      {/* Survey header — always visible */}
      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ backgroundColor: survey.color ? `${survey.color}22` : '#7C3AED22' }}
        >
          {survey.emoji ?? '📋'}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-zdark">{survey.title}</h1>
          {survey.description && (
            <p className="text-zdark/50 font-semibold text-sm mt-0.5">{survey.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              survey.status === 'published' ? 'bg-green-50 text-green-700' :
              survey.status === 'archived'  ? 'bg-amber-50 text-amber-700' :
                                              'bg-gray-100 text-gray-500'
            }`}>{survey.status}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zpurple/10 text-zpurple">
              {survey.audience_type}
            </span>
          </div>
        </div>
        {survey.public_slug && (
          <Link
            href={`/s/${survey.public_slug}`}
            target="_blank"
            className="flex-shrink-0 px-4 py-2 text-sm font-bold text-zpurple bg-zpurple/10 rounded-xl hover:bg-zpurple/20 transition-colors"
          >
            Open Survey ↗
          </Link>
        )}
      </div>

      {/* Dev debug panel */}
      {IS_DEV && (
        <DevDebug
          id={id}
          questions={questions.length}
          responses={responses.length}
          answers={answers.length}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Started',         value: started,    icon: '👥' },
          { label: 'Completed',       value: completed,  icon: '✅' },
          { label: 'Completion Rate', value: `${rate}%`, icon: '📊' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-zdark">{s.value}</div>
            <div className="text-xs text-zdark/50 font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* No responses */}
      {started === 0 && (
        <div className="bg-white rounded-3xl p-10 shadow-card border border-gray-100">
          <p className="text-zdark/60 font-semibold text-center leading-relaxed">
            No responses yet. Once students complete this survey, results will appear here.
          </p>
          {survey.public_slug && (
            <div className="text-center mt-5">
              <Link
                href={`/s/${survey.public_slug}`}
                target="_blank"
                className="inline-block px-6 py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all text-sm"
              >
                Open Survey Link ↗
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Per-question results */}
      {started > 0 && questions.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-bold text-amber-800 text-sm">
            {responses.length} response{responses.length !== 1 ? 's' : ''} found, but no questions were returned for this survey.
            Check that questions exist in the database with <code className="font-mono">survey_id = {id}</code>.
          </p>
        </div>
      )}

      {started > 0 && questions.length > 0 && (
        <div className="space-y-5">
          {questions.map((question, qi) => (
            <QuestionResult
              key={question.id}
              question={question}
              index={qi}
              answers={answers.filter(a => a.question_id === question.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Dev debug panel ────────────────────────────────────────────────────────────

function DevDebug({
  id,
  questions,
  responses,
  answers,
}: {
  id: string;
  questions?: number;
  responses?: number;
  answers?: number;
}) {
  return (
    <div className="mb-6 bg-slate-900 text-green-400 rounded-2xl p-4 font-mono text-xs space-y-1">
      <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Dev Debug</p>
      <p>surveyId: <span className="text-white">{id || '(empty)'}</span></p>
      {questions  !== undefined && <p>questions loaded:  <span className="text-white">{questions}</span></p>}
      {responses  !== undefined && <p>responses loaded:  <span className="text-white">{responses}</span></p>}
      {answers    !== undefined && <p>answers loaded:    <span className="text-white">{answers}</span></p>}
      <p className="text-slate-500 pt-1">Queries: surveys·id → questions·survey_id → survey_responses·survey_id → answers·response_id[]</p>
    </div>
  );
}

// ── Back link ─────────────────────────────────────────────────────────────────

function BackLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="text-zdark/40 hover:text-zdark font-bold text-sm transition-colors">
      ← {label}
    </Link>
  );
}

// ── Question result card ───────────────────────────────────────────────────────

function QuestionResult({
  question,
  index,
  answers,
}: {
  question: DbQuestion;
  index: number;
  answers: DbAnswer[];
}) {
  const { question_type } = question;
  const total = answers.length;

  if (total === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={0} />
        <p className="text-zdark/30 font-semibold text-sm italic mt-3">No responses for this question.</p>
      </div>
    );
  }

  // Free-text
  if (question_type === 'short_answer' || question_type === 'long_answer') {
    const texts = answers.map(a => (a.answer_value ?? '').trim()).filter(Boolean);
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={total} />
        <div className="space-y-2 mt-4">
          {texts.length === 0
            ? <p className="text-zdark/30 font-semibold text-sm italic">No text responses recorded.</p>
            : texts.map((text, i) => (
                <div key={i} className="bg-zbg rounded-xl px-4 py-3 text-sm font-semibold text-zdark leading-relaxed">
                  {text}
                </div>
              ))
          }
        </div>
      </div>
    );
  }

  // Choice / scale / yes_no
  const counts: Record<string, number> = {};
  for (const a of answers) {
    const val = (a.answer_value ?? '').trim();
    if (val) counts[val] = (counts[val] ?? 0) + 1;
  }

  let entries: [string, number][];
  if (question_type === 'yes_no') {
    const order = ['yes', 'no'];
    entries = order.filter(k => k in counts).map(k => [k, counts[k]] as [string, number]);
    for (const [k, v] of Object.entries(counts)) {
      if (!order.includes(k)) entries.push([k, v]);
    }
  } else {
    entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }

  // Numeric average — only when values are actually numeric (e.g. 1–5 scale)
  let avg: number | null = null;
  if (question_type === 'rating_scale' || question_type === 'scale') {
    const nums = answers
      .map(a => parseFloat((a.answer_value ?? '').trim()))
      .filter(n => Number.isFinite(n));
    if (nums.length > 0) avg = nums.reduce((s, n) => s + n, 0) / nums.length;
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
        <QuestionHeader question={question} index={index} total={total} />
        <p className="text-zdark/30 font-semibold text-sm italic mt-3">No answer values recorded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
      <QuestionHeader question={question} index={index} total={total} avg={avg} />
      <div className="space-y-3 mt-4">
        {entries.map(([label, count], ai) => {
          const pct = Math.round((count / total) * 100);
          const displayLabel =
            question_type === 'yes_no'
              ? label === 'yes' ? '👍 Yes' : label === 'no' ? '👎 No' : label
              : label;
          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-zdark">{displayLabel}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zdark/40 font-semibold">{count} resp.</span>
                  <span className="text-sm font-black text-zdark w-10 text-right">{pct}%</span>
                </div>
              </div>
              <div className="w-full h-7 bg-gray-50 rounded-xl overflow-hidden">
                <div
                  className="h-full rounded-xl flex items-center px-3 transition-all"
                  style={{
                    width: `${Math.max(pct, 0)}%`,
                    backgroundColor: BAR_COLORS[ai % BAR_COLORS.length],
                    minWidth: pct > 0 ? '2rem' : '0',
                  }}
                >
                  {pct >= 12 && <span className="text-white font-black text-xs">{pct}%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Question header ────────────────────────────────────────────────────────────

function QuestionHeader({
  question,
  index,
  total,
  avg,
}: {
  question: DbQuestion;
  index: number;
  total: number;
  avg?: number | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-zpurple rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-zdark leading-snug">
          {question.question_text || <span className="text-zdark/30 italic font-semibold">Question text missing</span>}
        </h3>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-xs text-zdark/40 font-semibold">
            {total} response{total !== 1 ? 's' : ''}
          </span>
          {avg != null && (
            <span className="text-xs font-bold bg-zpurple/10 text-zpurple px-2 py-0.5 rounded-full">
              avg {avg.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
