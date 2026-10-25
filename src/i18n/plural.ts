import type { Locale } from '@/lib/i18n';

/**
 * «N послуг» трьома мовами. Українська і словацька мають три форми,
 * англійська — дві.
 */
export function serviceCount(locale: Locale, n: number): string {
  const last = n % 10;
  const teen = n % 100;

  if (locale === 'en') return `${n} ${n === 1 ? 'service' : 'services'}`;

  if (locale === 'sk') {
    if (n === 1) return `${n} služba`;
    if (n >= 2 && n <= 4) return `${n} služby`;
    return `${n} služieb`;
  }

  if (last === 1 && teen !== 11) return `${n} послуга`;
  if (last >= 2 && last <= 4 && (teen < 10 || teen >= 20)) return `${n} послуги`;
  return `${n} послуг`;
}
