'use client';

import React, { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { CATEGORY_NAMES } from '@/data/services';
import { fill, useT, useTr } from '@/i18n/LocaleProvider';
import { readHoneypot, sendLead } from '@/lib/contact';
import HoneypotField from '@/components/HoneypotField';
import { FormConsentNote } from '@/components/legal/LegalText';

/**
 * Лід-форма. Повторюється на більшості сторінок, тому винесена окремо
 * і приймає фон: темний (`dark`) або світлий (`light`).
 *
 * Відправка йде в ту саму Cloud Function, що й решта форм сайту.
 */



export default function LeadForm({
  theme = 'dark',
  title,
  subtitle,
  submitLabel,
  topics: customTopics,
  commentPlaceholder,
}: {
  theme?: 'dark' | 'light';
  title?: string;
  subtitle?: string;
  /** Власний підпис кнопки відправки — напр. «Обговорити Shopify-магазин». */
  submitLabel?: string;
  /** Власні варіанти «Що вас цікавить» замість категорій; «Не знаю» додається в кінець. */
  topics?: string[];
  /** Власний плейсхолдер коментаря. */
  commentPlaceholder?: string;
}) {
  const t = useT();
  const tr = useTr();
  // Чипи: «не знаю, з чого почати» плюс назви категорій послуг
  const topics = customTopics?.length ? [...customTopics, t.lead.dontKnow] : [t.lead.dontKnow, ...CATEGORY_NAMES];
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const dark = theme === 'dark';
  const sectionBg = dark ? 'bg-[#141414]' : 'bg-[#EEEEEE]';
  const textColor = dark ? 'text-white' : 'text-[#222222]';
  const mutedColor = dark ? 'text-[#CFCFCF]' : 'text-[#555555]';
  const fieldClass = dark
    ? 'border-[#3A3A3A] bg-transparent text-white placeholder:text-[#6A6A6A] focus:border-white'
    : 'border-[#DCDCDC] bg-white text-[#222222] placeholder:text-[#8A8A8A] focus:border-[#222222]';

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
      await sendLead({ name, contact, topic: topic ?? undefined, comment: note, honeypot: readHoneypot(e.currentTarget) });
      setSent(true);
    } catch {
      // Заявка не дійшла — кажемо про це чесно, а не «дякуємо»
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="lead"
      className={`sec-y ${sectionBg}`}
    >
      <div className="shell">
      <div className="grid grid-cols-1 gap-10 grid-lead md:gap-16">
        <div>
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
            {t.lead.eyebrow}
          </div>
          <h2
            className={`fs-48 mob-26 mt-3 font-bold ${textColor}`}
          >
            {title ?? t.lead.title}
          </h2>
          <p className={`mt-4 text-base leading-[1.5] ${mutedColor} md:text-[1.0625rem]`}>{subtitle ?? t.lead.subtitle}</p>

          {/* Підпис під відео, а не збоку: на відео менеджерка показує рукою
              вправо, на саму форму — текст збоку перебивав би цей жест. */}
          <div className="mt-7 flex flex-col items-start gap-[1.125rem] md:mt-[2.75rem]">
            {/* На телефоні відео не показуємо — так просив клієнт.
                Відео вертикальне (720×1280). Рамка трохи нижча за кадр і
                притиснута до низу: зрізаємо порожнечу над головою, але
                лишаємо саму голову й жест рукою. */}
            <div className="hidden aspect-[2/3] w-[12.5rem] flex-none overflow-hidden bg-[#2A2A2A] md:block">
              {/* Відео без звуку, зациклене — грає само, як анімована аватарка.
                  playsInline обовʼязковий, інакше iOS відкриє на весь екран. */}
              <video
                src="/video/Woman_waves.mp4"
                poster="/handoff/lead-manager.webp"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={`${t.lead.managerName}, ${t.lead.managerRole}`}
                className="h-full w-full object-cover object-bottom"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <span className={`text-[1.1875rem] font-semibold ${textColor}`}>{t.lead.managerName}</span>
              <span className={`text-[0.875rem] ${mutedColor}`}>{t.lead.managerRole}</span>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-start justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
            </div>
            <div className={`mt-5 text-2xl font-bold ${textColor}`}>{t.lead.sentTitle}</div>
            <div className={`mt-2 text-base ${mutedColor}`}>
              {fill(t.lead.sentText, { name })}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-6 md:gap-7">
            <HoneypotField />
            {/* Форма тягнеться на висоту лівої колонки, а рядок із кнопкою
                притиснутий донизу — низ кнопки на одній лінії з підписом під відео */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className={`flex flex-col gap-2 text-sm font-semibold ${textColor}`}>
                {t.lead.name}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder={t.lead.namePlaceholder}
                  autoComplete="name"
                  className={`h-14 border-[1.5px] px-4 text-base font-normal outline-none transition-colors ${fieldClass}`}
                />
              </label>
              <label className={`flex flex-col gap-2 text-sm font-semibold ${textColor}`}>
                {t.lead.contact}
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength={100}
                  placeholder={t.lead.contactPlaceholder}
                  className={`h-14 border-[1.5px] px-4 text-base font-normal outline-none transition-colors ${fieldClass}`}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <span className={`text-sm font-semibold ${textColor}`}>{t.lead.interest}</span>
              <div className="flex flex-wrap gap-2">
                {topics.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setTopic((cur) => (cur === label ? null : label))}
                    className={`h-10 border-[1.5px] px-4 text-sm transition-colors ${
                      topic === label
                        ? 'border-brand-orange bg-brand-orange text-white'
                        : `${dark ? 'border-[#3A3A3A] text-white' : 'border-[#DCDCDC] text-[#222222]'} bg-transparent hover:border-brand-orange`
                    }`}
                  >
                    {tr(label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Коментар забирає вільну висоту форми на десктопі — без порожнечі над кнопкою */}
            <label className={`flex flex-col gap-2 text-sm font-semibold md:flex-1 ${textColor}`}>
              {t.lead.comment}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                  maxLength={1500}
                rows={4}
                placeholder={commentPlaceholder ?? t.lead.commentPlaceholder}
                className={`min-h-[8rem] border-[1.5px] p-4 text-base font-normal outline-none transition-colors md:flex-1 ${fieldClass}`}
              />
            </label>

            {error ? (
              <div className="text-sm font-semibold text-brand-orange">{t.lead.error}</div>
            ) : null}
            {sendError ? (
              <div className="text-sm font-semibold text-brand-orange">{t.lead.sendError}</div>
            ) : null}

            <div className="flex flex-col gap-4 md:mt-auto md:flex-row md:items-center md:gap-6">
              {/* Телефон: проста кнопка на всю ширину, як у мобільному макеті */}
              <button
                type="submit"
                disabled={sending}
                className="flex h-14 w-full items-center justify-center bg-brand-orange text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-orange-600 disabled:opacity-60 md:hidden"
              >
                {sending ? t.lead.sending : (submitLabel ?? t.lead.submit)}
              </button>

              <div className="hidden md:block">
                <AnimatedButton variant="primary" type="submit" disabled={sending}>
                  {sending ? t.lead.sending : (submitLabel ?? t.lead.submit)}
                </AnimatedButton>
              </div>
              <FormConsentNote className={`text-[0.8125rem] leading-[1.4] ${mutedColor}`} />
            </div>
          </form>
        )}
      </div>
      </div>
    </section>
  );
}
