import EtsyPricingCalculator from "@/components/EtsyPricingCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Etsy Pricing Calculator | Koshman Ecom",
  description:
    "Calculate the right price for your Etsy listings including all fees and your target margin. Free online calculator for sellers.",
  alternates: {
    canonical: `${siteUrl}/etsy-pricing-calculator`,
  },
  openGraph: {
    title: "Etsy Pricing Calculator | Koshman Ecom",
    description: "Enter your costs and target margin — get the minimum and recommended Etsy sale price.",
    url: `${siteUrl}/etsy-pricing-calculator`,
    type: "website",
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: "Etsy Pricing Calculator" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Etsy Pricing Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/etsy-pricing-calculator`,
  description: "Free calculator to find the right Etsy price based on your costs, fees, and target profit margin.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@type": "Organization", name: "Koshman Ecom", url: siteUrl },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EtsyPricingCalculator locale="en" />
    </>
  );
}
