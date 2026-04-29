'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import type { DbSurvey } from '@/types/survey';

// ── Types ─────────────────────────────────────────────────────────────────────

type Counts = { total: number; completed: number };
type CountsMap = Record<string, Counts>;

type PageState =
  | { phase: 'checking' }           // reading sessionStorage
  | { phase: 'gate' }               // waiting for passcode
  | { phase: 'loading' }            // fetching data from Supabase
  | { phase: 'error'; msg: string } // data fetch failed
  | { phase: 'ready'; surveys: DbSurvey[]; counts: CountsMap };

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [state, setState] = useState<PageState>({ phase: 'checking' });
  const [input, setInput]         = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const passcode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? '';
  const passcodeConfigured = passcode.length > 0;

  // On mount: check sessionStorage for existing auth
  useEffect(() => {
    const ok = sessionStorage.getItem('zanmi_admin_v1') === 'ok';
    if (ok) {
      loadData();
    } else {
      setState({ phase: 'gate' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = useCallback(async () => {
    setState({ phase: 'loading' });

    try {
      console.log('[Zanmi] admin: fetching surveys…');
      const { data: surveysData, error: surveysErr } = await supabase
        .from('surveys')
        .select('*')
        .order('created_at', { ascending: false });

      if (surveysErr) {
        console.error('[Zanmi] surveys fetch error:', JSON.stringify(surveysErr, null, 2));
        setState({ phase: 'error', msg: surveysErr.message || JSON.stringify(surveysErr) });
        return;
      }

      console.log('[Zanmi] admin: fetching response counts…');
      const { data: responsesData, error: responsesErr } = await supabase
        .from('survey_responses')
        .select('survey_id, completed');

      if (responsesErr) {
        // Non-fatal — show surveys without counts
        console.error('[Zanmi] response counts fetch error:', JSON.stringify(responsesErr, null, 2));
      }

      const counts: CountsMap = {};
      for (const row of (responsesData ?? []) as Array<{ survey_id: string; completed: boolean }>) {
        if (!counts[row.survey_id]) counts[row.survey_id] = { total: 0, completed: 0 };
        counts[row.survey_id].total++;
        if (row.completed) counts[row.survey_id].completed++;
      }

      console.log('[Zanmi] admin: loaded', surveysData?.length ?? 0, 'surveys');
      setState({ phase: 'ready', surveys: surveysData ?? [], counts });
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.error('[Zanmi] admin load failed:', msg);
      setState({ phase: 'error', msg });
    }
  }, []);

  function handlePasscodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === passcode) {
      sessionStorage.setItem('zanmi_admin_v1', 'ok');
      setPasscodeError(false);
      loadData();
    } else {
      console.warn('[Zanmi] admin: incorrect passcode attempt');
      setPasscodeError(true);
      setInput('');
    }
  }

  // ── Checking sessionStorage ─────────────────────────────────────────────────

  if (state.phase === 'checking') {
    return <div className="min-h-screen bg-zbg" />;
  }

  // ── Passcode gate ───────────────────────────────────────────────────────────

  if (state.phase === 'gate') {
    return (
      <div className="min-h-screen bg-zbg flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image src="/zanmi-icon.png" alt="Zanmi" width={48} height={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-black text-zdark">Admin Access</h1>
            <p className="text-zdark/50 font-semibold text-sm mt-1">
              Enter your admin passcode to continue.
            </p>
          </div>

          {!passcodeConfigured && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
              <p className="text-amber-800 font-bold text-sm">
                ⚠️ <code className="font-mono">NEXT_PUBLIC_ADMIN_PASSCODE</code> is not set.
              </p>
              <p className="text-amber-700 font-semibold text-xs mt-1">
                Add this environment variable in your Vercel project settings, then redeploy.
              </p>
            </div>
          )}

          <form
            onSubmit={handlePasscodeSubmit}
            className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 space-y-4"
          >
            <div>
              <label className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setPasscodeError(false); }}
                placeholder="Enter passcode…"
                autoFocus
                disabled={!passcodeConfigured}
                className={`w-full px-4 py-3 rounded-2xl border-2 outline-none font-semibold text-zdark transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  passcodeError
                    ? 'border-red-400 bg-red-50 placeholder:text-red-300'
                    : 'border-zdark/10 focus:border-zpurple placeholder:text-zdark/30'
                }`}
              />
              {passcodeError && (
                <p className="text-red-500 font-semibold text-xs mt-2">Incorrect passcode. Try again.</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || !passcodeConfigured}
              className="w-full py-3.5 bg-zpurple text-white font-black rounded-2xl shadow-game-sm hover:bg-zpurple-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Enter Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Loading ─────────────────────────────────────────────────────────────────

  if (state.phase === 'loading') {
    return (
      <div className="p-6 md:p-8 max-w-5xl animate-pulse">
        <div className="h-8 w-40 bg-gray-200 rounded-xl mb-2" />
        <div className="h-4 w-64 bg-gray-100 rounded-xl mb-8" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl" />)}
        </div>
        {[0, 1, 2].map(i => <div key={i} className="h-16 bg-gray-100 rounded-2xl mb-3" />)}
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────

  if (state.phase === 'error') {
    return (
      <div className="p-6 md:p-8 max-w-5xl">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-black text-red-700 text-lg mb-2">Failed to load dashboard</h2>
          <p className="text-red-600 font-semibold text-sm font-mono">{state.msg}</p>
          <p className="text-red-500 text-xs font-semibold mt-3">
            This is likely a Supabase RLS policy or connection issue. Check the browser console for the full error.
          </p>
          <button
            onClick={loadData}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── Ready ───────────────────────────────────────────────────────────────────

  const { surveys, counts } = state;
  const totalResponses = Object.values(counts).reduce((s, c) => s + c.total, 0);
  const totalCompleted = Object.values(counts).reduce((s, c) => s + c.completed, 0);

  return (
    <div className="p-6 md:p-8 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-zdark">Surveys</h1>
        <p className="text-zdark/50 font-semibold mt-1 text-sm">
          {surveys.length} survey{surveys.length !== 1 ? 's' : ''} · {totalCompleted} completed response{totalCompleted !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Surveys',   value: surveys.length, icon: '📋', accent: 'text-zpurple bg-zpurple/10' },
          { label: 'Total Responses', value: totalResponses, icon: '👥', accent: 'text-zteal bg-zteal/10'    },
          { label: 'Completed',       value: totalCompleted, icon: '✅', accent: 'text-zorange bg-zorange/10' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3 ${card.accent}`}>
              {card.icon}
            </div>
            <div className="text-2xl font-black text-zdark">{card.value}</div>
            <div className="text-xs font-bold text-zdark/50 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Survey list */}
      {surveys.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-zdark mb-2">No surveys yet</h3>
          <p className="text-zdark/50 font-semibold">Surveys you create will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {surveys.map(survey => (
            <SurveyRow
              key={survey.id}
              survey={survey}
              counts={counts[survey.id] ?? { total: 0, completed: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Survey row ────────────────────────────────────────────────────────────────

function SurveyRow({ survey, counts }: { survey: DbSurvey; counts: Counts }) {
  const statusStyle =
    survey.status === 'published' ? 'bg-green-50 text-green-700' :
    survey.status === 'archived'  ? 'bg-amber-50 text-amber-700' :
                                    'bg-gray-100 text-gray-500';

  const audienceStyle =
    survey.audience_type === 'student' ? 'bg-zpurple/10 text-zpurple' : 'bg-zteal/10 text-zteal';

  const created = new Date(survey.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${survey.color}22` }}
      >
        {survey.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-black text-zdark text-sm">{survey.title}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle}`}>
            {survey.status}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${audienceStyle}`}>
            {survey.audience_type}
          </span>
        </div>
        <div className="text-xs text-zdark/40 font-semibold">
          Created {created}
          {counts.total > 0
            ? <> · {counts.total} started · {counts.completed} completed</>
            : <> · No responses yet</>
          }
        </div>
      </div>

      {survey.public_slug && (
        <Link
          href={`/s/${survey.public_slug}`}
          target="_blank"
          className="text-xs font-bold text-zdark/40 hover:text-zdark px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors flex-shrink-0"
        >
          Preview ↗
        </Link>
      )}

      <Link
        href={`/admin/surveys/${survey.id}`}
        className="flex-shrink-0 px-4 py-2 bg-zpurple text-white font-bold text-xs rounded-xl hover:bg-zpurple-dark transition-colors shadow-game-sm"
      >
        View Results
      </Link>
    </div>
  );
}
