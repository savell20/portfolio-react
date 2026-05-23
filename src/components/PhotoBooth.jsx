import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Camera as CameraIcon, RefreshCw, Check, Download } from 'lucide-react'

const SHOTS = 3
const FRAME_W = 480
const FRAME_H = 480

// Compose 3 captured frames into a vertical photobooth strip with caption.
function buildStrip(frames, caption) {
  const stripW = 360
  const photoW = stripW - 28          // 14px white margin each side
  const photoH = Math.round(photoW * 0.78)
  const gap = 10
  const captionH = 78
  const stripH = 14 + (photoH + gap) * frames.length + captionH

  const c = document.createElement('canvas')
  c.width = stripW
  c.height = stripH
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#FAF8F2'
  ctx.fillRect(0, 0, stripW, stripH)

  let y = 14
  for (const f of frames) {
    ctx.fillStyle = '#111'
    ctx.fillRect(14, y, photoW, photoH)
    // draw via Image for clean scaling
    const img = f._img
    if (img) {
      const ratio = img.width / img.height
      const target = photoW / photoH
      let sx = 0, sy = 0, sw = img.width, sh = img.height
      if (ratio > target) { sw = img.height * target; sx = (img.width - sw) / 2 }
      else { sh = img.width / target; sy = (img.height - sh) / 2 }
      ctx.drawImage(img, sx, sy, sw, sh, 14, y, photoW, photoH)
    }
    y += photoH + gap
  }

  // caption block
  ctx.fillStyle = '#2a2a26'
  ctx.font = `34px "Caveat", cursive`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(caption || 'photobooth ✷', stripW / 2, y + captionH / 2 - 4)

  ctx.font = `11px "JetBrains Mono", monospace`
  ctx.fillStyle = '#7a7a72'
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  ctx.fillText(date.toLowerCase(), stripW / 2, y + captionH - 16)

  return { dataURL: c.toDataURL('image/jpeg', 0.85), width: stripW, height: stripH }
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export default function PhotoBooth({ onClose, onSave }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [frames, setFrames] = useState([])     // [{ src, _img }]
  const [strip, setStrip] = useState(null)     // { dataURL, width, height }
  const [caption, setCaption] = useState('')
  const [error, setError] = useState('')
  const [phase, setPhase] = useState('idle')   // idle | counting | flashing | done
  const [count, setCount] = useState(0)
  const [shotIdx, setShotIdx] = useState(0)

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

  // Rebuild strip when caption changes (after the 3 shots are captured)
  useEffect(() => {
    if (phase !== 'done' || frames.length !== SHOTS) return
    let cancelled = false
    ;(async () => {
      const imgs = await Promise.all(frames.map(async f => ({ ...f, _img: f._img || await loadImage(f.src) })))
      if (cancelled) return
      setStrip(buildStrip(imgs, caption))
    })()
    return () => { cancelled = true }
  }, [phase, frames, caption])

  const captureFrame = () => {
    const v = videoRef.current
    if (!v) return null
    const c = document.createElement('canvas')
    c.width = FRAME_W; c.height = FRAME_H
    const ctx = c.getContext('2d')
    const vw = v.videoWidth || 640
    const vh = v.videoHeight || 480
    const s = Math.min(vw, vh)
    const sx = (vw - s) / 2
    const sy = (vh - s) / 2
    ctx.translate(c.width, 0); ctx.scale(-1, 1)
    ctx.drawImage(v, sx, sy, s, s, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.85)
  }

  const runShot = (n) => {
    setShotIdx(n)
    setPhase('counting')
    setCount(3)
    let c = 3
    const tick = () => {
      c -= 1
      if (c <= 0) {
        setCount(0)
        setPhase('flashing')
        // Hold the flash briefly, then capture
        setTimeout(() => {
          const src = captureFrame()
          if (src) {
            const newFrame = { src }
            setFrames(prev => {
              const next = [...prev, newFrame]
              if (next.length >= SHOTS) {
                setPhase('done')
              } else {
                setTimeout(() => runShot(n + 1), 700)
              }
              return next
            })
          }
        }, 180)
      } else {
        setCount(c)
        setTimeout(tick, 800)
      }
    }
    setTimeout(tick, 800)
  }

  const startStrip = () => {
    setFrames([])
    setStrip(null)
    setCaption('')
    runShot(1)
  }

  const retake = () => {
    setFrames([])
    setStrip(null)
    setCaption('')
    setPhase('idle')
  }

  const download = () => {
    if (!strip) return
    const a = document.createElement('a')
    a.href = strip.dataURL
    a.download = `photobooth-${Date.now()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const save = () => {
    if (!strip) return
    onSave({
      src: strip.dataURL,
      caption: caption.trim() || 'photobooth ✷',
      aspect: strip.width / strip.height,
    })
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
          width: '100%', maxWidth: 440,
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
          fontSize: '1.3rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: '1rem',
        }}>
          {phase === 'done'
            ? 'Looking good 👌'
            : phase === 'idle'
              ? 'Smile — three quick shots'
              : `Shot ${shotIdx} of ${SHOTS}`}
        </h3>

        {/* Preview area */}
        <div style={{
          position: 'relative',
          width: '100%', aspectRatio: '1 / 1',
          background: '#111', borderRadius: 'calc(var(--radius) - 4px)',
          overflow: 'hidden', marginBottom: '0.9rem',
        }}>
          {error ? (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center', padding: '1rem',
              color: '#fff', textAlign: 'center', fontSize: '0.85rem',
            }}>
              {error}
            </div>
          ) : phase === 'done' && strip ? (
            <img src={strip.dataURL} alt="photo strip"
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#111' }} />
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
              {count > 0 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.2)',
                  color: '#fff', fontFamily: 'var(--font-display)',
                  fontSize: '6rem', fontWeight: 800,
                  animation: 'pop-in 0.4s var(--ease) both',
                  textShadow: '0 6px 30px rgba(0,0,0,0.5)',
                }}>
                  {count}
                </div>
              )}
            </>
          )}

          {/* shot indicator dots */}
          {phase !== 'idle' && phase !== 'done' && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              display: 'flex', gap: 5,
            }}>
              {Array.from({ length: SHOTS }).map((_, i) => (
                <span key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: i < frames.length ? '#fff' : 'rgba(255,255,255,0.32)',
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Caption (after capture) */}
        {phase === 'done' && (
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
        )}

        {/* Controls */}
        {!error && (
          phase === 'idle' ? (
            <button
              onClick={startStrip}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '0.75rem', cursor: 'none',
                background: 'var(--accent)', border: 'none',
                borderRadius: 8, color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
              }}
            >
              <CameraIcon size={14} /> start strip (3 shots)
            </button>
          ) : phase === 'done' ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={retake}
                style={{
                  flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 5,
                  padding: '0.6rem 0.8rem', cursor: 'none',
                  background: 'var(--canvas)', border: '1px solid var(--line)',
                  borderRadius: 8, color: 'var(--ink-soft)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                }}
              >
                <RefreshCw size={12} /> retake
              </button>
              <button
                onClick={download}
                disabled={!strip}
                style={{
                  flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 5,
                  padding: '0.6rem 0.8rem', cursor: 'none',
                  background: 'var(--canvas)', border: '1px solid var(--line)',
                  borderRadius: 8, color: 'var(--ink-soft)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                  opacity: strip ? 1 : 0.5,
                }}
              >
                <Download size={12} /> download
              </button>
              <button
                onClick={save}
                disabled={!strip}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  padding: '0.65rem 0.85rem', cursor: 'none',
                  background: 'var(--accent)', border: 'none',
                  borderRadius: 8, color: '#fff',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
                  opacity: strip ? 1 : 0.5,
                }}
              >
                <Check size={13} /> pin
              </button>
            </div>
          ) : (
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--ink-faint)', textAlign: 'center',
              padding: '0.55rem 0',
            }}>
              hold still — capturing {SHOTS - frames.length} more…
            </p>
          )
        )}
      </div>

      {/* Full-screen FLASH overlay */}
      {phase === 'flashing' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#fff', pointerEvents: 'none',
          animation: 'photobooth-flash 0.6s ease-out forwards',
        }} />
      )}
    </div>,
    document.body
  )
}
