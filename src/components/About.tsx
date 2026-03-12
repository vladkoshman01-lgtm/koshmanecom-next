'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          <div className="md:w-1/2">
             <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-orange/10 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-100 rounded-full -z-10"></div>
                <img 
                  src="/world.png" 
                  alt="Наша команда" 
                  className="rounded-2xl w-full object-cover"
                />
             </div>
          </div>

          <div className="md:w-1/2">
            <h4 className="text-brand-orange font-bold uppercase tracking-wider mb-3 text-sm">Про агенцію</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Більше ніж просто консалтинг
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Koshman Ecom — це команда практиків. Ми не даємо поради, а впроваджуємо рішення, які працюють. Наша місія, щоб український бренд став відомим на світовій арені і збільшив свої прибутки.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Ми віримо в силу українських виробників. За останні 5 років допомогли брендам знайти своїх клієнтів у США, Європі, Канаді та Близькому Східі . Поєднуємо творчий підхід з жорсткою аналітикою даних.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-extrabold text-brand-orange">5+</div>
                <div className="text-sm text-slate-500 font-medium mt-1">Років досвіду</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-brand-orange">50+</div>
                <div className="text-sm text-slate-500 font-medium mt-1">Успішних проектів</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-brand-orange">$2M+</div>
                <div className="text-sm text-slate-500 font-medium mt-1">Згенерованого доходу</div>
              </div>
               <div>
                <div className="text-4xl font-extrabold text-brand-orange">24/7</div>
                <div className="text-sm text-slate-500 font-medium mt-1">Підтримка клієнтів</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;