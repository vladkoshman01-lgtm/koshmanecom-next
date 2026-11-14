'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Eye } from 'lucide-react';
import { cabinetCall, errorMessage, type DashboardSummary, type Me } from '@/lib/cabinet/api';
import { Spinner } from './CabinetShell';
import PlatformLogo from './PlatformLogo';

/**
 * «Мої дашборди». Адмін сюди потрапляє лише з ?as=<clientId> — щоб побачити
 * кабінет очима клієнта; без нього його перекидає в адмінку.
 */
export default function DashboardList({ me }: { me: Me }) {
  const router = useRouter();
  const asClient = useSearchParams().get('as');
  const [dashboards, setDashboards] = useState<DashboardSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (me.isAdmin && !asClient) {
      router.replace('/cabinet/admin');
      return;
    }
    cabinetCall<{ dashboards: DashboardSummary[] }>('listDashboards', asClient ? { clientId: asClient } : {})
      .then((r) => setDashboards(r.dashboards))
      .catch((e) => setError(errorMessage(e)));
  }, [me.isAdmin, asClient, router]);

  if (error) return <p className="py-16 text-center font-semibold text-[#141414]">{error}</p>;
  if (!dashboards) return <Spinner />;

  const groups = new Map<string, DashboardSummary[]>();
  for (const d of dashboards) {
    const key = d.clientName ?? '';
    groups.set(key, [...(groups.get(key) ?? []), d]);
  }
  const showClientNames = groups.size > 1;

  return (
    <div className="py-8 md:py-12">
      {me.isAdmin && asClient ? (
        <div className="mb-6 flex flex-wrap items-center gap-3 bg-[#FDE3D8] px-4 py-3 text-sm text-[#141414]">
          <Eye className="h-4 w-4 text-brand-orange" aria-hidden="true" />
          Так кабінет бачить клієнт «{dashboards[0]?.clientName ?? asClient}».
          <Link href="/cabinet/admin" className="ml-auto font-semibold text-brand-orange">
            Назад в адмінку
          </Link>
        </div>
      ) : null}
      {groups.size === 1 && dashboards[0]?.clientName ? (
        // Кабінет одного клієнта: його назва замість безликого «Ваші звіти»
        <div>
          <h1 className="text-[1.75rem] font-bold leading-tight text-[#141414]">{dashboards[0].clientName}</h1>
          <p className="mt-1 text-[0.9375rem] text-[#5A5A5A]">Звіти по рекламі</p>
        </div>
      ) : (
        <h1 className="text-[1.75rem] font-bold text-[#141414]">Ваші звіти</h1>
      )}
      {dashboards.length === 0 ? (
        <p className="mt-4 text-[#5A5A5A]">Звітів поки немає. Ми додамо їх, щойно підключимо рекламу.</p>
      ) : null}
      {[...groups.entries()].map(([clientName, items]) => (
        <section key={clientName} className="mt-8">
          {showClientNames ? (
            <h2 className="mb-3 text-lg font-semibold text-[#141414]">{clientName}</h2>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d) => (
              <Link
                key={d.id}
                href={`/cabinet/d?id=${encodeURIComponent(d.id)}`}
                className="group flex flex-col border-[1.5px] border-[#E5E5E5] bg-white p-5 transition hover:border-[#141414]"
              >
                <span className="flex items-center gap-3">
                  <PlatformLogo type={d.type} />
                  <span className="min-w-0">
                    {/* Платформу підписуємо, лише коли назва звіту її не повторює */}
                    {d.title.trim().toLowerCase() !== d.typeLabel.toLowerCase() ? (
                      <span className="block text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">{d.typeLabel}</span>
                    ) : null}
                    <span className="block text-lg font-semibold text-[#141414]">{d.title}</span>
                  </span>
                </span>
                <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
                  Відкрити звіт <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
