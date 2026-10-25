import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import CareerList from '@/components/career/CareerList';
import ApplyForm from '@/components/career/ApplyForm';

export const metadata: Metadata = pageMeta('uk', 'career');

export default function Page() {
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd('uk', 'career')} />
      <CareerList />
      <ApplyForm />
    </div>
  );
}
