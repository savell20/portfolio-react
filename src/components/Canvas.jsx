import { useState, useRef, useEffect, useCallback } from 'react'
import Connector from './Connector'
import CanvasObject from './CanvasObject'
import Toolbar from './Toolbar'
import ToolDock from './ToolDock'
import EditableSticky from './EditableSticky'
import TestimonialWall from './TestimonialWall'
import { playPop } from '../lib/sound'

const MIN = 0.4
const MAX = 2.2
const GRID_UNIT = 26
const STICKY_KEY = 'canvas-stickies-v1'
const STROKE_KEY = 'canvas-strokes-v1'

const STICKY_COLORS = [
  'var(--sticky-yellow)', 'var(--sticky-pink)',
  'var(--sticky-blue)', 'var(--sticky-mint)',
]
export const DRAW_COLORS = ['#2F5CFF', '#E8551E', '#1F8A6E', '#18181A']

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* noop */ }
}

function edgePoint(cx, cy, hw, hh, tx, ty) {
  const dx = tx - cx
  const dy = ty - cy
  if (dx === 0 && dy === 0) return [cx, cy]
  const s = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh)
  return [cx + dx * s, cy + dy * s]
}

function strokePath(points) {
  if (!points.length) return ''
  return 'M ' + points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')
}

export default function Canvas({ initialObjects, connectors = [], initialView, renderObject, onActivate }) {
  const [objects, setObjects] = useState(initialObjects)
  const [stickies, setStickies] = useState(() => load(STICKY_KEY, []))
  const [strokes, setStrokes] = useState(() => load(STROKE_KEY, []))
  const [view, setView] = useState(initialView || { x: 0, y: 0, scale: 1 })
  const [mode, setMode] = useState('select') // select | sticky | draw
  const [drawColor, setDrawColor] = useState(DRAW_COLORS[0])
  const [editingId, setEditingId] = useState(null)

  const topZ = useRef(initialObjects.length + 50)
  const rootRef = useRef(null)
  const pan = useRef(null)
  const drawing = useRef(null)
  const viewRef = useRef(view)
  viewRef.current = view

  // Wheel zoom — gentle, toward cursor.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      setView(v => {
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

  // Window-level move/up — handles both panning and freehand drawing.
  useEffect(() => {
    const onMove = (e) => {
      if (pan.current) {
        const p = pan.current
        setView(v => ({ ...v, x: p.ox + (e.clientX - p.sx), y: p.oy + (e.clientY - p.sy) }))
      } else if (drawing.current) {
        const v = viewRef.current
        drawing.current.points.push({
          x: (e.clientX - v.x) / v.scale,
          y: (e.clientY - v.y) / v.scale,
        })
        setStrokes(s => {
          const ns = s.slice()
          ns[ns.length - 1] = { ...drawing.current, points: drawing.current.points.slice() }
          return ns
        })
      }
    }
    const onUp = () => {
      pan.current = null
      if (drawing.current) {
        drawing.current = null
        setStrokes(s => { save(STROKE_KEY, s); return s })
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  const onRootDown = (e) => {
    const v = viewRef.current
    const cx = (e.clientX - v.x) / v.scale
    const cy = (e.clientY - v.y) / v.scale

    if (mode === 'draw') {
      const stroke = { id: 's' + Date.now(), color: drawColor, w: 3, points: [{ x: cx, y: cy }] }
      drawing.current = stroke
      setStrokes(s => [...s, stroke])
    } else if (mode === 'sticky') {
      addSticky(cx - 95, cy - 80)
      setMode('select')
    } else {
      pan.current = { sx: e.clientX, sy: e.clientY, ox: v.x, oy: v.y }
    }
  }

  const addSticky = (x, y) => {
    topZ.current += 1
    const s = {
      id: 'us' + Date.now(),
      type: 'usersticky',
      x, y, w: 190, h: 165, z: topZ.current,
      data: {
        text: '',
        color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
        rotate: (Math.random() - 0.5) * 10,
      },
    }
    setStickies(prev => { const next = [...prev, s]; save(STICKY_KEY, next); return next })
    setEditingId(s.id)
    playPop()
  }

  const deleteSticky = (id) => {
    setStickies(prev => { const next = prev.filter(o => o.id !== id); save(STICKY_KEY, next); return next })
    setEditingId(eid => (eid === id ? null : eid))
  }

  const moveObj = useCallback((id, x, y) => {
    if (id.startsWith('us')) {
      setStickies(prev => { const next = prev.map(o => o.id === id ? { ...o, x, y } : o); save(STICKY_KEY, next); return next })
    } else {
      setObjects(objs => objs.map(o => (o.id === id ? { ...o, x, y } : o)))
    }
  }, [])

  const bringFront = useCallback((id) => {
    topZ.current += 1
    const z = topZ.current
    if (id.startsWith('us')) {
      setStickies(prev => { const next = prev.map(o => o.id === id ? { ...o, z } : o); save(STICKY_KEY, next); return next })
    } else {
      setObjects(objs => objs.map(o => (o.id === id ? { ...o, z } : o)))
    }
  }, [])

  const editSticky = (id, text) => {
    setStickies(prev => {
      const next = prev.map(o => o.id === id ? { ...o, data: { ...o.data, text } } : o)
      save(STICKY_KEY, next)
      return next
    })
  }

  const clearDrawing = () => { setStrokes([]); save(STROKE_KEY, []) }

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

  const g = GRID_UNIT * view.scale
  const cursor = mode === 'draw' ? 'crosshair' : mode === 'sticky' ? 'copy' : 'default'

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
        cursor,
      }}
    >
      {/* Content layer — panned & zoomed */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
        transformOrigin: '0 0',
      }}>
        {/* Connectors */}
        <svg width="4400" height="4200"
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}>
          {connectors.map((c, i) => {
            const a = byId[c.from]
            const b = byId[c.to]
            if (!a || !b) return null
            const acx = a.x + a.w / 2, acy = a.y + a.h / 2
            const bcx = b.x + b.w / 2, bcy = b.y + b.h / 2
            const [x1, y1] = edgePoint(acx, acy, a.w / 2, a.h / 2, bcx, bcy)
            const [x2, y2] = edgePoint(bcx, bcy, b.w / 2, b.h / 2, acx, acy)
            return <Connector key={i} x1={x1} y1={y1} x2={x2} y2={y2} label={c.label} />
          })}
          {/* Drawings */}
          {strokes.map(s => (
            <path key={s.id} d={strokePath(s.points)} fill="none"
              stroke={s.color} strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>

        {/* Static objects */}
        {objects.map((obj, i) => (
          <CanvasObject key={obj.id} obj={obj} index={i} scale={view.scale}
            locked={!obj.draggable} mode={mode}
            onMove={moveObj} onFront={bringFront} onActivate={onActivate}>
            {renderObject(obj)}
          </CanvasObject>
        ))}

        {/* User stickies */}
        {stickies.map((obj, i) => (
          <CanvasObject key={obj.id} obj={obj} index={i} scale={view.scale}
            locked={false} mode={mode}
            onMove={moveObj} onFront={bringFront} onActivate={setEditingId}>
            <EditableSticky
              text={obj.data.text}
              color={obj.data.color}
              rotate={obj.data.rotate}
              editing={editingId === obj.id}
              placeholder="click to write…"
              onChange={(t) => editSticky(obj.id, t)}
              onBlur={() => setEditingId(null)}
              onDelete={() => deleteSticky(obj.id)}
            />
          </CanvasObject>
        ))}

        {/* Testimonial wall */}
        <div style={{ position: 'absolute', left: 476, top: 1300, width: 1040 }}>
          <TestimonialWall />
        </div>
      </div>

      <Toolbar
        scale={view.scale}
        onZoomIn={() => zoomBy(1.2)}
        onZoomOut={() => zoomBy(1 / 1.2)}
        onReset={reset}
      />

      <ToolDock
        mode={mode}
        setMode={setMode}
        drawColor={drawColor}
        setDrawColor={setDrawColor}
        onClearDrawing={clearDrawing}
      />
    </div>
  )
}
