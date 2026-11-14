import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from '@/components/ui/LocaleLink';
import { MESSENGER, RATES_CHECKED, type ToolPageCopy } from '@/data/toolPage';
import { getDictionary } from '@/i18n/getDictionary';
import { activeLocales, localePath, type Locale } from '@/lib/i18n';
import { breadcrumbs, faq } from '@/lib/jsonld';
import { contacts } from '@/lib/nav';
import { buildMetadata, siteUrl } from '@/lib/seo';

/**
 * Каркас сторінки інструмента для будь-якої мови. Сам калькулятор —
 * клієнтський острів (`children`), решта (гайд, таблиця, FAQ) рендериться
 * статично, щоб пошук бачив увесь текст.
 */

type Paths = Record<Locale, string>;

const urlFor = (paths: Paths, locale: Locale) => `${siteUrl}${localePath(locale, paths[locale])}`;

export function toolMetadata(locale: Locale, copy: ToolPageCopy, paths: Paths): Metadata {
  const meta = buildMetadata({
    locale,
    path: paths[locale],
    title: copy.meta.title,
    description: copy.meta.description,
  });
  // Slug у кожної мови свій, тож hreflang збираємо вручну
  const languages: Record<string, string> = {};
  for (const l of activeLocales) languages[l] = urlFor(paths, l);
  languages['x-default'] = urlFor(paths, 'uk');
  return { ...meta, alternates: { canonical: urlFor(paths, locale), languages } };
}

function jsonLd(locale: Locale, c: ToolPageCopy, paths: Paths) {
  return [
    breadcrumbs(locale, [
      [c.crumbs.home, '/'],
      [c.crumbs.tools, '/tools'],
      [c.crumbs.page, paths[locale]],
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: c.app.name,
      url: urlFor(paths, locale),
      description: c.meta.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      inLanguage: locale,
      isAccessibleForFree: true,
      dateModified: c.checkedDate ?? RATES_CHECKED,
      featureList: c.app.features,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    faq(c.faq.items),
  ];
}

export default function ToolPage({
  locale,
  copy: c,
  paths,
  children,
}: {
  locale: Locale;
  copy: ToolPageCopy;
  paths: Paths;
  children: React.ReactNode;
}) {
  const g = c.guide;
  const t = getDictionary(locale);
  const messenger = MESSENGER[locale];
  const messengerHref = messenger.kind === 'whatsapp' ? contacts.whatsapp : contacts.telegramManager;

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd(locale, c, paths)} />

      <section className="bg-[#141414]">
        <div className="shell pb-12 pt-8 md:pb-[5rem] md:pt-12">
          <nav aria-label="breadcrumbs" className="flex flex-wrap items-center gap-2.5 text-sm text-[#8A8A8A]">
            <Link href="/" className="hover:text-brand-orange">
              {c.crumbs.home}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/tools" className="hover:text-brand-orange">
              {c.crumbs.tools}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-brand-orange">{c.crumbs.page}</span>
          </nav>

          <div className="mt-10 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:mt-14 md:text-sm">
            {c.hero.eyebrow}
          </div>
          <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
            <h1 className="fs-64 mob-32 font-bold text-white">{c.hero.title}</h1>
            <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">{c.hero.subtitle}</p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 md:mt-12">
            {c.chips.map(([label, value]) => (
              <li key={label} className="flex h-11 items-center gap-2.5 border-[1.5px] border-[#3A3A3A] px-4 text-sm">
                <span className="text-[#CFCFCF]">{label}</span>
                <span className="font-bold text-white">{value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] text-[#8A8A8A]">
            <time dateTime={c.checkedDate ?? RATES_CHECKED}>{c.hero.checked}</time>
          </p>

          <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-4">
            <AnimatedButton variant="primary" href="#calculator">
              {c.cta.calculate}
            </AnimatedButton>
            <AnimatedButton variant="light" href="#lead">
              {t.common.freeConsultation}
            </AnimatedButton>
          </div>
        </div>
      </section>

      <section id="calculator" className="sec-y scroll-mt-16 bg-[#EEEEEE] md:scroll-mt-20">
        <div className="shell">{children}</div>
      </section>

      <section className="sec-y bg-white">
        <div className="shell">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">{g.eyebrow}</div>
          <div className="mt-3 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-20">
            <h2 className="fs-48 mob-26 font-bold text-[#222222]">{g.title}</h2>
            <p className="mob-16 text-base leading-[1.6] text-[#555555] md:text-[1.0625rem]">{g.intro}</p>
          </div>

          <div className="mt-8 overflow-x-auto md:mt-12">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr className="bg-[#141414] text-white">
                  {g.table.head.map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.table.rows.map(([name, rate, base]) => (
                  <tr key={name} className="border-b border-[#DCDCDC]">
                    <th scope="row" className="px-5 py-4 font-semibold text-[#222222]">
                      {name}
                    </th>
                    <td className="px-5 py-4 font-semibold text-brand-orange">{rate}</td>
                    <td className="px-5 py-4 text-[#555555]">{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-2.5 md:mt-16 md:grid-cols-3 md:gap-[0.9375rem]">
            <div className="rounded-[0.25rem] bg-[#141414] p-6 text-white md:p-8">
              <h3 className="text-xl font-semibold md:text-[1.375rem]">{g.formulaTitle}</h3>
              <p className="mt-4 text-base leading-[1.6] text-[#CFCFCF]">{g.formula}</p>
            </div>
            <div className="rounded-[0.25rem] bg-[#EEEEEE] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[#222222] md:text-[1.375rem]">{g.exampleTitle}</h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem] leading-[1.55] text-[#555555]">
                {g.example.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[0.25rem] bg-[#FFF1EB] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-[#222222] md:text-[1.375rem]">{g.tipsTitle}</h3>
              <ul className="mt-4 flex flex-col gap-3 text-[0.9375rem] leading-[1.55] text-[#555555]">
                {g.tips.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-[0.5625rem] h-1.5 w-1.5 flex-none bg-brand-orange" aria-hidden />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Помаранчева смуга з пропозицією — як фінальний CTA на головній */}
      <section className="sec-y bg-brand-orange">
        <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-[47rem]">
            <h2 className="fs-44 mob-26 font-bold text-white">{c.cta.bandTitle}</h2>
            <p className="mob-16 mt-4 text-base leading-[1.55] text-white/90 md:text-[1.125rem]">{c.cta.bandText}</p>
          </div>
          <div className="flex flex-none flex-col gap-3">
            <AnimatedButton variant="light" href="#lead" className="md:w-full">
              {t.common.freeConsultation}
            </AnimatedButton>
            <AnimatedButton variant="dark" icon={messenger.kind} href={messengerHref} className="md:w-full">
              {messenger.label}
            </AnimatedButton>
          </div>
        </div>
      </section>

      <section id="faq" className="sec-y bg-[#EEEEEE]">
        <div className="shell grid grid-cols-1 items-start gap-10 grid-faq md:gap-20">
          <div className="md:sticky md:top-[6.875rem]">
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
              {c.faq.eyebrow}
            </div>
            <h2 className="fs-48 mob-26 mt-3 font-bold text-[#222222]">{c.faq.title}</h2>
            <p className="mt-4 text-base leading-[1.5] text-[#555555]">{c.faq.text}</p>
            <a
              href="#lead"
              className="mt-6 inline-flex text-base font-bold uppercase tracking-[0.02em] text-brand-orange"
            >
              {c.faq.cta} <span aria-hidden>→</span>
            </a>
          </div>

          {/* Нативний <details>: відповіді в HTML одразу, без JS */}
          <div className="flex flex-col gap-2.5">
            {c.faq.items.map(([question, answer], i) => (
              <details
                key={question}
                open={i === 0}
                className="group overflow-hidden rounded-xl bg-white md:rounded-md"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3.5 p-[1.125rem] md:gap-4 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#FDE3D8] text-sm font-bold text-brand-orange md:h-auto md:w-11 md:rounded-none md:bg-transparent md:tracking-[0.06em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="flex-1 text-base font-semibold leading-[1.3] text-[#222222] md:text-xl">
                    {question}
                  </h3>
                  <span
                    className="flex h-7 w-7 flex-none items-center justify-center rounded-md text-[#8A8A8A] transition-colors md:h-11 md:w-11 md:bg-[#F2F2F2] md:text-[#222222] group-open:bg-brand-orange group-open:text-white"
                    aria-hidden
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="transition-transform duration-300 group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mob-15 px-[1.125rem] pb-[1.125rem] text-base leading-[1.6] text-[#555555] md:pb-[1.625rem] md:pl-[5.5rem] md:pr-[5.75rem]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeadForm theme="dark" title={c.lead.title} subtitle={c.lead.subtitle} />
    </div>
  );
}
