import { useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'

export default function Polaroid({ src, caption, rotate = 0, isStrip = false, action, onDelete }) {
  const [hover, setHover] = useState(false)
  // Photobooth strips already include the caption baked into the image,
  // so render the whole frame without a separate white caption band.
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#FAF8F2',
        padding: isStrip ? 0 : (action ? '10px 10px 18px' : '10px 10px 28px'),
        boxShadow: '0 14px 32px rgba(0,0,0,0.28)',
        transform: `rotate(${rotate}deg)`,
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
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-hand)', fontSize: '1.15rem',
          color: '#2a2a26', lineHeight: 1.1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          marginBottom: action ? 8 : 0,
        }}>
          {caption}
        </p>
      )}
      {action && !isStrip && (
        <button
          onClick={(e) => { e.stopPropagation(); action.onClick?.() }}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            alignSelf: 'center',
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '0.4rem 0.8rem',
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 'var(--radius-pill)', cursor: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 500,
            letterSpacing: '0.04em',
            transition: 'transform 0.18s var(--ease), filter 0.18s',
            transform: hover ? 'translateY(-1px)' : 'translateY(0)',
            filter: hover ? 'brightness(1.1)' : 'brightness(1)',
            whiteSpace: 'nowrap',
          }}
        >
          {action.label} <ArrowUpRight size={11} />
        </button>
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
