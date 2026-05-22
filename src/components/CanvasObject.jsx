import { useRef } from 'react'

// Wrapper for objects on the canvas.
// locked  → fixed in place, only detects clicks (used for content cards)
// !locked → draggable, bring-to-front (used for sticky notes)
export default function CanvasObject({ obj, scale, index, locked, onMove, onFront, onActivate, children }) {
  const start = useRef(null)
  const moved = useRef(false)

  const handleDown = (e) => {
    start.current = { sx: e.clientX, sy: e.clientY, ox: obj.x, oy: obj.y }
    moved.current = false
    if (!locked) {
      e.stopPropagation()
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
      onFront(obj.id)
    }
  }

  const handleMove = (e) => {
    if (!start.current) return
    const dx = (e.clientX - start.current.sx) / scale
    const dy = (e.clientY - start.current.sy) / scale
    if (!moved.current && Math.abs(dx) + Math.abs(dy) > 5) moved.current = true
    if (!locked && moved.current) onMove(obj.id, start.current.ox + dx, start.current.oy + dy)
  }

  const handleUp = (e) => {
    if (start.current && !moved.current) onActivate?.(obj.id)
    start.current = null
    if (!locked) {
      try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    }
  }

  return (
    <div
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      style={{
        position: 'absolute',
        left: obj.x, top: obj.y, width: obj.w,
        zIndex: obj.z || 1,
        touchAction: 'none',
        animation: 'rise-in 0.5s var(--ease) both',
        animationDelay: `${0.1 + index * 0.05}s`,
      }}
    >
      {children}
    </div>
  )
}
