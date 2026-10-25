import EtsyProfitCalculator from "@/components/EtsyProfitCalculator";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Калькулятор прибутку Etsy | Koshman Ecom",
  description:
    "Порахуйте реальний прибуток після комісій Etsy, собівартості та доставки. Калькулятор прибутку Etsy для продавців.",
  alternates: {
    canonical: `${siteUrl}/kalkulyator-prybutku-etsy`,
  },
  openGraph: {
    title: "Калькулятор прибутку Etsy | Koshman Ecom",
    description:
      "Онлайн‑калькулятор прибутку Etsy: комісії, маржа, місячний прибуток.",
    url: `${siteUrl}/kalkulyator-prybutku-etsy`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Калькулятор прибутку Etsy",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Калькулятор прибутку Etsy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/kalkulyator-prybutku-etsy`,
  description:
    "Безкоштовний онлайн-калькулятор прибутку для продавців Etsy. Розраховує чистий прибуток після всіх комісій Etsy, собівартості товару, доставки та пакування.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "Koshman Ecom",
    url: siteUrl,
  },
};

export default function EtsyProfitCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EtsyProfitCalculator
        locale="uk"
        copy={{
          title: "Калькулятор прибутку Etsy",
          subtitle:
            "Порахуйте реальний прибуток після комісій Etsy, собівартості товару та доставки.",
          labels: {
            price: "Ціна продажу ($)",
            cost: "Собівартість товару ($)",
            shipping: "Вартість доставки ($)",
            packaging: "Вартість пакування ($)",
            transactionFee: "Комісія Etsy за транзакцію (%)",
            paymentFee: "Комісія Etsy Payments (%) + $",
            listingFee: "Комісія за розміщення товару ($)",
            offsiteAds: "Offsite Ads (12–15% від суми замовлення)",
            currencyConversion: "Конвертація валюти (2.5%)",
            payoneerFee: "Комісія Payoneer (≈2%)",
            fopTax: "Податки ФОП 3 група (5% + 1%)",
            monthlySales: "Продажів на місяць",
          },
          placeholders: {
            price: "120",
            cost: "0",
            shipping: "0",
            packaging: "3",
            monthlySales: "100",
          },
          actions: {
            calculate: "Розрахувати прибуток",
            consultation: "Отримати консультацію",
          },
          results: {
            feesTitle: "Комісії Etsy",
            transactionFee: "Комісія транзакції",
            paymentFee: "Комісія оплати",
            listingFee: "Комісія за лістинг",
            offsiteAdsFee: "Offsite Ads",
            currencyConversionFee: "Конвертація валюти",
            payoneerFee: "Комісія Payoneer",
            fopTaxFee: "Податки ФОП 3 група",
            totalCosts: "Загальні витрати",
            profit: "Прибуток з одного продажу",
            margin: "Маржа",
            monthlyProfit: "Місячний прибуток",
          },
          cards: {
            profit: "Прибуток з продажу",
            margin: "Маржа",
            monthly: "Місячний прибуток",
          },
          lead: {
            title: "Хочете дізнатися, чи варто запускати ваш товар на Etsy?",
            body: "Отримайте безкоштовну консультацію від Koshman Ecom.",
          },
          seo: {
            title: "Які комісії бере Etsy і як розрахувати прибуток",
            body: `Etsy стягує три основні комісії з кожного продажу.

Комісія за транзакцію — 6.5% від суми замовлення (ціна товару + доставка). Це основна комісія платформи, яка нараховується автоматично після кожного продажу.

Комісія Etsy Payments — для продавців з України становить 6% + $0.30 з кожного замовлення. Ця комісія стягується за обробку платежу покупця.

Комісія за лістинг — $0.20 за кожен опублікований або оновлений товар. Лістинг активний 4 місяці, після чого потрібно поновлення.

Додатково можуть бути витрати на Offsite Ads (12% якщо Etsy просуває ваш товар на зовнішніх сайтах), конвертацію валюти (2.5%) та виведення через Payoneer (≈2%).

Щоб розрахувати реальний прибуток, потрібно від ціни продажу відняти всі комісії Etsy, собівартість товару, вартість пакування та доставки. Саме це і робить наш калькулятор — миттєво, без реєстрації та збереження ваших даних.`,
          },
        }}
      />
    </>
  );
}
