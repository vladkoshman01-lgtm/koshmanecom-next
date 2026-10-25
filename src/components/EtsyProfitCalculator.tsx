'use client';

import React, { useMemo, useState } from 'react';
import { useContactModal } from './ContactModalProvider';

type CalculatorCopy = {
  title: string;
  subtitle: string;
  labels: {
    price: string;
    cost: string;
    shipping: string;
    packaging: string;
    transactionFee: string;
    paymentFee: string;
    listingFee: string;
    offsiteAds: string;
    currencyConversion: string;
    payoneerFee: string;
    fopTax: string;
    monthlySales: string;
  };
  placeholders: {
    price: string;
    cost: string;
    shipping: string;
    packaging: string;
    monthlySales: string;
  };
  actions: {
    calculate: string;
    consultation: string;
  };
  results: {
    feesTitle: string;
    transactionFee: string;
    paymentFee: string;
    listingFee: string;
    offsiteAdsFee: string;
    currencyConversionFee: string;
    payoneerFee: string;
    fopTaxFee: string;
    totalCosts: string;
    profit: string;
    margin: string;
    monthlyProfit: string;
  };
  cards: {
    profit: string;
    margin: string;
    monthly: string;
  };
  lead: {
    title: string;
    body: string;
  };
  seo: {
    title: string;
    body: string;
  };
  ui?: Record<string, string>;
};

type CalculatorProps = {
  locale: 'uk' | 'en';
  copy: CalculatorCopy;
};

const feeDefaults = {
  transactionRate: 6.5,
  paymentRate: 6,
  paymentFixed: 0.3,
  listingFee: 0.2,
  offsiteAdsRate: 12,
  currencyConversionRate: 2.5,
  payoneerRate: 2,
  fopTaxRate: 6,
};

function fmt(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function NumberInput({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
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
        checked
          ? 'border-brand-orange bg-orange-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          checked ? 'border-brand-orange bg-brand-orange' : 'border-slate-300'
        }`}
      >
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

export default function EtsyProfitCalculator({ locale, copy }: CalculatorProps) {
  const { openModal } = useContactModal();
  const fmtLocale = locale === 'uk' ? 'uk-UA' : 'en-US';

  const isUk = locale === 'uk';

  const [price, setPrice] = useState('120');
  const [cost, setCost] = useState('30');
  const [shipping, setShipping] = useState('0');
  const [packaging, setPackaging] = useState('3');
  const [monthlySales, setMonthlySales] = useState('30');
  const [includeOffsiteAds, setIncludeOffsiteAds] = useState(false);
  const [includeCurrencyConversion, setIncludeCurrencyConversion] = useState(false);
  const [includePayoneer, setIncludePayoneer] = useState(false);
  const [includeFopTax, setIncludeFopTax] = useState(false);

  const languageSwitch = isUk
    ? { label: 'EN', href: '/etsy-profit-calculator' }
    : { label: 'UA', href: '/kalkulyator-prybutku-etsy' };

  const v = useMemo(() => {
    const priceVal = Number(price) || 0;
    const costVal = Number(cost) || 0;
    const shippingVal = Number(shipping) || 0;
    const packagingVal = Number(packaging) || 0;
    const monthlySalesVal = Math.max(1, Number(monthlySales) || 1);

    const orderTotal = priceVal + shippingVal;
    const transactionFee = orderTotal * (feeDefaults.transactionRate / 100);
    const paymentFee = orderTotal * (feeDefaults.paymentRate / 100) + feeDefaults.paymentFixed;
    const listingFee = feeDefaults.listingFee;
    const offsiteAdsFee = includeOffsiteAds ? orderTotal * (feeDefaults.offsiteAdsRate / 100) : 0;
    const currencyConversionFee = includeCurrencyConversion ? orderTotal * (feeDefaults.currencyConversionRate / 100) : 0;
    const payoneerFee = includePayoneer ? orderTotal * (feeDefaults.payoneerRate / 100) : 0;
    const fopTaxFee = includeFopTax ? orderTotal * (feeDefaults.fopTaxRate / 100) : 0;

    const totalEtsyFees = transactionFee + paymentFee + listingFee + offsiteAdsFee + currencyConversionFee + payoneerFee + fopTaxFee;
    const totalCost = costVal + shippingVal + packagingVal + totalEtsyFees;
    const profit = priceVal - totalCost;
    const margin = priceVal > 0 ? (profit / priceVal) * 100 : 0;
    const monthlyProfit = profit * monthlySalesVal;

    return {
      priceVal, costVal, shippingVal, packagingVal,
      transactionFee, paymentFee, listingFee,
      offsiteAdsFee, currencyConversionFee, payoneerFee, fopTaxFee,
      totalEtsyFees, totalCost, profit, margin, monthlyProfit, monthlySalesVal,
    };
  }, [price, cost, shipping, packaging, monthlySales, includeOffsiteAds, includeCurrencyConversion, includePayoneer, includeFopTax]);

  const profitPositive = v.profit >= 0;

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
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">{copy.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{copy.subtitle}</p>
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

              {/* Block 1 — Sale */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  {isUk ? '1. Ціна продажу' : '1. Sale price'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isUk ? 'Вкажіть ціну та вартість доставки, які бачить покупець.' : 'Enter the price and shipping the buyer sees.'}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:items-end">
                  <NumberInput
                    label={isUk ? 'Ціна товару' : 'Item price'}
                    value={price}
                    onChange={setPrice}
                    placeholder="120"
                  />
                  <NumberInput
                    label={isUk ? 'Вартість доставки' : 'Shipping'}
                    hint={isUk ? 'Якщо доставка безкоштовна — залиште 0' : 'Leave 0 if free shipping'}
                    value={shipping}
                    onChange={setShipping}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Block 2 — Your costs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  {isUk ? '2. Ваші витрати' : '2. Your costs'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isUk ? 'Скільки вам коштує виготовлення та відправка одного товару.' : 'How much it costs you to make and ship one item.'}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:items-end">
                  <NumberInput
                    label={isUk ? 'Собівартість товару' : 'Cost of goods'}
                    hint={isUk ? 'Матеріали, виробництво' : 'Materials, production'}
                    value={cost}
                    onChange={setCost}
                    placeholder="30"
                  />
                  <NumberInput
                    label={isUk ? 'Пакування' : 'Packaging'}
                    hint={isUk ? 'Коробка, стрічка, наповнювач' : 'Box, tape, filler'}
                    value={packaging}
                    onChange={setPackaging}
                    placeholder="3"
                  />
                </div>
              </div>

              {/* Block 3 — Monthly */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  {isUk ? '3. Скільки продаєте на місяць?' : '3. Monthly sales volume'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isUk ? 'Для розрахунку місячного прибутку.' : 'Used to calculate your monthly profit.'}
                </p>
                <div className="mt-4 max-w-xs">
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-slate-700">{isUk ? 'Продажів на місяць' : 'Sales per month'}</span>
                    <input
                      type="number"
                      min="1"
                      value={monthlySales}
                      onChange={(e) => setMonthlySales(e.target.value)}
                      placeholder="30"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </label>
                </div>
              </div>

              {/* Block 4 — Optional */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  {isUk ? '4. Додаткові витрати' : '4. Optional costs'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {isUk ? 'Вмикайте лише те, що стосується вас.' : 'Enable only what applies to you.'}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Toggle
                    label="Offsite Ads"
                    hint={isUk ? '12% від замовлення. Etsy просуває ваш товар на інших сайтах — якщо є продаж, ви платите.' : '12% of order. Etsy promotes you on external sites — you pay only if it sells.'}
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

              {/* Profit card */}
              <div className={`rounded-2xl p-6 text-white ${profitPositive ? 'bg-slate-900' : 'bg-red-600'}`}>
                <div className="text-xs uppercase tracking-widest opacity-60">
                  {isUk ? 'Прибуток з продажу' : 'Profit per sale'}
                </div>
                <div className="mt-2 text-4xl font-extrabold">
                  {fmt(v.profit, fmtLocale)}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-3">
                    <div className="text-xs opacity-60">{isUk ? 'Маржа' : 'Margin'}</div>
                    <div className="mt-1 text-xl font-bold">{v.margin.toFixed(1)}%</div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <div className="text-xs opacity-60">{isUk ? `На місяць (×${v.monthlySalesVal})` : `Monthly (×${v.monthlySalesVal})`}</div>
                    <div className="mt-1 text-xl font-bold">{fmt(v.monthlyProfit, fmtLocale)}</div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  {isUk ? 'Розбивка витрат' : 'Cost breakdown'}
                </h3>

                {/* Revenue */}
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-slate-600">{isUk ? 'Ціна продажу' : 'Sale price'}</span>
                  <span className="font-medium text-slate-900">{fmt(v.priceVal, fmtLocale)}</span>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3 space-y-2 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {isUk ? 'Комісії Etsy' : 'Etsy fees'}
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{isUk ? 'Транзакція (6.5%)' : 'Transaction (6.5%)'}</span>
                    <span className="text-red-500">−{fmt(v.transactionFee, fmtLocale)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{isUk ? 'Оплата (6% + $0.30)' : 'Payments (6% + $0.30)'}</span>
                    <span className="text-red-500">−{fmt(v.paymentFee, fmtLocale)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{isUk ? 'Лістинг' : 'Listing'}</span>
                    <span className="text-red-500">−{fmt(v.listingFee, fmtLocale)}</span>
                  </div>
                  {v.offsiteAdsFee > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Offsite Ads</span>
                      <span className="text-red-500">−{fmt(v.offsiteAdsFee, fmtLocale)}</span>
                    </div>
                  )}
                  {v.currencyConversionFee > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>{isUk ? 'Конвертація' : 'Conversion'}</span>
                      <span className="text-red-500">−{fmt(v.currencyConversionFee, fmtLocale)}</span>
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
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {isUk ? 'Ваші витрати' : 'Your costs'}
                  </div>
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
                  <span className="font-semibold text-slate-700">{isUk ? 'Чистий прибуток' : 'Net profit'}</span>
                  <span className={`text-lg font-extrabold ${profitPositive ? 'text-slate-900' : 'text-red-600'}`}>
                    {fmt(v.profit, fmtLocale)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">{copy.lead.title}</h3>
            <p className="mt-3 text-slate-600">{copy.lead.body}</p>
            <button
              onClick={openModal}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-white font-bold shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-700"
            >
              {copy.actions.consultation}
            </button>
          </div>

          {/* FAQ */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                {isUk ? 'Як працює калькулятор' : 'How it works'}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Комісії Etsy рахуються від суми замовлення (ціна + доставка).'
                    : 'Etsy fees are calculated on the order total (price + shipping).'}
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'З отриманої суми віднімаємо ваші витрати — отримуємо чистий прибуток.'
                    : 'From the remaining amount we subtract your costs to get net profit.'}
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  {isUk
                    ? 'Розрахунок відбувається миттєво — ваші дані не зберігаються.'
                    : 'Calculation is instant — your data is never saved.'}
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {isUk ? 'Чи враховано всі комісії?' : 'Are all fees included?'}
                  </h3>
                  <p className="mt-1 text-slate-600">
                    {isUk
                      ? 'Так. Основні комісії вже враховані. Додаткові (Offsite Ads, Payoneer тощо) можна увімкнути.'
                      : 'Yes. Main fees are already included. Optional ones (Offsite Ads, Payoneer, etc.) can be toggled on.'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {isUk ? 'Чому доставка впливає на комісію?' : 'Why does shipping affect fees?'}
                  </h3>
                  <p className="mt-1 text-slate-600">
                    {isUk
                      ? 'Etsy стягує відсоток від усієї суми замовлення, включно з доставкою.'
                      : 'Etsy charges a percentage of the entire order total, including shipping.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">{copy.seo.title}</h2>
            <div className="mt-3 space-y-3 text-slate-600 leading-relaxed">
              {copy.seo.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
