import { renderOg, ogContentType, ogSize } from '@/og/render';
import { COMPARISON_COPY } from '@/data/platformComparison';

export const dynamic = 'force-static';
export const alt = COMPARISON_COPY.uk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const c = COMPARISON_COPY.uk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
