'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  organization: string;
  interest: string;
  organization_type: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', organization: '', interest: '', organization_type: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const waitlistRef         = useRef<HTMLElement>(null);

  function scrollToWaitlist(preselect?: string) {
    if (preselect) setForm(f => ({ ...f, interest: preselect }));
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setField(key: keyof FormData, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.interest) e.interest = 'Please select an option.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inputBase = 'w-full px-4 py-3 rounded-2xl border-2 outline-none font-semibold text-zdark transition-colors placeholder:text-zdark/30';
  const inputOk   = 'border-zdark/10 focus:border-zteal bg-white';
  const inputErr  = 'border-red-400 bg-red-50';

  return (
    <div className="min-h-screen bg-white font-sans text-zdark">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Image src="/zanmi-logo.png" alt="Zanmi" width={120} height={36} className="h-9 w-auto" />
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "Who It's For", href: '#who'      },
              { label: 'Features',     href: '#solution'  },
              { label: 'Pilot',        href: '#pilot'     },
            ].map(l => (
              <a key={l.href} href={l.href} className="text-zdark/50 hover:text-zdark font-semibold text-sm transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => scrollToWaitlist()}
            className="px-5 py-2.5 bg-zpurple text-white font-bold text-sm rounded-xl shadow-game-sm hover:bg-zpurple-dark transition-all"
          >
            Join the Waitlist
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-zbg pt-20 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-zteal/10 text-zteal font-bold text-sm px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-zorange rounded-full" />
            Pilot cohort opening August 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zdark leading-tight mb-6">
            Turn surveys into experiences<br className="hidden sm:block" />{' '}
            kids <span className="text-zorange">actually want</span> to complete
          </h1>
          <p className="text-lg md:text-xl text-zdark/60 font-semibold max-w-2xl mx-auto mb-10 leading-relaxed">
            Zanmi is a simple, powerful survey tool for schools and youth organizations, designed to boost engagement and help you get better data from both students and adults.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => scrollToWaitlist()}
              className="w-full sm:w-auto px-8 py-4 bg-zpurple text-white font-black text-lg rounded-2xl shadow-game hover:bg-zpurple-dark hover:shadow-game-sm transition-all"
            >
              Join the Waitlist
            </button>
            <Link
              href="/demo"
              className="w-full sm:w-auto px-8 py-4 border-2 border-zdark/20 text-zdark font-black text-lg rounded-2xl hover:border-zpurple hover:text-zpurple transition-all text-center"
            >
              See Demo →
            </Link>
          </div>
          <p className="text-zdark/40 font-semibold text-sm">
            Pilot cohort opening August 2026 · Limited spots
          </p>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section id="who" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-zdark text-center mb-12">
            Built for the people doing the work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden bg-zbg rounded-3xl p-8 border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zorange" />
              <div className="w-12 h-12 bg-zpurple/10 rounded-2xl flex items-center justify-center text-2xl mb-5">🏫</div>
              <h3 className="text-xl font-black text-zdark mb-3">For Schools &amp; Youth Organizations</h3>
              <p className="text-zdark/60 font-semibold leading-relaxed">
                Run surveys that students actually finish. Whether it's program feedback, climate surveys, or research studies, Zanmi helps you collect higher-quality responses with less effort.
              </p>
            </div>
            <div className="relative overflow-hidden bg-zbg rounded-3xl p-8 border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zteal" />
              <div className="w-12 h-12 bg-zteal/10 rounded-2xl flex items-center justify-center text-2xl mb-5">📊</div>
              <h3 className="text-xl font-black text-zdark mb-3">For Researchers &amp; Program Teams</h3>
              <p className="text-zdark/60 font-semibold leading-relaxed">
                No research background required. Build surveys, track responses, and get clear insights without complicated tools or low response rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zdark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-1 bg-zteal rounded-full mx-auto mb-7" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Let's be honest about surveys
          </h2>
          <p className="text-white/70 font-semibold text-lg leading-relaxed mb-6">
            Most students rush through surveys, skip questions, or don't take them seriously. That means incomplete data, unreliable insights, and missed opportunities to improve programs.
          </p>
          <p className="text-white/70 font-semibold text-lg leading-relaxed">
            And for staff? Survey tools are often clunky, time-consuming, and hard to use without a research background.
          </p>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section id="solution" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-zdark text-center mb-12">
            Zanmi changes the experience
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: '✨', bg: 'bg-zpurple/10', accent: 'bg-zpurple', title: 'Designed for engagement',           body: 'Interactive, student-friendly experiences that increase completion and attention.' },
              { icon: '⚡', bg: 'bg-zteal/10',   accent: 'bg-zteal',   title: 'Built for real-world use',           body: 'Create surveys in minutes with a workflow that feels simple, clear, and approachable.' },
              { icon: '🎯', bg: 'bg-zorange/10', accent: 'bg-zorange', title: 'Youth + adult surveys in one place', body: 'Gamified for students, streamlined for adults, and flexible enough for different program needs.' },
              { icon: '📈', bg: 'bg-zpurple/10', accent: 'bg-zpurple', title: 'Clear, usable insights',             body: "See what's working, what needs attention, and where your organization can improve." },
            ].map(f => (
              <div key={f.title} className="relative overflow-hidden bg-zbg rounded-3xl p-7 border border-gray-100 shadow-card">
                <div className={`absolute top-0 left-0 right-0 h-1 ${f.accent}`} />
                <div className={`w-11 h-11 ${f.bg} rounded-2xl flex items-center justify-center text-xl mb-4`}>{f.icon}</div>
                <h3 className="font-black text-zdark text-lg mb-2">{f.title}</h3>
                <p className="text-zdark/60 font-semibold leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zbg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-zdark text-center mb-3">
            A quick look at Zanmi
          </h2>
          <p className="text-center text-zdark/60 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
            From student-friendly surveys to clean, actionable dashboards, Zanmi is built to make data collection easier and more effective.
          </p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Student survey */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zpurple" />
              <p className="text-xs font-black text-zpurple uppercase tracking-widest mb-5">Student Survey Experience</p>
              <div className="bg-zbg rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-zpurple rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0">1</div>
                  <div className="flex-1 h-1.5 bg-zdark/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-zpurple rounded-full" />
                  </div>
                </div>
                <p className="font-black text-zdark text-sm mb-4 leading-snug">How do you feel about coming here?</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: '😊 Great',     active: true  },
                    { label: '😐 Okay',      active: false },
                    { label: '😔 Not great', active: false },
                  ].map(opt => (
                    <div key={opt.label} className={`px-3 py-2 rounded-xl text-xs font-bold border-2 ${opt.active ? 'border-zpurple bg-zpurple/10 text-zpurple' : 'border-gray-200 text-zdark/40'}`}>
                      {opt.label}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs font-bold text-zdark/30 text-right">Question 2 of 5</p>
            </div>

            {/* Adult survey */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zteal" />
              <p className="text-xs font-black text-zteal uppercase tracking-widest mb-5">Adult Survey Experience</p>
              <div className="space-y-3">
                <div className="bg-zbg rounded-2xl p-4">
                  <p className="text-xs font-bold text-zdark/50 mb-3">How effective was the session?</p>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <div key={n} className={`flex-1 h-9 rounded-xl flex items-center justify-center text-xs font-black ${n <= 4 ? 'bg-zteal text-white' : 'bg-gray-100 text-zdark/30'}`}>{n}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-zbg rounded-2xl p-4">
                  <p className="text-xs font-bold text-zdark/50 mb-2">Any additional feedback?</p>
                  <div className="h-12 bg-white rounded-xl border-2 border-gray-200" />
                </div>
                <div className="bg-zbg rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-4 h-4 rounded border-2 border-zteal bg-zteal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black leading-none">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-zdark/60">Would recommend this program</p>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zorange" />
              <p className="text-xs font-black text-zorange uppercase tracking-widest mb-5">Admin Dashboard</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zdark/40">Total Responses</span>
                  <span className="text-lg font-black text-zdark">24</span>
                </div>
                <div className="h-px bg-gray-100" />
                {[
                  { label: '😊 Great',     pct: 58, color: 'bg-zpurple' },
                  { label: '😐 Okay',      pct: 29, color: 'bg-zteal'   },
                  { label: '😔 Not great', pct: 13, color: 'bg-zorange'  },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-bold text-zdark/60">{b.label}</span>
                      <span className="text-xs font-black text-zdark">{b.pct}%</span>
                    </div>
                    <div className="h-5 bg-gray-100 rounded-xl overflow-hidden">
                      <div className={`h-full ${b.color} rounded-xl`} style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOUNDER CREDIBILITY ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zbg rounded-3xl p-10 border border-gray-100" style={{ borderLeft: '4px solid #14B8A6' }}>
            <h2 className="text-2xl md:text-3xl font-black text-zdark mb-6">
              Built by someone who understands the work
            </h2>
            <p className="text-zdark/60 font-semibold leading-relaxed mb-5">
              Zanmi was created by a research and program evaluation leader with 10+ years of experience working with schools, nonprofits, and national education organizations.
            </p>
            <p className="text-zdark/60 font-semibold leading-relaxed mb-5">
              After supporting hundreds of studies and surveys, one thing was clear: engagement is one of the biggest barriers to getting meaningful data — especially with students.
            </p>
            <p className="text-zorange font-black text-lg">Zanmi was built to fix that.</p>
          </div>
        </div>
      </section>

      {/* ── PILOT ────────────────────────────────────────────────────────── */}
      <section id="pilot" className="py-20 px-6 bg-zdark">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-1 bg-zteal rounded-full mx-auto mb-7" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
            Join the first Zanmi pilot cohort
          </h2>
          <p className="text-white/80 font-semibold text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            We're partnering with a small group of schools and organizations to test and shape Zanmi before full launch.
          </p>
          <div className="bg-white/10 rounded-2xl p-6 mb-10 text-left max-w-md mx-auto">
            {[
              'Early access to the platform',
              'Ability to run real surveys with your students or community',
              'Direct input into product features',
              'Dedicated support during your pilot',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 mb-3 last:mb-0">
                <span className="text-zorange font-black mt-0.5 flex-shrink-0">✓</span>
                <span className="text-white font-semibold text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToWaitlist('Joining the pilot')}
            className="px-8 py-4 bg-zorange text-white font-black text-lg rounded-2xl shadow-game hover:bg-zorange/90 hover:shadow-game-sm transition-all"
          >
            Apply for the Pilot
          </button>
          <p className="text-white/50 font-semibold text-sm mt-5">
            Pilot starts August 2026 · Limited availability
          </p>
        </div>
      </section>

      {/* ── WAITLIST FORM ────────────────────────────────────────────────── */}
      <section
        id="waitlist"
        ref={waitlistRef}
        className="py-20 px-6 bg-zbg scroll-mt-20"
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-10 h-1 bg-zteal rounded-full mx-auto mb-5" />
            <h2 className="text-3xl md:text-4xl font-black text-zdark mb-3">
              Join the Zanmi Waitlist
            </h2>
            <p className="text-zdark/60 font-semibold leading-relaxed">
              Get updates, early access opportunities, and pilot announcements.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-white rounded-3xl p-12 shadow-card border border-gray-100 text-center">
              <div className="text-5xl mb-5">🎉</div>
              <h3 className="text-2xl font-black text-zdark mb-3">You're in!</h3>
              <p className="text-zdark/60 font-semibold leading-relaxed">
                We'll be in touch soon with updates and pilot opportunities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-card border border-gray-100 space-y-5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-zteal" />

              <div>
                <label htmlFor="wl-name" className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-1.5">
                  Name <span className="text-zorange" aria-hidden="true">*</span>
                </label>
                <input
                  id="wl-name"
                  type="text"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                />
                {errors.name && <p role="alert" className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="wl-email" className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-1.5">
                  Email <span className="text-zorange" aria-hidden="true">*</span>
                </label>
                <input
                  id="wl-email"
                  type="email"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                  placeholder="you@organization.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                />
                {errors.email && <p role="alert" className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="wl-org" className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-1.5">
                  Organization{' '}
                  <span className="text-zdark/30 font-semibold normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="wl-org"
                  type="text"
                  value={form.organization}
                  onChange={e => setField('organization', e.target.value)}
                  placeholder="School, nonprofit, or company name"
                  autoComplete="organization"
                  className={`${inputBase} ${inputOk}`}
                />
              </div>

              <div>
                <label htmlFor="wl-interest" className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-1.5">
                  I'm interested in <span className="text-zorange" aria-hidden="true">*</span>
                </label>
                <select
                  id="wl-interest"
                  value={form.interest}
                  onChange={e => setField('interest', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.interest}
                  className={`${inputBase} appearance-none cursor-pointer ${errors.interest ? inputErr : inputOk}`}
                >
                  <option value="">Select one…</option>
                  <option value="Joining the pilot">Joining the pilot</option>
                  <option value="Learning more / updates">Learning more / updates</option>
                  <option value="Both">Both</option>
                </select>
                {errors.interest && <p role="alert" className="text-red-500 text-xs font-semibold mt-1">{errors.interest}</p>}
              </div>

              <div>
                <label htmlFor="wl-orgtype" className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-1.5">
                  Organization type{' '}
                  <span className="text-zdark/30 font-semibold normal-case tracking-normal">(optional)</span>
                </label>
                <select
                  id="wl-orgtype"
                  value={form.organization_type}
                  onChange={e => setField('organization_type', e.target.value)}
                  className={`${inputBase} appearance-none cursor-pointer ${inputOk}`}
                >
                  <option value="">Select one…</option>
                  <option value="School / District">School / District</option>
                  <option value="Nonprofit / Youth Program">Nonprofit / Youth Program</option>
                  <option value="Research / Evaluation Team">Research / Evaluation Team</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3" role="alert">
                  <p className="text-red-600 font-semibold text-sm">
                    Something went wrong. Please try again or email{' '}
                    <a href="mailto:hello@tryzanmi.com" className="font-bold underline">hello@tryzanmi.com</a>.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-zorange text-white font-black text-lg rounded-2xl shadow-game-sm hover:bg-zorange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'submitting' ? 'Submitting…' : 'Join the Waitlist'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-zdark border-t border-zteal/20 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <Image src="/zanmi-logo.png" alt="Zanmi" width={100} height={30} className="h-7 w-auto brightness-0 invert" />
          <a href="mailto:hello@tryzanmi.com" className="text-zteal/70 hover:text-zteal font-semibold text-sm transition-colors">
            hello@tryzanmi.com
          </a>
          <p className="text-white/40 font-semibold text-sm">© 2026 Zanmi</p>
        </div>
      </footer>

    </div>
  );
}
