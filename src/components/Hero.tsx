'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-100/50 to-transparent -z-10 rounded-bl-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8 z-10">
           

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1]">
              Ми допомагаємо <br/>
              <span className="text-brand-orange">українським брендам</span> <br/>
              продавати <span className="text-brand-orange">більше</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
              Виходьте на міжнародні ринки та масштабуйте свій бізнес з експертною підтримкою на Etsy та Shopify.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onContactClick} 
                className="px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
              >
                Безкоштовна консультація
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#services" 
                className="px-8 py-4 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all flex items-center justify-center"
              >
                Наші послуги
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-6 md:gap-10 grayscale opacity-60">
               <div className="font-bold text-xl">Shopify</div>
               <div className="font-bold text-xl">Etsy</div>
               <div className="font-bold text-xl">eBay</div>
            </div>
          </div>

          {/* Visual Content - Abstract Globe/Commerce representation */}
          <div className="lg:w-1/2 relative">
             <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl rotate-2 lg:rotate-3 hover:rotate-0 transition-all duration-500">
                <video 
                  src="/IMG_4393 (1).mp4" 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl w-full object-cover h-[300px] md:h-[450px]"
                />
                
                {/* Floating Cards */}
                <div className="absolute -left-6 md:-left-12 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-[200px] animate-[bounce_3s_infinite]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-500">Ріст продажів</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">+320%</div>
                  <div className="text-xs text-slate-400 mt-1">за останні 6 місяців</div>
                </div>

                <div className="absolute -right-4 md:-right-8 bottom-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-[200px]">
                  <div className="flex -space-x-2 overflow-hidden mb-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/Group1000004887.png" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/Group1000004888.png" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/Group1000004889.png" alt=""/>
                  </div>
                  <div className="text-sm font-bold text-slate-900">Задоволені клієнти</div>
                  <div className="text-xs text-brand-orange font-medium mt-1">Успішні кейси</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
