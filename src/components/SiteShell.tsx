'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import CookieBanner from './layout/CookieBanner';
import MarsRoamer from './layout/MarsRoamer';
import ContactModalProvider from './ContactModalProvider';
import ServiceLeadProvider from './ServiceLeadProvider';

function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Приватні клієнтські дашборди — без пасхалки з котом і промокодом
  const isDashboard = /^\/(?:[a-z]{2}\/)?dashboard(?:\/|$)/.test(pathname ?? '');

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <CookieBanner />
      {isDashboard ? null : <MarsRoamer />}
    </>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ServiceLeadProvider>
      <ContactModalProvider>
        <SiteChrome>{children}</SiteChrome>
      </ContactModalProvider>
    </ServiceLeadProvider>
  );
}
