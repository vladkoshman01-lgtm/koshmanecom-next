import type { Metadata } from 'next';
import ImageResizerPage, { resizerMetadata } from '@/components/tools/ImageResizerPage';
import { intlLocales, type Locale } from '@/lib/i18n';

// Адреса однакова всіма мовами
export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return resizerMetadata(locale as Locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ImageResizerPage locale={locale as Locale} />;
}
