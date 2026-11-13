import type { Metadata } from 'next';
import { activeLocales, localePath, type Locale } from './i18n';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koshmanecom.com';

/**
 * Canonical + hreflang для сторінки, яка існує всіма мовами.
 *
 * `path` — шлях без префікса мови ('/services'). Українська лишається
 * в корені, тож вона ж і x-default.
 */
export function alternatesFor(
  locale: Locale,
  path: string,
  only: readonly Locale[] = activeLocales,
): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of activeLocales.filter((x) => only.includes(x))) {
    languages[l] = `${siteUrl}${localePath(l, path)}`;
  }
  if (only.includes('uk')) languages['x-default'] = `${siteUrl}${localePath('uk', path)}`;

  return {
    canonical: `${siteUrl}${localePath(locale, path)}`,
    languages,
  };
}

const OG_LOCALE: Record<Locale, string> = { uk: 'uk_UA', en: 'en_US', sk: 'sk_SK' };

/**
 * Повний набір метаданих сторінки: title, description, canonical + hreflang,
 * Open Graph і Twitter. Картинку OG Next підставляє сам з `opengraph-image`.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
  type = 'website',
  translated = true,
  locales: only,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  /** false — сторінка є лише цією мовою: тільки canonical, без hreflang на неіснуючі версії. */
  translated?: boolean;
  /** Мови, якими сторінка існує, — hreflang лише на них. Без поля — усі активні. */
  locales?: readonly Locale[];
}): Metadata {
  const url = `${siteUrl}${localePath(locale, path)}`;
  const langs = only ?? activeLocales;
  // Одна мова — то й перекладу немає: лише canonical
  if (only && only.length < 2) translated = false;
  return {
    // absolute — щоб шаблон з layout не дописував нічого зайвого
    title: { absolute: title },
    description,
    alternates: translated ? alternatesFor(locale, path, langs) : { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Koshman Ecom',
      locale: OG_LOCALE[locale],
      ...(translated
        ? { alternateLocale: langs.filter((l) => l !== locale).map((l) => OG_LOCALE[l]) }
        : {}),
      type,
    },
    twitter: { card: 'summary_large_image', title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
