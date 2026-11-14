'use client';

import { Suspense } from 'react';
import CabinetShell, { Spinner } from '@/components/cabinet/CabinetShell';
import AdsReportView from '@/components/cabinet/AdsReportView';

/** Звіт за адресою /cabinet/d?id=… — статичний експорт не вміє динамічних шляхів без списку id. */
export default function CabinetDashboardPage() {
  return (
    <CabinetShell>
      {(me) => (
        <Suspense fallback={<Spinner />}>
          <AdsReportView me={me} />
        </Suspense>
      )}
    </CabinetShell>
  );
}
