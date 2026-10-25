import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import Home from '@/views/Home';
import JsonLd from '@/components/JsonLd';
import { homeJsonLd } from '@/lib/homeJsonLd';

export const metadata: Metadata = pageMeta('uk', 'home');

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd('uk')} />
      <Home />
    </>
  );
}
