'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed]   = useState<boolean | null>(null);
  const [input, setInput]     = useState('');
  const [error, setError]     = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem('zanmi_admin_v1') === 'ok');
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const passcode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? '';
    if (passcode && input.trim() === passcode) {
      sessionStorage.setItem('zanmi_admin_v1', 'ok');
      setAuthed(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  // Avoid flash of gate while reading sessionStorage
  if (authed === null) return null;

  if (!authed) {
    return (
      <div className="min-h-screen bg-zbg flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image
              src="/zanmi-icon.png"
              alt="Zanmi"
              width={48}
              height={48}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-black text-zdark">Admin Access</h1>
            <p className="text-zdark/50 font-semibold text-sm mt-1">
              Enter your admin passcode to continue.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 space-y-4"
          >
            <div>
              <label className="block text-xs font-black text-zdark/50 uppercase tracking-widest mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                placeholder="Enter passcode…"
                autoFocus
                className={`w-full px-4 py-3 rounded-2xl border-2 outline-none font-semibold text-zdark transition-colors ${
                  error
                    ? 'border-red-400 bg-red-50 placeholder:text-red-300'
                    : 'border-zdark/10 focus:border-zpurple placeholder:text-zdark/30'
                }`}
              />
              {error && (
                <p className="text-red-500 font-semibold text-xs mt-2">
                  Incorrect passcode. Try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full py-3.5 bg-zpurple text-white font-black rounded-2xl shadow-game-sm hover:bg-zpurple-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Enter Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
