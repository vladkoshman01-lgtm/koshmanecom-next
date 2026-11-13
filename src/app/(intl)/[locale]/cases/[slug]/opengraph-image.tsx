import { ogContentType, ogSize } from '@/og/render';
import { renderCaseImage } from '@/og/caseImage';
import { caseStudySlugs } from '@/data/caseStudies';
import { intlLocales, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';
export const alt = 'Koshman Ecom case study';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return intlLocales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return renderCaseImage(locale as Locale, slug);
}
