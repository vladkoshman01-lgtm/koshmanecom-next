import { renderOg, ogContentType, ogSize } from '@/og/render';
import { RESIZER_COPY } from '@/data/imageResizer';
import { intlLocales, type Locale } from '@/lib/i18n';

export const dynamic = 'force-static';
export const alt = RESIZER_COPY.en.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = RESIZER_COPY[locale as Locale];
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
