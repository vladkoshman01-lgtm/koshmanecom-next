'use client';

import React, { useMemo, useState } from 'react';
import { useContactModal } from './ContactModalProvider';

type Props = {
  locale: 'uk' | 'en';
};

const feeRates = {
  transaction: 0.065,
  payment: 0.06,
  paymentFixed: 0.30,
  listingFee: 0.20,
  offsiteAds: 0.15,
  currencyConversion: 0.025,
  payoneer: 0.02,
  fopTax: 0.06,
};

function fmt(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function psychologicalPrice(price: number): number {
  if (price <= 0) return 0;
  if (price < 10) return Math.ceil(price) - 0.01;
  if (price < 25) return Math.ceil(price / 5) * 5 - 0.01;
  if (price < 100) return Math.ceil(price / 10) * 10 - 0.01;
  return Math.ceil(price / 25) * 25 - 0.01;
}

function Toggle({
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
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
        checked ? 'border-brand-orange bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${checked ? 'border-brand-orange bg-brand-orange' : 'border-slate-300'}`}>
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 10">
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-800">{label}</div>
        <div className="mt-0.5 text-xs text-slate-500">{hint}</div>
      </div>
    </button>
  );
}

function NumberInput({
  label,
  hint,
  value,
  onChange,
  placeholder,
  prefix = '$',
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{prefix}</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-7 pr-4 text-slate-800 outline-none transition focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
        />
      </div>
    </label>
  );
}

export default function EtsyPricingCalculator({ locale }: Props) {
  const { openModal } = useContactModal();
  const isUk = locale === 'uk';
  const fmtLocale = isUk ? 'uk-UA' : 'en-US';

  const [cost, setCost] = useState('20');
  const [packaging, setPackaging] = useState('3');
  const [shipping, setShipping] = useState('0');
  const [targetType, setTargetType] = useState<'margin' | 'fixed'>('margin');
  const [targetMargin, setTargetMargin] = useState('35');
  const [targetProfit, setTargetProfit] = useState('15');
  const [includeOffsiteAds, setIncludeOffsiteAds] = useState(false);
  const [includeCurrencyConversion, setIncludeCurrencyConversion] = useState(false);
  const [includePayoneer, setIncludePayoneer] = useState(false);
  const [includeFopTax, setIncludeFopTax] = useState(false);

  const languageSwitch = isUk
    ? { label: 'EN', href: '/etsy-pricing-calculator' }
    : { label: 'UA', href: '/kalkulyator-tsinoutvorennya-etsy' };

  const v = useMemo(() => {
    const costVal = Number(cost) || 0;
    const packagingVal = Number(packaging) || 0;
    const shippingVal = Number(shipping) || 0;
    const marginVal = Math.min(Number(targetMargin) || 0, 99) / 100;
    const fixedProfitVal = Number(targetProfit) || 0;

    // Total fee rate applied to orderTotal (price + shipping)
    const totalFeeRate =
      feeRates.transaction +
      feeRates.payment +
      (includeOffsiteAds ? feeRates.offsiteAds : 0) +
      (includeCurrencyConversion ? feeRates.currencyConversion : 0) +
      (includePayoneer ? feeRates.payoneer : 0) +
      (includeFopTax ? feeRates.fopTax : 0);

    const totalFeeFixed = feeRates.paymentFixed + feeRates.listingFee;

    // Solve for price:
    // If margin target:
    //   profit = price * marginVal
    //   price * (1 - totalFeeRate - marginVal) = costVal + shippingVal*(1+totalFeeRate) + packagingVal + totalFeeFixed
    //
    // If fixed profit target:
    //   price * (1 - totalFeeRate) = costVal + shippingVal*(1+totalFeeRate) + packagingVal + totalFeeFixed + fixedProfitVal

    let minPrice = 0;
    if (targetType === 'margin') {
      const denom = 1 - totalFeeRate - marginVal;
      if (denom <= 0) {
        minPrice = Infinity;
      } else {
        minPrice = (costVal + shippingVal * (1 + totalFeeRate) + packagingVal + totalFeeFixed) / denom;
      }
    } else {
      const denom = 1 - totalFeeRate;
      minPrice = (costVal + shippingVal * (1 + totalFeeRate) + packagingVal + totalFeeFixed + fixedProfitVal) / denom;
    }

    const recommendedPrice = psychologicalPrice(minPrice);

    // Calculate actual profit at recommended price
    const orderTotal = recommendedPrice + shippingVal;
    const etsyFees = orderTotal * totalFeeRate + totalFeeFixed;
    const totalCost = costVal + shippingVal + packagingVal + etsyFees;
    const actualProfit = recommendedPrice - totalCost;
    const actualMargin = recommendedPrice > 0 ? (actualProfit / recommendedPrice) * 100 : 0;

    // Fee breakdown at recommended price
    const transactionFee = orderTotal * feeRates.transaction;
    const paymentFee = orderTotal * feeRates.payment + feeRates.paymentFixed;
    const offsiteAdsFee = includeOffsiteAds ? orderTotal * feeRates.offsiteAds : 0;
    const currencyFee = includeCurrencyConversion ? orderTotal * feeRates.currencyConversion : 0;
    const payoneerFee = includePayoneer ? orderTotal * feeRates.payoneer : 0;
    const fopTaxFee = includeFopTax ? orderTotal * feeRates.fopTax : 0;

    return {
      minPrice,
      recommendedPrice,
      actualProfit,
      actualMargin,
      totalCost,
      costVal,
      packagingVal,
      shippingVal,
      transactionFee,
      paymentFee,
      listingFee: feeRates.listingFee,
      offsiteAdsFee,
      currencyFee,
      payoneerFee,
      fopTaxFee,
      etsyFees,
    };
  }, [cost, packaging, shipping, targetType, targetMargin, targetProfit, includeOffsiteAds, includeCurrencyConversion, includePayoneer, includeFopTax]);

  const impossible = !isFinite(v.minPrice) || v.minPrice <= 0;

  const t = {
    title: isUk ? 'Калькулятор ціноутворення Etsy' : 'Etsy Pricing Calculator',
    subtitle: isUk
      ? 'Введіть ваші витрати та бажаний прибуток — отримайте мінімальну та рекомендовану ціну продажу.'
      : 'Enter your costs and target profit — get the minimum and recommended sale price.',
    costs: isUk ? '1. Ваші витрати' : '1. Your costs',
    costsHint: isUk ? 'Скільки коштує виготовити та відправити один товар.' : 'How much it costs to make and ship one item.',
    costLabel: isUk ? 'Собівартість товару' : 'Cost of goods',
    costHint: isUk ? 'Матеріали, виробництво' : 'Materials, production',
    packagingLabel: isUk ? 'Пакування' : 'Packaging',
    packagingHint: isUk ? 'Коробка, стрічка, наповнювач' : 'Box, tape, filler',
    shippingLabel: isUk ? 'Вартість доставки' : 'Shipping cost',
    shippingHint: isUk ? 'Якщо доставка безкоштовна — залиште 0' : 'Leave 0 if free shipping',
    target: isUk ? '2. Бажаний прибуток' : '2. Target profit',
    targetHint: isUk ? 'Оберіть тип цілі — у відсотках або фіксовану суму.' : 'Choose margin % or a fixed profit amount.',
    byMargin: isUk ? 'Маржа (%)' : 'Margin (%)',
    byFixed: isUk ? 'Фіксований прибуток ($)' : 'Fixed profit ($)',
    marginLabel: isUk ? 'Бажана маржа' : 'Target margin',
    profitLabel: isUk ? 'Прибуток з продажу' : 'Profit per sale',
    extras: isUk ? '3. Додаткові витрати' : '3. Optional costs',
    extrasHint: isUk ? 'Вмикайте лише те, що стосується вас.' : 'Enable only what applies to you.',
    minPrice: isUk ? 'Мінімальна ціна' : 'Minimum price',
    minPriceHint: isUk ? 'Нижче цієї ціни — збиток' : 'Selling below this means a loss',
    recPrice: isUk ? 'Рекомендована ціна' : 'Recommended price',
    recPriceHint: isUk ? 'Психологічно зручна ціна для покупця' : 'Buyer-friendly rounded price',
    yourProfit: isUk ? 'Ваш прибуток' : 'Your profit',
    margin: isUk ? 'Маржа' : 'Margin',
    breakdown: isUk ? 'Розбивка витрат' : 'Cost breakdown',
    etsyFees: isUk ? 'Комісії Etsy' : 'Etsy fees',
    yourCosts: isUk ? 'Ваші витрати' : 'Your costs',
    netProfit: isUk ? 'Чистий прибуток' : 'Net profit',
    transaction: isUk ? 'Транзакція (6.5%)' : 'Transaction (6.5%)',
    payment: isUk ? 'Оплата (6% + $0.30)' : 'Payments (6% + $0.30)',
    listing: isUk ? 'Лістинг' : 'Listing',
    cta: isUk ? 'Хочете запустити магазин на Etsy з правильним ціноутворенням?' : 'Ready to launch your Etsy shop with the right pricing?',
    ctaBody: isUk ? 'Отримайте безкоштовну консультацію від Koshman Ecom.' : 'Get a free consultation from Koshman Ecom.',
    ctaBtn: isUk ? 'Отримати консультацію' : 'Get a free consultation',
    impossibleMsg: isUk
      ? 'Неможливо досягти такої маржі з цими витратами. Спробуйте зменшити маржу або витрати.'
      : 'Cannot reach this margin with these costs. Try reducing the margin or costs.',
    atPrice: isUk ? 'при рекомендованій ціні' : 'at recommended price',
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(239,68,6,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.08),_transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">

          {/* Lang switch */}
          <div className="flex justify-end">
            <a
              href={languageSwitch.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
            >
              {languageSwitch.label}
            </a>
          </div>

          {/* Hero */}
          <div className="mt-4 max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              Etsy
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">{t.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{t.subtitle}</p>
          </div>

          {/* Fee badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: isUk ? 'Комісія транзакції' : 'Transaction fee', value: '6.5%' },
              { label: 'Etsy Payments', value: '6% + $0.30' },
              { label: isUk ? 'За лістинг' : 'Listing fee', value: '$0.20' },
              { label: isUk ? 'Ставки для України' : 'Ukraine rates', value: isUk ? 'Оновлено 2026' : 'Updated 2026' },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm">
                <div className="text-slate-500">{b.label}</div>
                <div className="mt-0.5 font-semibold text-slate-900">{b.value}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">

            {/* Left — inputs */}
            <div className="space-y-5">

              {/* Block 1 — Costs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">{t.costs}</h2>
                <p className="mt-1 text-sm text-slate-500">{t.costsHint}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:items-end">
                  <NumberInput label={t.costLabel} hint={t.costHint} value={cost} onChange={setCost} placeholder="20" />
                  <NumberInput label={t.packagingLabel} hint={t.packagingHint} value={packaging} onChange={setPackaging} placeholder="3" />
                </div>
                <div className="mt-4 max-w-xs">
                  <NumberInput label={t.shippingLabel} hint={t.shippingHint} value={shipping} onChange={setShipping} placeholder="0" />
                </div>
              </div>

              {/* Block 2 — Target */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">{t.target}</h2>
                <p className="mt-1 text-sm text-slate-500">{t.targetHint}</p>

                {/* Toggle margin vs fixed */}
                <div className="mt-4 flex rounded-xl border border-slate-200 p-1 bg-slate-50 w-fit gap-1">
                  {(['margin', 'fixed'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTargetType(type)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        targetType === type ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {type === 'margin' ? t.byMargin : t.byFixed}
                    </button>
                  ))}
                </div>

                <div className="mt-4 max-w-xs">
                  {targetType === 'margin' ? (
                    <label className="block space-y-1.5">
                      <span className="text-sm font-medium text-slate-700">{t.marginLabel}</span>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={targetMargin}
                          onChange={(e) => setTargetMargin(e.target.value)}
                          placeholder="35"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 pr-8 text-slate-800 outline-none transition focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                      </div>
                    </label>
                  ) : (
                    <NumberInput label={t.profitLabel} value={targetProfit} onChange={setTargetProfit} placeholder="15" />
                  )}
                </div>
              </div>

              {/* Block 3 — Optional */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">{t.extras}</h2>
                <p className="mt-1 text-sm text-slate-500">{t.extrasHint}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Toggle
                    label="Offsite Ads"
                    hint={isUk ? '15% від замовлення. Для магазинів з оборотом до $10K/рік.' : '15% of order. For shops under $10K/year revenue.'}
                    checked={includeOffsiteAds}
                    onChange={setIncludeOffsiteAds}
                  />
                  <Toggle
                    label={isUk ? 'Конвертація валюти' : 'Currency conversion'}
                    hint={isUk ? '2.5% якщо ваш банк отримує не в USD.' : '2.5% if your bank receives in a different currency.'}
                    checked={includeCurrencyConversion}
                    onChange={setIncludeCurrencyConversion}
                  />
                  <Toggle
                    label="Payoneer"
                    hint={isUk ? '2% за виведення коштів через Payoneer.' : '2% fee for Payoneer withdrawal.'}
                    checked={includePayoneer}
                    onChange={setIncludePayoneer}
                  />
                  <Toggle
                    label={isUk ? 'Податок ФОП 3 гр.' : 'FOP Tax (UA)'}
                    hint={isUk ? '6% від доходу для ФОП 3 групи.' : '6% income tax for Ukrainian sole proprietors.'}
                    checked={includeFopTax}
                    onChange={setIncludeFopTax}
                  />
                </div>
              </div>
            </div>

            {/* Right — result */}
            <div className="lg:sticky lg:top-24 space-y-4 self-start">
              {impossible ? (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700 text-sm font-medium">
                  {t.impossibleMsg}
                </div>
              ) : (
                <>
                  {/* Price cards */}
                  <div className="rounded-2xl bg-slate-900 p-6 text-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/10 p-4">
                        <div className="text-xs opacity-60 uppercase tracking-wider">{t.minPrice}</div>
                        <div className="mt-1 text-2xl font-extrabold">{fmt(v.minPrice, fmtLocale)}</div>
                        <div className="mt-1 text-xs opacity-50">{t.minPriceHint}</div>
                      </div>
                      <div className="rounded-xl bg-brand-orange p-4">
                        <div className="text-xs opacity-80 uppercase tracking-wider">{t.recPrice}</div>
                        <div className="mt-1 text-2xl font-extrabold">{fmt(v.recommendedPrice, fmtLocale)}</div>
                        <div className="mt-1 text-xs opacity-80">{t.recPriceHint}</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/10 p-3">
                        <div className="text-xs opacity-60">{t.yourProfit}</div>
                        <div className="mt-1 text-lg font-bold">{fmt(v.actualProfit, fmtLocale)}</div>
                        <div className="text-xs opacity-50">{t.atPrice}</div>
                      </div>
                      <div className="rounded-xl bg-white/10 p-3">
                        <div className="text-xs opacity-60">{t.margin}</div>
                        <div className="mt-1 text-lg font-bold">{v.actualMargin.toFixed(1)}%</div>
                        <div className="text-xs opacity-50">{t.atPrice}</div>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{t.breakdown}</h3>

                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-slate-600">{isUk ? 'Ціна продажу' : 'Sale price'}</span>
                      <span className="font-medium text-slate-900">{fmt(v.recommendedPrice, fmtLocale)}</span>
                    </div>

                    <div className="mt-3 border-t border-slate-100 pt-3 space-y-2 text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.etsyFees}</div>
                      <div className="flex justify-between text-slate-600">
                        <span>{t.transaction}</span>
                        <span className="text-red-500">−{fmt(v.transactionFee, fmtLocale)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>{t.payment}</span>
                        <span className="text-red-500">−{fmt(v.paymentFee, fmtLocale)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>{t.listing}</span>
                        <span className="text-red-500">−{fmt(v.listingFee, fmtLocale)}</span>
                      </div>
                      {v.offsiteAdsFee > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>Offsite Ads</span>
                          <span className="text-red-500">−{fmt(v.offsiteAdsFee, fmtLocale)}</span>
                        </div>
                      )}
                      {v.currencyFee > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>{isUk ? 'Конвертація' : 'Conversion'}</span>
                          <span className="text-red-500">−{fmt(v.currencyFee, fmtLocale)}</span>
                        </div>
                      )}
                      {v.payoneerFee > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>Payoneer</span>
                          <span className="text-red-500">−{fmt(v.payoneerFee, fmtLocale)}</span>
                        </div>
                      )}
                      {v.fopTaxFee > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>{isUk ? 'Податок ФОП' : 'FOP Tax'}</span>
                          <span className="text-red-500">−{fmt(v.fopTaxFee, fmtLocale)}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 border-t border-slate-100 pt-3 space-y-2 text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.yourCosts}</div>
                      <div className="flex justify-between text-slate-600">
                        <span>{isUk ? 'Собівартість' : 'Cost of goods'}</span>
                        <span className="text-red-500">−{fmt(v.costVal, fmtLocale)}</span>
                      </div>
                      {v.shippingVal > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>{isUk ? 'Доставка' : 'Shipping'}</span>
                          <span className="text-red-500">−{fmt(v.shippingVal, fmtLocale)}</span>
                        </div>
                      )}
                      {v.packagingVal > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>{isUk ? 'Пакування' : 'Packaging'}</span>
                          <span className="text-red-500">−{fmt(v.packagingVal, fmtLocale)}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 rounded-xl bg-slate-50 p-4 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">{t.netProfit}</span>
                      <span className={`text-lg font-extrabold ${v.actualProfit >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                        {fmt(v.actualProfit, fmtLocale)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">{t.cta}</h3>
            <p className="mt-3 text-slate-600">{t.ctaBody}</p>
            <button
              onClick={openModal}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-white font-bold shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-700"
            >
              {t.ctaBtn}
            </button>
          </div>

          {/* SEO content */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                {isUk ? 'Як правильно встановити ціну на Etsy' : 'How to price your Etsy products'}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Комісії Etsy рахуються від суми замовлення — ціна товару плюс доставка.'
                    : 'Etsy fees are based on the order total — item price plus shipping.'}
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Калькулятор розраховує мінімальну ціну математично — нижче неї ви у збитку.'
                    : 'The calculator solves for the minimum price mathematically — below it you lose money.'}
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Рекомендована ціна — психологічно зручне число (напр. $49.99 замість $47.20).'
                    : 'The recommended price is a buyer-friendly number (e.g. $49.99 instead of $47.20).'}
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Оптимальна маржа для Etsy — від 30%. Нижче — ризик збитку при зростанні витрат.'
                    : 'A healthy Etsy margin starts at 30%. Below that, any cost increase puts you in the red.'}
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {isUk ? 'У чому різниця між мінімальною і рекомендованою ціною?' : 'What is the difference between minimum and recommended price?'}
                  </h3>
                  <p className="mt-1 text-slate-600">
                    {isUk
                      ? 'Мінімальна ціна — математично точна: нижче неї ви заробляєте менше бажаного. Рекомендована — округлена до психологічно зручного числа, яке краще сприймається покупцями.'
                      : 'The minimum price is mathematically exact: below it you earn less than your target. The recommended price is rounded to a buyer-friendly number that performs better.'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {isUk ? 'Чому варто обирати маржу від 30%?' : 'Why target at least 30% margin?'}
                  </h3>
                  <p className="mt-1 text-slate-600">
                    {isUk
                      ? 'При маржі нижче 30% будь-яке підвищення собівартості або нова комісія одразу роблять товар збитковим. Маржа 35–50% дає буфер для реклами, знижок і зростання витрат.'
                      : 'Below 30% any cost increase or new fee instantly makes the product unprofitable. A 35–50% margin gives room for ads, discounts, and rising costs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
