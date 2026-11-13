'use client';

import React, { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { RevealState } from './useReveal';

/**
 * Число, що відлічується від нуля, коли блок зʼявляється на екрані.
 * Розуміє префікс, число і суфікс: «17 000», «1,1 млн», «×2,2» (uk/sk)
 * або «17,000», «1.1M», «4.1x» (en). У стані 'static' показує значення як є.
 */

/** Розділювачі тисяч і дробу для кожної мови. */
const SEPARATORS: Record<Locale, { group: string; decimal: string }> = {
  uk: { group: ' ', decimal: ',' },
  sk: { group: ' ', decimal: ',' },
  en: { group: ',', decimal: '.' },
};

const PARTS: Record<'space' | 'comma', RegExp> = {
  // uk/sk: тисячі через пробіл, дріб через кому
  space: /^([^\d]*)(\d[\d\s ]*(?:,\d+)?)(.*)$/,
  // en: тисячі через кому, дріб через крапку
  comma: /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/,
};

function parse(value: string, locale: Locale) {
  const en = locale === 'en';
  const m = value.match(en ? PARTS.comma : PARTS.space);
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const normalized = en ? num.replace(/,/g, '') : num.replace(/[\s ]/g, '').replace(',', '.');
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0;
  return { prefix, suffix, target: parseFloat(normalized), decimals };
}

function format(n: number, decimals: number, locale: Locale) {
  const { group, decimal } = SEPARATORS[locale];
  const [int, frac] = n.toFixed(decimals).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, group);
  return frac ? `${grouped}${decimal}${frac}` : grouped;
}

export default function CountUp({
  value,
  state,
  locale,
  duration = 1100,
}: {
  value: string;
  state: RevealState;
  locale: Locale;
  duration?: number;
}) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const parsed = parse(value, locale);
    if (!parsed || state === 'static') {
      setShown(value);
      return;
    }
    const { prefix, suffix, target, decimals } = parsed;
    if (state === 'hidden') {
      setShown(`${prefix}${format(0, decimals, locale)}${suffix}`);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      // Останній кадр — рівно вихідний рядок, щоб не розійтися з текстом у HTML
      setShown(p < 1 ? `${prefix}${format(target * eased, decimals, locale)}${suffix}` : value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state, value, locale, duration]);

  return <span className="tabular-nums">{shown}</span>;
}
