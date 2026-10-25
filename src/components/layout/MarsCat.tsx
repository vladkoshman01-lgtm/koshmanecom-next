import React from 'react';

/**
 * Кіт Марс — маскот агенції. Винесений окремо, бо використовується
 * і в логотипі футера, і на 404, і в «мандрівному» віджеті.
 * Зіниці керуються ззовні, щоб кіт міг «дивитись» за курсором.
 */
export default function MarsCat({
  width = 96,
  height = 78,
  pupilLeft = 60,
  pupilRight = 100,
  className = '',
  style,
}: {
  width?: number | string;
  height?: number | string;
  pupilLeft?: number;
  pupilRight?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 130"
      className={className}
      style={style}
      aria-hidden
    >
      {/* вуха */}
      <path d="M30 70 L38 12 L72 42 Z M130 70 L122 12 L88 42 Z" fill="#141414" />
      <path d="M40 52 L43 26 L60 42 Z M120 52 L117 26 L100 42 Z" fill="var(--brand-orange)" />
      {/* голова */}
      <ellipse cx="80" cy="80" rx="54" ry="46" fill="#141414" />
      {/* очі */}
      <g className="mars-blink origin-center [transform-box:fill-box]">
        <ellipse cx="60" cy="76" rx="10" ry="12" fill="#fff" />
        <ellipse cx="100" cy="76" rx="10" ry="12" fill="#fff" />
        <ellipse cx={pupilLeft} cy="78" rx="4.5" ry="8" fill="#141414" />
        <ellipse cx={pupilRight} cy="78" rx="4.5" ry="8" fill="#141414" />
      </g>
      {/* ніс, рот, вуса */}
      <path d="M75 94 L85 94 L80 100 Z" fill="#FF8A5C" />
      <path
        d="M80 100 Q74 106 68 103 M80 100 Q86 106 92 103"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M48 94 L20 90 M48 100 L22 104 M112 94 L140 90 M112 100 L138 104"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".7"
      />
      {/* лапки */}
      <rect x="42" y="110" width="30" height="24" rx="12" fill="#141414" />
      <rect x="88" y="110" width="30" height="24" rx="12" fill="#141414" />
      <path
        d="M52 112 V120 M62 112 V120 M98 112 V120 M108 112 V120"
        stroke="var(--brand-orange)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
