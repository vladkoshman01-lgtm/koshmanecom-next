'use client';

import React from 'react';
import { useLocale, useTr } from '@/i18n/LocaleProvider';
import { privacyDocs, type Block } from './privacyDocs';

/**
 * Політика конфіденційності за прототипом Privacy.dc.html — та сама
 * структура, що й в «Умовах використання»: темний перший екран,
 * липкий зміст ліворуч і розділи праворуч.
 *
 * Тексти для кожної мови — у privacyDocs.tsx.
 */

const textClass = 'mob-15 max-w-[47.5rem] text-base leading-[1.65] text-[#444444] md:text-[1.0625rem]';

function BlockView({ block }: { block: Block }) {
  if ('p' in block) return <p className={textClass}>{block.p}</p>;
  if ('ul' in block) {
    return (
      <ul className={`${textClass} flex list-disc flex-col gap-2 pl-5 marker:text-brand-orange`}>
        {block.ul.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="max-w-[47.5rem] overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.875rem] leading-[1.5] text-[#444444] md:text-[0.9375rem]">
        <thead>
          <tr>
            {block.table.head.map((cell) => (
              <th
                key={cell}
                className="border-b-[1.5px] border-[#222222] py-2.5 pr-4 align-bottom text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-[#222222]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border-b border-[#E4E4E4] py-2.5 pr-4 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyContent() {
  const tr = useTr();
  const doc = privacyDocs[useLocale()];
  const SECTIONS = doc.sections;

  return (
    <div className="bg-white">
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-24 md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
            {tr('Документи')}
          </div>
          <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
            <h1 className="fs-64 mob-32 font-bold text-white">
              {doc.title}
            </h1>
            <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">
              {tr(
                'Як Koshman Ecom збирає, використовує та захищає дані відвідувачів сайту й клієнтів.',
              )}
            </p>
          </div>
          <div className="mt-8 border-t border-[#2C2C2C] pt-5 text-[0.8125rem] text-[#8A8A8A] md:mt-12 md:pt-6 md:text-sm">
            {doc.updated}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell grid gap-8 py-10 md:grid-cols-[18.75rem_minmax(0,1fr)] md:items-start md:gap-[7.5rem] md:pb-[7.5rem] md:pt-14">
          {/* Зміст: на телефоні списком зверху, на десктопі — липкий */}
          <nav className="flex flex-col md:sticky md:top-[7.625rem] md:pt-11">
            <span className="pb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
              {tr('Зміст')}
            </span>
            {SECTIONS.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex gap-3.5 border-t border-[#E4E4E4] py-2.5 text-[0.9375rem] leading-[1.35] text-[#222222] transition-colors hover:text-brand-orange"
              >
                <span className="w-[1.375rem] flex-none font-semibold text-[#8A8A8A]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col">
            {SECTIONS.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="flex scroll-mt-16 flex-col gap-4 border-t border-[#E4E4E4] py-8 md:scroll-mt-[5.125rem] md:py-11"
              >
                <div className="flex items-baseline gap-4 md:gap-[1.125rem]">
                  <span className="text-[0.8125rem] font-bold tracking-[0.12em] text-brand-orange md:text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mob-23 text-2xl font-bold leading-[1.15] text-[#222222] md:text-[2rem]">
                    {section.title}
                  </h2>
                </div>
                {section.blocks.map((block, j) => (
                  <BlockView key={j} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
