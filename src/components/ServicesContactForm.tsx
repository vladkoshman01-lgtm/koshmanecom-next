'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ServicesContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [siteOrNiche, setSiteOrNiche] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://us-central1-koshman-ecom-landing-729-54b1a.cloudfunctions.net/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone, telegram, siteOrNiche }),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setName('');
        setPhone('');
        setTelegram('');
        setSiteOrNiche('');
      } else {
        alert('Помилка відправки. Будь ласка, спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Помилка відправки. Будь ласка, спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
              Безкоштовна консультація
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight">
              Потрібен план росту для вашого магазину?
              <span className="text-brand-orange"> Ми допоможемо.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Отримаєте аудит, рекомендації по масштабуванню та план робіт під вашу нішу.
              Залиште заявку — ми зв’яжемось протягом 24 годин.
            </p>
            <ul className="mt-8 space-y-3 text-slate-200">
              {[
                'Оцінка потенціалу Etsy або Shopify',
                'Підбір пріоритетних каналів трафіку',
                'Прорахунок бюджету і термінів запуску',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 md:p-8 text-slate-900 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 />
                </div>
                <h3 className="mt-5 text-2xl font-bold">Дякуємо!</h3>
                <p className="mt-3 text-slate-600">
                  Ваша заявка успішно відправлена. Ми зв’яжемося з вами найближчим часом.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand-orange hover:text-brand-orange transition"
                >
                  Надіслати ще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Ім'я
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-brand-orange focus:ring-brand-orange"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label htmlFor="telegram" className="block text-sm font-medium text-slate-700 mb-2">
                    Telegram
                  </label>
                  <input
                    type="text"
                    id="telegram"
                    value={telegram}
                    onChange={(event) => setTelegram(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-brand-orange focus:ring-brand-orange"
                    placeholder="@your_username"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Номер телефону
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-brand-orange focus:ring-brand-orange"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="siteOrNiche" className="block text-sm font-medium text-slate-700 mb-2">
                    Адреса сайту або ніша
                  </label>
                  <input
                    type="text"
                    id="siteOrNiche"
                    value={siteOrNiche}
                    onChange={(event) => setSiteOrNiche(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-brand-orange focus:ring-brand-orange"
                    placeholder="example.com або “Продаж свічок”"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 px-6 py-4 rounded-xl bg-brand-orange text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isSubmitting ? 'Відправка...' : 'Отримати консультацію'}
                  <ArrowRight className="ml-2 inline-block h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesContactForm;
