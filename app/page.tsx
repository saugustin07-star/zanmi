import Link from 'next/link';
import DemoSection from '@/components/landing/DemoSection';

const features = [
  {
    icon: '🎮',
    title: 'Game-Like for Kids',
    desc: 'Kids earn points and stars as they answer. Surveys feel like an adventure — not a chore.',
    accent: 'bg-zpurple/10',
  },
  {
    icon: '💼',
    title: 'Professional for Adults',
    desc: 'Clean, distraction-free surveys for staff, caregivers, and community partners.',
    accent: 'bg-zteal/10',
  },
  {
    icon: '🏫',
    title: 'Built for Schools',
    desc: 'Safe, COPPA-friendly, and anonymous. Perfect for classroom check-ins and student voice surveys.',
    accent: 'bg-zorange/10',
  },
  {
    icon: '🤝',
    title: 'Made for Nonprofits',
    desc: 'Prove your impact to funders with real data — collected effortlessly from everyone you serve.',
    accent: 'bg-zpurple/10',
  },
  {
    icon: '📊',
    title: 'Real-Time Insights',
    desc: 'See responses instantly in a beautiful dashboard. No spreadsheets. No waiting.',
    accent: 'bg-zteal/10',
  },
  {
    icon: '⚡',
    title: 'Set Up in Minutes',
    desc: 'Create a survey, share the link. No app download needed. Works on any device.',
    accent: 'bg-zorange/10',
  },
];

const steps = [
  { num: '1', icon: '✏️', title: 'Create', desc: 'Build a survey in minutes — choose youth or adult mode and add your questions.', color: 'bg-zpurple/20' },
  { num: '2', icon: '🔗', title: 'Share', desc: 'Send a simple link or QR code. No logins required for respondents.', color: 'bg-zorange/20' },
  { num: '3', icon: '🎉', title: 'Respond', desc: 'Kids play through a game-like experience. Adults get a clean professional flow.', color: 'bg-zteal/20' },
  { num: '4', icon: '📈', title: 'Learn', desc: 'See results instantly in your dashboard — with trends, breakdowns, and insights.', color: 'bg-zorange/20' },
];

const testimonials = [
  {
    quote: 'Our response rate jumped from 40% to 91% after switching to Zanmi. The kids actually ask when the next survey is coming!',
    name: 'Maria T.',
    role: 'Program Director, Youth Forward',
    avatar: '👩‍💼',
  },
  {
    quote: 'Finally a tool that works for everyone — the kids love the avatars, and our staff appreciate the clean professional version.',
    name: 'James L.',
    role: 'Camp Coordinator, Bright Futures',
    avatar: '👨‍🏫',
  },
  {
    quote: 'The dashboard helps us prove our impact to funders. Clean data, beautiful visuals. An absolute game changer.',
    name: 'Priya K.',
    role: 'Executive Director, Step Up Foundation',
    avatar: '👩‍💻',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/zanmi-icon.png" alt="Zanmi" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zdark/60">
            <a href="#features" className="hover:text-zdark transition-colors">Features</a>
            <a href="#demo" className="hover:text-zdark transition-colors">Demo</a>
            <a href="#how" className="hover:text-zdark transition-colors">How It Works</a>
            <a href="#stories" className="hover:text-zdark transition-colors">Stories</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden sm:block px-4 py-2 text-sm font-bold text-zpurple hover:bg-purple-50 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/admin"
              className="px-5 py-2.5 text-sm font-bold text-white bg-zorange rounded-xl shadow-game-sm hover:bg-zorange-dark transition-all btn-game"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-zpurple/10 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-zteal/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-zorange/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/30 px-4 py-2 rounded-full text-sm font-bold text-zorange mb-8 animate-fade-in">
            <span>✨</span>
            <span>For kids, adults, schools, nonprofits & organizations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-zdark leading-tight mb-4 animate-slide-up">
            Surveys that feel{' '}
            <span className="text-gradient">like a game.</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-zdark/70 leading-tight mb-6 animate-slide-up">
            Insights that feel <span className="text-gradient">human.</span>
          </h2>

          <p className="text-xl md:text-2xl text-zdark/60 max-w-2xl mx-auto mb-10 font-semibold animate-fade-in">
            Zanmi adapts to your audience — a game-like adventure for kids, a clean professional flow for adults. One platform. Everyone engaged.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/admin"
              className="px-10 py-5 text-xl font-black text-white bg-zpurple rounded-3xl shadow-game hover:bg-zpurple-dark transition-all btn-game w-full sm:w-auto"
            >
              Start for Free →
            </Link>
            <a
              href="#demo"
              className="px-10 py-5 text-xl font-black text-white bg-zorange rounded-3xl shadow-game hover:bg-zorange-dark transition-all btn-game w-full sm:w-auto"
            >
              Try Interactive Demo 🎮
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              { value: '91%', label: 'avg completion rate', color: 'text-zpurple' },
              { value: '3 min', label: 'to set up a survey', color: 'text-zorange' },
              { value: '2 modes', label: 'youth & adult flows', color: 'text-zteal' },
              { value: '0', label: 'app downloads needed', color: 'text-zorange' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-sm text-zdark/50 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="bg-zdark py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 items-center">
            <span className="text-white/40 uppercase tracking-widest text-xs font-bold">Trusted by</span>
            {['Youth Forward', 'Bright Futures', 'Step Up Foundation', 'City After School', 'Camp Achieve'].map((org) => (
              <span key={org} className="text-white font-black opacity-70">{org}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-zdark mb-4">
              One platform for{' '}
              <span className="text-gradient">every audience</span>
            </h2>
            <p className="text-xl text-zdark/60 font-semibold max-w-2xl mx-auto">
              Whether you&apos;re reaching kids in a youth program or adults at a community event — Zanmi meets them where they are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-6 shadow-card card-hover border border-gray-100"
              >
                <div className={`w-14 h-14 ${f.accent} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-xl text-zdark mb-2">{f.title}</h3>
                <p className="text-zdark/60 font-semibold leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="demo" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/20 px-4 py-2 rounded-full text-sm font-bold text-zorange mb-6">
              <span>🎮</span>
              <span>Interactive Preview</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zdark mb-4">
              See both{' '}
              <span className="text-gradient">experiences in action</span>
            </h2>
            <p className="text-xl text-zdark/60 font-semibold max-w-2xl mx-auto">
              Switch between the kids and adult survey modes to see how Zanmi adapts to your audience — right here in the browser.
            </p>
          </div>

          <DemoSection />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-zdark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              From idea to insight in{' '}
              <span className="text-gradient-warm">minutes</span>
            </h2>
            <p className="text-xl text-white/60 font-semibold max-w-2xl mx-auto">
              No training needed. If you can send an email, you can run a Zanmi survey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/10 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/10`}>
                    {step.icon}
                  </div>
                  <div className="text-5xl font-black text-white/10 mb-2">{step.num}</div>
                  <h3 className="font-black text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 font-semibold text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="stories" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-zdark mb-4">
              Organizations{' '}
              <span className="text-gradient">love Zanmi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-zbg rounded-3xl p-6 border border-gray-100">
                <div className="text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-zdark/80 font-semibold leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zpurple/10 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-black text-zdark">{t.name}</p>
                    <p className="text-sm text-zdark/50 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to actually hear from your audience?
          </h2>
          <p className="text-xl text-white/70 font-semibold mb-10">
            Start free today. No credit card. No complicated setup. Works for kids and adults alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin"
              className="px-10 py-5 text-xl font-black text-zpurple bg-white rounded-3xl shadow-game hover:shadow-lg transition-all btn-game"
            >
              Create My First Survey →
            </Link>
            <a
              href="#demo"
              className="px-10 py-5 text-xl font-black text-white border-2 border-white/30 rounded-3xl hover:bg-white/10 transition-all"
            >
              Try the Demo
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zdark py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img src="/zanmi-icon.png" alt="Zanmi" className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/40 text-sm font-semibold">
              Surveys that feel like a game, insights that feel human.
            </p>
            <div className="flex gap-6 text-white/40 text-sm font-semibold">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
              <a href="/admin" className="hover:text-white/80 transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
