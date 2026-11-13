import { renderOg, ogContentType, ogSize } from '@/og/render';
import { ogContent } from '@/og/pages';
import { servicePageSlugs } from '@/data/servicePages';

export const dynamic = 'force-static';
export const alt = 'Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return servicePageSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderOg(ogContent('uk', 'service', slug));
}
