'use client';

import React, { useState } from 'react';

type CareerApplicationFormProps = {
  roleTitle: string;
};

const CONTACT_ENDPOINT =
  'https://us-central1-koshman-ecom-landing-729-54b1a.cloudfunctions.net/api/contact';

export default function CareerApplicationForm({
  roleTitle,
}: CareerApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('fullName') || '');
    const country = String(formData.get('country') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const salary = String(formData.get('salary') || '');
    const telegram = String(formData.get('telegram') || '');
    const message = String(formData.get('message') || '');
    const resume = formData.get('resume') as File | null;
    const resumeNote = resume?.name ? `Резюме файл: ${resume.name}` : 'Резюме файл: не додано';

    const siteOrNiche = [
      `Вакансія: ${roleTitle}`,
      `Країна: ${country || 'не вказано'}`,
      `Email: ${email}`,
      `Бажана винагорода: ${salary} USD`,
      `Коментар: ${message || '—'}`,
      resumeNote,
    ].join('\n');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          phone,
          telegram,
          siteOrNiche,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        event.currentTarget.reset();
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
    <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-slate-950 p-6 md:p-8 shadow-2xl text-white">
      {isSubmitted ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white">Дякуємо!</h2>
          <p className="mt-3 text-slate-300">
            Ваша заявка успішно відправлена. Ми зв&apos;яжемося з вами найближчим часом.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-white text-center">
            Відгукнутися на вакансію
          </h2>
          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-200">
                Ім&apos;я та прізвище *
                <input
                  type="text"
                  name="fullName"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="Ім'я та прізвище"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Країна, де я зараз
                <select
                  name="country"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white focus:border-brand-orange focus:ring-brand-orange"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Обрати
                  </option>
                  <option value="Україна">Україна</option>
                  <option value="Польща">Польща</option>
                  <option value="Німеччина">Німеччина</option>
                  <option value="Інша">Інша</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-200">
                Email *
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="hello@example.com"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Номер телефону *
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="+__ (__) __ __ __"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-slate-200">
                Бажана винагорода щомісячно ($) *
                <input
                  type="number"
                  name="salary"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="1500"
                />
              </label>
              <label className="text-sm font-semibold text-slate-200">
                Telegram
                <input
                  type="text"
                  name="telegram"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                  placeholder="@username"
                />
              </label>
            </div>

            <label className="text-sm font-semibold text-slate-200">
              Тут можна залишити коментар/посилання на Linkedin/портфоліо
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-orange focus:ring-brand-orange"
                placeholder="Коротко про себе або посилання..."
              />
            </label>

            <label className="text-sm font-semibold text-slate-200">
              Резюме *
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 px-4 py-3">
                <input type="file" name="resume" required className="text-sm text-slate-300 file:hidden" />
                <span className="text-xs text-slate-500">Прикріпити файл (PDF/DOCX)</span>
              </div>
            </label>

            <label className="flex items-start gap-3 text-sm text-slate-200">
              <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-brand-orange" />
              Я погоджуюсь на обробку моїх персональних даних *
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Надсилаємо...' : 'Відправити заявку'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
