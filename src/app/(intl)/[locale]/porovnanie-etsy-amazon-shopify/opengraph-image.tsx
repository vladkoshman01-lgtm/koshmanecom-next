import { renderOg, ogContentType, ogSize } from '@/og/render';
import { COMPARISON_COPY } from '@/data/platformComparison';

export const dynamic = 'force-static';
export const alt = COMPARISON_COPY.sk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ locale: 'sk' }];
}

export default function Image() {
  const c = COMPARISON_COPY.sk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
