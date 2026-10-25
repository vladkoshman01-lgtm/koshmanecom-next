import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { defaultLocale, locales, type Locale } from './i18n';

/**
 * Статті блогу живуть у `content/blog/*.md` і читаються на етапі збірки.
 * Жодної зовнішньої CMS: ім'я файлу = slug, фронтматер = метадані.
 * Кожна стаття стає окремим HTML-файлом у статичному експорті.
 *
 * Мова — суфікс файлу: `slug.md` українською, `slug.en.md` / `slug.sk.md` —
 * переклади. У перекладу може бути власний slug мовою читача; тоді поле
 * `translationOf: <slug оригіналу>` звʼязує його з оригіналом для hreflang.
 */

export type ArticleCover = {
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
};

export type ArticleAuthor = {
  name: string;
  role: string | null;
  photo: string | null;
  bio: string | null;
};

/** Пункт змісту — заголовок другого рівня. */
export type TocItem = { id: string; text: string };

export type FaqItem = { question: string; answer: string };

export type Article = {
  slug: string;
  locale: Locale;
  /** Спільний ключ оригіналу й перекладів — slug української версії */
  translationKey: string;
  title: string;
  /** Заголовок для <title>, якщо відрізняється від H1 */
  seoTitle: string | null;
  excerpt: string | null;
  /** Тіло статті в markdown */
  content: string;
  cover: ArticleCover | null;
  /** Картинка для соцмереж (JPG 1200×630); якщо немає — береться обкладинка */
  ogImage: string | null;
  publishedAt: string;
  updatedAt: string;
  author: ArticleAuthor | null;
  category: { name: string; slug?: string | null } | null;
  readingTimeMinutes: number;
  tags: string[];
  keywords: string[];
  toc: TocItem[];
  faq: FaqItem[];
};

/** Те, що потрібно спискам статей, — без тіла, щоб не тягнути його в клієнт. */
export type ArticleSummary = Omit<Article, 'content' | 'toc' | 'faq'>;

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/** ~200 слів за хвилину, мінімум одна. */
function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Markdown-рядок без розмітки — для змісту та JSON-LD. */
function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** id заголовка за порядковим номером: однаковий і в змісті, і в тілі статті. */
export function headingId(index: number): string {
  return `section-${index + 1}`;
}

function extractToc(markdown: string): TocItem[] {
  return [...markdown.matchAll(/^## (.+)$/gm)].map((m, i) => ({
    id: headingId(i),
    text: plainText(m[1]),
  }));
}

/**
 * Розділ «Часті запитання» → пари питання/відповідь для FAQPage-розмітки.
 * Питання — заголовки третього рівня, відповідь — текст до наступного заголовка.
 */
function extractFaq(markdown: string): FaqItem[] {
  const section = markdown.match(
    /^## (?:Часті запитання|FAQ|Frequently asked questions|Časté otázky|Často kladené otázky).*$([\s\S]*?)(?=^## |(?![\s\S]))/im,
  );
  if (!section) return [];

  return [...section[1].matchAll(/^### (.+)$([\s\S]*?)(?=^### |(?![\s\S]))/gm)]
    .map((m) => ({ question: plainText(m[1]), answer: plainText(m[2]) }))
    .filter((item) => item.answer);
}

function parseFileName(fileName: string): { slug: string; locale: Locale } {
  const base = fileName.replace(/\.mdx?$/, '');
  const match = base.match(/^(.+)\.([a-z]{2})$/);
  if (match && locales.includes(match[2] as Locale)) {
    return { slug: match[1], locale: match[2] as Locale };
  }
  return { slug: base, locale: defaultLocale };
}

function parseFile(fileName: string): Article | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);

  // Чернетки не потрапляють ні в збірку, ні в сітмап.
  if (data.draft === true) return null;

  if (!data.title) {
    throw new Error(`У статті content/blog/${fileName} не заповнено "title"`);
  }
  if (!data.date) {
    throw new Error(`У статті content/blog/${fileName} не заповнено "date"`);
  }

  const { slug, locale } = parseFileName(fileName);
  const publishedAt = new Date(data.date).toISOString();

  return {
    slug,
    locale,
    translationKey: data.translationOf ? String(data.translationOf) : slug,
    title: String(data.title),
    seoTitle: data.seoTitle ? String(data.seoTitle) : null,
    excerpt: data.excerpt ? String(data.excerpt) : null,
    content,
    cover: data.cover
      ? {
          url: String(data.cover),
          alternativeText: data.coverAlt ? String(data.coverAlt) : null,
          width: data.coverWidth ? Number(data.coverWidth) : null,
          height: data.coverHeight ? Number(data.coverHeight) : null,
        }
      : null,
    ogImage: data.ogImage ? String(data.ogImage) : data.cover ? String(data.cover) : null,
    publishedAt,
    updatedAt: data.updated ? new Date(data.updated).toISOString() : publishedAt,
    author: data.author
      ? {
          name: String(data.author),
          role: data.authorRole ? String(data.authorRole) : null,
          photo: data.authorPhoto ? String(data.authorPhoto) : null,
          bio: data.authorBio ? String(data.authorBio) : null,
        }
      : null,
    category: data.category
      ? { name: String(data.category), slug: slugify(String(data.category)) }
      : null,
    readingTimeMinutes: readingTime(content),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    toc: extractToc(content),
    faq: extractFaq(content),
  };
}

function readAll(): Article[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    // `_*` — чернетки й шаблони, README.md — інструкція для авторів
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_') && f.toLowerCase() !== 'readme.md')
    .map(parseFile)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Опубліковані статті однією мовою, найновіші першими. */
export function getArticles(locale: Locale = defaultLocale): Article[] {
  return readAll().filter((a) => a.locale === locale);
}

export function getArticleBySlug(slug: string, locale: Locale = defaultLocale): Article | null {
  return getArticles(locale).find((a) => a.slug === slug) ?? null;
}

/** Усі мовні версії статті (разом із нею самою) — для hreflang і перемикача мови. */
export function getTranslations(article: Article): { locale: Locale; slug: string }[] {
  return readAll()
    .filter((a) => a.translationKey === article.translationKey)
    .map((a) => ({ locale: a.locale, slug: a.slug }));
}

export function toSummary(article: Article): ArticleSummary {
  const summary: Partial<Article> = { ...article };
  delete summary.content;
  delete summary.toc;
  delete summary.faq;
  return summary as ArticleSummary;
}

/** Категорії для фільтра в списку статей. */
export function getCategories(locale: Locale = defaultLocale): string[] {
  const names = getArticles(locale)
    .map((a) => a.category?.name)
    .filter((n): n is string => Boolean(n));
  return [...new Set(names)].sort();
}
