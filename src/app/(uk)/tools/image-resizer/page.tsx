import type { Metadata } from 'next';
import ImageResizerPage, { resizerMetadata } from '@/components/tools/ImageResizerPage';

export const metadata: Metadata = resizerMetadata('uk');

export default function Page() {
  return <ImageResizerPage locale="uk" />;
}
