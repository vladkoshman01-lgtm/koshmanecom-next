import type { Locale } from '@/lib/i18n';
import { CASES, type CaseCard } from '@/data/cases';
import type { CaseStudy } from './types';
import { ukCaseStudies } from './uk';
import { enCaseStudies } from './en';
import { skCaseStudies } from './sk';

export type { CaseIcon, CaseStudy, FeedPinSpec } from './types';

const STUDIES: Record<Locale, Record<string, CaseStudy>> = {
  uk: ukCaseStudies,
  en: enCaseStudies,
  sk: skCaseStudies,
};

/** Адреси кейсів (однакові в усіх мовах) — для generateStaticParams, sitemap і llms.txt. */
export const caseStudySlugs = Object.keys(ukCaseStudies);

/** Кейс мовою сторінки; з відкотом на українську. */
export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return STUDIES[locale]?.[slug] ?? STUDIES.uk[slug];
}

/** Адреса детальної сторінки для картки на головній, якщо вона вже є. */
export function caseHrefForCard(cardId: string) {
  const study = Object.values(ukCaseStudies).find((c) => c.cardId === cardId);
  return study ? `/cases/${study.slug}` : undefined;
}

/**
 * «Схожі кейси» для сторінки кейсу: картки з головної без поточного кейсу.
 * Спершу ті, що мають власну сторінку, далі решта в порядку головної.
 */
export function relatedCaseCards(slug: string, limit = 3): CaseCard[] {
  const current = ukCaseStudies[slug]?.cardId;
  const withPage = new Set(Object.values(ukCaseStudies).map((c) => c.cardId));
  return CASES.filter((c) => c.id !== current)
    .sort((a, b) => Number(withPage.has(b.id)) - Number(withPage.has(a.id)))
    .slice(0, limit);
}
