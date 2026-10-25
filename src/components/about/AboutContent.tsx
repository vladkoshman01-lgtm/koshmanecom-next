'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import { CARD_GRADIENTS } from '@/data/services';
import { useServiceLead } from '@/components/ServiceLeadProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useT, useTr } from '@/i18n/LocaleProvider';

/** Сторінка «Про нас» за прототипом About.dc.html. */

const HERO_TAGS = [
  'Сайти та інтернет-магазини',
  'Реклама',
  'Маркетплейси',
  'AI-автоматизація',
  'Брендинг',
];

const APPROACH: [string, string][] = [
  ['Продукт', 'Позиціонування та цінність.'],
  ['Ринок', 'Попит і конкурентна стратегія.'],
  ['Система', 'Контент, трафік, AI, операційка.'],
];

const DOING: [string, string, string][] = [
  [
    'Запускаємо продажі на маркетплейсах',
    'Виходимо на Etsy, Amazon Handmade, eBay та інші платформи.',
    'blue',
  ],
  [
    'Створюємо та оптимізуємо магазини на Etsy',
    'Структура, SEO-листинги, аналітика, регулярне оновлення.',
    'orange',
  ],
  [
    'Окремо розробляємо сайти на Shopify',
    'Дизайн, UX, інтеграції та готовність до масштабування.',
    'silver',
  ],
  ['Знаходимо попит і ніші', 'Дані, тренди та аналіз конкурентів перед запуском.', 'orange'],
  ['Інтегруємо AI у бізнес-процеси', 'Автоматизація контенту, рутин та аналітики.', 'silver'],
  [
    'Масштабуємо через рекламу та контент',
    'Meta, TikTok, Pinterest, SEO та контент-стратегії.',
    'blue',
  ],
];

const TEAM = [
  {
    name: 'Влад Кошман',
    role: 'Засновник',
    image: '/team/Vlad.png',
    description:
      'Спеціаліст з міжнародного e-commerce. Відповідає за стратегію, запуск продажів та AI-впровадження у бізнес-процеси.',
  },
  {
    name: 'Ліза Кошман',
    role: 'Співвласниця',
    image: '/team/Liza.png',
    description:
      'Стратегічна менеджерка в роботі з брендами в Ecommerce. Керівниця відділу роботи з Shopify-екосистемою.',
  },
];

export default function AboutContent() {
  const t = useT();
  const tr = useTr();
  const { openLead } = useServiceLead();

  return (
    <>
      {/* Перший екран */}
      <section className="bg-[#141414]">
        <div className="shell py-14 md:py-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Про нас')}</div>
          <h1 className="fs-64 mob-32 mt-4 max-w-[62.5rem] font-bold text-white md:mt-[1.125rem]">{tr('Маркетингова агенція для e-commerce бізнесу')}</h1>

          <div className="mt-7 grid gap-7 md:mt-10 md:grid-cols-[minmax(0,1fr)_26.25rem] md:items-end md:gap-20">
            <p className="mob-16 max-w-[47.5rem] text-base leading-[1.55] text-[#CFCFCF] md:text-[1.1875rem]">{tr('Koshman Ecom — команда повного циклу для онлайн-продажів. Створюємо сайти та\n              інтернет-магазини, запускаємо рекламу на будь-якому майданчику, виводимо бренди на\n              маркетплейси й автоматизуємо процеси за допомогою AI. Працюємо з B2C та B2B бізнесами\n              на локальних і міжнародних ринках.')}</p>
            <div className="flex flex-wrap gap-2.5">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="flex h-10 items-center border-[1.5px] border-[#3A3A3A] px-4 text-[0.8125rem] text-white md:text-sm"
                >
                  {tr(tag)}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex md:mt-11">
            <AnimatedButton variant="primary" onClick={() => openLead('Обговорити проєкт', 'Про нас')}>{tr('Обговорити проєкт')}</AnimatedButton>
          </div>
        </div>
      </section>

      {/* Наш фокус */}
      <section className="bg-white">
        <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_37.5rem] md:items-start md:gap-20 md:py-[7.5rem]">
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Наш фокус')}</div>
            <h2 className="fs-46 mob-26 font-bold text-[#222222]">{tr('Фокус на стабільні продажі, а не разові запуски')}</h2>
            <p className="mob-15 max-w-[35rem] text-base leading-[1.55] text-[#555555] md:text-[1.0625rem]">{tr('Ми обʼєднуємо стратегію, операційну підтримку та AI-автоматизацію в єдиний робочий\n              процес, щоб бізнес зростав стабільно.')}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:gap-[0.9375rem]">
            <div className="flex min-h-[12.5rem] flex-col justify-between bg-brand-orange px-5 py-6 text-white md:min-h-[17.5rem] md:px-7 md:py-8">
              <span className="text-[3.5rem] font-bold leading-[0.9] md:text-[6rem] tracking-[-0.03em]">
                5+
              </span>
              <span className="flex flex-col gap-2">
                <span className="text-base font-semibold md:text-xl">{tr('років досвіду')}</span>
                <span className="text-[0.8125rem] leading-[1.45] opacity-90 md:text-[0.9375rem]">{tr('Міжнародні платформи та ринки.')}</span>
              </span>
            </div>
            <div className="flex min-h-[12.5rem] flex-col justify-between bg-[#141414] px-5 py-6 text-white md:min-h-[17.5rem] md:px-7 md:py-8">
              <span className="text-[3.5rem] font-bold leading-[0.9] md:text-[6rem] tracking-[-0.03em]">
                10+
              </span>
              <span className="text-base font-semibold md:text-xl">{tr('років розробки сайтів')}</span>
            </div>
            <div className="col-span-2 flex min-h-[9.375rem] flex-col justify-between gap-4 bg-[#EEEEEE] p-5 text-[#222222] md:flex-row md:items-end md:justify-between md:gap-6 md:p-7">
              <span className="text-[3.5rem] font-bold leading-[0.9] md:text-[6rem] tracking-[-0.03em] text-brand-orange">
                AI
              </span>
              <span className="flex max-w-[18.75rem] flex-col gap-2">
                <span className="text-base font-semibold md:text-xl">{tr('Впроваджуємо AI у бізнес')}</span>
                <span className="text-[0.8125rem] leading-[1.45] text-[#555555] md:text-[0.9375rem]">{tr('Автоматизуємо контент, рутину й аналітику, щоб команда працювала швидше.')}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Місія */}
      <section className="bg-brand-orange">
        <div className="shell grid gap-5 py-14 md:grid-cols-[15.625rem_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-white md:text-sm">{tr('Наша місія')}</div>
          <p className="mob-20 max-w-[62.5rem] text-xl font-medium leading-[1.3] text-white md:text-[2.375rem]">{tr('Наша місія — допомагати брендам і виробникам з будь-якої країни продавати по всьому\n            світу. Ми віримо, що локальний бізнес може стати глобальним, якщо правильно побудувати\n            продукт, маркетинг і систему продажів.')}</p>
        </div>
      </section>

      {/* Наш підхід */}
      <section className="bg-[#EEEEEE]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_32.5rem] md:items-end md:gap-20">
            <h2 className="fs-46 mob-26 font-bold text-[#222222]">{tr('Наш підхід')}</h2>
            <p className="mob-15 text-base leading-[1.55] text-[#555555] md:text-[1.0625rem]">{tr('Ми працюємо не як класична маркетингова агенція. Наша задача — побудувати робочу\n              систему продажів, а не просто зробити сайт або рекламу.')}</p>
          </div>

          <div className="mt-8 grid border-t-2 border-[#222222] md:mt-14 md:grid-cols-3">
            {APPROACH.map(([title, description], i) => (
              <div
                key={title}
                className={`flex flex-col gap-3.5 border-b border-[#CFCFCF] py-7 md:border-b-0 md:pb-2 md:pr-8 md:pt-8 ${
                  i < 2 ? 'md:border-r md:border-r-[#CFCFCF]' : ''
                } ${i ? 'md:pl-8' : ''}`}
              >
                <span className="text-[0.8125rem] font-bold tracking-[0.06em] text-brand-orange md:text-[0.9375rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mob-23 text-2xl font-bold leading-[1.1] text-[#222222] md:text-[2rem]">
                  {tr(title)}
                </span>
                <span className="mob-15 text-base leading-[1.5] text-[#555555] md:text-[1.0625rem]">
                  {tr(description)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Що ми робимо */}
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Напрямки')}</div>
          <h2 className="fs-46 mob-26 mt-3 font-bold text-white md:mt-4">{tr('Що ми робимо')}</h2>

          <div className="mt-7 grid gap-2.5 md:mt-11 md:grid-cols-3 md:gap-[0.9375rem]">
            {DOING.map(([title, description, gradient], i) => (
              <Link
                key={title}
                href="/services"
                className="flow-parent flex min-h-[11.25rem] flex-col overflow-hidden rounded-[0.1875rem] bg-[#232323] text-white transition-transform duration-200 hover:-translate-y-[0.1875rem] md:min-h-[15rem]"
              >
                <div
                  className="flow-card flex flex-1 flex-col justify-between gap-7 p-5 md:p-6"
                  style={{
                    background: CARD_GRADIENTS[gradient],
                    backgroundSize: gradient === 'silver2' ? '200% 100%' : '135% 100%',
                  }}
                >
                  <span className="text-[0.8125rem] font-bold tracking-[0.12em] text-white/70 md:text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-semibold leading-[1.25] md:text-[1.375rem]">
                    {tr(title)}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-3.5 px-5 pb-4 pt-4 text-[0.8125rem] leading-[1.45] md:px-6 md:pb-[1.125rem] md:text-sm">
                  <span className="text-[#CFCFCF]">{tr(description)}</span>
                  <span className="flex-none text-base" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="bg-white">
        <div className="shell py-14 md:py-[7.5rem]">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_32.5rem] md:items-end md:gap-20">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Команда')}</div>
              <h2 className="fs-46 mob-26 font-bold text-[#222222]">{tr('Хто стоїть за агенцією')}</h2>
            </div>
            <p className="mob-15 text-base leading-[1.55] text-[#555555] md:text-[1.0625rem]">{tr('Ми — команда засновників, яка поєднує стратегічний e-commerce та системний маркетинг.\n              Нижче — коротко про ключових людей, які відповідають за результат.')}</p>
          </div>

          <div className="mt-8 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
            {TEAM.map((person) => (
              <div
                key={tr(person.name)}
                className="grid bg-[#EEEEEE] md:min-h-[21.25rem] md:grid-cols-[17.5rem_minmax(0,1fr)]"
              >
                <div
                  role="img"
                  aria-label={tr(person.name)}
                  className="h-[16.25rem] bg-[#D9D9D9] bg-cover bg-[center_top] md:h-auto"
                  style={{ backgroundImage: `url("${person.image}")` }}
                />
                <div className="flex flex-col gap-2.5 px-5 pb-6 pt-6 md:px-8 md:pb-[1.875rem] md:pt-8">
                  <span className="mob-23 text-2xl font-bold leading-[1.15] text-[#222222] md:text-[1.75rem]">
                    {tr(person.name)}
                  </span>
                  <span className="text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-brand-orange md:text-sm">
                    {tr(person.role)}
                  </span>
                  <span className="mob-15 mt-2 text-base leading-[1.55] text-[#555555] md:mt-auto">
                    {tr(person.description)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кар'єра */}
      <section className="bg-[#EEEEEE]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_32.5rem] md:items-end md:gap-20">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Карʼєра')}</div>
              <h2 className="fs-46 mob-26 font-bold text-[#222222]">{tr('Станьте частиною Koshman Ecom')}</h2>
            </div>
            <div className="flex flex-col items-start gap-5 md:gap-7">
              <p className="mob-15 text-base leading-[1.55] text-[#555555] md:text-[1.0625rem]">{tr('Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках і рости разом із\n                нами. Готові до нового кроку в карʼєрі?')}</p>
              <AnimatedButton variant="primary" href="/career#jobs">{tr('Переглянути вакансії')}</AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
