'use client';

import React from 'react';
import { localeNames, localePath, locales, type Locale } from '@/lib/i18n';

/**
 * Спільні елементи калькуляторів: поля, чипи, перемикачі, нумеровані блоки
 * і плашка «ставки для вашої країни». Стиль — як у лід-форми.
 */

export const NUMBER_LOCALE: Record<Locale, string> = { uk: 'uk-UA', en: 'en-US', sk: 'sk-SK' };

/** Число з поля вводу: кома як десятковий роздільник, від'ємні й сміття → 0. */
export const num = (v: string) => {
  const n = Number(v.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function moneyFormatter(locale: Locale, currency: string) {
  return (v: number, digits = 2) =>
    new Intl.NumberFormat(NUMBER_LOCALE[locale], {
      style: 'currency',
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
}

export function percentFormatter(locale: Locale) {
  return (v: number) => new Intl.NumberFormat(NUMBER_LOCALE[locale], { maximumFractionDigits: 1 }).format(v);
}

export function Field({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  step = '0.01',
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-[#222222]">{label}</span>
      <span className="relative block">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#8A8A8A]">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-14 w-full border-[1.5px] border-[#DCDCDC] bg-white text-base text-[#222222] outline-none transition-colors focus:border-[#222222] ${
            prefix ? 'pl-9' : 'pl-4'
          } ${suffix ? 'pr-10' : 'pr-4'}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#8A8A8A]">
            {suffix}
          </span>
        ) : null}
      </span>
      {hint ? <span className="text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{hint}</span> : null}
    </label>
  );
}

export function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: [T, string][];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(([key, text]) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          onClick={() => onChange(key)}
          className={`h-11 border-[1.5px] px-4 text-sm font-semibold transition-colors ${
            value === key
              ? 'border-brand-orange bg-brand-orange text-white'
              : 'border-[#DCDCDC] bg-white text-[#222222] hover:border-brand-orange'
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export function Switch({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3.5 border-[1.5px] bg-white p-4 text-left transition-colors ${
        checked ? 'border-brand-orange' : 'border-[#DCDCDC] hover:border-[#8A8A8A]'
      }`}
    >
      <span
        className={`relative mt-0.5 h-6 w-10 flex-none rounded-full transition-colors ${
          checked ? 'bg-brand-orange' : 'bg-[#DADADA]'
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-[1.125rem]' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-[0.9375rem] font-semibold text-[#222222]">{label}</span>
        <span className="text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{hint}</span>
      </span>
    </button>
  );
}

export function Block({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[0.25rem] bg-white p-5 md:p-8">
      <legend className="float-left flex w-full items-center gap-3.5">
        <span className="text-sm font-bold tracking-[0.06em] text-brand-orange">
          {String(index).padStart(2, '0')}
        </span>
        <span className="text-lg font-semibold text-[#222222] md:text-[1.375rem]">{title}</span>
      </legend>
      <div className="clear-both pt-5 md:pt-6">{children}</div>
    </fieldset>
  );
}

/**
 * Плашка над полями: для якої країни рахує ця мовна версія і посилання
 * на інші версії з їхніми ставками.
 */
export function RatesNote({
  locale,
  title,
  hint,
  summary,
  otherLabel,
  paths,
  countryName,
}: {
  locale: Locale;
  title: string;
  hint: string;
  summary: string;
  otherLabel: string;
  /** Адреса інструмента кожною мовою (без префікса мови). */
  paths: Record<Locale, string>;
  /** Назва країни, для якої рахує версія певною мовою — мовою поточної сторінки. */
  countryName: (l: Locale) => string;
}) {
  return (
    <div className="rounded-[0.25rem] bg-white p-5 md:p-8">
      <div className="text-lg font-semibold text-[#222222] md:text-[1.375rem]">{title}</div>
      <p className="mt-2 text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{hint}</p>
      <p className="mt-4 border-l-2 border-brand-orange bg-[#FFF1EB] px-4 py-3 text-sm font-semibold leading-[1.45] text-[#222222]">
        {summary}
      </p>
      {/* Інша країна — інша мовна версія з її ставками */}
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#555555]">
        <span>{otherLabel}</span>
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <a
              key={l}
              href={localePath(l, paths[l])}
              hrefLang={l}
              className="font-semibold text-brand-orange transition-opacity hover:opacity-80"
            >
              {countryName(l)} · {localeNames[l].code} →
            </a>
          ))}
      </p>
    </div>
  );
}
