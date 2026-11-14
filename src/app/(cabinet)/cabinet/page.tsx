'use client';

import { Suspense } from 'react';
import CabinetShell, { Spinner } from '@/components/cabinet/CabinetShell';
import DashboardList from '@/components/cabinet/DashboardList';

export default function CabinetHomePage() {
  return (
    <CabinetShell>
      {(me) => (
        <Suspense fallback={<Spinner />}>
          <DashboardList me={me} />
        </Suspense>
      )}
    </CabinetShell>
  );
}
