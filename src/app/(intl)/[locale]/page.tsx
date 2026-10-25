import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';
import { homeJsonLd } from '@/lib/homeJsonLd';
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
  return pageMeta(locale as Locale, 'home');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={homeJsonLd(locale as Locale)} />
      <Home locale={locale as Locale} />
    </>
  );
}
