'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/surveys/new', label: 'Create Survey', icon: '➕' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <img src="/zanmi-icon.png" alt="Zanmi" className="h-9 w-auto" />
          <span className="text-xs bg-zpurple/10 text-zpurple font-bold px-2 py-0.5 rounded-full">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors
                ${active
                  ? 'bg-zpurple text-white'
                  : 'text-zdark/70 hover:bg-gray-50 hover:text-zdark'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-brand rounded-2xl p-4 text-white">
          <p className="font-bold text-sm mb-1">🚀 Ready to share?</p>
          <p className="text-xs opacity-80 mb-3">Send your survey link to anyone, anywhere.</p>
          <Link
            href="/survey/survey-1"
            className="block text-center bg-white text-zpurple font-bold text-xs py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Preview Survey
          </Link>
        </div>
      </div>
    </aside>
  );
}
