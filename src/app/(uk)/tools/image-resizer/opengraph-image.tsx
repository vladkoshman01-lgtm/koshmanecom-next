import { renderOg, ogContentType, ogSize } from '@/og/render';
import { RESIZER_COPY } from '@/data/imageResizer';

export const dynamic = 'force-static';
export const alt = RESIZER_COPY.uk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const c = RESIZER_COPY.uk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
