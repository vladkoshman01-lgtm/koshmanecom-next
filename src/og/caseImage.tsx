import { getCaseStudy } from '@/data/caseStudies';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/lib/i18n';
import { renderCaseOg } from './caseOg';
import { renderOg } from './render';

/** OG-картинка кейсу мовою сторінки: колаж пінів, якщо є фото, або текстовий шаблон. */
export function renderCaseImage(locale: Locale, slug: string) {
  const study = getCaseStudy(locale, slug);
  const eyebrow = `${getDictionary(locale).casePage.eyebrow} · ${study?.channel ?? 'Pinterest Ads'}`;
  if (!study) return renderOg({ eyebrow, title: 'Koshman Ecom' });
  const { title, subtitle, images, tall } = study.og;
  return images ? renderCaseOg({ eyebrow, title, subtitle, images, tall }) : renderOg({ eyebrow, title, subtitle });
}
