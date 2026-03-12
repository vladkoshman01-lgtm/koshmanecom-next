'use client';

import React from 'react';
import { Search, Lightbulb, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

const Process: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Аналіз поточної ситуації",
      desc: "Ми глибоко занурюємось у ваш бізнес, ринок та цілі, щоб створити міцну основу для зростання."
    },
    {
      icon: Lightbulb,
      title: "Побудова стратегії",
      desc: "Ми розробляємо індивідуальну стратегію, засновану на дослідженні вашого бізнесу, для виходу на міжнародний ринок та розширення."
    },
    {
      icon: Rocket,
      title: "Запуск",
      desc: "Від налаштування магазину до маркетингових кампаній - ми виконуємо все з точністю."
    },
    {
      icon: TrendingUp,
      title: "Масштабування",
      desc: "Ми використовуємо передову аналітику та ШІ для постійної оптимізації та масштабування ваших операцій."
    }
  ];

  const features = [
    "5+ років у міжнародному e-commerce",
    "Практичний підхід і прозорість у роботі",
    "Поєднання людського досвіду та AI-рішень"
  ];

  return (
    <section id="process" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Steps */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12">Як ми працюємо</h2>
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-orange-100 text-brand-orange flex items-center justify-center shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                      <step.icon size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Why Us Box */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 h-full flex flex-col justify-center sticky top-24">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">Чому ми?</h2>
              
              <div className="space-y-6 mb-10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-brand-orange flex-shrink-0 w-6 h-6 mt-1" />
                    <span className="text-lg text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                 <a 
                  href="#contact" 
                  className="block w-full py-4 bg-brand-orange text-white text-center font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20"
                >
                  Почати з консультації
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;