import type { Metadata } from 'next';
import '../../globals.css';
import SiteDocument from '@/components/layout/SiteDocument';
import { getDictionary } from '@/i18n/getDictionary';
import { intlLocales, type Locale } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** Статичний експорт вимагає переліку мов наперед. */
export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.home.title,
    description: t.meta.home.description,
    openGraph: { siteName: 'Koshman Ecom', type: 'website' },
    twitter: { card: 'summary_large_image' },
    verification: {
      google: '3KdGRZKWbCNOsPGYDSLxPTa7oxbhdQilKfoAAkyCmVM',
    },
  };
}

/** Кореневий layout для /en і /sk. */
export default async function IntlLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SiteDocument locale={locale as Locale}>{children}</SiteDocument>;
}
