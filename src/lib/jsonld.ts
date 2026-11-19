import { TEAM } from '@/data/team';
import { getContent } from '@/i18n/content';
import { contacts } from './nav';
import { localePath, type Locale } from './i18n';
import { siteUrl } from './seo';

/**
 * Структуровані дані Schema.org (JSON-LD) — «паспорт» сторінки для Google
 * і AI-асистентів. Тут спільні шматки, щоб усі сторінки описували агенцію
 * однаково.
 */

const ORG_ID = `${siteUrl}/#organization`;

/**
 * Профілі агенції в каталогах і соцмережах. `sameAs` пов'язує їх з сайтом
 * в одну сутність — так Google і ШІ-асистенти впевненіше знають, хто ми.
 * Нові профілі додавати сюди.
 */
const PROFILES = [
  contacts.instagram,
  contacts.linkedin,
  contacts.telegram,
  contacts.youtube,
  'https://clutch.co/profile/koshman-ecom',
  // Google Business Profile — посилання на сам профіль, без /review
  'https://g.page/r/CR22__zZd769ECE',
  'https://themanifest.com/company/koshman-ecom',
  'https://www.sortlist.com/agency/koshmanecom',
];

const personId = (id: string) => `${siteUrl}/about#${id}`;

/** Рядок з даних мовою сторінки (з відкотом на українську). */
function translate(locale: Locale) {
  const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
  const map: Record<string, string> = {};
  for (const [key, value] of Object.entries(getContent(locale))) map[squash(key)] = value;
  return (uk: string) => map[squash(uk)] ?? uk;
}

/**
 * `@id` людини з команди за її ім'ям будь-якою мовою ('Влад Кошман' / 'Vlad Koshman').
 * Так автор статті й засновник агенції — одна й та сама сутність у розмітці.
 */
export function teamMemberId(name: string): string | undefined {
  const person = TEAM.find((p) =>
    (['uk', 'en', 'sk'] as const).some((l) => translate(l)(p.name) === name),
  );
  return person ? personId(person.id) : undefined;
}

/** Засновники агенції як Person — для E-E-A-T: за агенцією стоять реальні люди. */
export function team(locale: Locale) {
  const tr = translate(locale);
  return TEAM.map((person) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(person.id),
    name: tr(person.name),
    jobTitle: tr(person.role),
    description: tr(person.description),
    image: `${siteUrl}${person.image}`,
    url: `${siteUrl}${localePath(locale, '/about')}`,
    worksFor: { '@id': ORG_ID },
  }));
}

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
    founder: TEAM.map((person) => ({ '@id': personId(person.id) })),
    sameAs: PROFILES,
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
