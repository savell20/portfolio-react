import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Camera as CameraIcon, RefreshCw, Check } from 'lucide-react'

export default function PhotoBooth({ onClose, onSave }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [shot, setShot] = useState(null)
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let cancelled = false
    const start = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
          audio: false,
        })
        if (cancelled) { s.getTracks().forEach(t => t.stop()); return }
        streamRef.current = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
          await videoRef.current.play()
        }
      } catch (e) {
        setError(e && e.message ? e.message : 'Camera unavailable.')
      }
    }
    start()
    return () => {
      cancelled = true
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [])

  const snap = () => {
    setCountdown(3)
    let n = 3
    const tick = () => {
      n -= 1
      if (n <= 0) {
        setCountdown(0)
        const v = videoRef.current
        if (!v) return
        const c = document.createElement('canvas')
        c.width = 480
        c.height = 480
        const ctx = c.getContext('2d')
        // center-crop the 4:3 video into a square
        const vw = v.videoWidth || 640
        const vh = v.videoHeight || 480
        const sx = (vw - Math.min(vw, vh)) / 2
        const sy = (vh - Math.min(vw, vh)) / 2
        const s = Math.min(vw, vh)
        // mirror horizontally so it matches the live preview
        ctx.translate(c.width, 0); ctx.scale(-1, 1)
        ctx.drawImage(v, sx, sy, s, s, 0, 0, c.width, c.height)
        const data = c.toDataURL('image/jpeg', 0.82)
        setShot(data)
      } else {
        setCountdown(n)
        setTimeout(tick, 800)
      }
    }
    setTimeout(tick, 800)
  }

  const retake = () => { setShot(null); setCaption('') }
  const save = () => {
    if (!shot) return
    onSave({ src: shot, caption: caption.trim() || 'untitled' })
  }

  return createPortal(
    <div
      onPointerDown={e => e.stopPropagation()}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(12,12,14,0.65)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        animation: 'fade-in 0.22s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius)', padding: '1.6rem 1.7rem 1.4rem',
          boxShadow: '0 30px 70px rgba(0,0,0,0.4)',
          position: 'relative',
          animation: 'pop-in 0.28s var(--ease) both',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close photo booth"
          style={{
            position: 'absolute', top: 14, right: 14, cursor: 'none',
            background: 'var(--canvas)', border: '1px solid var(--line)',
            width: 28, height: 28, borderRadius: '50%', color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={13} />
        </button>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.4rem',
        }}>
          # photo booth
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.35rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: '1.1rem',
        }}>
          {shot ? 'Looking good 👌' : 'Smile — drop a polaroid'}
        </h3>

        {/* Preview area */}
        <div style={{
          position: 'relative',
          width: '100%', aspectRatio: '1 / 1',
          background: '#111', borderRadius: 'calc(var(--radius) - 4px)',
          overflow: 'hidden', marginBottom: '1rem',
        }}>
          {error ? (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', padding: '1rem',
              color: '#fff', textAlign: 'center', fontSize: '0.85rem',
            }}>
              {error}
            </div>
          ) : shot ? (
            <img src={shot} alt="snapshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>
              <video
                ref={videoRef}
                playsInline muted autoPlay
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: 'scaleX(-1)',
                }}
              />
              {countdown > 0 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)',
                  color: '#fff', fontFamily: 'var(--font-display)',
                  fontSize: '6rem', fontWeight: 800,
                  animation: 'pop-in 0.4s var(--ease) both',
                }}>
                  {countdown}
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        {!error && (
          shot ? (
            <>
              <input
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="caption (optional)"
                maxLength={36}
                style={{
                  width: '100%', padding: '0.55rem 0.7rem', marginBottom: '0.7rem',
                  background: 'var(--canvas)', border: '1px solid var(--line)',
                  borderRadius: 8, fontFamily: 'var(--font-hand)', fontSize: '1.05rem',
                  color: 'var(--ink)', outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={retake}
                  style={{
                    flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 5,
                    padding: '0.6rem 0.85rem', cursor: 'none',
                    background: 'var(--canvas)', border: '1px solid var(--line)',
                    borderRadius: 8, color: 'var(--ink-soft)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                  }}
                >
                  <RefreshCw size={12} /> retake
                </button>
                <button
                  onClick={save}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    padding: '0.65rem 0.85rem', cursor: 'none',
                    background: 'var(--accent)', border: 'none',
                    borderRadius: 8, color: '#fff',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
                  }}
                >
                  <Check size={13} /> pin to canvas
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={snap}
              disabled={countdown > 0}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '0.75rem', cursor: 'none',
                background: 'var(--accent)', border: 'none',
                borderRadius: 8, color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
                opacity: countdown > 0 ? 0.6 : 1,
              }}
            >
              <CameraIcon size={14} /> {countdown > 0 ? 'hold still…' : 'snap'}
            </button>
          )
        )}
      </div>
    </div>,
    document.body
  )
}
