import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';
import CaseStudyView from '@/components/cases/CaseStudyView';
import { caseStudySlugs, getCaseStudy } from '@/data/caseStudies';
import { caseStudyJsonLd } from '@/lib/caseStudyJsonLd';
import { intlLocales, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  // Кожен кейс × кожна мова з префіксом; slug однаковий у всіх мовах
  return intlLocales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(locale as Locale, slug);
  if (!study) return {};
  return buildMetadata({
    locale: locale as Locale,
    path: `/cases/${study.slug}`,
    title: study.metaTitle,
    description: study.metaDescription,
    type: 'article',
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Locale;
  const study = getCaseStudy(lang, slug);
  if (!study) notFound();

  return (
    <div className="bg-white">
      <JsonLd data={caseStudyJsonLd(lang, study)} />
      <CaseStudyView
        study={study}
        leadForm={<LeadForm theme="dark" title={study.leadTitle} subtitle={study.leadText} />}
      />
    </div>
  );
}
