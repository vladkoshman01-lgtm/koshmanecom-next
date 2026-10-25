'use client';

import React, { useState } from 'react';
import { useT } from '@/i18n/LocaleProvider';

/** Рядок «Поділитися» під статтею: Telegram, LinkedIn і копіювання посилання. */
export default function ShareBar({ url, title }: { url: string; title: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер обміну недоступний (старий браузер, http) — просто нічого не робимо
    }
  };

  const linkClass =
    'flex h-10 items-center border-[1.5px] border-[#DDDDDD] bg-white px-4 text-sm font-medium text-[#222222] transition-colors hover:border-brand-orange hover:text-brand-orange';

  return (
    <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-[#DDDDDD] pt-6">
      <span className="mr-1.5 text-sm text-[#8A8A8A]">{t.blog.share}</span>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Telegram
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn
      </a>
      <button type="button" onClick={copy} className={`${linkClass} cursor-pointer`}>
        {copied ? t.blog.copied : t.blog.copy}
      </button>
    </div>
  );
}
