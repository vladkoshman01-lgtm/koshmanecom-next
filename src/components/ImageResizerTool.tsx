'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ArrowRight, Download, UploadCloud } from 'lucide-react';

type Preset = {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: string;
};

type Platform = {
  id: string;
  name: string;
  presets: Preset[];
};

const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    presets: [
      { id: 'instagram-post', name: 'Post', width: 1080, height: 1080, platform: 'Instagram' },
      { id: 'instagram-story', name: 'Story', width: 1080, height: 1920, platform: 'Instagram' },
      { id: 'instagram-reels', name: 'Reels', width: 1080, height: 1920, platform: 'Instagram' },
    ],
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    presets: [
      { id: 'pinterest-standard', name: 'Standard', width: 1000, height: 1500, platform: 'Pinterest' },
      { id: 'pinterest-tall', name: 'Tall', width: 1000, height: 1500, platform: 'Pinterest' },
    ],
  },
  {
    id: 'etsy',
    name: 'Etsy',
    presets: [
      { id: 'etsy-main-photo', name: 'Головне фото', width: 3000, height: 3000, platform: 'Etsy' },
      { id: 'etsy-big-banner', name: 'Великий банер', width: 3360, height: 840, platform: 'Etsy' },
      { id: 'etsy-mini-banner', name: 'Міні-банер', width: 1600, height: 213, platform: 'Etsy' },
      { id: 'etsy-about-banner', name: 'About Banner', width: 760, height: 468, platform: 'Etsy' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    presets: [
      { id: 'tiktok-video', name: 'Video', width: 1080, height: 1920, platform: 'TikTok' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    presets: [
      { id: 'facebook-post', name: 'Post', width: 1200, height: 630, platform: 'Facebook' },
      { id: 'facebook-story', name: 'Story', width: 1080, height: 1920, platform: 'Facebook' },
      { id: 'facebook-cover', name: 'Обкладинка', width: 851, height: 315, platform: 'Facebook' },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    presets: [
      { id: 'linkedin-post', name: 'Post', width: 1200, height: 627, platform: 'LinkedIn' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    presets: [
      { id: 'youtube-thumbnail', name: 'Thumbnail', width: 1280, height: 720, platform: 'YouTube' },
      { id: 'youtube-banner', name: 'Banner', width: 2560, height: 1440, platform: 'YouTube' },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    presets: [
      { id: 'amazon-product', name: 'Product', width: 2000, height: 2000, platform: 'Amazon' },
      { id: 'amazon-lifestyle', name: 'Lifestyle', width: 1200, height: 1200, platform: 'Amazon' },
    ],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    presets: [
      { id: 'shopify-product', name: 'Product', width: 600, height: 600, platform: 'Shopify' },
      { id: 'shopify-banner', name: 'Banner', width: 2048, height: 680, platform: 'Shopify' },
    ],
  },
];

const allPresets = platforms.flatMap((platform) => platform.presets);

type OutputFormat = 'jpeg' | 'png' | 'webp';

function formatSize(preset: Preset) {
  return `${preset.width} × ${preset.height}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function configureContext(ctx: CanvasRenderingContext2D) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
}

function drawHighQualityImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawW: number,
  drawH: number
) {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    ctx.drawImage(image, drawX, drawY, drawW, drawH);
    return;
  }

  let currentWidth = image.width;
  let currentHeight = image.height;
  tempCanvas.width = currentWidth;
  tempCanvas.height = currentHeight;
  configureContext(tempCtx);
  tempCtx.drawImage(image, 0, 0);

  while (currentWidth * 0.5 > drawW && currentHeight * 0.5 > drawH) {
    currentWidth = Math.max(drawW, Math.round(currentWidth * 0.5));
    currentHeight = Math.max(drawH, Math.round(currentHeight * 0.5));

    const nextCanvas = document.createElement('canvas');
    const nextCtx = nextCanvas.getContext('2d');
    if (!nextCtx) break;

    nextCanvas.width = currentWidth;
    nextCanvas.height = currentHeight;
    configureContext(nextCtx);
    nextCtx.drawImage(tempCanvas, 0, 0, currentWidth, currentHeight);

    tempCanvas.width = currentWidth;
    tempCanvas.height = currentHeight;
    configureContext(tempCtx);
    tempCtx.clearRect(0, 0, currentWidth, currentHeight);
    tempCtx.drawImage(nextCanvas, 0, 0);
  }

  configureContext(ctx);
  ctx.drawImage(tempCanvas, drawX, drawY, drawW, drawH);
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data[i];
    for (let j = 0; j < 8; j += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZip(files: { name: string; data: Uint8Array }[]) {
  let localOffset = 0;
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];

  files.forEach((file) => {
    const nameBytes = new TextEncoder().encode(file.name);
    const crc = crc32(file.data);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(localHeader.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, file.data.length, true);
    view.setUint32(22, file.data.length, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    localParts.push(localHeader, file.data);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cview = new DataView(centralHeader.buffer);
    cview.setUint32(0, 0x02014b50, true);
    cview.setUint16(4, 20, true);
    cview.setUint16(6, 20, true);
    cview.setUint16(8, 0, true);
    cview.setUint16(10, 0, true);
    cview.setUint16(12, 0, true);
    cview.setUint16(14, 0, true);
    cview.setUint32(16, crc, true);
    cview.setUint32(20, file.data.length, true);
    cview.setUint32(24, file.data.length, true);
    cview.setUint16(28, nameBytes.length, true);
    cview.setUint16(30, 0, true);
    cview.setUint16(32, 0, true);
    cview.setUint16(34, 0, true);
    cview.setUint16(36, 0, true);
    cview.setUint32(38, 0, true);
    cview.setUint32(42, localOffset, true);
    centralHeader.set(nameBytes, 46);

    centralParts.push(centralHeader);
    localOffset += localHeader.length + file.data.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const endHeader = new Uint8Array(22);
  const eview = new DataView(endHeader.buffer);
  eview.setUint32(0, 0x06054b50, true);
  eview.setUint16(4, 0, true);
  eview.setUint16(6, 0, true);
  eview.setUint16(8, files.length, true);
  eview.setUint16(10, files.length, true);
  eview.setUint32(12, centralSize, true);
  eview.setUint32(16, localOffset, true);
  eview.setUint16(20, 0, true);

  const blobParts = [...localParts, ...centralParts, endHeader] as unknown as BlobPart[];
  return new Blob(blobParts, { type: 'application/zip' });
}

export default function ImageResizerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].id);
  const [selectedPresetId, setSelectedPresetId] = useState(platforms[0].presets[0].id);
  const [mode, setMode] = useState<'cover' | 'contain'>('cover');
  const [quality, setQuality] = useState(0.9);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('jpeg');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activePlatform = useMemo(
    () => platforms.find((platform) => platform.id === selectedPlatform) || platforms[0],
    [selectedPlatform]
  );

  const activePreset = useMemo(
    () => activePlatform.presets.find((preset) => preset.id === selectedPresetId) || activePlatform.presets[0],
    [activePlatform, selectedPresetId]
  );

  useEffect(() => {
    if (!imageSrc) {
      setImageElement(null);
      setShowDragHint(false);
      return;
    }

    const img = new Image();
    let hintTimer: number | undefined;
    img.onload = () => {
      setImageElement(img);
      setOffset({ x: 0, y: 0 });
      setShowDragHint(true);
      hintTimer = window.setTimeout(() => {
        setShowDragHint(false);
      }, 3200);
    };
    img.src = imageSrc;
    return () => {
      if (hintTimer) window.clearTimeout(hintTimer);
    };
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageElement || !activePreset) return;

    canvas.width = activePreset.width;
    canvas.height = activePreset.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    configureContext(ctx);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgW = imageElement.width;
    const imgH = imageElement.height;
    const scaleCover = Math.max(canvas.width / imgW, canvas.height / imgH);
    const scaleContain = Math.min(canvas.width / imgW, canvas.height / imgH);
    const scale = mode === 'cover' ? scaleCover : scaleContain;

    const drawW = imgW * scale;
    const drawH = imgH * scale;

    let baseX = (canvas.width - drawW) / 2;
    let baseY = (canvas.height - drawH) / 2;

    let drawX = baseX + offset.x;
    let drawY = baseY + offset.y;

    if (mode === 'cover') {
      drawX = clamp(drawX, canvas.width - drawW, 0);
      drawY = clamp(drawY, canvas.height - drawH, 0);
    }

    drawHighQualityImage(ctx, imageElement, drawX, drawY, drawW, drawH);
  }, [imageElement, activePreset, mode, offset, quality, outputFormat]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const mime = outputFormat === 'jpeg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, mime, outputFormat === 'png' ? undefined : quality)
    );
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePreset.platform.toLowerCase()}-${activePreset.name.replace(/\s+/g, '-').toLowerCase()}.${outputFormat}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    if (!imageElement) return;
    const files: { name: string; data: Uint8Array }[] = [];

    for (const preset of allPresets) {
      const canvas = document.createElement('canvas');
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      configureContext(ctx);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imgW = imageElement.width;
      const imgH = imageElement.height;
      const scaleCover = Math.max(canvas.width / imgW, canvas.height / imgH);
      const scaleContain = Math.min(canvas.width / imgW, canvas.height / imgH);
      const scale = mode === 'cover' ? scaleCover : scaleContain;
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (canvas.width - drawW) / 2;
      const drawY = (canvas.height - drawH) / 2;

      drawHighQualityImage(ctx, imageElement, drawX, drawY, drawW, drawH);

      const mime = outputFormat === 'jpeg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, mime, outputFormat === 'png' ? undefined : quality)
      );
      if (!blob) continue;
      const buffer = await blob.arrayBuffer();
      files.push({
        name: `${preset.platform.toLowerCase()}-${preset.name.replace(/\s+/g, '-').toLowerCase()}.${outputFormat}`,
        data: new Uint8Array(buffer),
      });
    }

    if (!files.length) return;
    const zip = createZip(files);
    const url = URL.createObjectURL(zip);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'social-media-resized.zip';
    link.click();
    URL.revokeObjectURL(url);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== 'cover') return;
    setIsDragging(true);
    setShowDragHint(false);
    dragStart.current = { x: event.clientX, y: event.clientY };
    offsetStart.current = { ...offset };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    setOffset({ x: offsetStart.current.x + dx, y: offsetStart.current.y + dy });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(239,68,6,0.08),_transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              Інструмент
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900">
              Зміна розміру зображень для соцмереж
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Змінюйте розміри зображень для Instagram, Etsy, Pinterest та інших. Завантажте фото,
              оберіть пресет і скачайте правильний розмір.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">1</div>
                  Крок 1: Завантажити фото (JPG, PNG, WebP)
                </div>
                <label className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-sm text-slate-500 hover:border-brand-orange cursor-pointer">
                  <UploadCloud className="h-5 w-5" />
                  {imageSrc ? 'Замінити фото' : 'Завантажити фото'}
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">2</div>
                  Крок 2: Оберіть платформу
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        setSelectedPresetId(platform.presets[0].id);
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        platform.id === selectedPlatform
                          ? 'bg-brand-orange text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">3</div>
                  Крок 3: Оберіть пресет
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {activePlatform.presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`group rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        preset.id === activePreset.id
                          ? 'border-brand-orange bg-brand-orange/10 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                      title={formatSize(preset)}
                    >
                      <div className="font-semibold text-slate-900">{preset.name}</div>
                      <div className="text-xs text-slate-500">{formatSize(preset)}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">4</div>
                  Крок 4: Завантажити готове фото
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Режим кадрування
                    <select
                      value={mode}
                      onChange={(event) => setMode(event.target.value as 'cover' | 'contain')}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
                    >
                      <option value="cover">Smart crop</option>
                      <option value="contain">Padding (білі поля)</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Формат файлу
                    <select
                      value={outputFormat}
                      onChange={(event) => setOutputFormat(event.target.value as OutputFormat)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
                    >
                      <option value="jpeg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-slate-700">
                    Якість стиснення: {Math.round(quality * 100)}%
                    <input
                      type="range"
                      min={0.6}
                      max={1}
                      step={0.1}
                      value={quality}
                      onChange={(event) => setQuality(Number(event.target.value))}
                      className="mt-2 w-full accent-brand-orange"
                    />
                  </label>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!imageElement}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition disabled:opacity-50"
                  >
                    Завантажити
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={!imageElement}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-slate-700 font-semibold hover:border-brand-orange hover:text-brand-orange transition disabled:opacity-50"
                  >
                    Завантажити всі пресети (ZIP)
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm order-1 lg:order-2">
              <div className="text-sm font-semibold text-slate-700">Прев’ю</div>
              <div className="relative mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto cursor-move"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerLeave={onPointerUp}
                />
                {imageElement && mode === 'cover' && showDragHint && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg animate-pulse">
                      Перетягуйте, щоб змінити кадр
                    </div>
                    <div className="absolute inset-x-10 top-1/2 hidden h-0.5 -translate-y-1/2 bg-slate-300/60 sm:block" />
                    <div className="absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/80 sm:block" />
                  </div>
                )}
                {!imageElement && (
                  <div className="mt-4 text-sm text-slate-500">
                    Завантажте фото, щоб побачити прев’ю.
                  </div>
                )}
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Перетягуйте, щоб змінити кадр (у режимі Smart crop).
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Як працює ресайзер</h2>
              <p className="mt-3 text-slate-600">
                Завантажте фото, оберіть платформу і пресет — інструмент автоматично
                підганяє розмір, кадрує або додає поля, і дає готове зображення для публікації.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Smart crop зберігає композицію, а padding додає білі поля без обрізання.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Перетягуйте фото у прев’ю, щоб вручну змістити кадр.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Bulk resize формує ZIP з усіма форматами одразу.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
              <div className="mt-6 space-y-5 text-sm text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900">Чи зберігаються мої зображення?</h3>
                  <p className="mt-2 text-slate-600">Ні. Усі зміни виконуються локально в браузері.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Які формати підтримуються?</h3>
                  <p className="mt-2 text-slate-600">JPG, PNG та WebP. На виході можна обрати потрібний формат.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Чи можна зробити одразу кілька форматів?</h3>
                  <p className="mt-2 text-slate-600">Так, кнопка “Завантажити всі пресети (ZIP)” створить архів із різними розмірами.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
