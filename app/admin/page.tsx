'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { DbSurvey } from '@/types/survey';
import type { AdminDataPayload, LatestResponse } from '@/app/api/admin/data/route';

// ── Types ─────────────────────────────────────────────────────────────────────

type Counts = { total: number; completed: number };
type CountsMap = Record<string, Counts>;

type PageState =
  | { phase: 'checking' }
  | { phase: 'gate' }
  | { phase: 'loading' }
  | { phase: 'error'; msg: string }
  | { phase: 'ready'; surveys: DbSurvey[]; counts: CountsMap; latestResponses: LatestResponse[] };

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [state, setState] = useState<PageState>({ phase: 'checking' });
  const [input, setInput]         = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then(r => {
        if (r.ok) loadData();
        else setState({ phase: 'gate' });
      })
      .catch(() => setState({ phase: 'gate' }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = useCallback(async () => {
    setState({ phase: 'loading' });
    try {
      const res = await fetch('/api/admin/data');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body.error ?? `HTTP ${res.status}`;
        console.error('[Zanmi] /api/admin/data error:', msg);
        setState({ phase: 'error', msg });
        return;
      }
      const data: AdminDataPayload = await res.json();
      setState({
        phase: 'ready',
        surveys: data.surveys,
        counts: data.counts,
        latestResponses: data.latestResponses,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Zanmi] admin load failed:', msg);
      setState({ phase: 'error', msg });
    }
  }, []);

  async function handlePasscodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setPasscodeError(false);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: input.trim() }),
      });
      if (res.ok) {
        setInput('');
        loadData();
      } else {
        console.warn('[Zanmi] admin: incorrect passcode attempt');
        setPasscodeError(true);
        setInput('');
      }
    } catch {
      setPasscodeError(true);
      setInput('');
    } finally {
      setSubmitting(false);
    }
  }

  // ── Checking session ────────────────────────────────────────────────────────

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
                disabled={submitting}
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
              disabled={!input.trim() || submitting}
              className="w-full py-3.5 bg-zpurple text-white font-black rounded-2xl shadow-game-sm hover:bg-zpurple-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Checking…' : 'Enter Dashboard →'}
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
          <p className="text-red-600 font-semibold text-sm font-mono break-all">{state.msg}</p>
          <p className="text-red-500 text-xs font-semibold mt-3">
            If this says &quot;Missing Supabase env&quot; or &quot;Invalid API key&quot;, add{' '}
            <code className="font-mono bg-red-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code>{' '}
            to your <code className="font-mono bg-red-100 px-1 rounded">.env.local</code>{' '}
            (Supabase dashboard → Settings → API → service_role).
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

  const { surveys, counts, latestResponses } = state;
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
        <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100 mb-8">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-black text-zdark mb-2">No surveys yet</h3>
          <p className="text-zdark/50 font-semibold">Surveys you create will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-10">
          {surveys.map(survey => (
            <SurveyRow
              key={survey.id}
              survey={survey}
              counts={counts[survey.id] ?? { total: 0, completed: 0 }}
            />
          ))}
        </div>
      )}

      {/* Latest submissions */}
      <div>
        <h2 className="text-lg font-black text-zdark mb-4">Latest Submissions</h2>
        {latestResponses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-card border border-gray-100">
            <p className="text-zdark/40 font-semibold text-sm">No submissions yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 divide-y divide-gray-50">
            {latestResponses.map(resp => (
              <LatestResponseRow key={resp.id} response={resp} />
            ))}
          </div>
        )}
      </div>
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
        style={{ backgroundColor: survey.color ? `${survey.color}22` : '#7C3AED22' }}
      >
        {survey.emoji ?? '📋'}
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

// ── Latest response row ───────────────────────────────────────────────────────

function LatestResponseRow({ response }: { response: LatestResponse }) {
  const survey = response.surveys;
  const when = new Date(response.started_at).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });

  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="w-8 h-8 rounded-xl bg-zbg flex items-center justify-center text-base flex-shrink-0">
        {response.avatar ?? '👤'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-zdark text-sm truncate">
          {response.respondent_nickname ?? 'Anonymous'}
        </div>
        <div className="text-xs text-zdark/40 font-semibold truncate">
          {survey ? survey.title : 'Unknown survey'} · {when}
        </div>
      </div>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
        response.completed ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
      }`}>
        {response.completed ? 'Completed' : 'Started'}
      </span>
    </div>
  );
}
