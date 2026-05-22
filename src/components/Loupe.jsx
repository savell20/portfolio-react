import { useEffect, useRef } from 'react'

const LENS = 116      // magnifier diameter (px)
const ZOOM = 2.3      // magnification factor
const RING = 13       // idle ring diameter

export default function Loupe() {
  const lensRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const target = useRef(null)   // currently hovered [data-loupe] <img>

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const paintLens = () => {
      const lens = lensRef.current
      const img = target.current
      if (!lens) return
      if (!img) {
        lens.style.opacity = '0'
        return
      }
      const r = img.getBoundingClientRect()
      const fx = (pos.current.x - r.left) / r.width
      const fy = (pos.current.y - r.top) / r.height
      if (fx < 0 || fx > 1 || fy < 0 || fy > 1) {
        lens.style.opacity = '0'
        return
      }
      const bgW = r.width * ZOOM
      const bgH = r.height * ZOOM
      lens.style.opacity = '1'
      lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`
      lens.style.backgroundSize = `${bgW}px ${bgH}px`
      lens.style.backgroundPosition =
        `${-(fx * bgW - LENS / 2)}px ${-(fy * bgH - LENS / 2)}px`
      lens.style.left = `${pos.current.x}px`
      lens.style.top = `${pos.current.y}px`
    }

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const t = e.target
      const loupeEl = t && t.closest ? t.closest('[data-loupe]') : null
      const img = loupeEl
        ? (loupeEl.tagName === 'IMG' ? loupeEl : loupeEl.querySelector('img'))
        : null
      target.current = img
      if (ringRef.current) {
        ringRef.current.style.opacity = img ? '0' : '1'
      }
      paintLens()
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      raf = requestAnimationFrame(animate)
    }
    let raf = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Idle ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', width: RING, height: RING,
          border: '1.5px solid var(--ink)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-50%,-50%)',
          transition: 'opacity 0.2s ease',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Magnifier lens */}
      <div
        ref={lensRef}
        style={{
          position: 'fixed', width: LENS, height: LENS,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-50%,-50%)',
          opacity: 0,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'var(--paper)',
          border: '3px solid var(--rebate)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.5) inset, 0 18px 40px rgba(22,19,16,0.45)',
        }}
      />
    </>
  )
}
