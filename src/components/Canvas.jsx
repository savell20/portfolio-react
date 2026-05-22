import { useState, useRef, useEffect, useCallback } from 'react'
import Connector from './Connector'
import CanvasObject from './CanvasObject'
import Toolbar from './Toolbar'

const MIN = 0.4
const MAX = 2.2

// Point where the line from a box center toward a target crosses the box edge.
function edgePoint(cx, cy, hw, hh, tx, ty) {
  const dx = tx - cx
  const dy = ty - cy
  if (dx === 0 && dy === 0) return [cx, cy]
  const s = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh)
  return [cx + dx * s, cy + dy * s]
}

export default function Canvas({ initialObjects, connectors = [], initialView, renderObject, onActivate }) {
  const [objects, setObjects] = useState(initialObjects)
  const [view, setView] = useState(initialView || { x: 0, y: 0, scale: 1 })
  const topZ = useRef(initialObjects.length + 1)
  const rootRef = useRef(null)
  const pan = useRef(null)

  // Wheel zoom — toward cursor.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      setView(v => {
        // Gentle, proportional zoom — damped so trackpads don't fly.
        const factor = Math.min(1.25, Math.max(0.8, Math.exp(-e.deltaY * 0.001)))
        const ns = Math.min(MAX, Math.max(MIN, v.scale * factor))
        const k = ns / v.scale
        return {
          scale: ns,
          x: e.clientX - (e.clientX - v.x) * k,
          y: e.clientY - (e.clientY - v.y) * k,
        }
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Pan — window-level so the gesture survives leaving any element.
  useEffect(() => {
    const onMove = (e) => {
      if (!pan.current) return
      const p = pan.current
      setView(v => ({ ...v, x: p.ox + (e.clientX - p.sx), y: p.oy + (e.clientY - p.sy) }))
    }
    const onUp = () => { pan.current = null }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const onRootDown = (e) => {
    pan.current = { sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y }
  }

  const moveObj = useCallback((id, x, y) => {
    setObjects(objs => objs.map(o => (o.id === id ? { ...o, x, y } : o)))
  }, [])

  const bringFront = useCallback((id) => {
    topZ.current += 1
    const z = topZ.current
    setObjects(objs => objs.map(o => (o.id === id ? { ...o, z } : o)))
  }, [])

  const zoomBy = (factor) => setView(v => {
    const ns = Math.min(MAX, Math.max(MIN, v.scale * factor))
    const k = ns / v.scale
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    return { scale: ns, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k }
  })
  const reset = () => setView(initialView || { x: 0, y: 0, scale: 1 })

  const byId = {}
  objects.forEach(o => { byId[o.id] = o })

  return (
    <div
      ref={rootRef}
      onPointerDown={onRootDown}
      style={{
        position: 'fixed', inset: 0, overflow: 'hidden',
        background: 'var(--canvas)',
        backgroundImage: 'radial-gradient(circle, var(--line-strong) 1.1px, transparent 1.1px)',
        backgroundSize: `${22 * view.scale}px ${22 * view.scale}px`,
        backgroundPosition: `${view.x}px ${view.y}px`,
        touchAction: 'none',
      }}
    >
      {/* Content layer — panned & zoomed */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
        transformOrigin: '0 0',
      }}>
        {/* Connectors */}
        <svg
          width="4400" height="3000"
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}
        >
          {connectors.map((c, i) => {
            const a = byId[c.from]
            const b = byId[c.to]
            if (!a || !b) return null
            const acx = a.x + a.w / 2
            const acy = a.y + a.h / 2
            const bcx = b.x + b.w / 2
            const bcy = b.y + b.h / 2
            const [x1, y1] = edgePoint(acx, acy, a.w / 2, a.h / 2, bcx, bcy)
            const [x2, y2] = edgePoint(bcx, bcy, b.w / 2, b.h / 2, acx, acy)
            return <Connector key={i} x1={x1} y1={y1} x2={x2} y2={y2} label={c.label} />
          })}
        </svg>

        {/* Objects */}
        {objects.map((obj, i) => (
          <CanvasObject
            key={obj.id}
            obj={obj}
            index={i}
            scale={view.scale}
            locked={!obj.draggable}
            onMove={moveObj}
            onFront={bringFront}
            onActivate={onActivate}
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
    </div>
  )
}
