'use client';

import React, { useMemo, useState } from 'react';
import { useContactModal } from './ContactModalProvider';
import { Trophy, ArrowRight } from 'lucide-react';

type Locale = 'uk' | 'en';

const SHOPIFY_MONTHLY = 29;

const platforms = {
  etsy: {
    name: 'Etsy',
    color: '#F56400',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    feeRate: 0.065 + 0.06,
    feeFixed: 0.30 + 0.20,
    transactionRate: 0,
  },
  amazon: {
    name: 'Amazon Handmade',
    color: '#FF9900',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    feeRate: 0.15,
    feeFixed: 0,
    transactionRate: 0,
  },
  ebay: {
    name: 'eBay',
    color: '#E53238',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    feeRate: 0.1325,
    feeFixed: 0,
    transactionRate: 0,
  },
  shopify: {
    name: 'Shopify',
    color: '#96BF48',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    feeRate: 0.029,
    feeFixed: 0.30,
    transactionRate: 0,
  },
};

function fmt(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
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

export default function PlatformComparison({ locale }: { locale: Locale }) {
  const { openModal } = useContactModal();
  const isUk = locale === 'uk';
  const fmtLocale = isUk ? 'uk-UA' : 'en-US';

  const [price, setPrice] = useState('80');
  const [cost, setCost] = useState('20');
  const [shipping, setShipping] = useState('0');
  const [packaging, setPackaging] = useState('3');
  const [monthlySales, setMonthlySales] = useState('30');

  const languageSwitch = isUk
    ? { label: 'EN', href: '/etsy-vs-amazon-vs-shopify' }
    : { label: 'UA', href: '/etsy-vs-amazon-vs-shopify-ukr' };

  const results = useMemo(() => {
    const priceVal = Number(price) || 0;
    const costVal = Number(cost) || 0;
    const shippingVal = Number(shipping) || 0;
    const packagingVal = Number(packaging) || 0;
    const salesVal = Math.max(1, Number(monthlySales) || 1);

    return Object.entries(platforms).map(([key, p]) => {
      const orderTotal = priceVal + shippingVal;

      let fees = 0;
      let shopifyMonthlyPerSale = 0;

      if (key === 'shopify') {
        fees = orderTotal * p.feeRate + p.feeFixed;
        shopifyMonthlyPerSale = SHOPIFY_MONTHLY / salesVal;
        fees += shopifyMonthlyPerSale;
      } else {
        fees = orderTotal * p.feeRate + p.feeFixed;
      }

      const totalCost = costVal + shippingVal + packagingVal + fees;
      const profit = priceVal - totalCost;
      const margin = priceVal > 0 ? (profit / priceVal) * 100 : 0;
      const monthlyProfit = profit * salesVal;

      return {
        key,
        name: p.name,
        color: p.color,
        bg: p.bg,
        border: p.border,
        badge: p.badge,
        fees,
        profit,
        margin,
        monthlyProfit,
        shopifyMonthlyPerSale,
      };
    });
  }, [price, cost, shipping, packaging, monthlySales]);

  const best = results.reduce((a, b) => (a.profit > b.profit ? a : b));

  const t = {
    title: isUk
      ? 'Etsy vs Amazon vs eBay vs Shopify — де більше заробиш?'
      : 'Etsy vs Amazon vs eBay vs Shopify — where do you earn more?',
    subtitle: isUk
      ? 'Введіть параметри вашого товару — калькулятор покаже реальний прибуток на кожній платформі після всіх комісій.'
      : 'Enter your product details — the calculator shows real profit on each platform after all fees.',
    inputsTitle: isUk ? 'Параметри товару' : 'Product details',
    priceLabel: isUk ? 'Ціна продажу' : 'Sale price',
    costLabel: isUk ? 'Собівартість' : 'Cost of goods',
    costHint: isUk ? 'Матеріали, виробництво' : 'Materials, production',
    shippingLabel: isUk ? 'Доставка' : 'Shipping',
    shippingHint: isUk ? '0 якщо безкоштовна' : '0 if free shipping',
    packagingLabel: isUk ? 'Пакування' : 'Packaging',
    salesLabel: isUk ? 'Продажів на місяць' : 'Sales per month',
    salesHint: isUk ? 'Для розрахунку місячного прибутку' : 'For monthly profit calculation',
    fees: isUk ? 'Комісії' : 'Fees',
    profit: isUk ? 'Прибуток' : 'Profit',
    margin: isUk ? 'Маржа' : 'Margin',
    monthly: isUk ? 'На місяць' : 'Monthly',
    best: isUk ? 'Найвигідніша платформа для вашого товару' : 'Best platform for your product',
    ctaTitle: isUk
      ? 'Визначились з платформою? Допоможемо запустити'
      : 'Decided on a platform? We\'ll help you launch',
    ctaBody: isUk
      ? 'Koshman Ecom допомагає відкрити та розвинути магазин на Etsy, Amazon Handmade, eBay і Shopify. Від налаштування до перших продажів.'
      : 'Koshman Ecom helps launch and grow shops on Etsy, Amazon Handmade, eBay, and Shopify. From setup to first sales.',
    ctaBtn: isUk ? 'Отримати безкоштовну консультацію' : 'Get a free consultation',
    shopifyNote: isUk
      ? `* Shopify включає $${SHOPIFY_MONTHLY}/міс підписку, розподілену на кількість продажів`
      : `* Shopify includes $${SHOPIFY_MONTHLY}/mo subscription spread across your sales volume`,
    perSale: isUk ? 'за продаж' : 'per sale',
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(239,68,6,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.08),_transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">

          {/* Lang switch */}
          <div className="flex justify-end">
            <a href={languageSwitch.href} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange">
              {languageSwitch.label}
            </a>
          </div>

          {/* Hero */}
          <div className="mt-4 max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              {isUk ? 'Порівняння платформ' : 'Platform comparison'}
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">{t.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{t.subtitle}</p>
          </div>

          {/* Platform badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { name: 'Etsy', fees: isUk ? 'Комісія ~12.7% + $0.50' : 'Fee ~12.7% + $0.50' },
              { name: 'Amazon Handmade', fees: isUk ? 'Referral fee 15%' : 'Referral fee 15%' },
              { name: 'eBay', fees: isUk ? 'Final value fee 13.25%' : 'Final value fee 13.25%' },
              { name: 'Shopify', fees: isUk ? '$29/міс + 2.9% + $0.30' : '$29/mo + 2.9% + $0.30' },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm">
                <div className="font-semibold text-slate-900">{p.name}</div>
                <div className="mt-0.5 text-slate-500">{p.fees}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">

            {/* Left — inputs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm self-start">
              <h2 className="text-base font-semibold text-slate-900">{t.inputsTitle}</h2>
              <div className="mt-5 space-y-4">
                <NumberInput label={t.priceLabel} value={price} onChange={setPrice} placeholder="80" />
                <NumberInput label={t.costLabel} hint={t.costHint} value={cost} onChange={setCost} placeholder="20" />
                <NumberInput label={t.shippingLabel} hint={t.shippingHint} value={shipping} onChange={setShipping} placeholder="0" />
                <NumberInput label={t.packagingLabel} value={packaging} onChange={setPackaging} placeholder="3" />
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium text-slate-700">{t.salesLabel}</span>
                  <span className="block text-xs text-slate-400">{t.salesHint}</span>
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

            {/* Right — results */}
            <div className="space-y-4">

              {/* Best platform banner */}
              <div className="rounded-2xl bg-slate-900 text-white p-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-60">{t.best}</div>
                  <div className="mt-1 text-2xl font-extrabold">{best.name}</div>
                  <div className="mt-0.5 text-sm opacity-70">
                    {fmt(best.profit, fmtLocale)} {isUk ? 'прибутку' : 'profit'} · {best.margin.toFixed(1)}% {isUk ? 'маржа' : 'margin'}
                  </div>
                </div>
              </div>

              {/* Platform cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                {results.map((r) => (
                  <div
                    key={r.key}
                    className={`rounded-2xl border p-5 ${r.border} ${r.bg} ${r.key === best.key ? 'ring-2 ring-offset-1' : ''}`}
                    style={r.key === best.key ? { '--tw-ring-color': r.color } as React.CSSProperties : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.badge}`}>{r.name}</span>
                      {r.key === best.key && <Trophy className="h-4 w-4 text-yellow-500" />}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="text-xs text-slate-500">{t.fees}</div>
                        <div className="mt-0.5 text-lg font-bold text-red-600">−{fmt(r.fees, fmtLocale)}</div>
                        {r.key === 'shopify' && r.shopifyMonthlyPerSale > 0 && (
                          <div className="text-xs text-slate-400">
                            {isUk ? 'вкл.' : 'incl.'} ${r.shopifyMonthlyPerSale.toFixed(2)} {t.perSale} {isUk ? 'за підписку' : 'for subscription'}
                          </div>
                        )}
                      </div>
                      <div className="border-t border-white/50 pt-3">
                        <div className="text-xs text-slate-500">{t.profit}</div>
                        <div className={`mt-0.5 text-xl font-extrabold ${r.profit >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                          {fmt(r.profit, fmtLocale)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-white/70 p-2.5">
                          <div className="text-xs text-slate-500">{t.margin}</div>
                          <div className="mt-0.5 text-sm font-bold text-slate-800">{r.margin.toFixed(1)}%</div>
                        </div>
                        <div className="rounded-xl bg-white/70 p-2.5">
                          <div className="text-xs text-slate-500">{t.monthly}</div>
                          <div className="mt-0.5 text-sm font-bold text-slate-800">{fmt(r.monthlyProfit, fmtLocale)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400">{t.shopifyNote}</p>
            </div>
          </div>

          {/* CTA — головний блок */}
          <div className="mt-14 rounded-3xl bg-slate-900 text-white p-6 md:p-12">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-300">
              Koshman Ecom
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-extrabold">{t.ctaTitle}</h2>
            <p className="mt-3 text-slate-300">{t.ctaBody}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              {(isUk ? [
                'Відкриття та налаштування магазину',
                'SEO-оптимізація лістингів і карток товарів',
                'Налаштування реклами та аналітики',
                'Стратегія ціноутворення під вашу нішу',
              ] : [
                'Shop setup and configuration',
                'SEO optimization of listings and product pages',
                'Ads and analytics setup',
                'Pricing strategy for your niche',
              ]).map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-white font-bold shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600"
            >
              {t.ctaBtn}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* SEO content */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Etsy',
                pros: isUk
                  ? ['Готова аудиторія покупців handmade', 'Легкий старт без технічних знань', 'Вбудований пошук і SEO']
                  : ['Built-in handmade buyer audience', 'Easy start, no technical knowledge', 'Built-in search and SEO'],
                cons: isUk
                  ? ['Висока конкуренція', 'Комісії на кожен продаж', 'Обмежений брендинг']
                  : ['High competition', 'Fees on every sale', 'Limited branding'],
              },
              {
                title: 'Amazon Handmade',
                pros: isUk
                  ? ['Найбільша аудиторія у світі', 'Висока довіра покупців', 'Prime доставка']
                  : ['Largest audience worldwide', 'High buyer trust', 'Prime shipping'],
                cons: isUk
                  ? ['Висока комісія 15%', 'Складна верифікація для handmade', 'Жорсткі вимоги']
                  : ['High 15% referral fee', 'Strict handmade verification', 'Complex requirements'],
              },
              {
                title: 'eBay',
                pros: isUk
                  ? ['Величезна аудиторія покупців', 'Гнучкі формати продажу', 'Перші 250 лістингів безкоштовно']
                  : ['Massive buyer audience', 'Flexible listing formats', 'First 250 listings free'],
                cons: isUk
                  ? ['Менш підходить для handmade', 'Комісія 13.25% з продажу', 'Висока конкуренція з масовим товаром']
                  : ['Less suited for handmade', '13.25% final value fee', 'High competition from mass products'],
              },
              {
                title: 'Shopify',
                pros: isUk
                  ? ['Повний контроль над брендом', 'Низькі комісії з продажів', 'Необмежений функціонал']
                  : ['Full brand control', 'Low per-sale fees', 'Unlimited functionality'],
                cons: isUk
                  ? ['Потрібно залучати трафік самостійно', 'Щомісячна оплата $29+', 'Потрібні технічні знання']
                  : ['Must drive your own traffic', 'Monthly fee $29+', 'Requires technical knowledge'],
              },
            ].map((p) => (
              <div key={p.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <div className="mt-4 space-y-1.5">
                  {p.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {pro}
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {p.cons.map((con) => (
                    <div key={con} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SEO text */}
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              {isUk ? 'Etsy, Amazon, eBay чи Shopify — яку платформу обрати?' : 'Etsy, Amazon, eBay or Shopify — which platform to choose?'}
            </h2>
            <div className="mt-4 space-y-3 text-slate-600 leading-relaxed text-sm">
              {(isUk ? [
                'Вибір платформи — одне з найважливіших рішень для handmade продавця. Від нього залежить не лише скільки ви заробите, а й скільки часу і ресурсів витратите на розвиток бізнесу.',
                'Etsy — найкращий старт для більшості handmade продавців. Платформа вже має мільйони покупців, які шукають унікальні товари. Ви платите комісії лише з продажів, не потребуєте технічних знань і можете швидко протестувати попит.',
                'Amazon Handmade дає доступ до найбільшої покупательської аудиторії у світі та довіри бренду Amazon. Але 15% реферальна комісія та суворі вимоги до handmade верифікації роблять цю платформу складнішою для старту.',
                'Shopify — правильний вибір коли ваш бренд вже відомий або ви готові інвестувати в залучення трафіку. Низькі комісії з продажів і повний контроль над магазином роблять Shopify вигідним при великих обсягах продажів.',
                'Koshman Ecom допомагає відкрити та масштабувати магазини на всіх трьох платформах. Ми знаємо специфіку кожної і підберемо стратегію під ваш товар і ціль.',
              ] : [
                'Choosing a platform is one of the most important decisions for a handmade seller. It affects not just how much you earn, but how much time and resources you invest in growing your business.',
                'Etsy is the best starting point for most handmade sellers. The platform already has millions of buyers searching for unique products. You only pay fees on sales, need no technical knowledge, and can quickly test demand.',
                'Amazon Handmade gives access to the world\'s largest buyer audience and Amazon\'s brand trust. But the 15% referral fee and strict handmade verification requirements make it a harder platform to start on.',
                'Shopify is the right choice when your brand is already established or you\'re ready to invest in driving traffic. Low per-sale fees and full store control make Shopify profitable at high sales volumes.',
                'Koshman Ecom helps open and scale shops on all three platforms. We know the specifics of each and will build a strategy around your product and goals.',
              ]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
