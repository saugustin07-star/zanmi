import Link from 'next/link';

export default function PilotPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/zanmi-logo.png" alt="Zanmi" className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-zdark/50 hover:text-zdark transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zorange/10 border border-zorange/20 px-4 py-1.5 rounded-full text-sm font-bold text-zorange mb-8">
          <span className="w-2 h-2 bg-zorange rounded-full animate-pulse" />
          Now accepting pilot applications
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-zdark mb-6 leading-tight">
          Apply for Pilot
        </h1>
        <p className="text-lg text-zdark/60 font-semibold mb-10 leading-relaxed">
          Zanmi is onboarding a small group of schools and youth-serving organizations to pilot the platform. Pilot partners get hands-on support from the founder and direct input into how the product evolves.
        </p>

        {/* What's included */}
        <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100 text-left mb-10">
          <h2 className="font-black text-xl text-zdark mb-5">What&apos;s included in the pilot</h2>
          <ul className="space-y-3">
            {[
              'Student and/or adult survey setup',
              'Gamified student survey experience',
              'Simple admin dashboard',
              'Response and engagement insights',
              'Founder-supported onboarding and feedback session',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-zorange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-zorange text-xs font-black">✓</span>
                </span>
                <span className="text-zdark/70 font-semibold">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zdark/40 font-semibold mt-6">
            Ideal for schools, youth programs, and nonprofits planning student feedback, program evaluation, or annual surveys.
          </p>
        </div>

        {/* CTA */}
        <a
          href="mailto:saugustin07@gmail.com?subject=Zanmi Pilot Application"
          className="inline-flex items-center gap-2 px-10 py-4 bg-zorange text-white font-black rounded-2xl shadow-game-sm hover:bg-zorange-dark transition-all btn-game text-lg"
        >
          Apply via Email →
        </a>
        <p className="text-xs text-zdark/40 font-semibold mt-4">
          Send an email and we&apos;ll follow up within 48 hours.
        </p>
      </div>
    </div>
  );
}
