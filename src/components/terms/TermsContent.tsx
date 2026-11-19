'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import NextLink from 'next/link';
import { useLocale, useT, useTr } from '@/i18n/LocaleProvider';
import { fop, fopDetailsSuffix, sro } from '@/lib/legal-entities';


/** Дата останнього оновлення документа — як у макеті. */
const UPDATED = 'Оновлено 19 листопада 2026';

type Section = { id: string; title: string; paragraphs: React.ReactNode[] };


/** Винесено зі сторінки, щоб ту саму розмітку рендерити всіма мовами. */
export default function TermsContent() {
  const t = useT();
  const tr = useTr();
  const locale = useLocale();

  /* Розділи 01 і 09 залежать від того, хто надає послуги: на українській
     версії — ФОП, на словацькій і англійській — Koshman s. r. o. Це не
     переклади одного тексту, тому вони тут окремо для кожної мови. */
  const operator =
    locale === 'sk'
      ? `Slovenskú a anglickú verziu webu Koshman Ecom prevádzkuje spoločnosť ${sro.name}, ${sro.street}, ${sro.postalCode} ${sro.city}, IČO ${sro.companyId}, zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel ${sro.registerSection}, vložka č. ${sro.registerFile} („prevádzkovateľ“).`
      : locale === 'en'
        ? `The Slovak and English versions of the Koshman Ecom website are operated by ${sro.name}, ${sro.street}, ${sro.postalCode} ${sro.city}, Slovakia, Company ID ${sro.companyId}, registered in the Commercial Register of the Bratislava III Municipal Court, Section ${sro.registerSection}, File No. ${sro.registerFile} (the “Operator”).`
        : `Українську версію сайту Koshman Ecom та послуги в Україні надає ФОП ${fop.name}${fopDetailsSuffix()} («Виконавець»).`;

  const law: React.ReactNode =
    locale === 'sk' ? (
      'Tieto podmienky sa riadia právom Slovenskej republiky. Spory riešime prednostne dohodou, inak ich rozhodne príslušný súd Slovenskej republiky. Spotrebiteľom zostáva ochrana podľa záväzných predpisov krajiny ich bydliska.'
    ) : locale === 'en' ? (
      'These terms are governed by the laws of the Slovak Republic. We first try to settle disputes by negotiation; otherwise they are decided by the competent court of the Slovak Republic. Consumers keep the protection of the mandatory laws of their country of residence.'
    ) : (
      <>
        Ці умови регулюються законодавством України. Спори ми спершу вирішуємо шляхом переговорів, а якщо це не
        вдалося — у суді України за законом. Послуги для клієнтів з ЄС та інших країн надає {sro.name} за умовами
        на{' '}
        <NextLink href="/en/terms" className="text-brand-orange underline underline-offset-2">
          koshmanecom.com/en/terms
        </NextLink>
        .
      </>
    );

  // Секції тримаємо в компоненті: у них є переклад і посилання
  const SECTIONS: Section[] = [
    {
      id: 'general',
      title: 'Загальні положення',
      paragraphs: [
        <React.Fragment key="operator">{operator}</React.Fragment>,
        'Ці умови регулюють користування сайтом Koshman Ecom та безкоштовними інструментами на ньому. Відкриваючи сайт, ви погоджуєтесь з умовами.',
        'Якщо ви не згодні з умовами, будь ласка, не користуйтеся сайтом.',
      ],
    },
    {
      id: 'site',
      title: 'Користування сайтом',
      paragraphs: [
        'Сайт містить інформацію про послуги агенції, кейси, статті блогу та інструменти для e-commerce.',
        'Заборонено втручатися в роботу сайту, автоматично збирати його вміст, намагатися отримати доступ до закритих розділів або використовувати сайт для незаконних дій.',
      ],
    },
    {
      id: 'tools',
      title: 'Інструменти',
      paragraphs: [
        'Калькулятори, порівняння платформ, ресайзер зображень, SEOgenie та інші інструменти надаються безкоштовно і «як є».',
        'Результати розрахунків орієнтовні та залежать від введених даних і актуальних тарифів платформ. Вони не є фінансовою, податковою чи юридичною консультацією.',
        'Ми можемо змінювати, обмежувати або вимикати інструменти без попередження.',
      ],
    },
    {
      id: 'ip',
      title: 'Авторські права',
      paragraphs: [
        'Тексти, дизайн, логотип, графіка, кейси та код сайту належать Koshman Ecom або використовуються за ліцензією.',
        'Цитування матеріалів дозволене з активним посиланням на сайт. Інше копіювання чи комерційне використання потребує нашої письмової згоди.',
        'Назви та логотипи Etsy, Amazon, Shopify, Pinterest, YouTube та інших платформ належать їхнім власникам.',
      ],
    },
    {
      id: 'orders',
      title: 'Заявки та послуги',
      paragraphs: [
        'Інформація на сайті не є публічною офертою. Вартість, строки та обсяг робіт узгоджуються індивідуально й фіксуються в договорі.',
        <>
          {tr('Надсилаючи заявку, ви підтверджуєте, що вказали достовірні дані та погоджуєтесь на їх обробку згідно з')}{' '}
          <Link href="/privacy" className="text-brand-orange underline underline-offset-2">
            {tr('Політикою конфіденційності')}
          </Link>
          .
        </>,
      ],
    },
    {
      id: 'liability',
      title: 'Обмеження відповідальності',
      paragraphs: [
        'Ми докладаємо зусиль, щоб інформація на сайті була точною, але не гарантуємо її повноту й актуальність.',
        'Ми не відповідаємо за збитки, що виникли через використання сайту, інструментів або рішення, ухвалені на основі їхніх результатів.',
        'Результати кейсів залежать від продукту, ринку та бюджету клієнта і не гарантують таких самих результатів для інших бізнесів.',
      ],
    },
    {
      id: 'links',
      title: 'Посилання на інші сайти',
      paragraphs: [
        'Сайт може містити посилання на сторонні ресурси. Ми не контролюємо їхній вміст і не відповідаємо за їхню роботу та політику конфіденційності.',
      ],
    },
    {
      id: 'changes',
      title: 'Зміни умов',
      paragraphs: [
        'Ми можемо оновлювати ці умови. Нова редакція діє з моменту публікації на цій сторінці.',
      ],
    },
    {
      id: 'law',
      title: 'Застосовне право',
      paragraphs: [law],
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-24 md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Документи')}</div>
          <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
            <h1 className="fs-64 mob-32 font-bold text-white">{tr('Умови використання')}</h1>
            <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">{tr('Правила користування сайтом Koshman Ecom, безкоштовними інструментами та матеріалами\n              сайту.')}</p>
          </div>
          <div className="mt-8 border-t border-[#2C2C2C] pt-5 text-[0.8125rem] text-[#8A8A8A] md:mt-12 md:pt-6 md:text-sm">
            {tr(UPDATED)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="shell grid gap-8 py-10 md:grid-cols-[18.75rem_minmax(0,1fr)] md:items-start md:gap-[7.5rem] md:pb-[7.5rem] md:pt-14">
          {/* Зміст: на телефоні просто список зверху, на десктопі — липкий */}
          <nav className="flex flex-col md:sticky md:top-[7.625rem] md:pt-11">
            <span className="pb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">{tr('Зміст')}</span>
            {SECTIONS.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex gap-3.5 border-t border-[#E4E4E4] py-2.5 text-[0.9375rem] leading-[1.35] text-[#222222] transition-colors hover:text-brand-orange"
              >
                <span className="w-[1.375rem] flex-none font-semibold text-[#8A8A8A]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{tr(section.title)}</span>
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
                    {tr(section.title)}
                  </h2>
                </div>
                {section.paragraphs.map((text, j) => (
                  <p
                    key={j}
                    className="mob-15 max-w-[47.5rem] text-base leading-[1.65] text-[#444444] md:text-[1.0625rem]"
                  >
                    {typeof text === 'string' ? tr(text) : text}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
