/**
 * Малювання кадру для ресайзера. Один і той самий код рендерить і прев'ю
 * (зменшене полотно), і готовий файл, тож кадр у файлі збігається з екраном.
 */

export type FitMode = 'cover' | 'contain';
export type Background = 'white' | 'black' | 'blur' | 'custom';
export type OutputFormat = 'jpeg' | 'png' | 'webp';

export type FrameSettings = {
  mode: FitMode;
  /** Наближення в режимі «Обрізати», 1 — фото рівно заповнює кадр. */
  zoom: number;
  /** Положення кадру по осях, 0…1 (0.5 — центр). */
  panX: number;
  panY: number;
  background: Background;
  customColor: string;
};

export const MIME: Record<OutputFormat, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export const EXT: Record<OutputFormat, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };

/**
 * Піраміда зменшених копій оригіналу. Канвас при сильному зменшенні за один
 * крок дає «драбинку», тож беремо найменшу копію, яка ще не менша за ціль.
 */
export type SourceImage = { width: number; height: number; levels: CanvasImageSource[]; levelWidths: number[] };

export function buildSource(img: HTMLImageElement): SourceImage {
  const levels: CanvasImageSource[] = [img];
  const levelWidths = [img.naturalWidth];
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  let prev: CanvasImageSource = img;
  while (w > 512 && h > 512) {
    w = Math.round(w / 2);
    h = Math.round(h / 2);
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (!ctx) break;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(prev, 0, 0, w, h);
    levels.push(c);
    levelWidths.push(w);
    prev = c;
  }
  return { width: img.naturalWidth, height: img.naturalHeight, levels, levelWidths };
}

function pickLevel(src: SourceImage, drawW: number): CanvasImageSource {
  for (let i = src.levels.length - 1; i >= 0; i -= 1) {
    if (src.levelWidths[i] >= drawW) return src.levels[i];
  }
  return src.levels[0];
}

/** Масштаб фото відносно повного розміру файлу — для попередження про апскейл. */
export function imageScale(src: SourceImage, w: number, h: number, s: FrameSettings): number {
  const cover = Math.max(w / src.width, h / src.height);
  const contain = Math.min(w / src.width, h / src.height);
  return s.mode === 'cover' ? cover * s.zoom : contain;
}

/** Геометрія фото в кадрі W×H (у пікселях цього кадру). */
export function layout(src: SourceImage, W: number, H: number, s: FrameSettings) {
  const scale = imageScale(src, W, H, s);
  const drawW = src.width * scale;
  const drawH = src.height * scale;
  if (s.mode === 'contain') {
    return { drawX: (W - drawW) / 2, drawY: (H - drawH) / 2, drawW, drawH, rangeX: 0, rangeY: 0 };
  }
  const rangeX = Math.max(0, drawW - W);
  const rangeY = Math.max(0, drawH - H);
  return { drawX: -rangeX * s.panX, drawY: -rangeY * s.panY, drawW, drawH, rangeX, rangeY };
}

export function renderFrame(ctx: CanvasRenderingContext2D, src: SourceImage, W: number, H: number, s: FrameSettings) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, W, H);

  if (s.mode === 'contain') {
    if (s.background === 'blur') {
      // Розмитий фон: крихітна копія, розтягнута на весь кадр, — однаково в усіх
      // браузерах (ctx.filter у Safari не працює)
      const cover = Math.max(W / src.width, H / src.height);
      const tiny = document.createElement('canvas');
      tiny.width = 24;
      tiny.height = Math.max(1, Math.round((24 * src.height) / src.width));
      const tctx = tiny.getContext('2d');
      if (tctx) {
        tctx.imageSmoothingEnabled = true;
        tctx.imageSmoothingQuality = 'high';
        tctx.drawImage(pickLevel(src, 24), 0, 0, tiny.width, tiny.height);
        const bw = src.width * cover * 1.1;
        const bh = src.height * cover * 1.1;
        ctx.drawImage(tiny, (W - bw) / 2, (H - bh) / 2, bw, bh);
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, 0, W, H);
      }
    } else {
      ctx.fillStyle = s.background === 'black' ? '#000000' : s.background === 'custom' ? s.customColor : '#ffffff';
      ctx.fillRect(0, 0, W, H);
    }
  } else {
    // Прозорі PNG у режимі обрізання — на білому, як їх покаже більшість платформ
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
  }

  const { drawX, drawY, drawW, drawH } = layout(src, W, H, s);
  ctx.drawImage(pickLevel(src, drawW), drawX, drawY, drawW, drawH);
}

export function exportFrame(
  src: SourceImage,
  W: number,
  H: number,
  s: FrameSettings,
  format: OutputFormat,
  quality: number,
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.resolve(null);
  renderFrame(ctx, src, W, H, s);
  return new Promise((resolve) => canvas.toBlob(resolve, MIME[format], format === 'png' ? undefined : quality));
}

/** Безпечне ім'я файлу з назви оригіналу. */
export function baseName(fileName: string): string {
  const stem = fileName.replace(/\.[^.]+$/, '');
  const safe = stem
    .normalize('NFKD')
    .replace(/[^\w-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return safe.slice(0, 40) || 'image';
}

export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Safari не встигає почати завантаження, якщо відкликати адресу одразу
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data[i];
    for (let j = 0; j < 8; j += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/** ZIP без стиснення (картинки й так стиснуті) — без зовнішніх бібліотек. */
export function createZip(files: { name: string; data: Uint8Array }[]): Blob {
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const name = enc.encode(file.name);
    const crc = crc32(file.data);
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true); // імена в UTF-8
    lv.setUint32(14, crc, true);
    lv.setUint32(18, file.data.length, true);
    lv.setUint32(22, file.data.length, true);
    lv.setUint16(26, name.length, true);
    local.set(name, 30);
    parts.push(local, file.data);

    const head = new Uint8Array(46 + name.length);
    const cv = new DataView(head.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, file.data.length, true);
    cv.setUint32(24, file.data.length, true);
    cv.setUint16(28, name.length, true);
    cv.setUint32(42, offset, true);
    head.set(name, 46);
    central.push(head);
    offset += local.length + file.data.length;
  }

  const size = central.reduce((n, p) => n + p.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, size, true);
  ev.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end] as BlobPart[], { type: 'application/zip' });
}
