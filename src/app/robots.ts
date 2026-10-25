import { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://koshmanecom.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard"],
      },
      // Явно дозволяємо ШІ-пошуковикам і асистентам: агенція продає AI-пошук,
      // тож сайт має бути видимим для ChatGPT, Claude, Perplexity і Gemini
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/dashboard"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
