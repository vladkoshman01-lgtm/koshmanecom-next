import { renderOg, ogContentType, ogSize } from '@/og/render';
import { ogContent } from '@/og/pages';

export const dynamic = 'force-static';
export const alt = 'Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg(ogContent('uk', 'terms'));
}
