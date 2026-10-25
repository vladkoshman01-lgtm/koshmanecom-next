import { renderOg, ogContentType, ogSize } from '@/og/render';
import { ogContent } from '@/og/pages';
import { intlLocales, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';
export const alt = 'Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOg(ogContent(locale as Locale, 'privacy'));
}
