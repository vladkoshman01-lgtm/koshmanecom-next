'use client';

import React from 'react';
import { Sparkles, ExternalLink, Bot, ScanEye, Wand2, Search, ArrowRight } from 'lucide-react';

const featureCards = [
  {
    title: 'Listing Generator',
    desc: 'Генерує повний опис товару, заголовок та 13 тегів на основі короткого опису.',
    benefit: 'Економія до 90% часу на створення лістингів і відповідність алгоритмам Etsy.',
    icon: Wand2,
  },
  {
    title: 'SEO Audit',
    desc: 'Аналізує існуючі лістинги на відповідність актуальним стандартам SEO Etsy та дає рекомендації.',
    benefit: 'Швидке виявлення і виправлення помилок, що заважають товарам бути у топі пошуку.',
    icon: ScanEye,
  },
  {
    title: 'Keyword Explorer',
    desc: 'Допомагає знаходити довгі ключові слова з високим трафіком та низькою конкуренцією.',
    benefit: 'Залучення цільової аудиторії та зростання органічного трафіку без додаткових витрат.',
    icon: Search,
  },
];

const SeoGenie: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.2),transparent_45%)]" />
        <div className="absolute inset-0 opacity-20 [background:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-sm font-semibold mb-6">
            <Bot size={16} />
            Ваш повний SEO-інструментарій
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Збільшуйте продажі на Etsy за допомогою
            <span className="text-brand-orange"> штучного інтелекту</span>
          </h2>

          <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
            Генеруйте оптимізовані описи товарів, знаходьте ключові слова з низькою конкуренцією
            та проводьте аудит SEO за лічені хвилини.
          </p>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Кожна функція створена, щоб допомогти вам заробляти більше.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            {featureCards.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-sm p-6 md:p-7 hover:border-indigo-400/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-slate-300 leading-relaxed">{item.desc}</p>
                    <p className="mt-3 text-sm text-indigo-200/90">
                      <span className="font-semibold text-white">Вигода:</span> {item.benefit}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-3xl border border-indigo-400/30 bg-gradient-to-b from-slate-900 to-slate-950 p-7 md:p-8 shadow-2xl shadow-indigo-900/20">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-extrabold tracking-wide mb-4">
                ТОП ВИБІР
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div className="text-sm font-semibold tracking-wide uppercase text-indigo-200">SEOGenie</div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="text-slate-400 mb-1">SEO Score</div>
                  <div className="text-3xl font-extrabold text-white">98/100</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="text-slate-400 mb-2">Рекомендовані ключі</div>
                  <div className="flex flex-wrap gap-2">
                    {['handmade decor', 'ceramic vase', 'boho gift', 'personalized gift'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="https://seogenie.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
                >
                  Спробувати SEOGenie
                  <ExternalLink size={17} />
                </a>
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-slate-100 hover:border-brand-orange hover:text-brand-orange transition-colors font-semibold"
                >
                  Потрібна допомога з впровадженням
                  <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoGenie;
