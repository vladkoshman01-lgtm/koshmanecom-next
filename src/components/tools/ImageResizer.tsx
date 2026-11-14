'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fill, useLocale } from '@/i18n/LocaleProvider';
import { PLATFORMS, PRESET_COUNT, RESIZER_COPY, ratioOf, type Platform, type Preset } from '@/data/imageResizer';
import {
  EXT,
  baseName,
  buildSource,
  createZip,
  exportFrame,
  imageScale,
  layout,
  renderFrame,
  saveBlob,
  type Background,
  type FitMode,
  type FrameSettings,
  type OutputFormat,
  type SourceImage,
} from '@/lib/imageResize';
import { NUMBER_LOCALE } from './calcUi';

/**
 * Ресайзер: фото → кадр точного розміру для обраної платформи.
 * Усе рахується в браузері; прев'ю — зменшене полотно, файл рендериться
 * тим самим кодом у повному розмірі.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange(!on)}
      className={`flex h-9 items-center gap-2 border-[1.5px] px-3 text-[0.8125rem] font-semibold transition-colors ${
        on ? 'border-brand-orange text-[#222222]' : 'border-[#DCDCDC] text-[#555555] hover:border-brand-orange'
      }`}
    >
      <span
        className={`flex h-4 w-4 flex-none items-center justify-center border-[1.5px] ${
          on ? 'border-brand-orange bg-brand-orange text-white' : 'border-[#BDBDBD]'
        }`}
        aria-hidden
      >
        {on ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M5 12l5 5 9-10" />
          </svg>
        ) : null}
      </span>
      {label}
    </button>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between text-sm font-semibold text-[#222222]">
        {label}
        <span className="font-bold text-brand-orange">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 w-full cursor-pointer accent-brand-orange"
      />
    </label>
  );
}

/** Мініатюра пропорцій пресета: прямокутник у квадраті 28×28. */
function RatioIcon({ w, h, active }: { w: number; h: number; active: boolean }) {
  const k = 16 / Math.max(w, h);
  return (
    <span className="flex h-4 w-4 flex-none items-center justify-center" aria-hidden>
      <span
        className={`block border-[1.5px] ${active ? 'border-brand-orange bg-brand-orange/15' : 'border-[#8A8A8A]'}`}
        style={{ width: Math.max(4, w * k), height: Math.max(3, h * k) }}
      />
    </span>
  );
}

/** Компактна кнопка-перемикач: усі налаштування мають влазити в один екран. */
function Pill({
  active,
  onClick,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`flex h-9 items-center justify-center gap-2 border-[1.5px] px-3.5 text-[0.8125rem] font-semibold transition-colors ${
        active
          ? 'border-brand-orange bg-brand-orange text-white'
          : 'border-[#DCDCDC] bg-white text-[#222222] hover:border-brand-orange'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Label({ index, children }: { index?: number; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[#222222]">
      {index ? <span className="text-brand-orange">{String(index).padStart(2, '0')}</span> : null}
      {children}
    </div>
  );
}

export default function ImageResizer() {
  const locale = useLocale();
  const c = RESIZER_COPY[locale];
  const u = c.ui;
  const nf = useMemo(() => new Intl.NumberFormat(NUMBER_LOCALE[locale]), [locale]);

  const [source, setSource] = useState<SourceImage | null>(null);
  const [fileName, setFileName] = useState('image');
  const [error, setError] = useState(false);
  const [platformId, setPlatformId] = useState(PLATFORMS[0].id);
  const [presetId, setPresetId] = useState(PLATFORMS[0].presets[0].id);
  const [settings, setSettings] = useState<FrameSettings>({
    mode: 'cover',
    zoom: 1,
    panX: 0.5,
    panY: 0.5,
    background: 'white',
    customColor: '#FF5B2B',
  });
  const [format, setFormat] = useState<OutputFormat>('jpeg');
  const [quality, setQuality] = useState(90);
  const [showGrid, setShowGrid] = useState(false);
  const [showSafe, setShowSafe] = useState(true);
  const [weight, setWeight] = useState<number | null>(null);
  const [zipping, setZipping] = useState<'platform' | 'all' | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hint, setHint] = useState(false);
  const [display, setDisplay] = useState({ w: 0, h: 0 });

  const fileInput = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const platform: Platform = PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];
  const preset: Preset = platform.presets.find((p) => p.id === presetId) ?? platform.presets[0];

  // Головне фото Amazon — лише на білому, інші поля не пропонуємо
  const effective: FrameSettings = useMemo(
    () => (preset.whiteBg ? { ...settings, background: 'white' as Background } : settings),
    [settings, preset.whiteBg],
  );

  const patch = (p: Partial<FrameSettings>) => setSettings((s) => ({ ...s, ...p }));

  /* ---------- Завантаження фото ---------- */

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (file.type && !file.type.startsWith('image/')) {
      setError(true);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSource(buildSource(img));
      setFileName(file.name || 'image');
      setError(false);
      setSettings((s) => ({ ...s, zoom: 1, panX: 0.5, panY: 0.5 }));
      setHint(true);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError(true);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  // Вставка з буфера обміну в будь-якому місці сторінки
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith('image/'));
      if (item) {
        e.preventDefault();
        loadFile(item.getAsFile());
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [loadFile]);

  useEffect(() => {
    if (!hint) return;
    const t = window.setTimeout(() => setHint(false), 3500);
    return () => window.clearTimeout(t);
  }, [hint]);

  /* ---------- Розмір прев'ю ---------- */

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const cs = getComputedStyle(stage);
      const maxW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const mobile = window.innerWidth < 768;
      // Прев'ю якомога більше: фото + смуга «Готовий файл» мають влазити в екран
      const maxH = mobile ? 460 : Math.min(860, Math.max(380, window.innerHeight - 265));
      const k = Math.min(maxW / preset.width, maxH / preset.height);
      setDisplay({ w: Math.floor(preset.width * k), h: Math.floor(preset.height * k) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [preset.width, preset.height, source]);

  /* ---------- Малювання прев'ю ---------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !source || !display.w) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cw = Math.min(preset.width, Math.round(display.w * dpr));
    const ch = Math.round((cw * preset.height) / preset.width);
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (ctx) renderFrame(ctx, source, cw, ch, effective);
  }, [source, display, preset.width, preset.height, effective]);

  /* ---------- Вага готового файлу (з затримкою, щоб не гальмувати) ---------- */

  useEffect(() => {
    if (!source) return;
    setWeight(null);
    let alive = true;
    const t = window.setTimeout(async () => {
      const blob = await exportFrame(source, preset.width, preset.height, effective, format, quality / 100);
      if (alive && blob) setWeight(blob.size);
    }, 400);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [source, preset.width, preset.height, effective, format, quality]);

  /* ---------- Перетягування кадру ---------- */

  const canPan = !!source && settings.mode === 'cover';

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canPan) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, panX: settings.panX, panY: settings.panY };
    setHint(false);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current || !source) return;
    const { rangeX, rangeY } = layout(source, display.w, display.h, settings);
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    patch({
      panX: rangeX ? clamp01(drag.current.panX - dx / rangeX) : 0.5,
      panY: rangeY ? clamp01(drag.current.panY - dy / rangeY) : 0.5,
    });
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!canPan) return;
    const step = e.shiftKey ? 0.1 : 0.02;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    patch({ panX: clamp01(settings.panX + m[0]), panY: clamp01(settings.panY + m[1]) });
  };

  /* ---------- Скачування ---------- */

  const fileFor = (p: Platform, pr: Preset) =>
    `${baseName(fileName)}-${p.id}-${pr.id}-${pr.width}x${pr.height}.${EXT[format]}`;

  const download = async () => {
    if (!source) return;
    const blob = await exportFrame(source, preset.width, preset.height, effective, format, quality / 100);
    if (blob) saveBlob(blob, fileFor(platform, preset));
  };

  const downloadZip = async (scope: 'platform' | 'all') => {
    if (!source || zipping) return;
    setZipping(scope);
    try {
      const list = scope === 'platform' ? [platform] : PLATFORMS;
      const files: { name: string; data: Uint8Array }[] = [];
      for (const p of list) {
        for (const pr of p.presets) {
          const s = pr.whiteBg ? { ...settings, background: 'white' as Background } : settings;
          const blob = await exportFrame(source, pr.width, pr.height, s, format, quality / 100);
          if (blob) files.push({ name: fileFor(p, pr), data: new Uint8Array(await blob.arrayBuffer()) });
        }
      }
      if (files.length) {
        const name = scope === 'platform' ? `${baseName(fileName)}-${platform.id}.zip` : `${baseName(fileName)}-all-sizes.zip`;
        saveBlob(createZip(files), name);
      }
    } finally {
      setZipping(null);
    }
  };

  /* ---------- Похідні значення ---------- */

  const upscale = source ? imageScale(source, preset.width, preset.height, effective) > 1.05 : false;
  const kb = (b: number) =>
    b >= 1024 * 1024
      ? `${new Intl.NumberFormat(NUMBER_LOCALE[locale], { maximumFractionDigits: 1 }).format(b / 1024 / 1024)} MB`
      : `${nf.format(Math.round(b / 1024))} KB`;
  const size = (w: number, h: number) => `${nf.format(w)} × ${nf.format(h)}`;
  const safe = preset.safe;

  return (
    <div className="flex flex-col gap-2.5 md:gap-[0.9375rem]">
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          loadFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      {/* Панель зверху: платформа й формат завжди на виду, поруч із прев'ю */}
      <div className="rounded-[0.25rem] bg-white p-4 md:px-8 md:py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="md:w-32 md:flex-none">
            <Label index={1}>{u.platform}</Label>
          </div>
          <div role="radiogroup" aria-label={u.platform} className="flex flex-wrap gap-1.5">
            {PLATFORMS.map((p) => (
              <Pill
                key={p.id}
                active={p.id === platformId}
                onClick={() => {
                  setPlatformId(p.id);
                  setPresetId(p.presets[0].id);
                }}
              >
                {p.name}
              </Pill>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 border-t border-[#EEEEEE] pt-4 md:flex-row md:items-center md:gap-6">
          <div className="md:w-32 md:flex-none">
            <Label index={2}>{u.size}</Label>
          </div>
          {/* На телефоні — один рядок з прокруткою, щоб прев'ю було одразу під ним */}
          <div
            role="radiogroup"
            aria-label={u.size}
            className="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {platform.presets.map((p) => {
              const active = p.id === preset.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  title={p.note[locale]}
                  onClick={() => setPresetId(p.id)}
                  className={`flex h-10 flex-none items-center gap-2.5 whitespace-nowrap border-[1.5px] px-3.5 text-left text-[0.8125rem] transition-colors ${
                    active ? 'border-brand-orange bg-[#FFF1EB]' : 'border-[#DCDCDC] bg-white hover:border-brand-orange'
                  }`}
                >
                  <RatioIcon w={p.width} h={p.height} active={active} />
                  <span className="font-semibold text-[#222222]">{p.name[locale]}</span>
                  <span className="text-[#8A8A8A]">{size(p.width, p.height)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-2.5 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:gap-[0.9375rem]">
        {/* Прев'ю — головна частина інструмента */}
        <div className="rounded-[0.25rem] bg-white p-3 md:p-5">
          <div
            ref={stageRef}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              loadFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative flex w-full items-center justify-center transition-colors ${
              source
                ? `min-h-[12rem] bg-[#EEEEEE] p-2 md:p-4 ${dragOver ? 'outline outline-2 outline-brand-orange' : ''}`
                : `min-h-[22rem] border-[1.5px] border-dashed md:min-h-[30rem] ${
                    dragOver ? 'border-brand-orange bg-[#FFF1EB]' : 'border-[#BDBDBD] bg-[#F7F7F7]'
                  }`
            }`}
          >
            {source ? (
              <div className="relative" style={{ width: display.w, height: display.h }}>
                <canvas
                  ref={canvasRef}
                  tabIndex={0}
                  aria-label={`${platform.name} · ${preset.name[locale]} · ${size(preset.width, preset.height)}`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onKeyDown={onKeyDown}
                  className={`block h-full w-full shadow-[0_1px_8px_rgba(0,0,0,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                    canPan ? 'cursor-grab touch-none active:cursor-grabbing' : ''
                  }`}
                />

                {/* Підказки малюються поверх і не потрапляють у файл */}
                {showGrid ? (
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="absolute inset-y-0 left-1/3 w-px bg-white/70" />
                    <div className="absolute inset-y-0 left-2/3 w-px bg-white/70" />
                    <div className="absolute inset-x-0 top-1/3 h-px bg-white/70" />
                    <div className="absolute inset-x-0 top-2/3 h-px bg-white/70" />
                  </div>
                ) : null}
                {safe && showSafe ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <div
                      className="absolute border-[1.5px] border-dashed border-brand-orange shadow-[0_0_0_100vmax_rgba(20,20,20,0.35)]"
                      style={{
                        left: `${safe.x * 100}%`,
                        top: `${safe.y * 100}%`,
                        width: `${safe.w * 100}%`,
                        height: `${safe.h * 100}%`,
                      }}
                    >
                      <span className="absolute left-0 top-0 bg-brand-orange px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-white">
                        {safe.label[locale]}
                      </span>
                    </div>
                  </div>
                ) : null}
                {hint && canPan ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                    <span className="bg-[#141414]/85 px-4 py-2.5 text-[0.8125rem] font-semibold text-white">
                      ✥ {u.dragHint}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex max-w-[26rem] flex-col items-center px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center bg-[#FDE3D8] text-brand-orange" aria-hidden>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3M12 15V4M7 9l5-5 5 5" />
                  </svg>
                </span>
                <div className="mt-5 text-xl font-semibold text-[#222222] md:text-[1.5rem]">{u.drop}</div>
                <p className="mt-2 text-sm leading-[1.5] text-[#8A8A8A]">{u.dropHint}</p>
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="mt-6 flex h-14 items-center justify-center gap-2 bg-brand-orange px-8 text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C]"
                >
                  {u.choose} <span aria-hidden>→</span>
                </button>
                <p className="mt-5 flex items-center gap-2 text-[0.8125rem] text-[#555555]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="1" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  {u.privacy}
                </p>
                {error ? <p className="mt-4 text-sm font-semibold text-brand-orange">{u.badFile}</p> : null}
              </div>
            )}
          </div>

          {/* Готовий файл — одразу під фото: скачати, не відводячи очей від кадру */}
          <div aria-live="polite" className="mt-3 flex flex-col gap-4 bg-[#141414] p-4 text-white md:flex-row md:items-center md:gap-6 md:px-6 md:py-4">
            <div className="min-w-0 flex-1">
              <div className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#FF8A5C]">{u.result}</div>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="text-[1.375rem] font-bold leading-tight md:text-[1.5rem]">
                  {size(preset.width, preset.height)}
                </span>
                <span className="text-[0.8125rem] text-[#CFCFCF]">
                  px · {ratioOf(preset.width, preset.height)} · {format === 'jpeg' ? 'JPG' : format === 'png' ? 'PNG' : 'WebP'}
                  {source ? ` · ${weight === null ? '…' : `≈ ${kb(weight)}`}` : ''}
                </span>
              </div>
              <div className="mt-1 truncate text-[0.75rem] text-[#8A8A8A]">
                {platform.name} · {preset.name[locale]} — {preset.note[locale]}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-none md:items-end">
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => downloadZip('platform')}
                  disabled={!source || !!zipping}
                  title={u.zipHint}
                  className="flex h-12 items-center justify-center gap-2 border-[1.5px] border-[#3A3A3A] px-4 text-[0.8125rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {zipping === 'platform' ? u.zipping : fill(u.zipPlatform, { platform: platform.name })}
                </button>
                <button
                  type="button"
                  onClick={download}
                  disabled={!source}
                  className="flex h-12 items-center justify-center gap-2 bg-brand-orange px-7 text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C] disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[11rem]"
                >
                  {u.download} <span aria-hidden>↓</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => downloadZip('all')}
                disabled={!source || !!zipping}
                title={u.zipHint}
                className="text-[0.75rem] font-semibold text-[#CFCFCF] underline-offset-4 transition-colors hover:text-white hover:underline disabled:cursor-not-allowed disabled:opacity-40"
              >
                {zipping === 'all' ? u.zipping : fill(u.zipAll, { count: String(PRESET_COUNT) })}
              </button>
            </div>
          </div>
          {source && upscale ? (
            <p className="mt-3 border-l-2 border-brand-orange bg-[#FFF1EB] px-4 py-2.5 text-[0.8125rem] font-semibold leading-[1.45] text-[#222222]">
              {u.upscale}
            </p>
          ) : null}
          {source && error ? <p className="mt-3 text-sm font-semibold text-brand-orange">{u.badFile}</p> : null}
        </div>

        {/* Налаштування — вузька колонка, липне під хедером */}
        <div className="flex flex-col gap-2.5 md:gap-[0.9375rem] lg:sticky lg:top-[6.5rem]">
          <div className="rounded-[0.25rem] bg-white p-4 md:p-5">
            {source ? (
              <div className="mb-5 border-b border-[#EEEEEE] pb-5">
                <div className="truncate text-[0.875rem] font-semibold text-[#222222]" title={fileName}>
                  {fileName}
                </div>
                <div className="text-[0.75rem] text-[#8A8A8A]">
                  {u.source}: {size(source.width, source.height)} px
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    className="h-9 border-[1.5px] border-[#222222] px-2 text-[0.8125rem] font-semibold text-[#222222] transition-colors hover:bg-[#222222] hover:text-white"
                  >
                    {u.replace}
                  </button>
                  <button
                    type="button"
                    onClick={() => patch({ zoom: 1, panX: 0.5, panY: 0.5 })}
                    disabled={settings.mode !== 'cover' || (settings.zoom === 1 && settings.panX === 0.5 && settings.panY === 0.5)}
                    className="h-9 border-[1.5px] border-[#DCDCDC] px-2 text-[0.8125rem] font-semibold text-[#222222] transition-colors hover:border-brand-orange disabled:cursor-default disabled:opacity-40 disabled:hover:border-[#DCDCDC]"
                  >
                    {u.resetFrame}
                  </button>
                </div>
              </div>
            ) : null}
            <Label index={3}>{u.frame}</Label>
            <div role="radiogroup" aria-label={u.frame} className="mt-3 grid grid-cols-2 gap-1.5">
              <Pill active={settings.mode === 'cover'} onClick={() => patch({ mode: 'cover' as FitMode })}>
                {u.cover}
              </Pill>
              <Pill active={settings.mode === 'contain'} onClick={() => patch({ mode: 'contain' as FitMode })}>
                {u.contain}
              </Pill>
            </div>
            <p className="mt-2 text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">
              {settings.mode === 'cover' ? u.coverHint : u.containHint}
            </p>

            <div className="mt-4">
              {settings.mode === 'cover' ? (
                <Range
                  label={u.zoom}
                  value={settings.zoom}
                  min={1}
                  max={3}
                  step={0.05}
                  format={(v) => `${Math.round(v * 100)}%`}
                  onChange={(zoom) => patch({ zoom })}
                />
              ) : preset.whiteBg ? (
                <p className="border-l-2 border-brand-orange bg-[#FFF1EB] px-3.5 py-2.5 text-[0.8125rem] font-semibold leading-[1.45] text-[#222222]">
                  {u.whiteRequired}
                </p>
              ) : (
                <>
                  <div className="text-sm font-semibold text-[#222222]">{u.background}</div>
                  <div role="radiogroup" aria-label={u.background} className="mt-2 flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        ['white', u.bgWhite],
                        ['black', u.bgBlack],
                        ['blur', u.bgBlur],
                        ['custom', u.bgCustom],
                      ] as [Background, string][]
                    ).map(([key, text]) => (
                      <Pill key={key} active={settings.background === key} onClick={() => patch({ background: key })}>
                        {text}
                      </Pill>
                    ))}
                    {settings.background === 'custom' ? (
                      <input
                        type="color"
                        value={settings.customColor}
                        onChange={(e) => patch({ customColor: e.target.value })}
                        aria-label={u.bgCustom}
                        className="h-9 w-12 cursor-pointer border-[1.5px] border-[#DCDCDC] bg-white p-0.5"
                      />
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Toggle label={u.grid} on={showGrid} onChange={setShowGrid} />
              {safe ? <Toggle label={u.safe} on={showSafe} onChange={setShowSafe} /> : null}
            </div>

            <div className="mt-5 border-t border-[#EEEEEE] pt-5">
              <Label index={4}>{u.file}</Label>
              <div role="radiogroup" aria-label={u.format} className="mt-3 grid grid-cols-3 gap-1.5">
                {(
                  [
                    ['jpeg', 'JPG'],
                    ['png', 'PNG'],
                    ['webp', 'WebP'],
                  ] as [OutputFormat, string][]
                ).map(([key, text]) => (
                  <Pill key={key} active={format === key} onClick={() => setFormat(key)}>
                    {text}
                  </Pill>
                ))}
              </div>
              <div className="mt-3">
                {format === 'png' ? (
                  <p className="text-[0.8125rem] leading-[1.4] text-[#8A8A8A]">{u.pngHint}</p>
                ) : (
                  <Range
                    label={u.quality}
                    value={quality}
                    min={60}
                    max={100}
                    step={5}
                    format={(v) => `${v}%`}
                    onChange={setQuality}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
