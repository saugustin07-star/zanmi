import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/zanmi-logo.png" alt="Zanmi" className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-zdark/50 hover:text-zdark transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black text-zdark mb-4 leading-tight">
            For Partners
          </h1>
          <p className="text-lg text-zdark/60 font-semibold leading-relaxed">
            Zanmi is an early-stage EdTech platform seeking partners — from education organizations and funders to research institutions and impact investors.
          </p>
        </div>

        <div className="space-y-5 mb-12">
          {[
            {
              icon: '🏫',
              title: 'School Districts & Education Organizations',
              desc: 'Partner with us to bring gamified, youth-centered surveys to your schools and programs. Pilot pricing available.',
            },
            {
              icon: '💰',
              title: 'Funders & Impact Investors',
              desc: 'Zanmi is building infrastructure for youth voice in education and nonprofits. We are open to conversations with mission-aligned funders.',
            },
            {
              icon: '🔬',
              title: 'Research & Evaluation Partners',
              desc: 'Collaborate with us on studying the impact of gamified survey design on student engagement and data quality.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-7 shadow-card border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h2 className="font-black text-lg text-zdark mb-1">{item.title}</h2>
                  <p className="text-zdark/60 font-semibold leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="mailto:saugustin07@gmail.com?subject=Zanmi Partnership Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 bg-zpurple text-white font-black rounded-2xl shadow-game-sm hover:bg-zpurple-dark transition-all btn-game"
          >
            Contact the Founder →
          </a>
          <p className="text-xs text-zdark/40 font-semibold mt-4">
            We respond to all partnership inquiries within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
