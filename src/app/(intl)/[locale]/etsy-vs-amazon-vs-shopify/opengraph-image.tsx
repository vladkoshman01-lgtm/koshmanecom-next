import { renderOg, ogContentType, ogSize } from '@/og/render';
import { COMPARISON_COPY } from '@/data/platformComparison';

export const dynamic = 'force-static';
export const alt = COMPARISON_COPY.en.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default function Image() {
  const c = COMPARISON_COPY.en;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
