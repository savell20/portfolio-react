import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

export default function Polaroid({ src, caption, rotate = 0, isStrip = false, clickable = false, onDelete }) {
  const [hover, setHover] = useState(false)
  // Photobooth strips already include the caption baked into the image,
  // so render the whole frame without a separate white caption band.
  const lift = clickable && hover
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#FAF8F2',
        padding: isStrip ? 0 : '10px 10px 28px',
        boxShadow: lift
          ? '0 22px 44px rgba(0,0,0,0.38)'
          : '0 14px 32px rgba(0,0,0,0.28)',
        transform: lift
          ? `rotate(${rotate}deg) translate(-2px, -3px)`
          : `rotate(${rotate}deg)`,
        transition: 'transform 0.22s var(--ease), box-shadow 0.22s',
        position: 'relative',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        flex: 1, overflow: 'hidden', background: '#222',
        marginBottom: isStrip ? 0 : 8,
      }}>
        <img
          src={src}
          alt={caption || 'polaroid'}
          draggable={false}
          style={{
            width: '100%', height: '100%',
            objectFit: isStrip ? 'contain' : 'cover',
            display: 'block',
            background: isStrip ? '#FAF8F2' : '#222',
          }}
        />
      </div>
      {!isStrip && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <p style={{
            flex: 1,
            textAlign: clickable ? 'left' : 'center',
            fontFamily: 'var(--font-hand)', fontSize: '1.15rem',
            color: '#2a2a26', lineHeight: 1.1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {caption}
          </p>
          {clickable && (
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: '50%',
              background: hover ? 'var(--accent)' : 'var(--canvas)',
              color: hover ? 'var(--surface)' : 'var(--ink-soft)',
              transition: 'background 0.2s, color 0.2s',
              flexShrink: 0,
            }}>
              <span style={{
                display: 'inline-flex',
                transform: hover ? 'rotate(-45deg)' : 'rotate(0deg)',
                transition: 'transform 0.28s var(--ease)',
              }}>
                <ArrowRight size={14} />
              </span>
            </span>
          )}
        </div>
      )}

      {hover && onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Delete polaroid"
          style={{
            position: 'absolute', top: -8, right: -8,
            width: 22, height: 22, borderRadius: '50%', cursor: 'none',
            background: '#18181A', color: '#fff', border: '2px solid #FAF8F2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
        >
          <X size={11} />
        </button>
      )}
    </div>
  )
}
