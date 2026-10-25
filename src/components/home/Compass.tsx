'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import Script from 'next/script';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Анімований компас із героя. Веб-компонент лежить у public/vendor/ —
 * самодостатній, без залежностей: 13-секундний безшовний цикл, пауза поза
 * екраном, повага до prefers-reduced-motion.
 *
 * Пасхалка: якщо покрутити циферблат три повні оберти (за годинниковою,
 * проти, і знову за), компонент кидає подію `koshman-unlock` — тоді
 * показуємо вікно з промокодом COMPASS15.
 */
export default function Compass({ className = '' }: { className?: string }) {
  const t = useT();
  const hostRef = useRef<HTMLDivElement>(null);
  const [promo, setPromo] = useState(false);
  const [copied, setCopied] = useState(false);
  /**
   * Режим обертання для телефона. Поки вимкнений, палець по циферблату
   * гортає сторінку; після дотику беремо жест на себе, і зʼявляється
   * кнопка «Готово», щоб повернути звичайний скрол.
   */
  const [dial, setDial] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const onUnlock = () => setPromo(true);
    host.addEventListener('koshman-unlock', onUnlock);
    return () => host.removeEventListener('koshman-unlock', onUnlock);
  }, []);

  const close = () => {
    setPromo(false);
    setCopied(false);
  };

  return (
    <div
      ref={hostRef}
      className="relative h-full w-full"
      style={{ touchAction: dial ? 'none' : undefined }}
    >
      <Script src="/vendor/koshman-compass.js" strategy="afterInteractive" />
      <koshman-compass
        theme="light"
        accent="#FF5B2B"
        speed="1"
        labels="true"
        className={className}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Телефон: прозора кнопка вмикає режим обертання */}
      {!dial ? (
        <button
          type="button"
          onClick={() => setDial(true)}
          aria-label={t.easter.compassControl}
          className="absolute inset-0 md:hidden"
        />
      ) : (
        <button
          type="button"
          onClick={() => setDial(false)}
          className="absolute -bottom-1.5 left-1/2 z-[2] h-10 -translate-x-1/2 bg-[#141414] px-[1.125rem] text-sm font-semibold text-white md:hidden"
        >
          {t.easter.compassDone}
        </button>
      )}

      {promo ? (
        <div
          className="mars-fade fixed inset-0 z-[130] flex items-center justify-center bg-[rgba(15,15,15,.78)] p-5"
          role="dialog"
          aria-label="Промокод за пасхалку з компасом"
          onClick={close}
        >
          <div
            className="mars-rise relative flex w-full max-w-[27.5rem] flex-col gap-[1.125rem] bg-white px-9 pb-9 pt-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.lead.closeAria}
              className="absolute right-2.5 top-2.5 h-11 w-11 text-2xl text-[#8A8A8A]"
            >
              ×
            </button>

            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-orange">
              {t.easter.compassEyebrow}
            </div>
            <div className="text-[2.75rem] font-bold leading-[1] text-[#141414]">−15%</div>
            <div className="text-base text-[#555555]">{t.easter.discountFor}</div>

            <div className="flex items-center gap-2.5">
              <span className="flex h-12 flex-1 items-center justify-center border-[1.5px] border-dashed border-[#DCDCDC] text-lg font-bold tracking-[0.08em] text-[#141414]">
                COMPASS15
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('COMPASS15').catch(() => {});
                  setCopied(true);
                }}
                className="h-12 bg-[#141414] px-5 text-sm font-bold uppercase tracking-[0.02em] text-white"
              >
                {copied ? t.easter.copied : t.easter.copy}
              </button>
            </div>

            <Link
              href="/contacts"
              onClick={close}
              className="flex h-14 items-center justify-center bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white"
            >
              {t.easter.bookCall}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
