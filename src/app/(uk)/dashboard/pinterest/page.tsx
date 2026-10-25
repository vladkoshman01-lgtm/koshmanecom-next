import type { Metadata } from 'next';
import PinterestDashboard from '@/components/PinterestDashboard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Pinterest Dashboard | Koshman Ecom',
  description:
    'Приватний Pinterest dashboard для ручного завантаження CSV-звітів та перегляду аналітики кампаній.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: `${siteUrl}/dashboard/pinterest`,
  },
};

export default function PinterestDashboardPage() {
  return (
    <main className="bg-slate-50">
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <PinterestDashboard />
        </div>
      </section>
    </main>
  );
}
