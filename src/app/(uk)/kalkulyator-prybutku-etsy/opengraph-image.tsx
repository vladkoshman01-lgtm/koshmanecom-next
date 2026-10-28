import { renderOg, ogContentType, ogSize } from '@/og/render';
import { PROFIT_CALC_COPY } from '@/data/etsyProfitCalculator';

export const dynamic = 'force-static';
export const alt = PROFIT_CALC_COPY.uk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const c = PROFIT_CALC_COPY.uk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
