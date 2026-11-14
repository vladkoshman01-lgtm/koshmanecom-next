'use client';

import React, { useState } from 'react';
import { careerRoles } from '@/lib/careers';
import { contacts } from '@/lib/nav';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useT, useTr } from '@/i18n/LocaleProvider';
import { readHoneypot, sendLead } from '@/lib/contact';
import HoneypotField from '@/components/HoneypotField';

/**
 * Форма відгуку на вакансію за прототипом Careers.dc.html:
 * імʼя, контакт, чипи з позиціями і посилання на резюме.
 */

export default function ApplyForm({ defaultRole }: { defaultRole?: string }) {
  const t = useT();
  const tr = useTr();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState<string | null>(defaultRole ?? null);
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setSendError(false);
    setSending(true);
    try {
      await sendLead({
        name,
        contact,
        topic: ['Вакансія', role].filter(Boolean).join(': '),
        comment: note,
        honeypot: readHoneypot(e.currentTarget),
      });
      setSent(true);
    } catch {
      // Заявка не дійшла — кажемо про це чесно, а не «дякуємо»
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    'h-14 w-full border-[1.5px] border-[#3A3A3A] bg-transparent px-4 text-base text-white outline-none placeholder:text-[#6A6A6A] focus:border-white';

  return (
    <section id="apply" className="scroll-mt-16 border-b border-[#262626] bg-[#141414] md:scroll-mt-[5.125rem]">
      <div className="shell grid gap-10 py-14 md:grid-cols-[26.25rem_minmax(0,1fr)] md:items-start md:gap-24 md:pb-[6.5rem] md:pt-[6.25rem]">
        <div>
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">{tr('Відгук')}</div>
          <h2 className="fs-48 mob-26 mt-3 font-bold text-white md:mt-4">{tr('Надішліть резюме')}</h2>
          <p className="mob-15 mt-4 text-base leading-[1.5] text-[#CFCFCF] md:text-[1.0625rem]">{tr('Оберіть позицію та додайте посилання на резюме або портфоліо. Не знайшли свою роль — все\n            одно напишіть, ми переглядаємо кожен відгук.')}</p>
          <a
            href={`mailto:${contacts.email}`}
            className="mt-6 inline-block border-b-[1.5px] border-brand-orange pb-[3px] text-base font-semibold text-white md:mt-7 md:text-[1.0625rem]"
          >
            {contacts.email}
          </a>
        </div>

        {sent ? (
          <div className="flex flex-col items-start gap-4 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12l5 5 9-10" />
              </svg>
            </div>
            <div className="text-2xl font-bold leading-[1.15] text-white md:text-[2rem]">{tr('Відгук надіслано')}</div>
            <div className="max-w-[32.5rem] text-base leading-[1.55] text-[#CFCFCF]">
              Дякуємо, {name}! Ми переглянемо резюме та звʼяжемося з вами.
            </div>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName('');
                setContact('');
                setNote('');
              }}
              className="mt-1 h-12 border-[1.5px] border-white px-5 text-sm font-semibold text-white"
            >{tr('Надіслати ще один')}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <HoneypotField />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-[0.8125rem] font-semibold text-[#CFCFCF]">{tr('Імʼя')}<input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Як до вас звертатися"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2 text-[0.8125rem] font-semibold text-[#CFCFCF]">{tr('Телефон або Telegram')}<input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength={100}
                  placeholder="+380 або @username"
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-[0.8125rem] font-semibold text-[#CFCFCF]">{tr('Позиція')}</span>
              <div className="flex flex-wrap gap-2">
                {careerRoles.map((r) => (
                  <button
                    key={r.slug}
                    type="button"
                    onClick={() => setRole(role === r.title ? null : r.title)}
                    className={`h-10 flex-none whitespace-nowrap border-[1.5px] px-3.5 text-sm text-white transition-colors ${
                      role === r.title
                        ? 'border-brand-orange bg-brand-orange'
                        : 'border-[#3A3A3A] bg-transparent hover:border-brand-orange'
                    }`}
                  >
                    {tr(r.title)}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-2 text-[0.8125rem] font-semibold text-[#CFCFCF]">{tr('Резюме або портфоліо')}<textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                  maxLength={1500}
                rows={3}
                placeholder="Посилання на резюме, LinkedIn або портфоліо"
                className="w-full resize-y border-[1.5px] border-[#3A3A3A] bg-transparent px-4 py-3.5 text-base text-white outline-none placeholder:text-[#6A6A6A] focus:border-white"
              />
            </label>

            {error ? (
              <div className="text-sm text-brand-orange">{tr('Вкажіть імʼя та контакт, щоб ми могли звʼязатися.')}</div>
            ) : null}
            {sendError ? (
              <div className="text-sm text-brand-orange">{t.lead.sendError}</div>
            ) : null}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <AnimatedButton variant="primary" type="submit" disabled={sending}>
                {sending ? t.lead.sending : tr('Надіслати відгук')}
              </AnimatedButton>
              <span className="text-[0.8125rem] leading-[1.45] text-[#8A8A8A]">{tr('Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.')}</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
