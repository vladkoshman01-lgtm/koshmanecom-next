import type { Metadata } from 'next';
import '../globals.css';
import SiteDocument from '@/components/layout/SiteDocument';
import uk from '@/i18n/dictionaries/uk';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Запасні значення для сторінок без власних метаданих (калькулятори тощо)
  title: uk.meta.home.title,
  description: uk.meta.home.description,
  openGraph: { siteName: 'Koshman Ecom', locale: 'uk_UA', type: 'website' },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: '3KdGRZKWbCNOsPGYDSLxPTa7oxbhdQilKfoAAkyCmVM',
  },
};

/** Кореневий layout української версії (вона живе в корені, без префікса). */
export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="uk">{children}</SiteDocument>;
}
