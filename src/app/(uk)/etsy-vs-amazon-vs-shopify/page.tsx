import PlatformComparison from "@/components/PlatformComparison";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Etsy vs Amazon vs eBay vs Shopify — Where Do You Earn More? | Koshman Ecom",
  description:
    "Compare fees and profit on Etsy, Amazon Handmade, eBay, and Shopify. Enter your product details — the calculator shows where it's most profitable to sell.",
  alternates: {
    canonical: `${siteUrl}/etsy-vs-amazon-vs-shopify`,
  },
  openGraph: {
    title: "Etsy vs Amazon Handmade vs Shopify — Where Do You Earn More?",
    description: "Free platform comparison calculator for handmade sellers.",
    url: `${siteUrl}/etsy-vs-amazon-vs-shopify`,
    type: "website",
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: "Etsy vs Amazon vs Shopify comparison" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Etsy vs Amazon Handmade vs Shopify Profit Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/etsy-vs-amazon-vs-shopify`,
  description: "Free calculator to compare profit and fees on Etsy, Amazon Handmade, and Shopify.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Koshman Ecom", url: siteUrl },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlatformComparison locale="en" />
    </>
  );
}
