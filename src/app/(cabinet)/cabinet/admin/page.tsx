'use client';

import CabinetShell from '@/components/cabinet/CabinetShell';
import AdminPanel from '@/components/cabinet/AdminPanel';

export default function CabinetAdminPage() {
  return <CabinetShell>{(me) => <AdminPanel me={me} />}</CabinetShell>;
}
