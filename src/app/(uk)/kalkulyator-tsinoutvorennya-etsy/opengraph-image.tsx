import { renderOg, ogContentType, ogSize } from '@/og/render';
import { PRICING_CALC_COPY } from '@/data/etsyPricingCalculator';

export const dynamic = 'force-static';
export const alt = PRICING_CALC_COPY.uk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const c = PRICING_CALC_COPY.uk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
