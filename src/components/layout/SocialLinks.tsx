import React from 'react';
import { contacts } from '@/lib/nav';

const ICONS: Record<string, React.ReactNode> = {
  Telegram: <path d="M21 3L3 10.5l7 3 3 7.5L21 3zM10 13.5L21 3" />,
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7h.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
};

const LINKS = [
  { label: 'Telegram', href: contacts.telegram },
  { label: 'Instagram', href: contacts.instagram },
  { label: 'LinkedIn', href: contacts.linkedin },
  { label: 'YouTube', href: contacts.youtube },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-2.5 md:gap-[0.6875rem]">
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#2A2A2A] transition-colors hover:bg-brand-orange md:h-[2.4375rem] md:w-[2.4375rem] md:rounded-[0.4375rem]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {ICONS[l.label]}
          </svg>
        </a>
      ))}
    </div>
  );
}
