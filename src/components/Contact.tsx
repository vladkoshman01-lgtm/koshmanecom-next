'use client';

import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Готові <span className="text-brand-orange">збільшити</span> свої продажі?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed">
            Зв'яжіться з нами сьогодні, щоб обговорити, як ми можемо допомогти вашому бізнесу досягти нових висот на міжнародних ринках.
          </p>
          <div className="mt-10">
            <a 
              href="https://t.me/koshman_ecom"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-brand-orange text-white font-bold text-lg rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group w-full sm:w-auto mx-auto"
            >
              Написати менеджеру в Telegram
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-slate-300">
            <a href="mailto:koshman.export@gmail.com" className="flex items-center gap-3 hover:text-brand-orange transition-colors">
              <Mail size={20} />
              <span>koshman.export@gmail.com</span>
            </a>
            <a href="tel:+380661970969" className="flex items-center gap-3 hover:text-brand-orange transition-colors">
              <Phone size={20} />
              <span>+380661970969</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
