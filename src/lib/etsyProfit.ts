/**
 * Розрахунок прибутку з одного продажу на Etsy.
 *
 * Ставки звірені з довідкою Etsy (жовтень 2026):
 * - лістинг $0.20 за публікацію і за кожне автоматичне поновлення після продажу;
 * - транзакція 6.5% від суми замовлення — ціна + доставка, яку платить покупець;
 * - обробка платежу залежить від країни банківського рахунку продавця
 *   і теж рахується від суми з доставкою;
 * - Offsite Ads 15% (магазини до $10k продажів за рік) або 12%, не більше $100 за замовлення;
 * - конвертація 2.5%, якщо валюта лістингів не збігається з валютою рахунку;
 * - без VAT ID Etsy додає ПДВ на свої комісії (Україна 20%, Словаччина 23%).
 */

export type Country = 'ua' | 'us' | 'sk';

export type CountryRates = {
  currency: 'USD' | 'EUR';
  processingRate: number;
  processingFixed: number;
  listingFee: number;
  /** ПДВ, який Etsy нараховує на свої комісії продавцям без VAT ID. */
  vatRate: number;
  /** Податок з доходу за замовчуванням: ФОП 3 група — 5% єдиний + 1% військовий збір. */
  taxRate: number;
};

export const COUNTRY_RATES: Record<Country, CountryRates> = {
  ua: { currency: 'USD', processingRate: 6, processingFixed: 0.3, listingFee: 0.2, vatRate: 20, taxRate: 6 },
  us: { currency: 'USD', processingRate: 3, processingFixed: 0.25, listingFee: 0.2, vatRate: 0, taxRate: 0 },
  // Лістинг Etsy виставляє в доларах і переводить у валюту рахунку — $0.20 ≈ €0.19
  sk: { currency: 'EUR', processingRate: 4, processingFixed: 0.3, listingFee: 0.19, vatRate: 23, taxRate: 0 },
};

export const ETSY_RATES = {
  transaction: 6.5,
  offsiteAdsSmall: 15,
  offsiteAdsLarge: 12,
  offsiteAdsCap: 100,
  conversion: 2.5,
};

export type OffsiteAds = 'off' | 'small' | 'large';

export type ProfitInput = {
  country: Country;
  price: number;
  shippingCharged: number;
  itemCost: number;
  packaging: number;
  shippingCost: number;
  offsiteAds: OffsiteAds;
  vatOnFees: boolean;
  conversion: boolean;
  /** % від суми замовлення */
  taxRate: number;
  /** % від виплати Etsy (Payoneer, банк) */
  withdrawalRate: number;
  monthlySales: number;
};

export type ProfitResult = {
  orderTotal: number;
  listing: number;
  transaction: number;
  processing: number;
  offsiteAds: number;
  conversion: number;
  vat: number;
  etsyFees: number;
  payout: number;
  withdrawal: number;
  tax: number;
  costs: number;
  profit: number;
  /** % від суми замовлення */
  margin: number;
  monthlyProfit: number;
  /** Мінімальна ціна товару, за якої прибуток ≥ 0 (доставка та витрати ті самі). */
  breakEvenPrice: number;
};

function compute(input: ProfitInput): Omit<ProfitResult, 'breakEvenPrice'> {
  const rates = COUNTRY_RATES[input.country];
  const orderTotal = input.price + input.shippingCharged;

  const listing = rates.listingFee;
  const transaction = (orderTotal * ETSY_RATES.transaction) / 100;
  const processing = orderTotal > 0 ? (orderTotal * rates.processingRate) / 100 + rates.processingFixed : 0;
  const adsRate =
    input.offsiteAds === 'small' ? ETSY_RATES.offsiteAdsSmall : input.offsiteAds === 'large' ? ETSY_RATES.offsiteAdsLarge : 0;
  const offsiteAds = Math.min((orderTotal * adsRate) / 100, ETSY_RATES.offsiteAdsCap);
  const conversion = input.conversion ? (orderTotal * ETSY_RATES.conversion) / 100 : 0;
  const vat = input.vatOnFees ? ((listing + transaction + processing + offsiteAds) * rates.vatRate) / 100 : 0;
  const etsyFees = listing + transaction + processing + offsiteAds + conversion + vat;

  const payout = orderTotal - etsyFees;
  const withdrawal = Math.max(0, (payout * input.withdrawalRate) / 100);
  const tax = (orderTotal * input.taxRate) / 100;
  const costs = input.itemCost + input.packaging + input.shippingCost;

  const profit = payout - withdrawal - tax - costs;
  const margin = orderTotal > 0 ? (profit / orderTotal) * 100 : 0;

  return {
    orderTotal, listing, transaction, processing, offsiteAds, conversion, vat, etsyFees,
    payout, withdrawal, tax, costs, profit, margin,
    monthlyProfit: profit * input.monthlySales,
  };
}

export function calculateProfit(input: ProfitInput): ProfitResult {
  const result = compute(input);

  // Прибуток росте з ціною монотонно, тож беззбиткову ціну шукаємо діленням навпіл
  let lo = 0;
  let hi = Math.max(10, input.itemCost + input.packaging + input.shippingCost) * 4;
  while (compute({ ...input, price: hi }).profit < 0 && hi < 1e7) hi *= 2;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (compute({ ...input, price: mid }).profit < 0) lo = mid;
    else hi = mid;
  }

  return { ...result, breakEvenPrice: hi };
}
