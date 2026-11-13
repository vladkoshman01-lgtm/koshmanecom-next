import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';
import CaseStudyView from '@/components/cases/CaseStudyView';
import { caseStudySlugs, getCaseStudy } from '@/data/caseStudies';
import { caseStudyJsonLd } from '@/lib/caseStudyJsonLd';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy('uk', slug);
  if (!study) return {};
  return buildMetadata({
    locale: 'uk',
    path: `/cases/${study.slug}`,
    title: study.metaTitle,
    description: study.metaDescription,
    type: 'article',
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy('uk', slug);
  if (!study) notFound();

  return (
    <div className="bg-white">
      <JsonLd data={caseStudyJsonLd('uk', study)} />
      <CaseStudyView study={study} />
      <LeadForm theme="dark" title={study.leadTitle} subtitle={study.leadText} />
    </div>
  );
}
