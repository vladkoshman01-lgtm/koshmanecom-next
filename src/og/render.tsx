import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * Шаблон OG-картинки (превʼю посилання в месенджерах і соцмережах).
 *
 * Генерується під час збірки для кожної сторінки й мови: фірмовий чорний
 * фон, помаранчеве сяйво, заголовок сторінки та плашка-логотип як у футері.
 * Шрифт Onest лежить у репо (TTF), щоб збірка не залежала від мережі.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const fontDir = join(process.cwd(), 'src/og/fonts');

async function loadFonts() {
  const [medium, bold, extraBold] = await Promise.all([
    readFile(join(fontDir, 'Onest-500.ttf')),
    readFile(join(fontDir, 'Onest-700.ttf')),
    readFile(join(fontDir, 'Onest-800.ttf')),
  ]);
  return [
    { name: 'Onest', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'Onest', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'Onest', data: extraBold, weight: 800 as const, style: 'normal' as const },
  ];
}

export async function renderOg({
  eyebrow,
  title,
  subtitle,
}: {
  /** Невеликий надпис над заголовком (розділ сайту). */
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  // Довгі заголовки трохи зменшуємо, щоб уміщались у три рядки
  const titleSize = title.length > 60 ? 54 : title.length > 40 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#141414',
          backgroundImage:
            'radial-gradient(60% 80% at 100% 100%, rgba(255,91,43,0.55) 0%, rgba(255,91,43,0.18) 40%, rgba(20,20,20,0) 75%)',
          fontFamily: 'Onest',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#FF5B2B',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 22,
              maxWidth: 980,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: 'flex',
                marginTop: 26,
                maxWidth: 940,
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                color: '#CFCFCF',
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* Плашка-логотип, як у футері сайту */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              width: 128,
              height: 128,
              padding: '0 14px 14px',
              backgroundColor: '#FF5B2B',
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: 0.5,
            }}
          >
            <span>KOSHMAN</span>
            <span>ECOM</span>
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, color: '#8A8A8A' }}>
            koshmanecom.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
