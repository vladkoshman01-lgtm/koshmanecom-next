'use client';

import React, { useState } from 'react';

/**
 * Вставка відео з YouTube із лінивим завантаженням.
 *
 * До кліку показуємо лише кадр-превʼю і кнопку відтворення — скрипти
 * плеєра й сторонні куки не вантажаться. Після кліку підставляємо iframe
 * з доменом youtube-nocookie і автозапуском.
 */
export default function YouTubeEmbed({
  id,
  title,
  poster,
  className = '',
}: {
  id: string;
  title: string;
  /** Свій кадр-превʼю. Без нього беремо обкладинку з YouTube. */
  poster?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#141414] ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Відтворити відео: ${title}`}
          className="group absolute inset-0 flex items-center justify-center"
        >
          {/* Кадр із YouTube. Звичайний img, бо збірка статична.
              Не в кожного відео є maxresdefault — тоді беремо hqdefault. */}
          <img
            src={poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              const img = e.currentTarget;
              if (!poster && !img.src.includes('hqdefault')) {
                img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }
            }}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="relative flex h-[3.4375rem] w-[3.4375rem] items-center justify-center rounded-full bg-brand-orange transition-transform duration-200 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
