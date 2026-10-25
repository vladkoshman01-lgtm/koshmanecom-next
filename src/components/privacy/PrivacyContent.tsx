'use client';

import React from 'react';
import { useTr } from '@/i18n/LocaleProvider';
import { contacts } from '@/lib/nav';

/**
 * Політика конфіденційності за прототипом Privacy.dc.html — та сама
 * структура, що й в «Умовах використання»: темний перший екран,
 * липкий зміст ліворуч і розділи праворуч.
 */

/** Дата останнього оновлення документа — як у макеті. */
const UPDATED = 'Оновлено 15 жовтня 2026';

const SECTIONS: { id: string; title: string; paragraphs: string[] }[] = [
  {
    id: 'who',
    title: 'Хто ми',
    paragraphs: [
      'Koshman Ecom — маркетинг-агенція для e-commerce бізнесів з офісами в Києві (Україна) та Кошицях (Словаччина). Ми є володільцем персональних даних, які ви передаєте через цей сайт.',
      'З питань обробки даних пишіть на',
    ],
  },
  {
    id: 'data',
    title: 'Які дані ми збираємо',
    paragraphs: [
      'Дані, які ви вказуєте у формах: імʼя, телефон або Telegram, email, коментар до заявки, обрані послуги.',
      'Технічні дані: IP-адреса, тип браузера й пристрою, сторінки, які ви переглядали, джерело переходу. Їх збирають файли cookie та сервіси аналітики.',
    ],
  },
  {
    id: 'purpose',
    title: 'Навіщо ми їх використовуємо',
    paragraphs: [
      'Щоб звʼязатися з вами щодо заявки, уточнити задачу й підготувати пропозицію.',
      'Щоб виконувати договір, якщо ви стали нашим клієнтом.',
      'Щоб аналізувати відвідуваність і покращувати сайт.',
      'Ми не надсилаємо рекламні розсилки без вашої окремої згоди.',
    ],
  },
  {
    id: 'legal',
    title: 'Правові підстави',
    paragraphs: [
      'Ми обробляємо дані відповідно до Закону України «Про захист персональних даних» та Загального регламенту ЄС про захист даних (GDPR).',
      'Підстави обробки: ваша згода, укладення й виконання договору, наш законний інтерес у роботі та безпеці сайту.',
    ],
  },
  {
    id: 'cookies',
    title: 'Файли cookie',
    paragraphs: [
      'Сайт використовує необхідні cookie для роботи сторінок і аналітичні cookie для статистики відвідувань.',
      'Ви можете вимкнути або видалити cookie в налаштуваннях браузера. Частина функцій сайту після цього може працювати некоректно.',
    ],
  },
  {
    id: 'share',
    title: 'Передача третім особам',
    paragraphs: [
      'Ми не продаємо й не передаємо ваші дані для маркетингу інших компаній.',
      'Дані можуть оброблятися нашими підрядниками: хостинг, CRM, сервіси аналітики та месенджери. Вони отримують лише те, що потрібно для їхньої роботи, і зобовʼязані захищати ці дані.',
      'Ми розкриваємо дані державним органам лише у випадках, передбачених законом.',
    ],
  },
  {
    id: 'storage',
    title: 'Строк зберігання',
    paragraphs: [
      'Дані із заявок зберігаємо до 3 років після останнього контакту або до відкликання згоди.',
      'Дані клієнтів зберігаємо протягом строку дії договору та строку, встановленого законодавством для бухгалтерських документів.',
    ],
  },
  {
    id: 'rights',
    title: 'Ваші права',
    paragraphs: [
      'Ви можете в будь-який момент запросити доступ до своїх даних, їх виправлення, видалення або обмеження обробки, а також відкликати згоду.',
      'Щоб скористатися правом, напишіть нам на email. Відповідаємо протягом 30 днів.',
      'Ви також маєте право подати скаргу до Уповноваженого Верховної Ради України з прав людини або до наглядового органу країни ЄС.',
    ],
  },
  {
    id: 'changes',
    title: 'Зміни до політики',
    paragraphs: [
      'Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на цій сторінці, дата оновлення вказана вгорі.',
    ],
  },
];

export default function PrivacyContent() {
  const tr = useTr();

  return (
    <div className="bg-white">
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-24 md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
            {tr('Документи')}
          </div>
          <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
            <h1 className="fs-64 mob-32 font-bold text-white">
              {tr('Політика конфіденційності')}
            </h1>
            <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">
              {tr(
                'Як Koshman Ecom збирає, використовує та захищає дані відвідувачів сайту й клієнтів.',
              )}
            </p>
          </div>
          <div className="mt-8 border-t border-[#2C2C2C] pt-5 text-[0.8125rem] text-[#8A8A8A] md:mt-12 md:pt-6 md:text-sm">
            {tr(UPDATED)}
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
                {section.paragraphs.map((text) => (
                  <p
                    key={text}
                    className="mob-15 max-w-[47.5rem] text-base leading-[1.65] text-[#444444] md:text-[1.0625rem]"
                  >
                    {tr(text)}
                    {/* Пошта підставляється з даних, щоб не розходилася з футером */}
                    {text.endsWith('пишіть на') ? (
                      <>
                        {' '}
                        <a
                          href={`mailto:${contacts.email}`}
                          className="text-brand-orange underline underline-offset-2"
                        >
                          {contacts.email}
                        </a>
                        .
                      </>
                    ) : null}
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
