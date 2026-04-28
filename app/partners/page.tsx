import Link from 'next/link';

const WHY_CARDS = [
  {
    icon: '🎮',
    title: 'Youth-centered survey experience',
    desc: 'Surveys designed for how young people actually engage — not adapted from adult tools.',
    color: 'bg-zpurple/10',
  },
  {
    icon: '🛠',
    title: 'Simple tools for non-researchers',
    desc: 'No research background required. Any staff member can build and run a survey in minutes.',
    color: 'bg-zteal/10',
  },
  {
    icon: '📊',
    title: 'Actionable dashboards',
    desc: 'See completion rates, sentiment, program insights, and student needs — all in one place.',
    color: 'bg-zorange/10',
  },
];

const PILOT_BULLETS = [
  'Student and/or adult survey setup',
  'Gamified student survey experience',
  'Adult survey option',
  'Admin dashboard with program insights',
  'Founder-supported onboarding',
  'Feedback session to inform product development',
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/zanmi-logo.png" alt="Zanmi" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-zdark/50 hover:text-zdark transition-colors hidden sm:block">← Home</Link>
            <a
              href="mailto:hello@tryzanmi.com?subject=Zanmi Partnership Inquiry"
              className="px-5 py-2.5 text-sm font-bold text-white bg-zorange rounded-xl hover:bg-zorange-dark transition-all shadow-sm"
            >
              Contact the Founder
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-zpurple/10 border border-zpurple/20 px-4 py-1.5 rounded-full text-sm font-bold text-zpurple mb-8">
            Early Stage · Seeking Partners
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zdark mb-6 leading-tight">
            Partner with Zanmi to improve how youth-serving organizations collect and use feedback.
          </h1>
          <p className="text-lg text-zdark/60 font-semibold leading-relaxed mb-10 max-w-2xl mx-auto">
            Zanmi is an early-stage EdTech SaaS platform helping schools and nonprofits collect higher-quality feedback from students through engaging surveys and actionable dashboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@tryzanmi.com?subject=Zanmi Partnership Inquiry"
              className="px-8 py-4 font-black text-white bg-zpurple rounded-2xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game"
            >
              Contact the Founder
            </a>
            <Link
              href="/pilot"
              className="px-8 py-4 font-black text-zdark border-2 border-zdark/20 rounded-2xl hover:border-zdark/40 hover:bg-zdark/5 transition-all"
            >
              View Pilot Opportunity →
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-zdark">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-4">The Problem</h2>
          </div>
          <div className="bg-white/10 rounded-3xl p-8 border border-white/10">
            <p className="text-white/80 font-semibold text-lg leading-relaxed text-center">
              Most surveys are built for adults, even when the feedback needs to come from young people. As a result, schools and nonprofits often struggle with low engagement, incomplete responses, and data that is hard to use.
            </p>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-zdark mb-6">The Opportunity</h2>
          <p className="text-lg text-zdark/60 font-semibold leading-relaxed">
            Zanmi helps organizations improve student engagement, survey completion, and data quality — while giving leaders clearer insights for programs, funding, and decision-making.
          </p>
        </div>
      </section>

      {/* Why Zanmi */}
      <section className="py-20 bg-zbg">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black text-zdark text-center mb-12">Why Zanmi</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="bg-white rounded-3xl p-7 shadow-card border border-gray-100">
                <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                  {card.icon}
                </div>
                <h3 className="font-black text-lg text-zdark mb-2">{card.title}</h3>
                <p className="text-zdark/60 font-semibold text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built by a practitioner */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-zpurple/10 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">👩‍💼</div>
            <div>
              <h2 className="text-xl font-black text-zdark mb-3">Built by a practitioner</h2>
              <p className="text-zdark/60 font-semibold leading-relaxed">
                Built by a UX Research Operations leader with 10+ years of experience in education and child development research, partnering with 600+ schools to improve how organizations collect high-quality feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Stage */}
      <section className="py-20 bg-zdark">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-10 md:p-14">
            <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/20 px-3 py-1.5 rounded-full text-xs font-bold text-zorange mb-6">
              <span className="w-1.5 h-1.5 bg-zorange rounded-full animate-pulse" />
              Now onboarding
            </div>
            <h2 className="text-3xl font-black text-zdark mb-4">Now onboarding early pilot partners</h2>
            <p className="text-zdark/60 font-semibold leading-relaxed mb-8">
              Zanmi is currently seeking schools, nonprofits, and youth-serving organizations interested in piloting the platform and shaping the product before broader launch.
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
            <a
              href="mailto:hello@tryzanmi.com?subject=Zanmi Pilot Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zorange text-white font-black rounded-2xl shadow-game-sm hover:bg-zorange-dark transition-all btn-game"
            >
              Discuss a Pilot →
            </a>
          </div>
        </div>
      </section>

      {/* Investor / Partner Interest */}
      <section className="py-20 bg-zbg">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-zdark mb-4">Interested in supporting Zanmi&apos;s growth?</h2>
          <p className="text-lg text-zdark/60 font-semibold leading-relaxed mb-8 max-w-xl mx-auto">
            Zanmi is looking to connect with aligned partners, advisors, funders, and early-stage investors who care about youth voice, education, nonprofit impact, and better data tools.
          </p>
          <a
            href="mailto:hello@tryzanmi.com?subject=Zanmi Investor/Partner Interest"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zpurple text-white font-black rounded-2xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game"
          >
            Contact hello@tryzanmi.com →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zdark py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/zanmi-logo.png" alt="Zanmi" className="h-7 w-auto brightness-0 invert" />
          <p className="text-white/40 text-xs font-semibold">Surveys that feel like a game, insights that feel human.</p>
          <Link href="/" className="text-white/40 text-sm font-semibold hover:text-white/70 transition-colors">← Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}
