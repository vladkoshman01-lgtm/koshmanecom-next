import { MetadataRoute } from "next";
import { getArticles } from "@/lib/blog";
import { intlLocales, localePath, localizedSlugs, locales } from "@/lib/i18n";
import { hasServicePage, servicePageSlugs } from "@/data/servicePages";
import { caseStudySlugs } from "@/data/caseStudies";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified ставимо лише там, де знаємо справжню дату зміни (статті).
  // Дата збірки на кожній сторінці щодеплою «оновлює» весь сайт, і Google
  // перестає довіряти цьому полю — краще не вказувати його зовсім.
  const latestArticle = (locale: (typeof locales)[number]) => {
    const dates = getArticles(locale).map((a) => a.updatedAt).sort();
    return dates[dates.length - 1];
  };
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latestArticle("uk"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/career`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contacts`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/tools`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Сторінки окремих послуг — ті мови, у яких сторінка вже перекладена
    ...servicePageSlugs.flatMap((slug) =>
      locales
        .filter((locale) => hasServicePage(locale, slug))
        .map((locale) => ({
          url: `${siteUrl}${localePath(locale, `/services/${slug}`)}`,
              changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
    ),
    // Кейси — усіма мовами, slug однаковий
    ...caseStudySlugs.flatMap((slug) =>
      locales.map((locale) => ({
        url: `${siteUrl}${localePath(locale, `/cases/${slug}`)}`,
          changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
    // Інструменти з перекладеним slug: кожна мова — своя адреса
    ...Object.values(localizedSlugs).flatMap((paths) =>
      locales.map((locale) => ({
        url: `${siteUrl}${localePath(locale, paths[locale])}`,
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
      changeFrequency: "monthly" as const,
      ...(path === "/blog" ? { lastModified: latestArticle(locale) } : {}),
      priority: path === "/" ? 0.9 : 0.7,
    })),
  );

  return [...staticPages, ...blogPages, ...intlPages];
}
