import EtsyPricingCalculator from "@/components/EtsyPricingCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Калькулятор ціноутворення Etsy | Koshman Ecom",
  description:
    "Розрахуйте правильну ціну для Etsy з урахуванням всіх комісій і бажаної маржі. Безкоштовний онлайн-калькулятор для продавців.",
  alternates: {
    canonical: `${siteUrl}/kalkulyator-tsinoutvorennya-etsy`,
  },
  openGraph: {
    title: "Калькулятор ціноутворення Etsy | Koshman Ecom",
    description: "Введіть витрати і маржу — отримайте мінімальну та рекомендовану ціну продажу на Etsy.",
    url: `${siteUrl}/kalkulyator-tsinoutvorennya-etsy`,
    type: "website",
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: "Калькулятор ціноутворення Etsy" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Калькулятор ціноутворення Etsy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/kalkulyator-tsinoutvorennya-etsy`,
  description: "Безкоштовний калькулятор для розрахунку правильної ціни на Etsy з урахуванням комісій і бажаного прибутку.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Koshman Ecom", url: siteUrl },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EtsyPricingCalculator locale="uk" />
    </>
  );
}
