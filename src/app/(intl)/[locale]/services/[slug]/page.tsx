import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';
import ServicePageView from '@/components/services/ServicePageView';
import { getServicePage, hasServicePage, servicePageLocales, servicePageSlugsFor } from '@/data/servicePages';
import { servicePageJsonLd } from '@/lib/servicePageJsonLd';
import { intlLocales, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  // Кожна послуга × кожна мова з префіксом — але тільки ті, що вже перекладені
  return intlLocales.flatMap((locale) =>
    servicePageSlugsFor(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale as Locale;
  // Без перекладу сторінки тут немає — і SEO для неї теж не потрібне
  if (!hasServicePage(lang, slug)) return {};
  const page = getServicePage(lang, slug);
  if (!page) return {};
  return buildMetadata({
    locale: lang,
    path: `/services/${page.slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    locales: servicePageLocales(page.slug),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Locale;
  // Без відкоту на українську: сторінки, якої немає цією мовою, не існує
  if (!hasServicePage(lang, slug)) notFound();
  const page = getServicePage(lang, slug);
  if (!page) notFound();

  return (
    <div className="bg-white">
      <JsonLd data={servicePageJsonLd(lang, page)} />
      <ServicePageView
        page={page}
        lead={<LeadForm theme="light" title={page.leadTitle} subtitle={page.leadText} />}
      />
    </div>
  );
}
