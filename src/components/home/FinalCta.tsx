'use client';

import React from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { contacts } from '@/lib/nav';
import { useT } from '@/i18n/LocaleProvider';

/** Фінальна помаранчева секція перед футером. */
export default function FinalCta() {
  const t = useT();

  return (
    <section className="sec-y bg-brand-orange">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
      <h2 className="fs-39 mob-24 font-medium text-white">
        {t.home.finalCta.title}
      </h2>

      <div className="flex flex-col items-start gap-5">
        {/* «Написати» — у чат із менеджером, а не в канал, де писати не можна */}
        <AnimatedButton variant="light" icon="telegram" href={contacts.telegramManager}>
          {t.common.writeTelegram}
        </AnimatedButton>
        <a
          href={`mailto:${contacts.email}`}
          className="inline-flex items-center gap-2 text-base text-white hover:opacity-80"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
          </svg>
          {contacts.email}
        </a>
      </div>
      </div>
    </section>
  );
}
