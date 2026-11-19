import type { Locale } from './i18n';
import { CONTACT_EMAIL, PHONE_SK, PHONE_SK_RAW, PHONE_UA, PHONE_UA_RAW } from './legal-entities';

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
  // Пошта й телефони — з реквізитів, щоб не розходилися з політиками
  email: CONTACT_EMAIL,
  phone: PHONE_UA,
  phoneRaw: PHONE_UA_RAW,
  phoneSk: PHONE_SK,
  phoneSkRaw: PHONE_SK_RAW,
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
