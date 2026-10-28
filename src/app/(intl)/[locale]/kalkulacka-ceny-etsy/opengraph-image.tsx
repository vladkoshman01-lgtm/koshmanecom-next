import { renderOg, ogContentType, ogSize } from '@/og/render';
import { PRICING_CALC_COPY } from '@/data/etsyPricingCalculator';

export const dynamic = 'force-static';
export const alt = PRICING_CALC_COPY.sk.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ locale: 'sk' }];
}

export default function Image() {
  const c = PRICING_CALC_COPY.sk;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
