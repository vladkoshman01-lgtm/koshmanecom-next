import type { Metadata } from 'next';
import PlatformComparisonPage, { comparisonMetadata } from '@/components/tools/PlatformComparisonPage';

export const metadata: Metadata = comparisonMetadata('uk');

export default function Page() {
  return <PlatformComparisonPage locale="uk" />;
}
