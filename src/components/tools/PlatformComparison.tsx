'use client';

import React, { useMemo, useState } from 'react';
import { fill, useLocale, useT } from '@/i18n/LocaleProvider';
import { COMPARISON_COPY, COMPARISON_PATHS } from '@/data/platformComparison';
import { PROFIT_CALC_COPY } from '@/data/etsyProfitCalculator';
import { COUNTRY_RATES } from '@/lib/etsyProfit';
import { comparePlatforms, type Platform } from '@/lib/platformFees';
import { Block, Field, RatesNote, Switch, moneyFormatter, num, percentFormatter } from './calcUi';

/**
 * Порівняння прибутку з одного продажу на Etsy, Amazon Handmade, eBay і Shopify.
 * Платформи відсортовані за прибутком, найвигідніша — у темній картці зверху.
 */

const PLATFORMS: Record<Platform, { name: string; color: string }> = {
  etsy: { name: 'Etsy', color: '#F1641E' },
  amazon: { name: 'Amazon Handmade', color: '#FF9900' },
  ebay: { name: 'eBay', color: '#E53238' },
  shopify: { name: 'Shopify', color: '#95BF47' },
};

type Fields = {
  price: string;
  shippingCharged: string;
  itemCost: string;
  packaging: string;
  shippingCost: string;
  monthlySales: string;
  shopifyAds: string;
};

export default function PlatformComparison() {
  const locale = useLocale();
  const t = useT();
  const c = COMPARISON_COPY[locale];
  const p = PROFIT_CALC_COPY[locale];
  const country = p.defaultCountry;
  const vatRate = COUNTRY_RATES[country].vatRate;

  const [fields, setFields] = useState<Fields>({
    price: '80',
    shippingCharged: '0',
    itemCost: '20',
    packaging: '3',
    shippingCost: '0',
    monthlySales: '30',
    shopifyAds: '10',
  });
  const [vatOnFees, setVatOnFees] = useState(vatRate > 0);
  const set = (key: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [key]: v }));

  const results = useMemo(
    () =>
      comparePlatforms({
        country,
        price: num(fields.price),
        shippingCharged: num(fields.shippingCharged),
        itemCost: num(fields.itemCost),
        packaging: num(fields.packaging),
        shippingCost: num(fields.shippingCost),
        monthlySales: Math.round(num(fields.monthlySales)),
        shopifyAdsPerSale: num(fields.shopifyAds),
        vatOnFees,
      }).sort((a, b) => b.profit - a.profit),
    [country, fields, vatOnFees],
  );

  const money = moneyFormatter(locale, 'USD');
  const pct = percentFormatter(locale);
  const [best, second] = results;
  const ads = num(fields.shopifyAds);

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-[0.9375rem]">
      <form className="flex flex-col gap-2.5 md:gap-[0.9375rem]" onSubmit={(e) => e.preventDefault()}>
        <RatesNote
          locale={locale}
          title={p.form.country}
          hint={p.form.countryHint}
          summary={c.form.note}
          otherLabel={p.form.otherCountries}
          paths={COMPARISON_PATHS}
          countryName={(l) => p.countries[PROFIT_CALC_COPY[l].defaultCountry]}
        />

        <Block index={1} title={c.form.product}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={c.form.price} prefix="$" value={fields.price} onChange={set('price')} />
            <Field
              label={c.form.shippingCharged}
              hint={c.form.shippingChargedHint}
              prefix="$"
              value={fields.shippingCharged}
              onChange={set('shippingCharged')}
            />
          </div>
        </Block>

        <Block index={2} title={c.form.costs}>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field
              label={p.form.itemCost}
              hint={p.form.itemCostHint}
              prefix="$"
              value={fields.itemCost}
              onChange={set('itemCost')}
            />
            <Field label={p.form.packaging} prefix="$" value={fields.packaging} onChange={set('packaging')} />
            <Field
              label={p.form.shippingCost}
              hint={p.form.shippingCostHint}
              prefix="$"
              value={fields.shippingCost}
              onChange={set('shippingCost')}
            />
          </div>
        </Block>

        <Block index={3} title={c.form.shopify}>
          <div className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={c.form.shopifyAds}
                hint={c.form.shopifyAdsHint}
                prefix="$"
                value={fields.shopifyAds}
                onChange={set('shopifyAds')}
              />
              <Field
                label={c.form.monthlySales}
                hint={c.form.monthlySalesHint}
                step="1"
                value={fields.monthlySales}
                onChange={set('monthlySales')}
              />
            </div>
            {vatRate > 0 ? (
              <div className="sm:w-1/2 sm:pr-2.5">
                <Switch
                  label={`${c.form.vat} ${vatRate}%`}
                  hint={c.form.vatHint}
                  checked={vatOnFees}
                  onChange={setVatOnFees}
                />
              </div>
            ) : null}
          </div>
        </Block>
      </form>

      <aside aria-live="polite" className="flex flex-col gap-2.5 lg:sticky lg:top-[6.5rem]">
        <div className="rounded-[0.25rem] bg-[#141414] p-6 text-white md:p-8">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#FF8A5C]">{c.result.best}</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-3 w-3 flex-none" style={{ background: PLATFORMS[best.platform].color }} aria-hidden />
            <span className="text-[2rem] font-bold leading-[1.1] md:text-[2.5rem]">{PLATFORMS[best.platform].name}</span>
          </div>
          <div className="mt-3 text-sm text-[#CFCFCF]">
            {fill(c.result.bestText, {
              diff: money(Math.max(0, best.profit - second.profit)),
              second: PLATFORMS[second.platform].name,
            })}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-px bg-[#3A3A3A]">
            <div className="bg-[#141414] pb-1 pr-3 pt-4">
              <div className="text-xs text-[#8A8A8A]">{c.result.profit}</div>
              <div className={`mt-1 text-xl font-bold sm:text-2xl ${best.profit < 0 ? 'text-brand-orange' : ''}`}>
                {money(best.profit)}
              </div>
            </div>
            <div className="bg-[#141414] pb-1 pl-4 pt-4">
              <div className="text-xs text-[#8A8A8A]">
                {c.result.monthly} · ×{Math.round(num(fields.monthlySales))}
              </div>
              <div className="mt-1 break-words text-xl font-bold sm:text-2xl">{money(best.monthlyProfit, 0)}</div>
            </div>
          </div>
          <a
            href="#lead"
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C]"
          >
            {t.common.freeConsultation} <span aria-hidden>→</span>
          </a>
        </div>

        {results.map((r, i) => {
          const meta = PLATFORMS[r.platform];
          const top = Math.max(...results.map((x) => Math.max(0, x.profit))) || 1;
          return (
            <div key={r.platform} className="rounded-[0.25rem] bg-white p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-[#8A8A8A]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-2.5 w-2.5 flex-none" style={{ background: meta.color }} aria-hidden />
                    <span className="text-lg font-semibold text-[#222222]">{meta.name}</span>
                  </div>
                  <div className="mt-1 text-xs text-[#8A8A8A]">{c.result.platformNotes[r.platform]}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${r.profit < 0 ? 'text-brand-orange' : 'text-[#222222]'}`}>
                    {money(r.profit)}
                  </div>
                  <div className="text-xs text-[#8A8A8A]">
                    {c.result.margin} {pct(r.margin)}%
                  </div>
                </div>
              </div>

              {/* Смуга прибутку відносно найкращої платформи */}
              <div className="mt-4 h-1.5 w-full bg-[#EEEEEE]" aria-hidden>
                <div
                  className="h-full transition-[width] duration-300"
                  style={{ width: `${(Math.max(0, r.profit) / top) * 100}%`, background: meta.color }}
                />
              </div>

              <details className="group mt-3 text-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[#555555] [&::-webkit-details-marker]:hidden">
                  <span>
                    {c.result.fees}: <span className="font-semibold text-[#222222]">−{money(r.fees)}</span>
                    {r.platform === 'shopify' && ads > 0 ? (
                      <>
                        {' · '}
                        {c.result.ads}: <span className="font-semibold text-[#222222]">−{money(ads)}</span>
                      </>
                    ) : null}
                  </span>
                  <span className="text-[#8A8A8A] transition-transform group-open:rotate-180" aria-hidden>
                    ▾
                  </span>
                </summary>
                <div className="mt-2 border-t border-[#EEEEEE] pt-2">
                  {r.parts
                    .filter(([, v]) => v > 0)
                    .map(([key, v]) => (
                      <div key={key} className="flex justify-between gap-4 py-0.5 text-[#555555]">
                        <span>{c.result.parts[key] ?? key}</span>
                        <span>−{money(v)}</span>
                      </div>
                    ))}
                </div>
              </details>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
