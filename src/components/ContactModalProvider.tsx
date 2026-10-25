'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useServiceLead } from './ServiceLeadProvider';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Загальна кнопка «безкоштовна консультація».
 *
 * Раніше тут був окремий попап зі старого сайту — тепер відкриваємо той самий
 * брендовий попап заявки, що й на картках послуг, лише з загальною темою.
 * API лишили колишнім (`openModal`), щоб не правити всі кнопки.
 */
type ContactModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    return { openModal: () => {}, closeModal: () => {} };
  }
  return ctx;
}

export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const { openLead, closeLead } = useServiceLead();
  const t = useT();

  const value = useMemo(
    () => ({
      openModal: () => openLead(t.common.freeConsultation, 'Koshman Ecom'),
      closeModal: closeLead,
    }),
    [openLead, closeLead, t],
  );

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
}
