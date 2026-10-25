'use client';

import React from 'react';
import { ShoppingBag, BarChart2, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  const coreServices = [
    {
      title: 'Etsy під ключ',
      desc: 'Запуск і масштабування Etsy-магазину: структура, лістинги, SEO, реклама та операційна підтримка.',
      icon: Globe,
      points: ['Аудит ніші та конкурентів', 'Оптимізація лістингів', 'Супровід Etsy Ads'],
      accent: 'from-orange-400 to-orange-500',
    },
    {
      title: 'Shopify Store',
      desc: 'Розробка магазину на Shopify з нуля або переробка існуючого сайту під вищу конверсію.',
      icon: ShoppingBag,
      points: ['UX/UI та структура каталогу', 'Оплата, доставка, інтеграції', 'Технічний SEO та аналітика'],
      accent: 'from-sky-400 to-blue-500',
    },
    {
      title: 'Маркетинг і трафік',
      desc: 'Комплексне просування для стабільного потоку замовлень із платних і органічних каналів.',
      icon: BarChart2,
      points: ['Meta / TikTok / Pinterest Ads', 'Креативи та контент-стратегія', 'Масштабування по ROAS'],
      accent: 'from-emerald-400 to-green-500',
    },
  ];

  const additionalServices = [
    {
      category: 'Брендинг та дизайн',
      items: ['Дизайн візуалів бренду', 'Оформлення карток товарів', 'Пакети креативів для реклами'],
    },
    {
      category: 'Просування',
      items: ['SEO-оптимізація', 'Запуск і ведення іноземних соцмереж'],
    },
    {
      category: 'AI-послуги',
      items: ['AI-контент і автопостинг', 'Чат-боти та автоматизація', 'Аналітика і звітність'],
    },
    {
      category: 'Консалтинг',
      items: ['Стратегія росту бренду', 'Індивідуальні консультації', 'Навчання команди'],
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden py-24 bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(251,146,60,0.16),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(59,130,246,0.14),transparent_40%)]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-sm font-semibold mb-5">
            Послуги
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Рішення, які напряму впливають
            <span className="text-brand-orange"> на продажі</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Ми не продаємо "просто послуги". Ви отримуєте систему росту: від стратегії до реалізації та масштабування.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-12">
          {coreServices.map((service) => (
            <article
              key={service.title}
              className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              {/* Removed top accent bar */}

              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                <service.icon size={26} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed min-h-[72px]">{service.desc}</p>

              <ul className="mt-6 space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Додаткові напрямки</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {additionalServices.map((col) => (
              <div key={col.category}>
                <h4 className="text-lg font-bold text-slate-900 mb-4">{col.category}</h4>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-9 pt-7 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-slate-600">
              Працюємо як зовнішня e-commerce команда або як підсилення вашого in-house відділу.
            </p>
          </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/services"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-brand-orange text-white font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30"
          >
            Перейти до сторінки послуг
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
