import { renderOg, ogContentType, ogSize } from '@/og/render';
import { ogContent } from '@/og/pages';
import { careerRoles } from '@/lib/careers';
import { intlLocales, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';
export const alt = 'Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return intlLocales.flatMap((locale) => careerRoles.map((role) => ({ locale, slug: role.slug })));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return renderOg(ogContent(locale as Locale, 'vacancy', slug));
}
