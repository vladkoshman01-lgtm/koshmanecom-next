import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { loadFonts, ogSize } from './render';

/**
 * OG-картинка кейсу: ліворуч цифра й клієнт, праворуч колаж пінів
 * (той самий, що на першому екрані сторінки). Картинки лежать у
 * `src/og/images` у JPEG — генератор OG не читає WebP.
 */

const imgDir = join(process.cwd(), 'src/og/images');

async function dataUrl(file: string) {
  const buf = await readFile(join(imgDir, file));
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

export async function renderCaseOg({
  eyebrow,
  title,
  subtitle,
  images,
  tall = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Файли з src/og/images: 4 — колаж [ліва верх, ліва низ, права верх, права низ]; 1 — один пін. */
  images: [string, string, string, string] | [string];
  /** Піни 9:16 (вищі за 2:3): інші висоти й зсуви колонок, щоб заголовки на пінах не обрізались. */
  tall?: boolean;
}) {
  const [a, b, c, d] = await Promise.all(images.map(dataUrl));
  const single = images.length === 1;
  const pin = (src: string, w: number, h: number) => (
    <img
      src={src}
      width={w}
      height={h}
      style={{ borderRadius: 22, objectFit: 'cover', objectPosition: 'top', boxShadow: '0 20px 40px rgba(0,0,0,0.45)' }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#141414',
          backgroundImage:
            'radial-gradient(70% 90% at 0% 100%, rgba(255,91,43,0.45) 0%, rgba(255,91,43,0.12) 45%, rgba(20,20,20,0) 75%)',
          fontFamily: 'Onest',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 650,
            padding: '64px 24px 64px 72px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5B2B' }}>
              {eyebrow}
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
              {title}
            </div>
            <div style={{ display: 'flex', marginTop: 24, fontSize: 25, fontWeight: 500, lineHeight: 1.35, color: '#CFCFCF' }}>
              {subtitle}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: 96,
                height: 96,
                padding: '0 11px 11px',
                backgroundColor: '#FF5B2B',
                fontSize: 14,
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              <span>KOSHMAN</span>
              <span>ECOM</span>
            </div>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 500, color: '#8A8A8A' }}>koshmanecom.com</div>
          </div>
        </div>

        {single ? (
          /* Один пін — великий, праворуч, низ обрізаний краєм */
          <div style={{ display: 'flex', marginTop: 48, paddingLeft: 100 }}>{pin(a, 330, 591)}</div>
        ) : (
          <div style={{ display: 'flex', gap: 18, marginTop: tall ? 28 : -80, paddingLeft: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {pin(a, 250, tall ? 445 : 375)}
              {pin(b, 250, tall ? 445 : 375)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: tall ? 84 : 64 }}>
              {pin(c, 250, tall ? 445 : 412)}
              {pin(d, 250, tall ? 445 : 375)}
            </div>
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
