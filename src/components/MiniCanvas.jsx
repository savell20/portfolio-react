import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Connector from './Connector'
import CanvasObject from './CanvasObject'
import Toolbar from './Toolbar'
import { clampCanvasView, MIN_SCALE as MIN, MAX_SCALE as MAX, MIN_SCALE_FACTOR, LOST_THRESHOLD } from '../lib/canvasBounds'

const GRID_UNIT = 26

function anchor(side, x, y, w, h, tx, ty) {
  if (side === 'top')    return [x + w / 2, y]
  if (side === 'bottom') return [x + w / 2, y + h]
  if (side === 'left')   return [x, y + h / 2]
  if (side === 'right')  return [x + w, y + h / 2]
  return [x + w / 2, y + h / 2]
}

/* Lightweight Canvas for subpage routes. Pan + zoom; objects with
   `draggable: true` can be moved around (stays in memory only). */
export default function MiniCanvas({ objects: initialObjects, connectors = [], initialView, renderObject, onActivate }) {
  const [objects, setObjects] = useState(initialObjects)
  const [view, setView] = useState(initialView || { x: 0, y: 0, scale: 1 })
  const topZ = useRef(initialObjects.length + 50)
  const rootRef = useRef(null)
  const pan = useRef(null)
  const viewRef = useRef(view)
  viewRef.current = view

  // Don't let the user zoom out past (a little below) the opening view.
  const minScale = (initialView && initialView.scale * MIN_SCALE_FACTOR) || MIN

  const onObjMove = (id, x, y) => {
    setObjects(objs => objs.map(o => (o.id === id ? { ...o, x, y } : o)))
  }
  const onObjFront = (id) => {
    topZ.current += 1
    const z = topZ.current
    setObjects(objs => objs.map(o => (o.id === id ? { ...o, z } : o)))
  }

  // Bounding box of all content — for soft pan bounds + "lost" detection.
  const contentBounds = useMemo(() => {
    if (!objects.length) return null
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    objects.forEach(o => {
      minX = Math.min(minX, o.x)
      minY = Math.min(minY, o.y)
      maxX = Math.max(maxX, o.x + (o.w || 0))
      maxY = Math.max(maxY, o.y + (o.h || 200))
    })
    return { minX, minY, maxX, maxY }
  }, [objects])

  // Soft border: keep KEEP px of content on screen so panning can't drift
  // into an empty void. Horizontal is tighter than vertical.
  const clampView = useCallback(
    (v) => clampCanvasView(v, contentBounds, window.innerWidth, window.innerHeight),
    [contentBounds],
  )

  const lost = useMemo(() => {
    if (!contentBounds) return false
    const vw = window.innerWidth, vh = window.innerHeight
    const left = contentBounds.minX * view.scale + view.x
    const top = contentBounds.minY * view.scale + view.y
    const right = contentBounds.maxX * view.scale + view.x
    const bottom = contentBounds.maxY * view.scale + view.y
    const visW = Math.min(right, vw) - Math.max(left, 0)
    const visH = Math.min(bottom, vh) - Math.max(top, 0)
    return visW < LOST_THRESHOLD || visH < LOST_THRESHOLD
  }, [contentBounds, view])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        setView(v => {
          const factor = Math.min(1.4, Math.max(0.7, Math.exp(-e.deltaY * 0.012)))
          const ns = Math.min(MAX, Math.max(minScale, v.scale * factor))
          const k = ns / v.scale
          return clampView({
            scale: ns,
            x: e.clientX - (e.clientX - v.x) * k,
            y: e.clientY - (e.clientY - v.y) * k,
          })
        })
      } else {
        setView(v => clampView({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!pan.current) return
      const p = pan.current
      setView(v => clampView({ ...v, x: p.ox + (e.clientX - p.sx), y: p.oy + (e.clientY - p.sy) }))
    }
    const onUp = () => { pan.current = null }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRootDown = (e) => {
    const v = viewRef.current
    pan.current = { sx: e.clientX, sy: e.clientY, ox: v.x, oy: v.y }
  }

  const zoomBy = (factor) => setView(v => {
    const ns = Math.min(MAX, Math.max(minScale, v.scale * factor))
    const k = ns / v.scale
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    return clampView({ scale: ns, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k })
  })
  const reset = () => setView(initialView || { x: 0, y: 0, scale: 1 })

  const byId = {}
  objects.forEach(o => { byId[o.id] = o })

  const g = GRID_UNIT * view.scale

  return (
    <div
      ref={rootRef}
      onPointerDown={onRootDown}
      style={{
        position: 'fixed', inset: 0, overflow: 'hidden',
        background: 'var(--canvas)',
        backgroundImage: `radial-gradient(circle, var(--line-strong) ${1.1 * view.scale}px, transparent ${1.1 * view.scale}px)`,
        backgroundSize: `${g}px ${g}px`,
        backgroundPosition: `${view.x}px ${view.y}px`,
        touchAction: 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
        transformOrigin: '0 0',
      }}>
        <svg width="4400" height="4200"
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}>
          {connectors.map((c, i) => {
            const a = byId[c.from]
            const b = byId[c.to]
            if (!a || !b) return null
            const acx = a.x + a.w / 2, acy = a.y + a.h / 2
            const bcx = b.x + b.w / 2, bcy = b.y + b.h / 2
            const [x1, y1] = anchor(c.fromSide, a.x, a.y, a.w, a.h, bcx, bcy)
            const [x2, y2] = anchor(c.toSide, b.x, b.y, b.w, b.h, acx, acy)
            return <Connector key={i} x1={x1} y1={y1} x2={x2} y2={y2} label={c.label} />
          })}
        </svg>

        {objects.map((obj, i) => (
          <CanvasObject
            key={obj.id} obj={obj} index={i} scale={view.scale}
            locked={!obj.draggable} mode="select"
            onMove={onObjMove} onFront={onObjFront}
            onActivate={onActivate || (() => {})}
          >
            {renderObject(obj)}
          </CanvasObject>
        ))}
      </div>

      <Toolbar
        scale={view.scale}
        onZoomIn={() => zoomBy(1.2)}
        onZoomOut={() => zoomBy(1 / 1.2)}
        onReset={reset}
      />

      {/* "Feeling lost?" nudge — appears when almost no content is on screen. */}
      {lost && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', zIndex: 9100,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            background: 'var(--surface)', border: 'var(--border-card)',
            borderRadius: 16, padding: '1.6rem 1.8rem',
            boxShadow: '0 24px 60px rgba(24,24,26,0.22)',
            animation: 'pop-in 0.25s var(--ease) both',
            textAlign: 'center', maxWidth: 320,
          }}
        >
          <span style={{ fontSize: '2rem', lineHeight: 1 }}>🧭</span>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.2,
          }}>
            Feeling lost?
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: -4 }}>
            You’ve wandered off the page. Jump back to where everything is.
          </p>
          <button
            onClick={reset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--accent)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-pill)',
              boxShadow: 'var(--shadow-card)', cursor: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600,
              padding: '0.7rem 1.2rem', marginTop: 4,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
          >
            ← Back to the top
          </button>
        </div>
      )}
    </div>
  )
}
