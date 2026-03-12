'use client';

import React from 'react';
import { Rocket, Factory, Hand, MonitorSmartphone } from 'lucide-react';

const TargetAudience: React.FC = () => {
  const items = [
    {
      title: "Для брендів",
      desc: "Ви бренд, який хоче розбудовуватись, бути помітним на ринку, і вам потрібен потужний інтернет-магазин.",
      icon: Rocket
    },
    {
      title: "Для виробників (Etsy/eBay)",
      desc: "Ви виробник і хотіли б розмістити товари та віддати в управління магазин на Etsy та eBay для експорту.",
      icon: Factory
    },
    {
      title: "Для майстрів (Etsy)",
      desc: "Ви майстер(-иня), якому потрібна допомога зі створенням, налаштуванням магазину на Etsy та стратегією.",
      icon: Hand
    },
    {
      title: "Для виробників (Shopify)",
      desc: "Ви виробник та шукаєте можливості просувати свій бренд на світовому ринку через власний сайт на Shopify.",
      icon: MonitorSmartphone
    }
  ];

  return (
    <section id="audience" className="relative overflow-hidden py-24 bg-slate-100">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-brand-orange font-semibold text-sm mb-5">
            Для кого ми?
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            З ким ми працюємо і кому
            <span className="text-brand-orange"> даємо найкращий результат</span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg max-w-2xl">
            Обирайте формат співпраці під вашу модель бізнесу. Ми адаптуємо стратегію, команду та інструменти під ваш етап розвитку.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {items.map((item, idx) => (
            <article
              key={idx} 
              className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-xs font-extrabold text-slate-300">0{idx + 1}</div>
              <div className="mb-6 inline-flex h-14 w-14 rounded-2xl bg-slate-900 text-white items-center justify-center shadow-md group-hover:bg-brand-orange transition-colors duration-300">
                <item.icon size={26} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 pr-12">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              <div className="mt-6 h-1 w-14 rounded-full bg-orange-200 group-hover:w-24 group-hover:bg-brand-orange transition-all duration-300" />
            </article>
          ))}
        </div>

        <div className="mt-12 md:mt-16 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Не знаєте, який формат вам підійде?</h3>
            <p className="text-slate-600 mt-2">На консультації визначимо оптимальний канал росту: Etsy, Shopify або гібрид.</p>
          </div>
          <a 
            href="#contact" 
            className="inline-flex w-full md:w-auto items-center justify-center text-center px-6 md:px-8 py-4 bg-brand-orange text-white text-base md:text-lg font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30 leading-tight"
          >
            Отримати безкоштовну консультацію
          </a>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
