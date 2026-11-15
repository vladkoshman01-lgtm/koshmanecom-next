import { MetadataRoute } from "next";
import { getArticles } from "@/lib/blog";
import { intlLocales, localePath, localizedSlugs, locales } from "@/lib/i18n";
import { hasServicePage, servicePageSlugs } from "@/data/servicePages";
import { caseStudySlugs } from "@/data/caseStudies";

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
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Сторінки окремих послуг — ті мови, у яких сторінка вже перекладена
    ...servicePageSlugs.flatMap((slug) =>
      locales
        .filter((locale) => hasServicePage(locale, slug))
        .map((locale) => ({
          url: `${siteUrl}${localePath(locale, `/services/${slug}`)}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
    ),
    // Кейси — усіма мовами, slug однаковий
    ...caseStudySlugs.flatMap((slug) =>
      locales.map((locale) => ({
        url: `${siteUrl}${localePath(locale, `/cases/${slug}`)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
    // Інструменти з перекладеним slug: кожна мова — своя адреса
    ...Object.values(localizedSlugs).flatMap((paths) =>
      locales.map((locale) => ({
        url: `${siteUrl}${localePath(locale, paths[locale])}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
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
    // Політика й умови закриті від індексу (noindex) — у sitemap їх немає
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
