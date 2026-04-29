import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-zbg font-sans">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/zanmi-icon.png" alt="Zanmi" className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-bold text-zdark/50 hover:text-zdark transition-colors">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black text-zdark mb-4">Try Zanmi</h1>
        <p className="text-lg text-zdark/60 font-semibold mb-12 max-w-xl mx-auto">
          Explore all three sides of the platform — the student experience, the adult experience, and the admin dashboard.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-7 shadow-card border border-gray-100 flex flex-col">
            <div className="w-12 h-12 bg-zpurple/10 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">🎮</div>
            <h2 className="font-black text-lg text-zdark mb-2">Student Demo</h2>
            <p className="text-zdark/60 font-semibold text-sm leading-relaxed mb-6 flex-1">
              A gamified survey experience designed for young people — with avatars, progress, and points.
            </p>
            <Link
              href="/survey/demo-kids"
              className="block py-3 bg-zpurple text-white font-bold rounded-2xl hover:bg-zpurple-dark transition-all shadow-game-sm btn-game text-center text-sm"
            >
              Try Student Demo →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-card border border-gray-100 flex flex-col">
            <div className="w-12 h-12 bg-zorange/10 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">👤</div>
            <h2 className="font-black text-lg text-zdark mb-2">Adult Demo</h2>
            <p className="text-zdark/60 font-semibold text-sm leading-relaxed mb-6 flex-1">
              A clean, professional survey for adults, caregivers, staff, or community members.
            </p>
            <Link
              href="/survey/demo-adult"
              className="block py-3 bg-zorange text-white font-bold rounded-2xl hover:bg-zorange-dark transition-all text-center text-sm"
            >
              Try Adult Demo →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-card border border-gray-100 flex flex-col">
            <div className="w-12 h-12 bg-zteal/10 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">💼</div>
            <h2 className="font-black text-lg text-zdark mb-2">Admin Demo</h2>
            <p className="text-zdark/60 font-semibold text-sm leading-relaxed mb-6 flex-1">
              See how admins build surveys and review responses from a clean, professional dashboard.
            </p>
            <Link
              href="/admin"
              className="block py-3 bg-zteal text-white font-bold rounded-2xl hover:bg-zteal-dark transition-all text-center text-sm"
            >
              Try Admin Demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
