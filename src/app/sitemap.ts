import { MetadataRoute } from "next";
import { getArticles } from "@/lib/blog";
import { intlLocales, localePath, localizedSlugs, locales } from "@/lib/i18n";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const articles = getArticles();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: articles[0]?.publishedAt ?? now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/career`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contacts`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools/image-resizer`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/etsy-finance-dashboard`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    // Калькулятор прибутку: slug свій для кожної мови
    ...locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, localizedSlugs["/kalkulyator-prybutku-etsy"][locale])}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/kalkulyator-tsinoutvorennya-etsy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/etsy-pricing-calculator`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/porivnyannya-platform-etsy-amazon-shopify`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/etsy-vs-amazon-vs-shopify`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
  // Статті всіма мовами: у кожного перекладу свій slug
  const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: `${siteUrl}${localePath(locale, `/blog/${article.slug}`)}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );


  // EN і SK: ті самі шляхи з префіксом мови (hreflang прописаний у метаданих)
  const translatedPaths = [
    "/",
    "/services",
    "/about",
    "/contacts",
    "/tools",
    "/career",
    "/blog",
    "/terms",
    "/privacy",
  ];
  const intlPages: MetadataRoute.Sitemap = intlLocales.flatMap((locale) =>
    translatedPaths.map((path) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 0.9 : 0.7,
    })),
  );

  return [...staticPages, ...blogPages, ...intlPages];
}
