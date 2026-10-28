'use client';

import React, { useMemo, useState } from 'react';
import { fill, useLocale } from '@/i18n/LocaleProvider';
import { contacts } from '@/lib/nav';
import { PROFIT_CALC_COPY, PROFIT_CALC_PATHS } from '@/data/etsyProfitCalculator';
import { MESSENGER } from '@/data/toolPage';
import { Block, Chips, Field, RatesNote, Switch, moneyFormatter, num, percentFormatter } from './calcUi';
import { COUNTRY_RATES, calculateProfit, type Country, type OffsiteAds } from '@/lib/etsyProfit';

/**
 * Інтерактивна частина сторінки калькулятора: поля зліва, липка картка
 * з результатом справа. Усе рахується в браузері, нічого не надсилається.
 */

type Fields = {
  price: string;
  shippingCharged: string;
  itemCost: string;
  packaging: string;
  shippingCost: string;
  taxRate: string;
  withdrawalRate: string;
  monthlySales: string;
};

function defaultsFor(country: Country): Fields {
  // Для євро — круглі суми в євро, щоб приклад виглядав природно
  const eur = COUNTRY_RATES[country].currency === 'EUR';
  return {
    price: eur ? '100' : '120',
    shippingCharged: '0',
    itemCost: eur ? '25' : '30',
    packaging: eur ? '2' : '3',
    shippingCost: '0',
    taxRate: String(COUNTRY_RATES[country].taxRate),
    withdrawalRate: '0',
    monthlySales: '30',
  };
}

export default function EtsyProfitCalculator() {
  const locale = useLocale();
  const c = PROFIT_CALC_COPY[locale];

  // Кожна мовна версія рахує для своєї країни: UA — Україна, EN — США, SK — Словаччина
  const country = c.defaultCountry;
  const [fields, setFields] = useState<Fields>(() => defaultsFor(c.defaultCountry));
  const [offsiteAds, setOffsiteAds] = useState<OffsiteAds>('off');
  const [vatOnFees, setVatOnFees] = useState(COUNTRY_RATES[c.defaultCountry].vatRate > 0);
  const [conversion, setConversion] = useState(false);

  const set = (key: keyof Fields) => (v: string) => setFields((f) => ({ ...f, [key]: v }));

  const reset = () => {
    setFields(defaultsFor(country));
    setOffsiteAds('off');
    setVatOnFees(COUNTRY_RATES[country].vatRate > 0);
    setConversion(false);
  };

  const rates = COUNTRY_RATES[country];
  const r = useMemo(
    () =>
      calculateProfit({
        country,
        price: num(fields.price),
        shippingCharged: num(fields.shippingCharged),
        itemCost: num(fields.itemCost),
        packaging: num(fields.packaging),
        shippingCost: num(fields.shippingCost),
        offsiteAds,
        vatOnFees,
        conversion,
        taxRate: num(fields.taxRate),
        withdrawalRate: num(fields.withdrawalRate),
        monthlySales: Math.round(num(fields.monthlySales)),
      }),
    [country, fields, offsiteAds, vatOnFees, conversion],
  );

  const money = moneyFormatter(locale, rates.currency);
  const pct = percentFormatter(locale);
  const symbol = rates.currency === 'EUR' ? '€' : '$';

  const loss = r.profit < 0;
  const taxes = r.tax + r.withdrawal;
  // Частки для смуги «куди йдуть гроші»; при збитку прибуток не малюємо
  const split = [
    { key: 'fees', value: r.etsyFees, color: '#FF5B2B' },
    { key: 'costs', value: r.costs, color: '#8A8A8A' },
    { key: 'taxes', value: taxes, color: '#CFCFCF' },
    { key: 'profit', value: Math.max(0, r.profit), color: '#FFFFFF' },
  ] as const;
  const splitTotal = split.reduce((s, x) => s + x.value, 0) || 1;

  const feeRows: [string, number][] = [
    [c.result.listing, r.listing],
    [c.result.transaction, r.transaction],
    [`${c.result.processing} ${c.processingFee}`, r.processing],
    [c.result.offsiteAds, r.offsiteAds],
    [c.result.conversion, r.conversion],
    [`${c.result.vat} ${rates.vatRate}%`, r.vat],
  ];
  const costRows: [string, number][] = [
    [c.result.itemCost, num(fields.itemCost)],
    [c.result.packaging, num(fields.packaging)],
    [c.result.shippingCost, num(fields.shippingCost)],
  ];
  const taxRows: [string, number][] = [
    [c.result.tax, r.tax],
    [c.result.withdrawal, r.withdrawal],
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-[0.9375rem]">
      <form className="flex flex-col gap-2.5 md:gap-[0.9375rem]" onSubmit={(e) => e.preventDefault()}>
        <RatesNote
          locale={locale}
          title={c.form.country}
          hint={c.form.countryHint}
          summary={fill(rates.vatRate > 0 ? c.form.countrySummary : c.form.countryNoVat, {
            fee: c.processingFee,
            currency: rates.currency,
            vat: String(rates.vatRate),
          })}
          otherLabel={c.form.otherCountries}
          paths={PROFIT_CALC_PATHS}
          countryName={(l) => c.countries[PROFIT_CALC_COPY[l].defaultCountry]}
        />

        <Block index={1} title={c.form.order}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={c.form.price} prefix={symbol} value={fields.price} onChange={set('price')} />
            <Field
              label={c.form.shippingCharged}
              hint={c.form.shippingChargedHint}
              prefix={symbol}
              value={fields.shippingCharged}
              onChange={set('shippingCharged')}
            />
          </div>
        </Block>

        <Block index={2} title={c.form.costs}>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field
              label={c.form.itemCost}
              hint={c.form.itemCostHint}
              prefix={symbol}
              value={fields.itemCost}
              onChange={set('itemCost')}
            />
            <Field label={c.form.packaging} prefix={symbol} value={fields.packaging} onChange={set('packaging')} />
            <Field
              label={c.form.shippingCost}
              hint={c.form.shippingCostHint}
              prefix={symbol}
              value={fields.shippingCost}
              onChange={set('shippingCost')}
            />
          </div>
        </Block>

        <Block index={3} title={c.form.extras}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-semibold text-[#222222]">{c.form.offsiteAds}</div>
              <div className="mt-3">
                <Chips
                  label={c.form.offsiteAds}
                  value={offsiteAds}
                  onChange={setOffsiteAds}
                  options={[
                    ['off', c.form.adsOff],
                    ['small', c.form.adsSmall],
                    ['large', c.form.adsLarge],
                  ]}
                />
              </div>
              <p className="mt-3 text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{c.form.offsiteAdsHint}</p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {rates.vatRate > 0 ? (
                <Switch
                  label={`${c.form.vat} ${rates.vatRate}%`}
                  hint={c.form.vatHint}
                  checked={vatOnFees}
                  onChange={setVatOnFees}
                />
              ) : null}
              <Switch
                label={c.form.conversion}
                hint={c.form.conversionHint}
                checked={conversion}
                onChange={setConversion}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={c.form.tax}
                hint={c.form.taxHint}
                suffix="%"
                step="0.5"
                value={fields.taxRate}
                onChange={set('taxRate')}
              />
              <Field
                label={c.form.withdrawal}
                hint={c.form.withdrawalHint}
                suffix="%"
                step="0.5"
                value={fields.withdrawalRate}
                onChange={set('withdrawalRate')}
              />
            </div>
          </div>
        </Block>

        <Block index={4} title={c.form.volume}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="w-full sm:w-64">
              <Field label={c.form.monthlySales} step="1" value={fields.monthlySales} onChange={set('monthlySales')} />
            </div>
            <button
              type="button"
              onClick={reset}
              className="h-11 text-sm font-bold uppercase tracking-[0.02em] text-[#555555] transition-colors hover:text-brand-orange"
            >
              ↺ {c.form.reset}
            </button>
          </div>
        </Block>
      </form>

      {/* Результат: на десктопі липне до верху під хедером */}
      <aside aria-live="polite" className="flex flex-col gap-2.5 lg:sticky lg:top-[6.5rem] md:gap-[0.9375rem]">
        <div className="rounded-[0.25rem] bg-[#141414] p-6 text-white md:p-8">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#FF8A5C]">
            {loss ? c.result.loss : c.result.profit}
          </div>
          <div
            className={`mt-3 text-[2.75rem] font-bold leading-none tracking-[-0.015em] md:text-[3.5rem] ${
              loss ? 'text-brand-orange' : 'text-white'
            }`}
          >
            {money(r.profit)}
          </div>
          <div className="mt-3 text-sm text-[#CFCFCF]">
            {fill(c.result.etsyShare, { share: pct(r.orderTotal > 0 ? (r.etsyFees / r.orderTotal) * 100 : 0) })}
          </div>

          {/* Куди йдуть гроші із замовлення */}
          <div className="mt-6 flex h-2.5 w-full overflow-hidden bg-[#2A2A2A]" aria-hidden>
            {split.map((s) => (
              <span
                key={s.key}
                style={{ width: `${(s.value / splitTotal) * 100}%`, background: s.color }}
                className="h-full transition-[width] duration-300"
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#CFCFCF]">
            {split.map((s) => (
              <span key={s.key} className="flex items-center gap-1.5">
                <span className="h-2 w-2 flex-none" style={{ background: s.color }} aria-hidden />
                {c.result.split[s.key]}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px bg-[#3A3A3A]">
            <div className="bg-[#141414] pb-1 pr-3 pt-4">
              <div className="text-xs text-[#8A8A8A]">{c.result.margin}</div>
              <div className="mt-1 text-xl font-bold sm:text-2xl">{pct(r.margin)}%</div>
            </div>
            <div className="bg-[#141414] pb-1 pl-4 pt-4">
              <div className="text-xs text-[#8A8A8A]">
                {c.result.monthly} · ×{Math.round(num(fields.monthlySales))}
              </div>
              {/* Місячна сума без копійок — інакше на телефоні не влазить */}
              <div className="mt-1 break-words text-xl font-bold sm:text-2xl">{money(r.monthlyProfit, 0)}</div>
            </div>
          </div>
          <div className="mt-px border-t border-[#3A3A3A] pt-4">
            <div className="text-xs text-[#8A8A8A]">{c.result.breakEven}</div>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-bold">{money(r.breakEvenPrice)}</span>
              <span className="text-xs text-[#8A8A8A]">{c.result.breakEvenHint}</span>
            </div>
          </div>

          <a
            href="#lead"
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C]"
          >
            {c.result.cta} <span aria-hidden>→</span>
          </a>
          <a
            href={MESSENGER[locale].kind === 'whatsapp' ? contacts.whatsapp : contacts.telegramManager}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 border-[1.5px] border-[#3A3A3A] text-sm font-bold uppercase tracking-[0.02em] text-white transition-colors hover:border-white"
          >
            {MESSENGER[locale].label}
          </a>
        </div>

        <div className="rounded-[0.25rem] bg-white p-6 md:p-8">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
            {c.result.breakdown}
          </div>
          <div className="mt-4 text-sm">
            <div className="flex justify-between gap-4 py-1.5 font-semibold text-[#222222]">
              <span>{c.result.orderTotal}</span>
              <span>{money(r.orderTotal)}</span>
            </div>
            {[
              [c.result.etsyFees, feeRows, r.etsyFees],
              [c.result.yourCosts, costRows, r.costs],
              [c.result.taxes, taxRows, taxes],
            ].map(([title, rows, total]) => (
              <div key={title as string} className="mt-3 border-t border-[#EEEEEE] pt-3">
                <div className="flex justify-between gap-4 py-1 font-semibold text-[#222222]">
                  <span>{title as string}</span>
                  <span>−{money(total as number)}</span>
                </div>
                {(rows as [string, number][])
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
              <span className="font-semibold text-[#222222]">{c.result.net}</span>
              <span className={`text-lg font-bold ${loss ? 'text-brand-orange' : 'text-[#222222]'}`}>
                {money(r.profit)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
