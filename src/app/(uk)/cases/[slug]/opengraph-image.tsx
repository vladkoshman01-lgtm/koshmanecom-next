import { ogContentType, ogSize } from '@/og/render';
import { renderCaseImage } from '@/og/caseImage';
import { caseStudySlugs } from '@/data/caseStudies';

export const dynamic = 'force-static';
export const alt = 'Кейс Koshman Ecom';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCaseImage('uk', slug);
}
