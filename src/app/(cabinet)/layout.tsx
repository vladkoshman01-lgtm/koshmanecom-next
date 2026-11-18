import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import '../globals.css';
import { CabinetAuthProvider } from '@/components/cabinet/CabinetShell';

const fontDisplay = Onest({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = { themeColor: '#FF5B2B' };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const title = 'Кабінет клієнта — Koshman Ecom';
const description = 'Звіти по вашій рекламі в Pinterest, ChatGPT та інших платформах. Цифри оновлюються щодня.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // У пошук не потрапляє, але в месенджерах посилання показується карткою з картинкою
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title, description, url: `${siteUrl}/cabinet`, siteName: 'Koshman Ecom', locale: 'uk_UA', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

/**
 * Окремий кореневий layout кабінету: без шапки сайту, кота, банера cookies
 * і Google Analytics — клієнтські звіти не змішуємо з трекінгом сайту.
 */
export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${fontDisplay.variable} min-h-screen bg-[#FAFAFA] antialiased`}>
        <CabinetAuthProvider>{children}</CabinetAuthProvider>
      </body>
    </html>
  );
}
