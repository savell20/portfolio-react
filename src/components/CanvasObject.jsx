import { useRef, useState } from 'react'

// Wrapper for objects on the canvas.
// In 'select' mode: locked objects detect clicks; unlocked objects drag.
// In any other mode (sticky/draw): fully inert so events reach the canvas.
export default function CanvasObject({ obj, scale, index, locked, mode = 'select', onMove, onFront, onActivate, children }) {
  const start = useRef(null)
  const moved = useRef(false)
  const [dragging, setDragging] = useState(false)

  const active = mode === 'select'
  const grabbable = active && !locked

  const handleDown = (e) => {
    if (!active) return
    start.current = { sx: e.clientX, sy: e.clientY, ox: obj.x, oy: obj.y }
    moved.current = false
    if (!locked) {
      e.stopPropagation()
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
      onFront(obj.id)
      setDragging(true)
    }
  }

  const handleMove = (e) => {
    if (!active || !start.current) return
    const dx = (e.clientX - start.current.sx) / scale
    const dy = (e.clientY - start.current.sy) / scale
    if (!moved.current && Math.abs(dx) + Math.abs(dy) > 5) moved.current = true
    if (!locked && moved.current) onMove(obj.id, start.current.ox + dx, start.current.oy + dy)
  }

  const handleUp = (e) => {
    if (!active) return
    if (start.current && !moved.current) onActivate?.(obj.id)
    start.current = null
    setDragging(false)
    if (!locked) {
      try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* noop */ }
    }
  }

  return (
    <div
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      {...(grabbable ? { 'data-grab': '' } : {})}
      {...(!grabbable && obj.to ? { 'data-clickable': '' } : {})}
      style={{
        position: 'absolute',
        left: obj.x, top: obj.y, width: obj.w,
        zIndex: obj.z || 1,
        touchAction: 'none',
        cursor: grabbable ? (dragging ? 'grabbing' : 'grab') : undefined,
        animation: 'rise-in 0.5s var(--ease) both',
        animationDelay: `${0.1 + Math.min(index, 8) * 0.05}s`,
      }}
    >
      {children}
    </div>
  )
}
