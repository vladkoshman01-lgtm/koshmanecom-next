'use client';

import React, { useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import { FAQ } from '@/data/resources';
import { useT, useTr } from '@/i18n/LocaleProvider';

/** Часті запитання: ліва колонка липка, праворуч акордеон. */
export default function Faq() {
  const t = useT();
  const tr = useTr();

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="sec-y bg-[#EEEEEE] max-md:pt-2">
      <div className="shell grid grid-cols-1 items-start gap-10 grid-faq md:gap-20">
      <div className="md:sticky md:top-[6.875rem]">
        <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
          {t.home.faq.eyebrow}
        </div>
        <h2 className="fs-48 mob-26 mt-3 font-bold text-[#222222]">
          {t.home.faq.title}
        </h2>
        <p className="mt-4 text-base leading-[1.5] text-[#555555]">
          {t.home.faq.text}
        </p>
        <Link
          href="#lead"
          className="mt-6 inline-flex text-base font-bold uppercase tracking-[0.02em] text-brand-orange"
        >
          {t.home.faq.cta} <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Кожне питання — окрема біла картка з проміжком 10px, як у макеті */}
      <div className="mt-[1.375rem] flex flex-col gap-2.5 md:mt-0">
        {FAQ.map(([question, answer, link], i) => {
          const isOpen = open === i;
          return (
            <div
              key={tr(question)}
              className="overflow-hidden rounded-xl border-[1.5px] border-white bg-white transition-colors duration-300 md:rounded-md"
            >
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3.5 p-[1.125rem] text-left md:grid md:grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] md:items-center md:gap-4 md:p-0 md:pb-6 md:pl-[1.75rem] md:pr-6 md:pt-6"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#FDE3D8] text-[0.875rem] font-bold text-brand-orange md:h-auto md:w-auto md:rounded-none md:bg-transparent md:tracking-[0.06em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 pt-[3px] text-[1rem] font-semibold leading-[1.3] text-[#1a1a1a] md:pt-0 md:text-[1.25rem] md:text-[#222222]">
                    {tr(question)}
                  </span>
                  {/* Телефон: сірий шеврон без підкладки.
                      Десктоп: квадрат — сірий у закритому стані, помаранчевий у відкритому. */}
                  <span
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-md transition-colors duration-300 md:h-11 md:w-11 ${
                      isOpen
                        ? 'bg-brand-orange text-white'
                        : 'text-[#8A8A8A] md:bg-[#F2F2F2] md:text-[#222222]'
                    }`}
                    aria-hidden
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="transition-transform duration-[350ms] ease-[cubic-bezier(.65,0,.25,1)]"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.65,0,.25,1)]"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="mob-15 px-[1.125rem] pb-[1.125rem] text-base leading-[1.6] text-[#555555] md:pb-[1.625rem] md:pl-[5.5rem] md:pr-[5.75rem]">
                    {tr(answer)}
                    {link && (
                      <Link
                        href={link}
                        className="mt-4 flex w-fit items-center gap-2 text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-brand-orange transition-opacity hover:opacity-80"
                      >
                        {tr('Порахувати свій прибуток')} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
