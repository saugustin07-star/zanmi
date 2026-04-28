import Link from 'next/link';
import DemoSection from '@/components/landing/DemoSection';

const WHO_CARDS = [
  {
    icon: '🏫',
    title: 'Schools',
    desc: 'Understand student experiences, program needs, and engagement through surveys students actually want to complete.',
    accent: 'border-l-zpurple',
    iconBg: 'bg-zpurple/10',
  },
  {
    icon: '🤝',
    title: 'Youth-Serving Nonprofits',
    desc: 'Collect better data for programs, grants, funders, and continuous improvement without needing a research team.',
    accent: 'border-l-zteal',
    iconBg: 'bg-zteal/10',
  },
  {
    icon: '📊',
    title: 'Researchers & Program Leaders',
    desc: 'Build surveys, monitor responses, and turn feedback into usable insights from one simple dashboard.',
    accent: 'border-l-zorange',
    iconBg: 'bg-zorange/10',
  },
];

const HOW_STEPS = [
  {
    num: '1',
    title: 'Build your survey',
    desc: 'Adults create student or adult surveys using a simple, guided builder.',
    icon: '✏️',
  },
  {
    num: '2',
    title: 'Students complete a gamified experience',
    desc: 'Students answer questions through a more engaging experience with progress, avatars, and youth-friendly design.',
    icon: '🎮',
  },
  {
    num: '3',
    title: 'Review responses in a dashboard',
    desc: 'Admins see response trends, completion rates, and insights they can use for planning, reporting, and decision-making.',
    icon: '📈',
  },
];

const WHY_CARDS = [
  {
    icon: '⚡',
    title: 'Better Engagement',
    desc: 'A youth-friendly experience helps students stay interested from start to finish.',
    iconBg: 'bg-zpurple/10',
    iconColor: 'text-zpurple',
  },
  {
    icon: '🎯',
    title: 'Better Data',
    desc: 'Higher completion and more thoughtful responses help teams make stronger decisions.',
    iconBg: 'bg-zteal/10',
    iconColor: 'text-zteal-dark',
  },
  {
    icon: '📋',
    title: 'Easier Reporting',
    desc: 'Dashboards help teams turn feedback into insights for programs, leaders, boards, and funders.',
    iconBg: 'bg-zorange/10',
    iconColor: 'text-zorange',
  },
];

const PILOT_BULLETS = [
  'Student and/or adult survey setup',
  'Gamified student survey experience',
  'Simple admin dashboard',
  'Response and engagement insights',
  'Founder-supported onboarding and feedback session',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/zanmi-logo.png" alt="Zanmi" className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zdark/60">
            <a href="#how" className="hover:text-zdark transition-colors">How It Works</a>
            <a href="#demo" className="hover:text-zdark transition-colors">Demo</a>
            <a href="#pilot" className="hover:text-zdark transition-colors">Pilot</a>
            <Link href="/partners" className="hover:text-zdark transition-colors">For Partners</Link>
          </div>
          <Link
            href="/pilot"
            className="px-5 py-2.5 text-sm font-bold text-white bg-zorange rounded-xl hover:bg-zorange-dark transition-all shadow-sm"
          >
            Apply for Pilot
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 bg-zpurple/5 rounded-full blur-3xl" />
          <div className="absolute top-32 right-16 w-64 h-64 bg-zteal/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/20 px-4 py-1.5 rounded-full text-sm font-bold text-zorange mb-8">
            <span className="w-2 h-2 bg-zorange rounded-full animate-pulse" />
            Now onboarding pilot partners
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-zdark leading-tight mb-6 animate-slide-up">
            Gamified surveys that actually get{' '}
            <span className="text-gradient">real feedback</span>{' '}
            from students.
          </h1>

          <p className="text-lg md:text-xl text-zdark/60 max-w-2xl mx-auto mb-10 font-semibold leading-relaxed animate-fade-in">
            Zanmi helps schools and youth-serving nonprofits create engaging surveys for young people while giving adults clean, usable data in one simple dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#demo"
              className="px-8 py-4 text-base font-black text-white bg-zpurple rounded-2xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game w-full sm:w-auto"
            >
              Try Demo
            </a>
            <Link
              href="/pilot"
              className="px-8 py-4 text-base font-black text-zdark border-2 border-zdark/20 rounded-2xl hover:border-zdark/40 hover:bg-zdark/5 transition-all w-full sm:w-auto"
            >
              Apply for Pilot →
            </Link>
          </div>

          <p className="text-xs text-zdark/40 font-semibold max-w-xl mx-auto leading-relaxed">
            Built by a UX Research Operations leader with 10+ years of experience in education and child development research, partnering with 600+ schools to improve how organizations collect high-quality feedback.
          </p>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-zdark py-5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/70 text-sm font-semibold">
            Designed for schools, nonprofits, and youth programs that need better student engagement and more reliable survey data.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="who" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-zdark mb-4">
              Built for teams who need better feedback from young people
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHO_CARDS.map((card) => (
              <div
                key={card.title}
                className={`bg-white rounded-3xl p-7 shadow-card border border-gray-100 border-l-4 ${card.accent}`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                  {card.icon}
                </div>
                <h3 className="font-black text-xl text-zdark mb-3">{card.title}</h3>
                <p className="text-zdark/60 font-semibold leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-zdark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              How Zanmi works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-white/10" />

            {HOW_STEPS.map((step, i) => (
              <div key={step.num} className="relative text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 border border-white/10">
                  {step.icon}
                </div>
                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zorange text-white font-black text-sm mb-3">
                  {step.num}
                </div>
                <h3 className="font-black text-lg text-white mb-2">{step.title}</h3>
                <p className="text-white/60 font-semibold text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-zdark mb-4">
              Try the experience
            </h2>
            <p className="text-lg text-zdark/60 font-semibold max-w-xl mx-auto">
              Explore both sides of Zanmi: the student survey experience and the admin dashboard.
            </p>
          </div>

          {/* Two demo entry cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="bg-zpurple/5 border-2 border-zpurple/20 rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 bg-zpurple/10 rounded-2xl flex items-center justify-center text-2xl mb-4">🎮</div>
              <h3 className="font-black text-xl text-zdark mb-2">Student Demo</h3>
              <p className="text-zdark/60 font-semibold leading-relaxed mb-6 flex-1">
                See how a young person would experience a gamified survey.
              </p>
              <Link
                href="/survey/demo-kids"
                className="inline-flex items-center justify-center px-6 py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all shadow-game-sm btn-game"
              >
                Try Student Demo →
              </Link>
            </div>

            <div className="bg-zteal/5 border-2 border-zteal/20 rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 bg-zteal/10 rounded-2xl flex items-center justify-center text-2xl mb-4">💼</div>
              <h3 className="font-black text-xl text-zdark mb-2">Admin Demo</h3>
              <p className="text-zdark/60 font-semibold leading-relaxed mb-6 flex-1">
                See how adults build surveys and review responses.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-6 py-3 bg-zteal text-white font-bold rounded-2xl hover:bg-zteal-dark transition-all shadow-sm"
              >
                Try Admin Demo →
              </Link>
            </div>
          </div>

          {/* Interactive preview */}
          <DemoSection />
        </div>
      </section>

      {/* PILOT */}
      <section id="pilot" className="py-24 bg-zdark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-elevated">
            <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/20 px-3 py-1.5 rounded-full text-xs font-bold text-zorange mb-6">
              <span className="w-1.5 h-1.5 bg-zorange rounded-full animate-pulse" />
              Early Access
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-zdark mb-4">
              Now onboarding pilot partners
            </h2>
            <p className="text-lg text-zdark/60 font-semibold mb-8 leading-relaxed">
              Be one of the first schools or organizations to try Zanmi and help shape how it evolves.
            </p>

            <ul className="space-y-3 mb-8">
              {PILOT_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-zorange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-zorange text-xs font-black">✓</span>
                  </span>
                  <span className="text-zdark/70 font-semibold">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/pilot"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zorange text-white font-black rounded-2xl shadow-game-sm hover:bg-zorange-dark transition-all btn-game"
            >
              Apply for Pilot →
            </Link>
            <p className="text-xs text-zdark/40 font-semibold mt-4">
              Ideal for schools, youth programs, and nonprofits planning student feedback, program evaluation, or annual surveys.
            </p>
          </div>
        </div>
      </section>

      {/* WHY ZANMI */}
      <section className="py-24 bg-zbg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-zdark mb-4">
              Why Zanmi matters
            </h2>
            <p className="text-lg text-zdark/60 font-semibold max-w-2xl mx-auto leading-relaxed">
              Most student surveys are built for adults, not young people. Zanmi helps organizations collect higher-quality feedback by making the experience more engaging for students and easier for adults to manage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="bg-white rounded-3xl p-7 shadow-card border border-gray-100">
                <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                  {card.icon}
                </div>
                <h3 className={`font-black text-lg mb-2 ${card.iconColor}`}>{card.title}</h3>
                <p className="text-zdark/60 font-semibold leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTOR SIGNAL */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-zdark mb-3">
            Building the future of youth feedback
          </h2>
          <p className="text-zdark/60 font-semibold leading-relaxed mb-6 max-w-xl mx-auto">
            Zanmi is an early-stage EdTech SaaS platform focused on improving youth engagement, survey completion, and data quality for schools and youth-serving organizations.
          </p>
          <a
            href="mailto:saugustin07@gmail.com"
            className="text-sm font-bold text-zpurple hover:underline"
          >
            Contact the Founder →
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-brand">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to try Zanmi?
          </h2>
          <p className="text-lg text-white/70 font-semibold mb-10">
            Start with a demo or apply to become an early pilot partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#demo"
              className="px-8 py-4 text-base font-black text-zpurple bg-white rounded-2xl shadow-game hover:shadow-lg transition-all btn-game"
            >
              Try Demo
            </a>
            <Link
              href="/pilot"
              className="px-8 py-4 text-base font-black text-white border-2 border-white/40 rounded-2xl hover:bg-white/10 transition-all"
            >
              Apply for Pilot →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zdark py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <img src="/zanmi-logo.png" alt="Zanmi" className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/40 text-xs font-semibold text-center">
              Surveys that feel like a game, insights that feel human.
            </p>
            <div className="flex flex-wrap gap-5 text-white/40 text-sm font-semibold justify-center">
              <a href="#how" className="hover:text-white/70 transition-colors">How It Works</a>
              <a href="#demo" className="hover:text-white/70 transition-colors">Demo</a>
              <a href="#pilot" className="hover:text-white/70 transition-colors">Pilot</a>
              <Link href="/partners" className="hover:text-white/70 transition-colors">For Partners</Link>
              <Link href="/admin" className="hover:text-white/70 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
