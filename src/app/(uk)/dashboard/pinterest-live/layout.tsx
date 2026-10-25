import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Pinterest Live Dashboard | Koshman Ecom',
  description: 'Приватний live-дашборд Pinterest Ads з даними напряму з API.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: `${siteUrl}/dashboard/pinterest-live`,
  },
};

export default function PinterestLiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
