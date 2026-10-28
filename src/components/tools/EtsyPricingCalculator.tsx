'use client';

import React, { useMemo, useState } from 'react';
import { fill, useLocale } from '@/i18n/LocaleProvider';
import { contacts } from '@/lib/nav';
import { PROFIT_CALC_COPY } from '@/data/etsyProfitCalculator';
import { PRICING_CALC_COPY, PRICING_CALC_PATHS } from '@/data/etsyPricingCalculator';
import { MESSENGER } from '@/data/toolPage';
import { COUNTRY_RATES, solvePrice, type OffsiteAds } from '@/lib/etsyProfit';
import { Block, Chips, Field, RatesNote, Switch, moneyFormatter, num, percentFormatter } from './calcUi';

/**
 * Калькулятор ціни: від витрат і цільової маржі (або суми прибутку)
 * до мінімальної, точної й рекомендованої ціни. Рахує тим самим
 * двигуном, що й калькулятор прибутку, тож цифри на обох сторінках сходяться.
 */

type Fields = {
  itemCost: string;
  packaging: string;
  shippingCost: string;
  shippingCharged: string;
  margin: string;
  profit: string;
  taxRate: string;
  withdrawalRate: string;
};

export default function EtsyPricingCalculator() {
  const locale = useLocale();
  const c = PRICING_CALC_COPY[locale];
  // Поля витрат і комісій — ті самі, що в калькуляторі прибутку
  const p = PROFIT_CALC_COPY[locale];
  const country = p.defaultCountry;
  const rates = COUNTRY_RATES[country];

  const defaults: Fields = {
    itemCost: '20',
    packaging: '3',
    shippingCost: '0',
    shippingCharged: '0',
    margin: '35',
    profit: '15',
    taxRate: String(rates.taxRate),
    withdrawalRate: '0',
  };
  const [fields, setFields] = useState<Fields>(defaults);
  const [targetKind, setTargetKind] = useState<'margin' | 'profit'>('margin');
  const [offsiteAds, setOffsiteAds] = useState<OffsiteAds>('off');
  const [vatOnFees, setVatOnFees] = useState(rates.vatRate > 0);
  const [conversion, setConversion] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [key]: v }));

  const r = useMemo(
    () =>
      solvePrice(
        {
          country,
          shippingCharged: num(fields.shippingCharged),
          itemCost: num(fields.itemCost),
          packaging: num(fields.packaging),
          shippingCost: num(fields.shippingCost),
          offsiteAds,
          vatOnFees,
          conversion,
          taxRate: num(fields.taxRate),
          withdrawalRate: num(fields.withdrawalRate),
          monthlySales: 1,
        },
        targetKind === 'margin'
          ? { kind: 'margin', percent: num(fields.margin) }
          : { kind: 'profit', amount: num(fields.profit) },
      ),
    [country, fields, targetKind, offsiteAds, vatOnFees, conversion],
  );

  const money = moneyFormatter(locale, rates.currency);
  const pct = percentFormatter(locale);
  const symbol = rates.currency === 'EUR' ? '€' : '$';
  const impossible = !Number.isFinite(r.targetPrice);
  const a = r.atRecommended;
  const messenger = MESSENGER[locale];

  const copyPrice = async () => {
    try {
      await navigator.clipboard.writeText(r.recommendedPrice.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Буфер обміну заборонено — нічого страшного, ціна на екрані
    }
  };

  const rows: [string, [string, number][], number][] = [
    [
      p.result.etsyFees,
      [
        [p.result.listing, a.listing],
        [p.result.transaction, a.transaction],
        [`${p.result.processing} ${p.processingFee}`, a.processing],
        [p.result.offsiteAds, a.offsiteAds],
        [p.result.conversion, a.conversion],
        [`${p.result.vat} ${rates.vatRate}%`, a.vat],
      ],
      a.etsyFees,
    ],
    [
      p.result.yourCosts,
      [
        [p.result.itemCost, num(fields.itemCost)],
        [p.result.packaging, num(fields.packaging)],
        [p.result.shippingCost, num(fields.shippingCost)],
      ],
      a.costs,
    ],
    [
      p.result.taxes,
      [
        [p.result.tax, a.tax],
        [p.result.withdrawal, a.withdrawal],
      ],
      a.tax + a.withdrawal,
    ],
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-[0.9375rem]">
      <form className="flex flex-col gap-2.5 md:gap-[0.9375rem]" onSubmit={(e) => e.preventDefault()}>
        <RatesNote
          locale={locale}
          title={p.form.country}
          hint={p.form.countryHint}
          summary={fill(rates.vatRate > 0 ? p.form.countrySummary : p.form.countryNoVat, {
            fee: p.processingFee,
            currency: rates.currency,
            vat: String(rates.vatRate),
          })}
          otherLabel={p.form.otherCountries}
          paths={PRICING_CALC_PATHS}
          countryName={(l) => p.countries[PROFIT_CALC_COPY[l].defaultCountry]}
        />

        <Block index={1} title={p.form.costs}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={p.form.itemCost}
              hint={p.form.itemCostHint}
              prefix={symbol}
              value={fields.itemCost}
              onChange={set('itemCost')}
            />
            <Field label={p.form.packaging} prefix={symbol} value={fields.packaging} onChange={set('packaging')} />
            <Field
              label={p.form.shippingCost}
              hint={p.form.shippingCostHint}
              prefix={symbol}
              value={fields.shippingCost}
              onChange={set('shippingCost')}
            />
            <Field
              label={p.form.shippingCharged}
              hint={c.form.shippingHint}
              prefix={symbol}
              value={fields.shippingCharged}
              onChange={set('shippingCharged')}
            />
          </div>
        </Block>

        <Block index={2} title={c.form.target}>
          <Chips
            label={c.form.target}
            value={targetKind}
            onChange={setTargetKind}
            options={[
              ['margin', c.form.byMargin],
              ['profit', c.form.byProfit],
            ]}
          />
          <div className="mt-5 sm:w-72">
            {targetKind === 'margin' ? (
              <Field
                label={c.form.margin}
                hint={c.form.marginHint}
                suffix="%"
                step="1"
                value={fields.margin}
                onChange={set('margin')}
              />
            ) : (
              <Field
                label={c.form.profit}
                hint={c.form.profitHint}
                prefix={symbol}
                value={fields.profit}
                onChange={set('profit')}
              />
            )}
          </div>
        </Block>

        <Block index={3} title={p.form.extras}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-semibold text-[#222222]">{p.form.offsiteAds}</div>
              <div className="mt-3">
                <Chips
                  label={p.form.offsiteAds}
                  value={offsiteAds}
                  onChange={setOffsiteAds}
                  options={[
                    ['off', p.form.adsOff],
                    ['small', p.form.adsSmall],
                    ['large', p.form.adsLarge],
                  ]}
                />
              </div>
              <p className="mt-3 text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{p.form.offsiteAdsHint}</p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {rates.vatRate > 0 ? (
                <Switch
                  label={`${p.form.vat} ${rates.vatRate}%`}
                  hint={p.form.vatHint}
                  checked={vatOnFees}
                  onChange={setVatOnFees}
                />
              ) : null}
              <Switch
                label={p.form.conversion}
                hint={p.form.conversionHint}
                checked={conversion}
                onChange={setConversion}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={p.form.tax}
                hint={p.form.taxHint}
                suffix="%"
                step="0.5"
                value={fields.taxRate}
                onChange={set('taxRate')}
              />
              <Field
                label={p.form.withdrawal}
                hint={p.form.withdrawalHint}
                suffix="%"
                step="0.5"
                value={fields.withdrawalRate}
                onChange={set('withdrawalRate')}
              />
            </div>
          </div>
        </Block>
      </form>

      {/* Результат: на десктопі липне до верху під хедером */}
      <aside aria-live="polite" className="flex flex-col gap-2.5 lg:sticky lg:top-[6.5rem] md:gap-[0.9375rem]">
        <div className="rounded-[0.25rem] bg-[#141414] p-6 text-white md:p-8">
          {impossible ? (
            <>
              <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#FF8A5C]">
                {c.result.recommended}
              </div>
              <div className="mt-3 text-[1.75rem] font-bold leading-[1.15] text-brand-orange">{c.result.impossible}</div>
              <p className="mt-3 text-sm leading-[1.5] text-[#CFCFCF]">{c.result.impossibleHint}</p>
            </>
          ) : (
            <>
              <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#FF8A5C]">
                {c.result.recommended}
              </div>
              <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="text-[2.75rem] font-bold leading-none tracking-[-0.015em] md:text-[3.5rem]">
                  {money(r.recommendedPrice)}
                </span>
                <button
                  type="button"
                  onClick={copyPrice}
                  className="mb-1 text-xs font-bold uppercase tracking-[0.06em] text-[#CFCFCF] transition-colors hover:text-white"
                >
                  {copied ? `✓ ${c.result.copied}` : c.result.copy}
                </button>
              </div>
              <div className="mt-3 text-sm text-[#CFCFCF]">{c.result.recommendedHint}</div>

              <div className="mt-6 grid grid-cols-2 gap-px bg-[#3A3A3A]">
                <div className="bg-[#141414] pb-1 pr-3 pt-4">
                  <div className="text-xs text-[#8A8A8A]">{c.result.profit}</div>
                  <div className="mt-1 text-xl font-bold sm:text-2xl">{money(a.profit)}</div>
                </div>
                <div className="bg-[#141414] pb-1 pl-4 pt-4">
                  <div className="text-xs text-[#8A8A8A]">{c.result.margin}</div>
                  <div className="mt-1 text-xl font-bold sm:text-2xl">{pct(a.margin)}%</div>
                </div>
              </div>
              <div className="mt-px border-t border-[#3A3A3A] pt-4">
                <div className="text-xs text-[#8A8A8A]">{c.result.target}</div>
                <div className="mt-1 text-lg font-bold">{money(r.targetPrice)}</div>
              </div>
            </>
          )}

          <div className="mt-4 border-t border-[#3A3A3A] pt-4">
            <div className="text-xs text-[#8A8A8A]">{c.result.breakEven}</div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-lg font-bold">{money(r.breakEvenPrice)}</span>
              <span className="text-xs text-[#8A8A8A]">{c.result.breakEvenHint}</span>
            </div>
          </div>

          <a
            href="#lead"
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C]"
          >
            {p.result.cta} <span aria-hidden>→</span>
          </a>
          <a
            href={messenger.kind === 'whatsapp' ? contacts.whatsapp : contacts.telegramManager}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 border-[1.5px] border-[#3A3A3A] text-sm font-bold uppercase tracking-[0.02em] text-white transition-colors hover:border-white"
          >
            {messenger.label}
          </a>
        </div>

        {impossible ? null : (
          <div className="rounded-[0.25rem] bg-white p-6 md:p-8">
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
              {c.result.breakdown}
            </div>
            <div className="mt-4 text-sm">
              <div className="flex justify-between gap-4 py-1.5 font-semibold text-[#222222]">
                <span>{p.result.orderTotal}</span>
                <span>{money(a.orderTotal)}</span>
              </div>
              {rows.map(([title, list, total]) => (
                <div key={title} className="mt-3 border-t border-[#EEEEEE] pt-3">
                  <div className="flex justify-between gap-4 py-1 font-semibold text-[#222222]">
                    <span>{title}</span>
                    <span>−{money(total)}</span>
                  </div>
                  {list
                    .filter(([, v]) => v > 0)
                    .map(([label, v]) => (
                      <div key={label} className="flex justify-between gap-4 py-1 text-[#555555]">
                        <span>{label}</span>
                        <span>−{money(v)}</span>
                      </div>
                    ))}
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between gap-4 bg-[#EEEEEE] px-4 py-3.5">
                <span className="font-semibold text-[#222222]">{p.result.net}</span>
                <span className="text-lg font-bold text-[#222222]">{money(a.profit)}</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
