'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Lock } from 'lucide-react';

const STORAGE_KEY_PREFIX = 'dashboard-auth-';

export default function DashboardGate({
  slug,
  password,
  children,
}: {
  slug: string;
  password: string;
  children: ReactNode;
}) {
  const storageKey = STORAGE_KEY_PREFIX + slug;
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === 'true') {
      setUnlocked(true);
    }
    setChecked(true);
  }, [storageKey]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === password) {
      sessionStorage.setItem(storageKey, 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!checked) return null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
            <Lock className="h-5 w-5 text-slate-500" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Приватний дашборд</h1>
          <p className="text-sm text-slate-500">Введіть пароль для доступу</p>
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            autoFocus
            className={`w-full rounded-xl border px-4 py-2.5 text-center text-sm outline-none transition ${
              error ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-red-400'
            }`}
            placeholder="Пароль"
          />
          {error && <p className="text-xs text-red-500">Невірний пароль</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            Увійти
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
