'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface CaseStudy {
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  image: string;
  tags: string[];
}

const Cases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCase]);

  const cases: CaseStudy[] = [
        {
      title: "Glyniana Ceramics",
      category: "Etsy / Handmade",
      description: "Масштабування локального бренду кераміки на ринок США. Комплексний ребрендинг, SEO-оптимізація лістингів та запуск Pinterest Ads.",
      challenge: "Бренд мав унікальний продукт, але зіткнувся з проблемою низької видимості на платформі Etsy. Основні продажі були лише в Україні, а вихід на міжнародний ринок стримувався відсутністю адаптації під західного споживача та слабкою англомовною SEO-стратегією.",
      solution: "Команда провела повний редизайн магазину, створила професійний контент-план та переписала всі лістинги з урахуванням високочастотних запитів США. Додатково запустили рекламні кампанії в Pinterest, що дало постійний потік цільового трафіку.",
      stats: [
        { label: "Ріст продажів", value: "+320%" },
        { label: "ROAS", value: "4.5" }
      ],
      image: "/2case.jpg",
      tags: ["Etsy", "SEO", "Pinterest"]
    },
    {
      title: "Tactical Gear",
      category: "Shopify / Military",
      description: "Створення Shopify магазину з нуля для виробника тактичного спорядження. Успішний вихід на B2B клієнтів у Канаді та США.",
      challenge: "Виробник шукав шляхи диверсифікації продажів та виходу на B2B ринок Північної Америки. Попередній сайт на локальній платформі не дозволяв ефективно працювати з міжнародними платежами та доставкою.",
      solution: "Ми розробили кастомний магазин на Shopify з інтеграцією міжнародних платіжних шлюзів та автоматичним розрахунком доставки. Впровадили систему гуртових знижок для B2B партнерів та запустили холодну email-розсилку по базі дистриб'''юторів.",
      stats: [
        { label: "зростання трафіку за 3 місяці", value: "120%" },
        { label: "переглядів сторінок товару", value: "+48%" }
      ],
      image: "/1case.jpg",
      tags: ["Shopify", "SEO"]
    },
    {
      title: "EcoHome Decor",
      category: "Etsy / Decor",
      description: "Запуск продажів на Etsy. Створення преміум-магазину, SEO-оптимізація та налаштування реклами для швидкого старту.",
      challenge: "Висока конкуренція в ніші декору на Etsy та складність швидко отримати перші продажі та відгуки. Клієнт потребував оперативного старту перед піковим сезоном свят та подарунків.",
      solution: "Створили преміальний Etsy-магазин з унікальними лістингами та професійними фото.\n\nОптимізували описи, теги та категорії під Etsy SEO, що підвищило конверсію на 10%.\n\nНалаштували Etsy Ads та Pinterest-трафік для швидкого залучення перших покупців і відгуків.\n\nПочаток впровадження сторонніх каналів трафіку для збільшення продажів на Etsy.",
      stats: [
        { label: "Збільшення конверсії", value: "10%" },
        { label: "Продажі", value: "500 од." }
      ],
      image: "/3case.jpg",
      tags: ["Etsy", "SEO", "Pinterest"]
    },
    {
      title: "Eco Toys",
      category: "Etsy / Toys",
      description: "Збільшення доходу у 2 рази за 6 місяців та масштабування продажів в Європу (Британія, Німеччина) без втрати позицій у США.",
      challenge: "Продажі: 25 / місяць. Дохід: 1200–1500$. Конверсія: 1%. Основний трафік — лише органіка Etsy. Фото товарів слабкі, не адаптовані під різні аудиторії. Відсутність присутності на ринках Британії та Німеччини.",
      solution: "Місяць 1–2: SEO та оновлення лістингів (глибокий аналіз ключових слів, оновлення контенту, запуск Etsy Ads). Місяць 3–4: Покращення візуалу та довіри (нові фото, відео). Місяць 4–5: Реклама + новий асортимент (перезапуск Etsy Ads, додано нові товари, впроваджено апсели).",
      stats: [
        { label: "Продажі", value: "45-60/міс" },
        { label: "Конверсія", value: "2.2%" }
      ],
      image: "/4case.jpg",
      tags: ["Etsy", "SEO", "Ads"]
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="cases" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div className="max-w-2xl">
             <h4 className="text-brand-orange font-bold uppercase tracking-wider mb-3 text-sm">Наші результати</h4>
             <h2 className="text-3xl md:text-5xl font-extrabold text-white">
               Кейси, якими ми пишаємось
             </h2>
           </div>
           <a href="#contact" className="hidden md:flex items-center gap-2 text-white border-b border-brand-orange pb-1 hover:text-brand-orange transition-colors">
             Обговорити ваш проект <ArrowUpRight size={18} />
           </a>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 bg-slate-700/50 hover:bg-brand-orange text-white p-2 rounded-full transition-all shadow-lg hidden md:flex"
            aria-label="Previous Case"
          >
            <ArrowLeft size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4"
          >
            {cases.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center p-4">
                <div 
                  onClick={() => setSelectedCase(item)}
                  className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-brand-orange/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl cursor-pointer h-full flex flex-col"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all z-10" />
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 text-xs font-bold bg-white/90 text-slate-900 rounded-full backdrop-blur-sm shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-brand-orange text-white p-2 rounded-full shadow-lg">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-grow">
                    <div className="text-brand-orange text-sm font-bold mb-2">{item.category}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-orange transition-colors">{item.title}</h3>
                    <p className="text-slate-400 mb-8 line-clamp-3 leading-relaxed">{item.description}</p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700">
                      {item.stats.map((stat, sIdx) => (
                        <div key={sIdx}>
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 bg-slate-700/50 hover:bg-brand-orange text-white p-2 rounded-full transition-all shadow-lg hidden md:flex"
            aria-label="Next Case"
          >
            <ArrowRight size={24} />
          </button>
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="#contact" className="inline-flex items-center gap-2 text-white border-b border-brand-orange pb-1">
             Обговорити ваш проект <ArrowUpRight size={18} />
           </a>
        </div>

        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
              onClick={() => setSelectedCase(null)}
            />
            
            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
              
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-md hover:bg-white text-slate-900 rounded-full transition-all shadow-sm md:bg-white/50"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100 group">
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                   <div className="text-brand-orange font-bold mb-2 uppercase tracking-wider text-sm">{selectedCase.category}</div>
                   <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{selectedCase.title}</h3>
                   
                   <div className="flex flex-wrap gap-2">
                      {selectedCase.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 text-xs font-bold bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-md">
                          #{tag}
                        </span>
                      ))}
                   </div>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 bg-white overflow-y-auto text-slate-800">
                 <div className="space-y-8">
                   
                   <div>
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-1 bg-red-500 rounded-full"></div>
                        <h4 className="font-bold text-lg text-slate-900">Проблема</h4>
                     </div>
                     <p className="text-slate-600 leading-relaxed text-lg">
                       {selectedCase.challenge}
                     </p>
                   </div>

                   <div>
                     <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-lg text-slate-900">Рішення</h4>
                     </div>
                     <p className="text-slate-600 leading-relaxed text-lg">
                       {selectedCase.solution}
                     </p>
                   </div>

                   <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Ключові результати</h4>
                      <div className="grid grid-cols-2 gap-6">
                        {selectedCase.stats.map((stat, sIdx) => (
                          <div key={sIdx}>
                            <div className="text-3xl font-extrabold text-brand-orange">{stat.value}</div>
                            <div className="text-xs text-slate-500 font-semibold uppercase mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="pt-4">
                     <a 
                       href="#contact" 
                       onClick={() => setSelectedCase(null)}
                       className="block w-full py-4 bg-slate-900 text-white text-center font-bold rounded-xl hover:bg-brand-orange transition-colors shadow-lg hover:shadow-orange-500/30 group"
                     >
                       Хочу такий же результат
                       <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                     </a>
                   </div>

                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cases;
