'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';

const ACCESS_KEY = 'koshman-pinterest-2026';
const ACCESS_STORAGE_KEY = 'koshman-pinterest-dashboard-session';

const PinterestDashboardView = dynamic(() => import('./PinterestDashboardView'), {
  ssr: false,
  loading: () => (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
      <div className="mx-auto max-w-2xl text-center text-slate-600">Завантаження dashboard…</div>
    </section>
  ),
});

export default function PinterestDashboard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessInput, setAccessInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  useEffect(() => {
    const stored = window.sessionStorage.getItem(ACCESS_STORAGE_KEY);
    const urlKey = new URLSearchParams(window.location.search).get('key');

    if (urlKey && urlKey === ACCESS_KEY) {
      window.sessionStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_KEY);
      setIsUnlocked(true);
      return;
    }

    if (stored === ACCESS_KEY) {
      setIsUnlocked(true);
    }
  }, []);

  const unlock = () => {
    const key = accessInput.trim();
    if (!key) {
      setUnlockError('Введіть пароль доступу.');
      return;
    }

    if (key !== ACCESS_KEY) {
      setUnlockError('Невірний пароль.');
      return;
    }

    window.sessionStorage.setItem(ACCESS_STORAGE_KEY, ACCESS_KEY);
    setUnlockError('');
    setIsUnlocked(true);
  };

  const lock = () => {
    window.sessionStorage.removeItem(ACCESS_STORAGE_KEY);
    window.history.replaceState({}, '', window.location.pathname);
    setAccessInput('');
    setUnlockError('');
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-slate-900">
            Приватний Pinterest dashboard
          </h2>
          <p className="mt-3 text-slate-600">
            Дашборд відкривається тільки після введення пароля. Самі дані не показуються до входу.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-brand-orange" />
              <div>
                <p className="font-semibold text-slate-900">Доступ по паролю</p>
                <p className="mt-1 text-sm text-slate-600">
                Клієнт може зайти за паролем, а доступ зберігається лише в межах поточної вкладки.
              </p>
            </div>
          </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={accessInput}
              onChange={(event) => setAccessInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  unlock();
                }
              }}
              placeholder="Введіть пароль доступу"
              className="h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-orange"
            />
            <button
              type="button"
              onClick={unlock}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-700"
            >
              Відкрити dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {unlockError ? <p className="mt-3 text-sm text-red-500">{unlockError}</p> : null}

          <p className="mt-4 text-xs text-slate-500">
            Після закриття вкладки пароль доведеться ввести знову.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={lock}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-orange hover:text-brand-orange"
        >
          <LockKeyhole className="h-4 w-4" />
          Заблокувати
        </button>
      </div>
      <PinterestDashboardView />
    </div>
  );
}
