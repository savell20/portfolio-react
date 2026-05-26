import { useEffect, useRef, useState } from 'react'

// A Figma-style collaborator cursor: arrow + name tag, tracks the pointer.
export default function FigmaCursor() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`
        // Hide the blue arrow whenever a tool ghost is taking its place.
        const tm = document.body.dataset.toolMode
        ref.current.style.opacity = (tm === 'sticky' || tm === 'draw') ? '0' : '1'
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
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
      {/* Arrow */}
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none"
        style={{ display: 'block', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.28))' }}>
        <path
          d="M3 2.5L3 19.2L7.6 14.9L10.6 21.6L13.7 20.2L10.9 13.7L17 13.7L3 2.5Z"
          fill="#2F5CFF" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
