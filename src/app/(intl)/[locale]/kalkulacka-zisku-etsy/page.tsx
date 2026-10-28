import type { Metadata } from 'next';
import EtsyProfitPage, { profitCalcMetadata } from '@/components/tools/EtsyProfitPage';

// Адреса калькулятора своя для кожної мови — ця існує лише в sk
export function generateStaticParams() {
  return [{ locale: 'sk' }];
}
export const dynamicParams = false;

export const metadata: Metadata = profitCalcMetadata('sk');

export default function Page() {
  return <EtsyProfitPage locale="sk" />;
}
