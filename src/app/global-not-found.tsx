import type { Metadata } from 'next';
import './globals.css';
import SiteDocument from '@/components/layout/SiteDocument';
import NotFoundContent from '@/components/NotFoundContent';

/**
 * Глобальна 404 для будь-якої невідомої адреси.
 *
 * Сайт має кілька кореневих layout-ів (групи `(uk)` та `(intl)`), тож звичайний
 * `not-found` усередині групи на невідомі URL не спрацьовував — Firebase віддавав
 * стандартну заглушку Next.js. Ця сторінка рендерить увесь документ сама.
 */
export const metadata: Metadata = {
  title: 'Сторінку не знайдено — Koshman Ecom',
  description: 'Такої сторінки немає. Поверніться на головну чи оберіть потрібний розділ.',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="uk" detectLocale>
      <NotFoundContent />
    </SiteDocument>
  );
}
