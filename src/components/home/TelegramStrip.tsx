'use client';

import React from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { contacts } from '@/lib/nav';
import { useT } from '@/i18n/LocaleProvider';

/** Помаранчева смужка з переходом у телеграм-канал. */
export default function TelegramStrip() {
  const t = useT();

  return (
    <section className="sec-y bg-brand-orange">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
      <div>
        <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-white">
          {t.home.telegram.eyebrow}
        </div>
        <h2 className="fs-37 mob-24 mt-3 font-medium text-white">
          {t.home.telegram.title}
        </h2>
      </div>
      <AnimatedButton variant="light" icon="telegram" href={contacts.telegram} className="self-start md:mt-9">
        {t.common.viewTelegram}
      </AnimatedButton>
      </div>
    </section>
  );
}
