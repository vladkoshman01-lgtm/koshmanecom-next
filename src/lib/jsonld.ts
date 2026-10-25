import { contacts } from './nav';
import { localePath, type Locale } from './i18n';
import { siteUrl } from './seo';

/**
 * Структуровані дані Schema.org (JSON-LD) — «паспорт» сторінки для Google
 * і AI-асистентів. Тут спільні шматки, щоб усі сторінки описували агенцію
 * однаково.
 */

const ORG_ID = `${siteUrl}/#organization`;

/** Агенція: назва, контакти, офіси, соцмережі. */
export function organization(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: 'Koshman Ecom',
    url: `${siteUrl}${localePath(locale, '/')}`,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    description,
    email: contacts.email,
    telephone: [contacts.phoneRaw, contacts.phoneSkRaw],
    areaServed: 'Worldwide',
    knowsLanguage: ['uk', 'en', 'sk'],
    address: [
      { '@type': 'PostalAddress', addressLocality: 'Kyiv', addressCountry: 'UA' },
      { '@type': 'PostalAddress', addressLocality: 'Košice', addressCountry: 'SK' },
    ],
    sameAs: [contacts.instagram, contacts.linkedin, contacts.telegram, contacts.youtube],
  };
}

/** Сайт загалом — допомагає Google показати назву сайту у видачі. */
export function website(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Koshman Ecom',
    url: `${siteUrl}${localePath(locale, '/')}`,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

/** Хлібні крихти: [['Головна', '/'], ['Послуги', '/services']]. */
export function breadcrumbs(locale: Locale, items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${siteUrl}${localePath(locale, path)}`,
    })),
  };
}

/** Часті запитання — Google може показати їх прямо у видачі. */
export function faq(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/** Звичайна сторінка з назвою й описом. */
export function webPage(locale: Locale, path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${siteUrl}${localePath(locale, path)}`,
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', url: siteUrl },
    publisher: { '@id': ORG_ID },
  };
}
