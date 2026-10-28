import type { Locale } from './i18n';

/**
 * Єдине джерело навігації для хедера й футера.
 * Кейсів окремою сторінкою ще немає — поки якір на головній.
 */

/** Ключ пункту меню — текст береться зі словника мови. */
export type NavKey =
  | 'home'
  | 'services'
  | 'cases'
  | 'about'
  | 'reviews'
  | 'blog'
  | 'tools'
  | 'contacts'
  | 'career'
  | 'process';

/** `locales` — мови, де пункт показується; без нього — усі. */
export type NavItem = { key: NavKey; href: string; locales?: Locale[] };

export const mainNav: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'cases', href: '/#cases' },
  { key: 'about', href: '/about' },
  { key: 'reviews', href: '/#reviews' },
  { key: 'blog', href: '/blog' },
  { key: 'tools', href: '/tools' },
  { key: 'contacts', href: '/contacts' },
];

export type FooterColumnKey = 'navigation' | 'company' | 'tools';
export type ToolKey =
  | 'profitCalculator'
  | 'pricingCalculator'
  | 'comparison'
  | 'resizer'
  | 'seogenie';

export const footerColumns: {
  key: FooterColumnKey;
  links: { key: NavKey | ToolKey; href: string; locales?: Locale[] }[];
}[] = [
  {
    key: 'navigation',
    links: [
      { key: 'home', href: '/' },
      { key: 'services', href: '/services' },
      { key: 'cases', href: '/#cases' },
    ],
  },
  {
    key: 'company',
    links: [
      { key: 'about', href: '/about' },
      { key: 'reviews', href: '/#reviews' },
      { key: 'blog', href: '/blog' },
      { key: 'contacts', href: '/contacts' },
      { key: 'career', href: '/career' },
    ],
  },
  {
    key: 'tools',
    links: [
      { key: 'profitCalculator', href: '/kalkulyator-prybutku-etsy' },
      { key: 'pricingCalculator', href: '/kalkulyator-tsinoutvorennya-etsy' },
      { key: 'comparison', href: '/porivnyannya-platform-etsy-amazon-shopify' },
      { key: 'resizer', href: '/tools/image-resizer' },
      { key: 'seogenie', href: 'https://seogenie.app/' },
    ],
  },
];

// Посилання звірені з прототипом (там вони ведуть на справжні акаунти)
export const contacts = {
  email: 'hello@koshmanecom.com',
  phone: '+380 66 197 09 69',
  phoneRaw: '+380661970969',
  phoneSk: '+421 952 208 617',
  phoneSkRaw: '+421952208617',
  telegram: 'https://t.me/koshmanecom_channel',
  telegramManager: 'https://t.me/+380661970969',
  whatsapp: 'https://wa.me/380661970969',
  instagram: 'https://www.instagram.com/koshman_ecom/',
  linkedin: 'https://linkedin.com/company/koshman-export/',
  youtube: 'https://www.youtube.com/@Koshmanecom',
  offices: 'Київ, Україна · Кошиці, Словаччина',
};

export const legalLinks: { key: 'privacy' | 'terms'; href: string }[] = [
  { key: 'privacy', href: '/privacy' },
  { key: 'terms', href: '/terms' },
];
