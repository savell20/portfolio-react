import { useEffect, useRef, useState } from 'react'

/* Figma-style collaborator cursor. Swaps to a grab / grabbing hand
   whenever the pointer is over any draggable item, across all pages. */
export default function FigmaCursor() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('default') // 'default' | 'grab' | 'grabbing'

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    let isDown = false

    const overGrabbable = (x, y) => {
      // elementFromPoint is more reliable than e.target when the pointer
      // is captured by a dragging element (target stays pinned).
      const el = document.elementFromPoint(x, y)
      return !!(el && el.closest && el.closest('[data-grab]'))
    }

    const updateMode = (x, y) => {
      if (overGrabbable(x, y)) setMode(isDown ? 'grabbing' : 'grab')
      else setMode('default')
    }

    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        const tm = document.body.dataset.toolMode
        ref.current.style.opacity = (tm === 'sticky' || tm === 'draw') ? '0' : '1'
      }
      updateMode(e.clientX, e.clientY)
    }
    const onDown = (e) => { isDown = true; updateMode(e.clientX, e.clientY) }
    const onUp   = (e) => { isDown = false; updateMode(e.clientX, e.clientY) }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100000,
        pointerEvents: 'none', willChange: 'transform',
      }}
    >
      {mode === 'default' ? <ArrowGlyph /> : mode === 'grab' ? <HandOpen /> : <HandClosed />}
    </div>
  )
}

function ArrowGlyph() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none"
      style={{ display: 'block', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.28))' }}>
      <path
        d="M3 2.5L3 19.2L7.6 14.9L10.6 21.6L13.7 20.2L10.9 13.7L17 13.7L3 2.5Z"
        fill="#2F5CFF" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"
      />
    </svg>
  )
}

/* Open-palm "ready to grab" hand — Figma/macOS style: cartoon mitten
   with rounded thumb on the left, four fingers extended up. The tip of
   the middle finger lands at the pointer hotspot. */
function HandOpen() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="none"
      style={{ display: 'block', transform: 'translate(-9px, -2px)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}>
      <path
        d="
          M9 3
          C9 1.9 9.9 1 11 1
          C12.1 1 13 1.9 13 3
          V12

          M13 4
          C13 2.9 13.9 2 15 2
          C16.1 2 17 2.9 17 4
          V13

          M17 5
          C17 3.9 17.9 3 19 3
          C20.1 3 21 3.9 21 5
          V14

          M21 8
          C21 6.9 21.9 6 23 6
          C24.1 6 25 6.9 25 8
          V19
          C25 24 21 28 16 28
          H12
          C8 28 5 26 3.5 22
          L1.5 17
          C1 15.8 1.6 14.5 2.8 14.2
          C3.7 14 4.6 14.4 5 15.2
          L7 19
          V5
          C7 3.9 7.9 3 9 3
          V13
        "
        stroke="#1a1f3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill="#fff"
      />
    </svg>
  )
}

/* Closed-fist "grabbing" hand — same silhouette but fingers curled in. */
function HandClosed() {
  return (
    <svg width="24" height="26" viewBox="0 0 26 28" fill="none"
      style={{ display: 'block', transform: 'translate(-9px, -2px)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.38))' }}>
      <path
        d="
          M5 12
          C5 10.3 6.3 9 8 9
          H19
          C21 9 22 10 22 12
          V20
          C22 24 18 27 14 27
          H12
          C8 27 4 25 3 21
          L1.5 16.5
          C1 15.2 1.7 13.9 3 13.6
          C4 13.4 5 13.9 5.4 14.8
          Z

          M8 9
          V6.5
          C8 5.7 8.7 5 9.5 5
          H11.5
          C12.3 5 13 5.7 13 6.5
          V9

          M13 9
          V5.5
          C13 4.7 13.7 4 14.5 4
          H16.5
          C17.3 4 18 4.7 18 5.5
          V9

          M18 9
          V6.5
          C18 5.7 18.7 5 19.5 5
          H20.5
          C21.3 5 22 5.7 22 6.5
          V9
        "
        stroke="#1a1f3a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill="#FFD166"
      />
    </svg>
  )
}
