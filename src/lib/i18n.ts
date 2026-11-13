/**
 * Мови сайту.
 *
 * Українська живе в корені (`/services`), а не в `/uk/services` — так усі
 * проіндексовані URL лишаються як є. EN і SK отримають свої папки
 * (`/en/services`) тонкими обгортками над спільними компонентами сторінок.
 *
 * Статичний експорт не має middleware, тож автовизначення мови по браузеру
 * робиться на клієнті або правилами хостингу — не тут.
 */

export const locales = ['uk', 'en', 'sk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uk';

/** Мови, для яких сторінки вже існують. */
export const activeLocales: Locale[] = ['uk', 'en', 'sk'];

/** Мови з префіксом у шляху (усі, крім української) — для generateStaticParams. */
export const intlLocales = locales.filter((l) => l !== defaultLocale);

export const localeNames: Record<Locale, { name: string; code: string }> = {
  uk: { name: 'Українська', code: 'UA' },
  en: { name: 'English', code: 'EN' },
  sk: { name: 'Slovenčina', code: 'SK' },
};

/** Шлях із префіксом мови: localePath('en', '/services') → '/en/services' */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Мова з поточного шляху: '/en/services' → 'en' */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return locales.includes(first as Locale) ? (first as Locale) : defaultLocale;
}

/** Той самий шлях іншою мовою, для перемикача і hreflang. */
export function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (locales.includes(parts[0] as Locale)) parts.shift();
  return `/${parts.join('/')}`;
}

/**
 * Сторінки з перекладеним slug: адреса в кожній мові своя.
 * Ключ — українська адреса, як вона записана в посиланнях.
 */
export const localizedSlugs: Record<string, Record<Locale, string>> = {
  '/kalkulyator-prybutku-etsy': {
    uk: '/kalkulyator-prybutku-etsy',
    en: '/etsy-profit-calculator',
    sk: '/kalkulacka-zisku-etsy',
  },
  '/kalkulyator-tsinoutvorennya-etsy': {
    uk: '/kalkulyator-tsinoutvorennya-etsy',
    en: '/etsy-pricing-calculator',
    sk: '/kalkulacka-ceny-etsy',
  },
  '/porivnyannya-platform-etsy-amazon-shopify': {
    uk: '/porivnyannya-platform-etsy-amazon-shopify',
    en: '/etsy-vs-amazon-vs-shopify',
    sk: '/porovnanie-etsy-amazon-shopify',
  },
};

/**
 * Сторінки, що мають версії іншими мовами. Дашборд і ресайзер поки
 * лише українські — посилання на них не префіксуємо, інакше буде 404.
 */
const TRANSLATED = /^\/(?:services(?:\/[a-z0-9-]+)?|cases\/[a-z0-9-]+|about|contacts|tools|terms|privacy|thanks|blog(?:\/[a-z0-9-]+)?|career(?:\/[a-z0-9-]+)?)?\/?$/;

/**
 * Адреси, перекладені не всіма мовами: шлях → мови з префіксом, де сторінка є.
 * Українська є завжди. Для решти мов посилання не префіксуємо — інакше 404.
 *
 * Список тримається вручну й має збігатися з даними сторінок послуг:
 * перевірку робить `src/data/servicePages/index.ts`.
 */
// Зараз порожньо: Google Ads перекладена всіма мовами. Формат запису:
// '/services/<slug>': ['en'] — сторінка є українською й англійською.
export const PARTIAL_TRANSLATIONS: Readonly<Record<string, readonly Locale[]>> = {};

/** Чи є в сторінки версія мовою `locale` (без мови — чи перекладена вона взагалі). */
export function hasTranslation(path: string, locale?: Locale): boolean {
  const clean = path.split('#')[0].split('?')[0] || '/';
  const partial = PARTIAL_TRANSLATIONS[clean];
  if (partial) return locale ? locale === 'uk' || partial.includes(locale) : false;
  return TRANSLATED.test(clean);
}
