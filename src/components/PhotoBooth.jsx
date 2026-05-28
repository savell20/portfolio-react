import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Camera as CameraIcon, RefreshCw, Check, Download } from 'lucide-react'

const SHOTS = 3
const FRAME_W = 480
const FRAME_H = 480

// Mac-Photo-Booth-style effects. CSS-filter values apply both to the live
// <video> element and (via ctx.filter) to the captured frames. SVG filters
// drive the geometric distortions (twirl, bulge, dent, x-ray, thermal).
const EFFECTS = [
  { id: 'none',     label: 'Normal',  cssFilter: 'none' },
  { id: 'bw',       label: 'B&W',     cssFilter: 'grayscale(1) contrast(1.08)' },
  { id: 'sepia',    label: 'Sepia',   cssFilter: 'sepia(1) contrast(0.95) brightness(1.05)' },
  { id: 'vintage',  label: 'Vintage', cssFilter: 'sepia(0.55) contrast(1.05) brightness(0.95) saturate(0.7)' },
  { id: 'comic',    label: 'Comic',   cssFilter: 'contrast(1.6) saturate(1.7) brightness(1.05)' },
  { id: 'pop',      label: 'Pop Art', cssFilter: 'saturate(2.5) contrast(1.4) hue-rotate(15deg)' },
  { id: 'glow',     label: 'Glow',    cssFilter: 'brightness(1.25) contrast(0.9) blur(0.6px) saturate(1.5)' },
  { id: 'xray',     label: 'X-Ray',   cssFilter: 'invert(1) grayscale(0.4) contrast(1.4) brightness(0.85)' },
  { id: 'thermal',  label: 'Thermal', cssFilter: 'sepia(1) hue-rotate(180deg) saturate(5) contrast(1.25)' },
  { id: 'pencil',   label: 'Pencil',  cssFilter: 'grayscale(0.7) contrast(1.4) brightness(1.15) saturate(0.5)' },
  // Geometric distortions, via SVG filter url() so they work in both the
  // live preview and ctx.filter during capture in modern browsers.
  { id: 'twirl',    label: 'Twirl',   cssFilter: 'url(#pb-twirl)' },
  { id: 'bulge',    label: 'Bulge',   cssFilter: 'url(#pb-bulge)' },
  { id: 'dent',     label: 'Dent',    cssFilter: 'url(#pb-dent)' },
]

// Inline SVG filter defs reused by every effect. Mounted once inside the
// modal so url(#...) references resolve correctly for the live preview.
function FilterDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        {/* TWIRL, turbulence + displacement gives a soft swirl */}
        <filter id="pb-twirl">
          <feTurbulence type="turbulence" baseFrequency="0.012" numOctaves="2" seed="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="42" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* BULGE, radial gradient pushed through displacement */}
        <filter id="pb-bulge">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="60" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* DENT, same idea, negative scale for inward pinch */}
        <filter id="pb-dent">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="-50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

// Brand colors, pulled from the portfolio's design tokens.
const BRAND_ACCENT = '#2F5CFF'   // var(--accent), primary brand blue
const BRAND_INK = '#18181A'      // var(--ink)
const BRAND_PAPER = '#FAF8F2'    // polaroid cream

// Compose 3 captured frames into a branded vertical photobooth strip.
// Header carries the portfolio mark, an accent stripe runs the full height
// on the left edge, and the footer signs the strip in handwriting.
function buildStrip(frames, caption) {
  const stripW = 380
  const sideMargin = 16
  const accentW = 5
  const headerH = 46
  const photoW = stripW - sideMargin * 2 - accentW - 2
  const photoH = Math.round(photoW * 0.78)
  const gap = 10
  const footerH = 110
  const stripH = headerH + (photoH + gap) * frames.length + footerH

  const c = document.createElement('canvas')
  c.width = stripW
  c.height = stripH
  const ctx = c.getContext('2d')

  // paper background
  ctx.fillStyle = BRAND_PAPER
  ctx.fillRect(0, 0, stripW, stripH)

  // left accent stripe (full height)
  ctx.fillStyle = BRAND_ACCENT
  ctx.fillRect(0, 0, accentW, stripH)

  // header, brand mark in ink, accent dot, small mono URL
  ctx.fillStyle = BRAND_INK
  ctx.font = `700 16px "Schibsted Grotesk", system-ui, sans-serif`
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('Santiago Avella', accentW + sideMargin, headerH / 2)
  // accent dot
  ctx.fillStyle = BRAND_ACCENT
  ctx.beginPath()
  ctx.arc(accentW + sideMargin + 132, headerH / 2 + 1, 2.6, 0, Math.PI * 2)
  ctx.fill()
  // url, right-aligned
  ctx.fillStyle = '#7a7a72'
  ctx.font = `9.5px "JetBrains Mono", monospace`
  ctx.textAlign = 'right'
  ctx.fillText('SANTIAGOAVELLA.COM', stripW - sideMargin, headerH / 2)

  // divider under header
  ctx.fillStyle = '#e0ddd2'
  ctx.fillRect(accentW + sideMargin, headerH - 1, photoW + 2, 1)

  // photos
  let y = headerH + 4
  for (const f of frames) {
    ctx.fillStyle = '#111'
    ctx.fillRect(accentW + sideMargin, y, photoW, photoH)
    const img = f._img
    if (img) {
      const ratio = img.width / img.height
      const target = photoW / photoH
      let sx = 0, sy = 0, sw = img.width, sh = img.height
      if (ratio > target) { sw = img.height * target; sx = (img.width - sw) / 2 }
      else { sh = img.width / target; sy = (img.height - sh) / 2 }
      ctx.drawImage(img, sx, sy, sw, sh, accentW + sideMargin, y, photoW, photoH)
    }
    y += photoH + gap
  }

  // caption, Caveat handwriting in ink
  ctx.fillStyle = BRAND_INK
  ctx.font = `400 32px "Caveat", cursive`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(caption || 'photobooth ✷', stripW / 2, y + 28)

  // accent underline beneath caption
  const txtMetrics = ctx.measureText(caption || 'photobooth ✷')
  const underlineW = Math.min(txtMetrics.width + 28, photoW - 30)
  ctx.fillStyle = BRAND_ACCENT
  ctx.fillRect((stripW - underlineW) / 2, y + 50, underlineW, 2)

  // footer row: mono date on the left, "snapped on the canvas" on the right
  ctx.font = `10px "JetBrains Mono", monospace`
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#7a7a72'
  ctx.textAlign = 'left'
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  ctx.fillText(date.toUpperCase(), accentW + sideMargin, y + 80)
  ctx.textAlign = 'right'
  ctx.fillStyle = BRAND_ACCENT
  ctx.fillText('SNAPPED ON THE CANVAS', stripW - sideMargin, y + 80)

  return { dataURL: c.toDataURL('image/jpeg', 0.88), width: stripW, height: stripH }
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
  const [effect, setEffect] = useState(EFFECTS[0])

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
    // Bake the chosen effect into the captured frame. SVG-url filters
    // resolve fine in Chromium / WebKit; if a browser doesn't support
    // ctx.filter for them, the live preview still has the look.
    try { ctx.filter = effect.cssFilter } catch { /* noop */ }
    ctx.translate(c.width, 0); ctx.scale(-1, 1)
    ctx.drawImage(v, sx, sy, s, s, 0, 0, c.width, c.height)
    ctx.filter = 'none'
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
              ? 'Smile, three quick shots'
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
                  filter: effect.cssFilter,
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

          {/* Current effect chip in the corner */}
          {!error && phase !== 'done' && effect.id !== 'none' && (
            <span style={{
              position: 'absolute', top: 10, right: 10,
              padding: '0.2rem 0.55rem', borderRadius: 999,
              background: 'rgba(0,0,0,0.55)', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              {effect.label}
            </span>
          )}
        </div>

        {/* Effects picker, Mac Photo Booth-style. Hidden once shots start. */}
        {!error && (phase === 'idle' || phase === 'done') && (
          <>
            <FilterDefs />
            <div style={{
              display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6,
              marginBottom: '0.8rem',
              scrollbarWidth: 'thin',
            }}>
              {EFFECTS.map(ef => {
                const active = ef.id === effect.id
                return (
                  <button
                    key={ef.id}
                    onClick={() => setEffect(ef)}
                    onPointerDown={e => e.stopPropagation()}
                    title={ef.label}
                    style={{
                      flex: '0 0 auto', cursor: 'none',
                      padding: '0.35rem 0.7rem',
                      borderRadius: 'var(--radius-pill)',
                      background: active ? 'var(--accent)' : 'var(--canvas)',
                      color: active ? '#fff' : 'var(--ink-soft)',
                      border: active ? '1px solid var(--accent)' : '1px solid var(--line)',
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      fontWeight: 500, letterSpacing: '0.04em',
                      transition: 'background 0.15s, color 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ef.label}
                  </button>
                )
              })}
            </div>
          </>
        )}

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
              hold still, capturing {SHOTS - frames.length} more…
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
