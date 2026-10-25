import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import TermsContent from '@/components/terms/TermsContent';
import { getDictionary } from '@/i18n/getDictionary';
import { intlLocales, type Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/seo';

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale as Locale, 'terms');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={pageJsonLd(locale as Locale, 'terms')} />
      <TermsContent />
    </>
  );
}
