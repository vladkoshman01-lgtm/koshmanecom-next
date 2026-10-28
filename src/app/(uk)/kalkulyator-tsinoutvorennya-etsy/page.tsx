import type { Metadata } from 'next';
import EtsyPricingPage, { pricingCalcMetadata } from '@/components/tools/EtsyPricingPage';

export const metadata: Metadata = pricingCalcMetadata('uk');

export default function Page() {
  return <EtsyPricingPage locale="uk" />;
}
