'use client';

import React from 'react';
import { useT, useTr } from '@/i18n/LocaleProvider';
import Link from '@/components/ui/LocaleLink';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { RESOURCE_GRADIENTS, RESOURCE_LINKS, RESOURCES } from '@/data/resources';

/** «Наші ресурси» — картки інструментів з анімованим градієнтом на ховері. */
export default function Resources() {
  const t = useT();
  const tr = useTr();

  return (
    <section id="tools" className="sec-y bg-[#141414]">
      <div className="shell">
      <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
        {t.home.resources.eyebrow}
      </div>
      <h2 className="fs-48 mob-26 mt-3 font-bold text-white">
        {t.home.resources.title}
      </h2>
      <p className="mt-3 text-base leading-[1.4] text-white md:text-[1.0625rem]">
        {t.home.resources.text}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-[0.9375rem] md:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map(([title, description, gradient, icon], i) => (
          <Link
            key={tr(title)}
            href={RESOURCE_LINKS[i]}
            {...(RESOURCE_LINKS[i].startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="resource-card group flex min-h-[16.25rem] flex-col rounded-[0.1875rem] p-7 text-white transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_22px_44px_rgba(0,0,0,.6)]"
            style={{ '--res-bg': RESOURCE_GRADIENTS[gradient] } as React.CSSProperties}
          >
            <span className="flex h-[2.9375rem] w-[2.9375rem] flex-none items-center justify-center rounded-lg border border-white/40 bg-white/[0.22]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d={icon} />
              </svg>
            </span>
            <span className="mt-[1.4375rem] text-[1.125rem] font-semibold leading-[1.25]">{tr(title)}</span>
            <span className="mt-2 max-w-[21.875rem] text-[0.96875rem] leading-[1.35]">{tr(description)}</span>
            <span className="mt-auto flex items-center gap-2.5 text-[0.9375rem] text-brand-orange">
              {t.common.openTool} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* У макеті по центру, відступ 54px */}
      <div className="mt-[3.375rem] flex justify-center">
        <AnimatedButton variant="primary" href="/tools">
          {t.home.resources.all}
        </AnimatedButton>
      </div>
      </div>
    </section>
  );
}
