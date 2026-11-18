import { renderOg, ogContentType, ogSize } from '@/og/render';

/** Прев'ю посилання на кабінет (і на звіти в ньому) — у фірмовому стилі сайту. */
export const dynamic = 'force-static';
export const alt = 'Кабінет клієнта Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: 'Кабінет клієнта',
    title: 'Звіти по вашій рекламі в одному місці',
    subtitle: 'Цифри по всіх кампаніях оновлюються щодня',
  });
}
