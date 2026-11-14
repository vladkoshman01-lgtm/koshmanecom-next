'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fill, useT, useTr } from '@/i18n/LocaleProvider';
import { readHoneypot, sendLead } from '@/lib/contact';
import HoneypotField from '@/components/HoneypotField';

/**
 * Попап заявки на конкретну послугу (як у хендоффі).
 *
 * Клік по картці послуги відкриває коротку форму, де вже підставлені
 * категорія і назва послуги — людині лишається залишити контакти.
 */

type Target = { service: string; category: string };

type ServiceLeadContextValue = {
  openLead: (service: string, category: string) => void;
  closeLead: () => void;
};

const ServiceLeadContext = createContext<ServiceLeadContextValue | null>(null);

export function useServiceLead() {
  return (
    useContext(ServiceLeadContext) ?? {
      openLead: () => {},
      closeLead: () => {},
    }
  );
}

function LeadDialog({ target, onClose }: { target: Target; onClose: () => void }) {
  const t = useT();
  // Назву послуги показуємо мовою сторінки, а в заявку шлемо українською,
  // щоб менеджеру не доводилося перекладати назад
  const tr = useTr();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Закриття по Escape і блокування прокрутки сторінки під попапом
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

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
        topic: `${target.category} — ${target.service}`,
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
    'h-[3.25rem] border-[1.5px] border-[#D9D9D9] px-4 text-base text-[#141414] outline-none focus:border-[#141414]';

  return (
    <div
      onClick={onClose}
      role="presentation"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(15,15,15,0.78)] p-5 mars-fade"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${t.lead.eyebrow}: ${tr(target.service)}`}
        onClick={(e) => e.stopPropagation()}
        className="mars-rise relative flex max-h-full w-full max-w-[30rem] flex-col gap-5 overflow-y-auto bg-white px-9 pb-9 pt-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.lead.closeAria}
          className="absolute right-2.5 top-2.5 h-11 w-11 text-2xl text-[#8A8A8A] transition-colors hover:text-[#141414]"
        >
          ×
        </button>

        {sent ? (
          <div className="flex flex-col gap-3.5 pb-1 pr-8 pt-3">
            <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-brand-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12l5 5 9-10" />
              </svg>
            </div>
            <div className="text-[1.625rem] font-bold leading-[1.15] text-[#141414]">
              {t.lead.sentTitle}
            </div>
            <div className="text-[0.9375rem] leading-[1.55] text-[#555555]">
              {fill(t.lead.popupSentText, { name, service: tr(target.service) })}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 h-[3.25rem] bg-[#141414] text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white"
            >
              {t.lead.close}
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5 pr-8">
              <div className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-orange">
                {tr(target.category)}
              </div>
              <div className="text-[1.75rem] font-bold leading-[1.15] text-[#141414]">
                {tr(target.service)}
              </div>
              <div className="text-[0.9375rem] leading-[1.55] text-[#555555]">{t.lead.popupText}</div>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-3">
            <HoneypotField />
              <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
                {t.lead.name}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder={t.lead.namePlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
                {t.lead.contact}
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength={100}
                  placeholder={t.lead.contactPlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
                {t.lead.comment}{' '}
                <span className="font-normal text-[#8A8A8A]">{t.lead.optional}</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={1500}
                  rows={3}
                  placeholder={t.lead.commentPlaceholder}
                  className="resize-y border-[1.5px] border-[#D9D9D9] px-4 py-3.5 text-base text-[#141414] outline-none focus:border-[#141414]"
                />
              </label>
              {error ? (
                <div className="text-[0.8125rem] text-brand-orange">{t.lead.error}</div>
              ) : null}
              {sendError ? (
                <div className="text-[0.8125rem] text-brand-orange">{t.lead.sendError}</div>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                className="mt-1 h-14 bg-brand-orange text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C] disabled:opacity-70"
              >
                {sending ? t.lead.sending : t.lead.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ServiceLeadProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<Target | null>(null);

  const closeLead = useCallback(() => setTarget(null), []);
  const value = useMemo(
    () => ({
      openLead: (service: string, category: string) => setTarget({ service, category }),
      closeLead,
    }),
    [closeLead],
  );

  return (
    <ServiceLeadContext.Provider value={value}>
      {children}
      {target ? (
        // key — щоб для нової послуги форма відкривалась чистою
        <LeadDialog key={`${target.category}|${target.service}`} target={target} onClose={closeLead} />
      ) : null}
    </ServiceLeadContext.Provider>
  );
}
