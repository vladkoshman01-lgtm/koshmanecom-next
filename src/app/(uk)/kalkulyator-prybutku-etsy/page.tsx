import type { Metadata } from 'next';
import EtsyProfitPage, { profitCalcMetadata } from '@/components/tools/EtsyProfitPage';

export const metadata: Metadata = profitCalcMetadata('uk');

export default function Page() {
  return <EtsyProfitPage locale="uk" />;
}
