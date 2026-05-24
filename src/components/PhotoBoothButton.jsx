import { useState } from 'react'

/* Custom icon — a stylized photobooth (red rounded square with two
   white photo strips dispensing). Recreated as SVG so it scales cleanly. */
function PhotoBoothIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="pb-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="100%" stopColor="#E53030" />
        </linearGradient>
        <linearGradient id="pb-strip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6E6E6" />
        </linearGradient>
      </defs>
      {/* outer red squircle */}
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#pb-red)" />
      {/* slot (dispenser) */}
      <rect x="14" y="11" width="36" height="4" rx="1.5" fill="#1a0606" opacity="0.55" />
      {/* upper photo strip */}
      <g transform="translate(15 16)">
        <rect width="34" height="20" rx="2" fill="url(#pb-strip)" />
        <circle cx="17" cy="9" r="3.6" fill="#888" />
        <path d="M 8 20 a 9 9 0 0 1 18 0 z" fill="#888" />
      </g>
      {/* lower photo strip */}
      <g transform="translate(15 38)">
        <rect width="34" height="22" rx="2" fill="url(#pb-strip)" />
        <circle cx="17" cy="9.5" r="3.8" fill="#888" />
        <path d="M 8 22 a 9 9 0 0 1 18 0 z" fill="#888" />
      </g>
    </svg>
  )
}

export default function PhotoBoothButton({ onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Open photo booth"
      title="Photo booth — drop a polaroid"
      style={{
        position: 'fixed', bottom: 16, left: 92, zIndex: 9500,
        width: 62, height: 62, padding: 0, border: 'none', cursor: 'none',
        background: 'transparent',
        borderRadius: 16,
        boxShadow: hover
          ? '0 16px 32px rgba(229,48,48,0.45), 0 0 0 4px rgba(255,255,255,0.6)'
          : '0 10px 22px rgba(229,48,48,0.35)',
        transform: hover ? 'translateY(-2px) rotate(-4deg)' : 'translateY(0) rotate(0deg)',
        transition: 'transform 0.22s var(--ease), box-shadow 0.22s',
        animation: 'fade-in 0.5s var(--ease) both',
        animationDelay: '0.25s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <PhotoBoothIcon size={62} />
    </button>
  )
}
