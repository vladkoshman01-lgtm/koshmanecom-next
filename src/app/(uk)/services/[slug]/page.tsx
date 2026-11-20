import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';
import ServicePageView from '@/components/services/ServicePageView';
import { getServicePage, servicePageLocales, servicePageSlugs } from '@/data/servicePages';
import { servicePageJsonLd } from '@/lib/servicePageJsonLd';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return servicePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage('uk', slug);
  if (!page) return {};
  return buildMetadata({
    locale: 'uk',
    path: `/services/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    // Сторінка без перекладу: лише canonical, без hreflang на неіснуючі мови
    locales: servicePageLocales(page.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage('uk', slug);
  if (!page) notFound();

  return (
    <div className="bg-white">
      <JsonLd data={servicePageJsonLd('uk', page)} />
      <ServicePageView
        page={page}
        lead={<LeadForm
            theme="light"
            title={page.leadTitle}
            subtitle={page.leadText}
            submitLabel={page.leadSubmit}
            topics={page.leadTopics}
            commentPlaceholder={page.leadCommentPlaceholder}
          />}
      />
    </div>
  );
}
