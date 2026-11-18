import type { Locale } from '@/lib/i18n';
import { PARTIAL_TRANSLATIONS, intlLocales } from '@/lib/i18n';
import type { ServicePage } from './types';
import { ukServicePages } from './uk';
import { enServicePages } from './en';
import { skServicePages } from './sk';

export type { ServicePage, ServicePageExtraSection } from './types';

const PAGES: Record<Locale, Record<string, ServicePage>> = {
  uk: ukServicePages,
  en: enServicePages,
  sk: skServicePages,
};

/** Адреси сторінок послуг — для generateStaticParams, sitemap і llms.txt. */
export const servicePageSlugs = Object.keys(ukServicePages);

/** Адреси сторінок послуг, доступні цією мовою. */
export function servicePageSlugsFor(locale: Locale): string[] {
  return Object.keys(PAGES[locale] ?? {});
}

/** Чи має послуга власну сторінку цією мовою (без відкоту на українську). */
export function hasServicePage(locale: Locale, slug: string): boolean {
  return Boolean(PAGES[locale]?.[slug]);
}

/** Сторінка послуги мовою сторінки; з відкотом на українську. */
export function getServicePage(locale: Locale, slug: string): ServicePage | undefined {
  return PAGES[locale]?.[slug] ?? PAGES.uk[slug];
}

/**
 * Чи має послуга з каталогу власну сторінку.
 * Ключ — `${категорія}|${назва}` з `SERVICES`, як у решті мап.
 */
export const SERVICE_PAGE_BY_ITEM: Record<string, string> = {
  'shopify-dev|Shopify': 'shopify',
  'ads|Google Ads': 'google-ads',
};

/** Мови, якими сторінка послуги існує (українська — завжди). Для hreflang. */
export function servicePageLocales(slug: string): Locale[] {
  return (['uk', ...intlLocales] as Locale[]).filter((l) => l === 'uk' || hasServicePage(l, slug));
}

// Сторінка, перекладена не всіма мовами, має бути в `PARTIAL_TRANSLATIONS`
// з тими самими мовами — інакше посилання з інших мов поведуть на 404.
for (const slug of servicePageSlugs) {
  const have = intlLocales.filter((l) => hasServicePage(l, slug));
  if (have.length === intlLocales.length) continue;
  const listed = PARTIAL_TRANSLATIONS[`/services/${slug}`] ?? [];
  if (listed.length !== have.length || !have.every((l) => listed.includes(l))) {
    throw new Error(
      `/services/${slug}: у PARTIAL_TRANSLATIONS (src/lib/i18n.ts) мають бути мови [${have.join(', ')}].`,
    );
  }
}

export { SERVICE_PAGE_GRAPHICS } from './icons';
export type { ServicePageGraphics } from './icons';
