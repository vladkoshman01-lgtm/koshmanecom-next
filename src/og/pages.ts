import { careerRoles } from '@/lib/careers';
import { getServicePage } from '@/data/servicePages';
import { getContent } from '@/i18n/content';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/lib/i18n';

/** Тексти OG-картинки для кожної сторінки й мови — з тих самих словників. */
export type OgKey =
  | 'home'
  | 'services'
  | 'about'
  | 'contacts'
  | 'career'
  | 'vacancy'
  | 'service'
  | 'tools'
  | 'terms'
  | 'privacy';

export function ogContent(locale: Locale, key: OgKey, slug?: string) {
  const t = getDictionary(locale);
  const content = getContent(locale);
  const tr = (uk: string) => content[uk] ?? uk;

  switch (key) {
    case 'home':
      return { eyebrow: t.og.homeEyebrow, title: t.og.homeTitle, subtitle: t.og.homeSubtitle };
    case 'services':
      return {
        eyebrow: t.nav.services,
        title: t.pages.services.title,
        subtitle: t.pages.services.subtitle,
      };
    case 'about':
      return {
        eyebrow: t.nav.about,
        title: t.pages.about.title,
        subtitle: t.pages.about.focusTitle,
      };
    case 'contacts':
      return {
        eyebrow: t.nav.contacts,
        title: t.pages.contacts.title,
        subtitle: t.pages.contacts.subtitle,
      };
    case 'career':
      return {
        eyebrow: t.nav.career,
        title: tr('Будуймо e-commerce разом'),
        subtitle: t.pages.career.subtitle,
      };
    case 'vacancy': {
      const role = careerRoles.find((r) => r.slug === slug);
      return {
        eyebrow: t.nav.career,
        title: role?.title ?? t.nav.career,
        subtitle: role ? tr(role.shortDescription) : undefined,
      };
    }
    case 'service': {
      const page = slug ? getServicePage(locale, slug) : undefined;
      return {
        eyebrow: page?.category ?? t.nav.services,
        title: page?.short ?? t.pages.services.title,
        subtitle: page?.leadText,
      };
    }
    case 'tools':
      return {
        eyebrow: t.nav.tools,
        title: t.pages.tools.title,
        subtitle: t.pages.tools.subtitle,
      };
    case 'terms':
      return { eyebrow: t.og.documents, title: t.footer.terms, subtitle: t.pages.terms.subtitle };
    case 'privacy':
      return { eyebrow: t.og.documents, title: t.footer.privacy };
  }
}
