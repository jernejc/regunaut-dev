'use client';

import { useEffect, useState } from 'react';
import WorkflowBuilder from '../components/WorkflowBuilder';

const HARDCODED_PASSWORD = 'regunaut123';
const LOGIN_STORAGE_KEY = 'regunaut-login-unlocked';

export default function Home() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(null);

  useEffect(() => {
    const storedUnlock = window.localStorage.getItem(LOGIN_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard pattern: read browser-only state on mount
    setIsUnlocked(storedUnlock === 'true');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === HARDCODED_PASSWORD) {
      window.localStorage.setItem(LOGIN_STORAGE_KEY, 'true');
      setIsUnlocked(true);
      setError('');
      return;
    }

    setError('Wrong password, try again.');
  };

  if (isUnlocked === null) {
    return null;
  }

  if (isUnlocked) {
    return <WorkflowBuilder />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 flex items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/50 sm:p-9">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <img
                src="/Regunaut_Color.svg"
                alt="Regunaut"
                className="h-8 w-auto"
              />
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-text">Welcome back</h1>
                <p className="text-sm text-slate-500">
                  Enter your password to continue.
                </p>
              </div>
            </div>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-text outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
