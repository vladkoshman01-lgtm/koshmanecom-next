'use client';

import React from 'react';
import YouTubeEmbed from '@/components/ui/YouTubeEmbed';
import { useT } from '@/i18n/LocaleProvider';

/** «3 речі, за рахунок чого зрости в продажах» — темна секція з відео. */
export default function ForWhom() {
  const t = useT();

  return (
    <section id="for-whom" className="sec-y bg-[#141414]">
      <div className="shell">
      <h2 className="fs-48 mob-26 font-bold text-white">
        {t.home.forWhom.title}
      </h2>
      <p className="text-lead mob-15 mt-4 max-w-[79.375rem] text-white md:mt-[1.375rem] md:leading-[1.6]">
        {t.home.forWhom.text}
      </p>

      {/* Превʼю — кадр із самого відео (перші секунди), рамка під його
          пропорції 2000/1053, щоб нічого не обрізалося. */}
      <YouTubeEmbed
        id="lEznWdoevXE"
        title={t.home.forWhom.videoTitle}
        poster="/video/growth-cover.webp"
        className="mt-6 aspect-[2000/1053] w-full"
      />
      </div>
    </section>
  );
}
