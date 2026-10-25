import PlatformComparison from "@/components/PlatformComparison";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Etsy vs Amazon vs eBay vs Shopify — де більше заробиш | Koshman Ecom",
  description:
    "Порівняйте комісії та прибуток на Etsy, Amazon Handmade, eBay і Shopify. Введіть параметри товару — калькулятор покаже де вигідніше продавати.",
  alternates: {
    canonical: `${siteUrl}/porivnyannya-platform-etsy-amazon-shopify`,
  },
  openGraph: {
    title: "Etsy vs Amazon Handmade vs Shopify — де більше заробиш?",
    description: "Безкоштовний калькулятор порівняння платформ для handmade продавців.",
    url: `${siteUrl}/porivnyannya-platform-etsy-amazon-shopify`,
    type: "website",
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: "Порівняння платформ Etsy Amazon Shopify" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Калькулятор порівняння платформ Etsy vs Amazon vs Shopify",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/porivnyannya-platform-etsy-amazon-shopify`,
  description: "Безкоштовний калькулятор для порівняння прибутку та комісій на Etsy, Amazon Handmade і Shopify.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Koshman Ecom", url: siteUrl },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlatformComparison locale="uk" />
    </>
  );
}
