import { useState, useRef, useEffect, useCallback } from 'react'
import Connector from './Connector'
import CanvasObject from './CanvasObject'
import Toolbar from './Toolbar'
import ToolDock from './ToolDock'
import EditableSticky from './EditableSticky'
import Polaroid from './Polaroid'
import PhotoBooth from './PhotoBooth'
import PhotoBoothButton from './PhotoBoothButton'
import { playPop } from '../lib/sound'

const MIN = 0.4
const MAX = 2.2
const GRID_UNIT = 26
const STICKY_KEY = 'canvas-stickies-v1'
const STROKE_KEY = 'canvas-strokes-v1'
const POLAROID_KEY = 'canvas-polaroids-v1'

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

// Bottom-center / top-center anchors: every connector enters its target at
// the top-center of the card and leaves its source from the bottom-center
// of the sticky. Single fan-out point on the sticky, single landing point
// per card.
function anchor(side, x, y, w, h, tx, ty) {
  if (side === 'top')    return [x + w / 2, y]
  if (side === 'bottom') return [x + w / 2, y + h]
  if (side === 'left')   return [x, y + h / 2]
  if (side === 'right')  return [x + w, y + h / 2]
  return edgePoint(x + w / 2, y + h / 2, w / 2, h / 2, tx, ty)
}

function strokePath(points) {
  if (!points.length) return ''
  return 'M ' + points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')
}

export default function Canvas({ initialObjects, connectors = [], initialView, renderObject, onActivate }) {
  const [objects, setObjects] = useState(initialObjects)
  const [stickies, setStickies] = useState(() => load(STICKY_KEY, []))
  const [strokes, setStrokes] = useState(() => {
    const loaded = load(STROKE_KEY, [])
    // Strip stray single-point strokes (accidental taps in pen mode).
    const cleaned = Array.isArray(loaded) ? loaded.filter(s => s && Array.isArray(s.points) && s.points.length >= 2) : []
    if (cleaned.length !== (loaded?.length || 0)) save(STROKE_KEY, cleaned)
    return cleaned
  })
  const [polaroids, setPolaroids] = useState(() => load(POLAROID_KEY, []))
  const [view, setView] = useState(initialView || { x: 0, y: 0, scale: 1 })
  const [mode, setMode] = useState('select') // select | sticky | draw
  const [drawColor, setDrawColor] = useState(DRAW_COLORS[0])
  const [editingId, setEditingId] = useState(null)
  const [booth, setBooth] = useState(false)

  const topZ = useRef(initialObjects.length + 50)
  const rootRef = useRef(null)
  const pan = useRef(null)
  const drawing = useRef(null)
  const viewRef = useRef(view)
  viewRef.current = view

  // FigJam-style wheel: plain scroll PANS the canvas; pinch (trackpad sets
  // ctrlKey on wheel events) or ⌘/Ctrl + scroll ZOOMS toward the cursor.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        setView(v => {
          const factor = Math.min(1.4, Math.max(0.7, Math.exp(-e.deltaY * 0.012)))
          const ns = Math.min(MAX, Math.max(MIN, v.scale * factor))
          const k = ns / v.scale
          return {
            scale: ns,
            x: e.clientX - (e.clientX - v.x) * k,
            y: e.clientY - (e.clientY - v.y) * k,
          }
        })
      } else {
        // Scroll to pan. Shift+wheel mice flip deltaY into deltaX
        // automatically, so horizontal scrolling works for free.
        setView(v => ({
          ...v,
          x: v.x - e.deltaX,
          y: v.y - e.deltaY,
        }))
      }
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
        setStrokes(s => {
          // Drop any 1-point "tap" strokes — they render as a stray dot.
          const cleaned = s.filter(st => st.points.length >= 2)
          save(STROKE_KEY, cleaned)
          return cleaned
        })
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
    } else if (id.startsWith('up')) {
      setPolaroids(prev => { const next = prev.map(o => o.id === id ? { ...o, x, y } : o); save(POLAROID_KEY, next); return next })
    } else {
      setObjects(objs => objs.map(o => (o.id === id ? { ...o, x, y } : o)))
    }
  }, [])

  const bringFront = useCallback((id) => {
    topZ.current += 1
    const z = topZ.current
    if (id.startsWith('us')) {
      setStickies(prev => { const next = prev.map(o => o.id === id ? { ...o, z } : o); save(STICKY_KEY, next); return next })
    } else if (id.startsWith('up')) {
      setPolaroids(prev => { const next = prev.map(o => o.id === id ? { ...o, z } : o); save(POLAROID_KEY, next); return next })
    } else {
      setObjects(objs => objs.map(o => (o.id === id ? { ...o, z } : o)))
    }
  }, [])

  const addPolaroid = ({ src, caption, aspect }) => {
    topZ.current += 1
    const v = viewRef.current
    const cx = (window.innerWidth / 2 - v.x) / v.scale
    const cy = (window.innerHeight / 2 - v.y) / v.scale
    const w = 180
    const h = aspect ? Math.round(w / aspect) : 220
    const p = {
      id: 'up' + Date.now(),
      x: cx - w / 2 + (Math.random() - 0.5) * 60,
      y: cy - h / 2 + (Math.random() - 0.5) * 60,
      w, h, z: topZ.current,
      data: { src, caption, rotate: (Math.random() - 0.5) * 8, isStrip: !!aspect && aspect < 0.8 },
    }
    setPolaroids(prev => { const next = [...prev, p]; save(POLAROID_KEY, next); return next })
    setBooth(false)
    playPop()
  }

  const deletePolaroid = (id) => {
    setPolaroids(prev => { const next = prev.filter(o => o.id !== id); save(POLAROID_KEY, next); return next })
  }

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
            const [x1, y1] = anchor(c.fromSide, a.x, a.y, a.w, a.h, bcx, bcy)
            const [x2, y2] = anchor(c.toSide, b.x, b.y, b.w, b.h, acx, acy)
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

        {/* Polaroids */}
        {polaroids.map((obj, i) => (
          <CanvasObject key={obj.id} obj={obj} index={i} scale={view.scale}
            locked={false} mode={mode}
            onMove={moveObj} onFront={bringFront} onActivate={() => {}}>
            <Polaroid
              src={obj.data.src}
              caption={obj.data.caption}
              rotate={obj.data.rotate}
              isStrip={obj.data.isStrip}
              onDelete={() => deletePolaroid(obj.id)}
            />
          </CanvasObject>
        ))}

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

      <PhotoBoothButton onClick={() => setBooth(true)} />

      {booth && <PhotoBooth onClose={() => setBooth(false)} onSave={addPolaroid} />}
    </div>
  )
}
