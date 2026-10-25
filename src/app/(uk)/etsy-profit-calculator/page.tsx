import EtsyProfitCalculator from "@/components/EtsyProfitCalculator";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Etsy Profit Calculator | Koshman Ecom",
  description:
    "Calculate real Etsy profit after fees, cost of goods, and shipping. Free Etsy fee calculator for sellers.",
  alternates: {
    canonical: `${siteUrl}/etsy-profit-calculator`,
  },
  openGraph: {
    title: "Etsy Profit Calculator | Koshman Ecom",
    description:
      "Etsy profit calculator: fees, margin, and monthly profit.",
    url: `${siteUrl}/etsy-profit-calculator`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Etsy Profit Calculator",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Etsy Profit Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${siteUrl}/etsy-profit-calculator`,
  description:
    "Free online profit calculator for Etsy sellers. Calculates net profit after all Etsy fees, cost of goods, shipping, and packaging.",
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

export default function EtsyProfitCalculatorEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EtsyProfitCalculator
        locale="en"
        copy={{
          title: "Etsy Profit Calculator",
          subtitle:
            "Calculate real profit after Etsy fees, cost of goods, and shipping.",
          labels: {
            price: "Sale price ($)",
            cost: "Cost of goods ($)",
            shipping: "Shipping cost ($)",
            packaging: "Packaging cost ($)",
            transactionFee: "Etsy transaction fee (%)",
            paymentFee: "Etsy Payments fee (%) + $",
            listingFee: "Listing fee ($)",
            offsiteAds: "Offsite Ads (12–15% of order total)",
            currencyConversion: "Currency conversion (2.5%)",
            payoneerFee: "Payoneer fee (≈2%)",
            fopTax: "Sole proprietor tax (5% + 1%)",
            monthlySales: "Sales per month",
          },
          placeholders: {
            price: "120",
            cost: "0",
            shipping: "0",
            packaging: "3",
            monthlySales: "100",
          },
          actions: {
            calculate: "Calculate profit",
            consultation: "Get a free consultation",
          },
          results: {
            feesTitle: "Etsy fees",
            transactionFee: "Transaction fee",
            paymentFee: "Processing fee",
            listingFee: "Listing fee",
            offsiteAdsFee: "Offsite Ads",
            currencyConversionFee: "Currency conversion",
            payoneerFee: "Payoneer fee",
            fopTaxFee: "Sole proprietor tax",
            totalCosts: "Total costs",
            profit: "Profit per sale",
            margin: "Margin",
            monthlyProfit: "Monthly profit",
          },
          cards: {
            profit: "Profit per sale",
            margin: "Margin",
            monthly: "Monthly profit",
          },
          lead: {
            title: "Not sure if Etsy is right for your product?",
            body: "Get a free consultation from Koshman Ecom.",
          },
          seo: {
            title: "What fees does Etsy charge?",
            body: `Etsy charges three main fees on every sale.

Transaction fee — 6.5% of the total order amount (item price + shipping). This is Etsy's core platform fee, automatically applied to every sale.

Etsy Payments fee — for sellers in Ukraine this is 6% + $0.30 per order. This fee covers payment processing for the buyer.

Listing fee — $0.20 per published or renewed item. Each listing stays active for 4 months before it needs to be renewed.

Additional costs may include Offsite Ads (12% when Etsy promotes your item on external sites), currency conversion (2.5%), and Payoneer withdrawal (≈2%).

To calculate real profit, subtract all Etsy fees, cost of goods, packaging, and shipping from the sale price. That's exactly what this calculator does — instantly, with no sign-up and no data stored.`,
          },
        }}
      />
    </>
  );
}
