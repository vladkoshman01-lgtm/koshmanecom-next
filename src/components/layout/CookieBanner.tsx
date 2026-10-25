'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/LocaleProvider';
import { applyConsent, readConsent, type Consent } from '@/lib/consent';

/**
 * Банер згоди на cookie (Google Consent Mode v2 + Clarity).
 *
 * До вибору аналітика й реклама вимкнені. «Прийняти всі» вмикає їх одразу,
 * «Лише необхідні» лишає вимкненими. Вибір можна змінити посиланням
 * «Налаштування cookie» у футері — банер відкриється знову.
 */
export default function CookieBanner() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!readConsent()) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener('kc-open-consent', reopen);
    return () => window.removeEventListener('kc-open-consent', reopen);
  }, []);

  const decide = (value: Consent) => {
    applyConsent(value);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookie.aria}
      className="fixed bottom-6 left-6 z-[110] flex w-[27.5rem] max-w-[calc(100vw-48px)] flex-col gap-[1.125rem] bg-[#1F1F1F] p-7 text-white shadow-[0_18px_48px_rgba(0,0,0,.35)]"
    >
      <div className="flex flex-col gap-2">
        <span className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-orange">
          {t.cookie.eyebrow}
        </span>
        <span className="text-[0.9375rem] leading-[1.55] text-[#DADADA]">
          {t.cookie.text}{' '}
          <Link href="/privacy#cookies" className="text-white underline">
            {t.cookie.policy}
          </Link>
          .
        </span>
      </div>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => decide('all')}
          className="h-12 flex-1 bg-brand-orange text-sm font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-orange-600"
        >
          {t.cookie.acceptAll}
        </button>
        <button
          type="button"
          onClick={() => decide('necessary')}
          className="h-12 flex-1 border-[1.5px] border-[#4A4A4A] text-sm font-bold uppercase tracking-[0.02em] text-white transition-colors hover:border-white"
        >
          {t.cookie.necessaryOnly}
        </button>
      </div>
    </div>
  );
}
