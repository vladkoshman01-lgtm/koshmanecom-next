import { COUNTRY_RATES, calculateProfit, type Country } from './etsyProfit';

/**
 * Прибуток з одного продажу на Etsy, Amazon Handmade, eBay і Shopify.
 * Усі суми в доларах — майданчики продають переважно американським покупцям.
 *
 * Ставки (жовтень 2026):
 * - Etsy — як у калькуляторі прибутку (транзакція 6.5% + обробка платежу країни + лістинг);
 * - Amazon Handmade — 15% від суми з доставкою, мінімум $0.30; план Professional
 *   для схвалених майстрів безкоштовний;
 * - eBay — 13.6% від суми з доставкою + $0.40 за замовлення (від $10, інакше $0.30),
 *   плюс 1.65% international fee для продавців не з США;
 * - Shopify — план Basic $39/міс розподіляємо на продажі; Shopify Payments 2.9% + $0.30
 *   у США, в інших країнах — сторонній шлюз ≈3.5% + $0.30 і ще 2% комісії Shopify.
 *
 * ПДВ на комісії (Україна 20%, Словаччина 23%) нараховуємо однаково на всі майданчики:
 * це податок на цифрові послуги нерезидентів, а не особливість Etsy.
 */

export type Platform = 'etsy' | 'amazon' | 'ebay' | 'shopify';

export const PLATFORM_RATES = {
  amazonReferral: 15,
  amazonMin: 0.3,
  ebayFinalValue: 13.6,
  ebayPerOrder: 0.4,
  ebayPerOrderSmall: 0.3,
  ebayInternational: 1.65,
  shopifyPlan: 39,
  shopifyPayments: 2.9,
  shopifyPaymentsFixed: 0.3,
  gatewayRate: 3.5,
  gatewayFixed: 0.3,
  shopifyThirdParty: 2,
};

export type CompareInput = {
  country: Country;
  price: number;
  shippingCharged: number;
  itemCost: number;
  packaging: number;
  shippingCost: number;
  monthlySales: number;
  /** Реклама на власний сайт, на один продаж — маркетплейси дають трафік, Shopify ні. */
  shopifyAdsPerSale: number;
  vatOnFees: boolean;
};

export type PlatformResult = {
  platform: Platform;
  fees: number;
  /** Окремі складники комісій для підказки. */
  parts: [string, number][];
  profit: number;
  margin: number;
  monthlyProfit: number;
};

export function comparePlatforms(input: CompareInput): PlatformResult[] {
  const orderTotal = input.price + input.shippingCharged;
  const costs = input.itemCost + input.packaging + input.shippingCost;
  const sales = Math.max(1, input.monthlySales);
  const vatRate = input.vatOnFees ? COUNTRY_RATES[input.country].vatRate / 100 : 0;
  const abroad = input.country !== 'us';

  const finish = (platform: Platform, parts: [string, number][], extra = 0): PlatformResult => {
    const base = parts.reduce((s, [, v]) => s + v, 0);
    const vat = base * vatRate;
    const all: [string, number][] = vat > 0 ? [...parts, ['vat', vat]] : parts;
    const fees = base + vat;
    const profit = orderTotal - fees - costs - extra;
    return {
      platform,
      fees,
      parts: all,
      profit,
      margin: orderTotal > 0 ? (profit / orderTotal) * 100 : 0,
      monthlyProfit: profit * sales,
    };
  };

  const etsy = calculateProfit({
    country: input.country,
    price: input.price,
    shippingCharged: input.shippingCharged,
    itemCost: 0,
    packaging: 0,
    shippingCost: 0,
    offsiteAds: 'off',
    vatOnFees: false,
    conversion: false,
    taxRate: 0,
    withdrawalRate: 0,
    monthlySales: 1,
  });

  const r = PLATFORM_RATES;
  const amazonFee = Math.max((orderTotal * r.amazonReferral) / 100, r.amazonMin);
  const ebayFee = (orderTotal * r.ebayFinalValue) / 100 + (orderTotal > 10 ? r.ebayPerOrder : r.ebayPerOrderSmall);
  const shopifyPayments = abroad
    ? (orderTotal * (r.gatewayRate + r.shopifyThirdParty)) / 100 + r.gatewayFixed
    : (orderTotal * r.shopifyPayments) / 100 + r.shopifyPaymentsFixed;

  return [
    finish('etsy', [
      ['listing', etsy.listing],
      ['transaction', etsy.transaction],
      ['processing', etsy.processing],
    ]),
    finish('amazon', [['referral', amazonFee]]),
    finish('ebay', [
      ['finalValue', ebayFee],
      ...(abroad ? ([['international', (orderTotal * r.ebayInternational) / 100]] as [string, number][]) : []),
    ]),
    finish(
      'shopify',
      [
        ['plan', r.shopifyPlan / sales],
        ['payments', shopifyPayments],
      ],
      input.shopifyAdsPerSale,
    ),
  ];
}
