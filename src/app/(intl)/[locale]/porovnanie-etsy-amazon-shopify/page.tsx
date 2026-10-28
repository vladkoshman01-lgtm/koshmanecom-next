import type { Metadata } from 'next';
import PlatformComparisonPage, { comparisonMetadata } from '@/components/tools/PlatformComparisonPage';

// Адреса інструмента своя для кожної мови — ця існує лише в sk
export function generateStaticParams() {
  return [{ locale: 'sk' }];
}
export const dynamicParams = false;

export const metadata: Metadata = comparisonMetadata('sk');

export default function Page() {
  return <PlatformComparisonPage locale="sk" />;
}
