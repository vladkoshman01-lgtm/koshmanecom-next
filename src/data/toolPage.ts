import type { Locale } from '@/lib/i18n';

/**
 * Спільна структура сторінок інструментів (калькулятори, порівняння):
 * перший екран, гайд з таблицею, FAQ, CTA і лід-форма.
 */

/** Коли ставки востаннє звіряли з офіційними довідками майданчиків. */
export const RATES_CHECKED = '2026-10-28';

export type ToolPageCopy = {
  meta: { title: string; description: string; ogTitle: string; ogSubtitle: string };
  crumbs: { home: string; tools: string; page: string };
  hero: { eyebrow: string; title: string; subtitle: string; checked: string };
  chips: [string, string][];
  cta: { calculate: string; bandTitle: string; bandText: string };
  guide: {
    eyebrow: string;
    title: string;
    intro: string;
    table: { head: [string, string, string]; rows: [string, string, string][] };
    formulaTitle: string;
    formula: string;
    exampleTitle: string;
    example: string[];
    tipsTitle: string;
    tips: string[];
  };
  faq: { eyebrow: string; title: string; text: string; cta: string; items: [string, string][] };
  lead: { title: string; subtitle: string };
  app: { name: string; features: string[] };
};

/** Месенджер у кнопках: в Україні пишуть у Telegram, за кордоном — у WhatsApp. */
export const MESSENGER: Record<Locale, { kind: 'telegram' | 'whatsapp'; label: string }> = {
  uk: { kind: 'telegram', label: 'Написати в Telegram' },
  en: { kind: 'whatsapp', label: 'Message us on WhatsApp' },
  sk: { kind: 'whatsapp', label: 'Napíšte nám na WhatsApp' },
};
