'use client';

import React from 'react';
import { Instagram, Linkedin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="mb-6 inline-block">
              <img src="/logofooter (3).png" alt="Koshman Ecom Logo" className="h-8 w-auto" />
            </a>
            <p className="mb-6">
              Масштабуйте свій український e-commerce бізнес на глобальному рівні з експертами ринку.
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/koshmanecom_channel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Send size={20} />
              </a>
              <a href="https://www.instagram.com/koshman_ecom/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/koshman-export/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Навігація</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-brand-orange transition-colors">Про нас</a></li>
              <li><a href="#services" className="hover:text-brand-orange transition-colors">Послуги</a></li>
              <li><a href="#process" className="hover:text-brand-orange transition-colors">Як ми працюємо</a></li>
              <li><a href="#reviews" className="hover:text-brand-orange transition-colors">Відгуки</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Компанія</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Контакти</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Блог</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Кар'єра</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Умови використання</a></li>
            </ul>
          </div>

          {/* Tools (New Section) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Інструменти</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://seogenie.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-orange transition-colors"
                >
                  Etsy помічник SEOgenie
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Контакти</h3>
            <ul className="space-y-3">
              <li>koshman.export@gmail.com</li>
              <li>+380661970969</li>
              <li>Київ, Україна</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © 2025 Koshman Ecom. Всі права захищено.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
