import type { Metadata } from 'next';
import Link from '@/components/ui/LocaleLink';
import { notFound } from 'next/navigation';
import ApplyForm from '@/components/career/ApplyForm';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { careerRoles } from '@/lib/careers';
import { getDictionary } from '@/i18n/getDictionary';
import { getContent } from '@/i18n/content';
import { buildMetadata } from '@/lib/seo';

import { intlLocales, type Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koshmanecom.com';

export async function generateStaticParams() {
  // Кожна вакансія × кожна мова з префіксом
  return intlLocales.flatMap((locale) => careerRoles.map((role) => ({ locale, slug: role.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const role = careerRoles.find((r) => r.slug === slug);
  if (!role) return {};
  const lang = locale as Locale;
  const t = getDictionary(lang);
  const content = getContent(lang);
  return buildMetadata({
    locale: lang,
    path: `/career/${role.slug}`,
    title: t.meta.vacancy.replace('{role}', role.title),
    description: content[role.shortDescription] ?? role.shortDescription,
    type: 'article',
    // Другорядна сторінка, може довго висіти без оновлень — не індексуємо
    noindex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const role = careerRoles.find((r) => r.slug === slug);
  if (!role) notFound();

  const index = careerRoles.findIndex((r) => r.slug === role.slug);

  /** Блоки опису: перший — абзаци, решта — марковані списки (як у макеті). */
  const blocks: { title: string; items: string[]; list: boolean }[] = [
    { title: 'Про роль', items: role.about, list: false },
    { title: 'Що робити', items: role.responsibilities, list: true },
    { title: 'Що очікуємо', items: role.requirements, list: true },
    { title: 'Що пропонуємо', items: role.offer, list: true },
  ];


  return (
    <div className="bg-white">

      <section className="bg-[#EEEEEE]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <Link
            href="/career#jobs"
            className="inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold text-[#222222]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Усі вакансії
          </Link>

          <div className="mt-7 grid gap-10 md:mt-9 md:grid-cols-[minmax(0,1fr)_23.75rem] md:items-start md:gap-20">
            <div className="flex flex-col gap-4 md:gap-5">
              <span className="text-[0.8125rem] font-bold tracking-[0.06em] text-brand-orange md:text-[0.9375rem]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h1 className="fs-52 mob-30 font-bold text-[#222222]">{role.title}</h1>
              <div className="flex flex-wrap gap-2.5">
                {[role.format, role.location, role.team].map((tag) => (
                  <span
                    key={tag}
                    className="flex h-10 items-center border-[1.5px] border-[#CFCFCF] px-4 text-[0.8125rem] text-[#222222] md:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-col md:mt-7">
                {blocks.map((block) => (
                  <div
                    key={block.title}
                    className="grid gap-4 border-t border-[#CFCFCF] py-7 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10 md:py-8"
                  >
                    <span className="text-lg font-bold leading-[1.3] text-[#222222] md:text-xl">
                      {block.title}
                    </span>
                    {block.list ? (
                      <div className="flex flex-col gap-3.5">
                        {block.items.map((item) => (
                          <div
                            key={item}
                            className="grid grid-cols-[0.875rem_minmax(0,1fr)] items-baseline gap-3.5"
                          >
                            <span className="h-2 w-2 -translate-y-0.5 bg-brand-orange" aria-hidden />
                            <span className="mob-15 text-base leading-[1.5] text-[#444444] md:text-[1.0625rem]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {block.items.map((item) => (
                          <p
                            key={item}
                            className="mob-15 text-base leading-[1.55] text-[#444444] md:text-[1.0625rem]"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[1.125rem] bg-[#141414] px-7 py-7 text-white md:sticky md:top-28 md:px-7 md:py-8">
              <span className="text-xl font-bold leading-[1.2] md:text-2xl">Цікава позиція?</span>
              <span className="text-[0.9375rem] leading-[1.5] text-[#CFCFCF]">
                Надішліть резюме або портфоліо — ми переглянемо відгук і звʼяжемося з вами.
              </span>
              <div className="mt-1.5 flex">
                <AnimatedButton variant="primary" href={`/career/${role.slug}#apply`}>
                  Відгукнутися
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApplyForm defaultRole={role.title} />
    </div>
  );
}
