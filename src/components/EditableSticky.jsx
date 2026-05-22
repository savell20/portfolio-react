import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

// A sticky note. `editing` is controlled by the parent (Canvas owns which
// sticky is being edited) so a single click can open it without fighting
// the drag detection. Read-only variant is used for testimonials.
export default function EditableSticky({
  text = '',
  color = 'var(--sticky-yellow)',
  rotate = 0,
  editing = false,
  readOnly = false,
  footer,
  placeholder = 'click to write…',
  onChange,
  onBlur,
  onDelete,
}) {
  const [val, setVal] = useState(text)
  const [hover, setHover] = useState(false)
  const taRef = useRef(null)

  useEffect(() => { setVal(text) }, [text])
  useEffect(() => {
    if (!editing) return
    const ta = taRef.current
    if (!ta) return
    ta.focus()
    ta.setSelectionRange(ta.value.length, ta.value.length)
  }, [editing])

  const finish = () => {
    if (onChange) onChange(val)
    if (onBlur) onBlur()
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', transform: `rotate(${rotate}deg)` }}
    >
      <div style={{
        background: color, borderRadius: 3,
        padding: '0.9rem 1rem',
        boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
        minHeight: 150, width: '100%',
        display: 'flex', flexDirection: 'column',
      }}>
        <textarea
          ref={taRef}
          value={val}
          readOnly={!editing}
          placeholder={readOnly ? '' : placeholder}
          onChange={(e) => setVal(e.target.value)}
          onBlur={finish}
          onPointerDown={editing ? (e) => e.stopPropagation() : undefined}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); e.target.blur() } }}
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            resize: 'none', fontFamily: 'var(--font-hand)', fontWeight: 600,
            fontSize: '1.35rem', lineHeight: 1.18, color: '#2a2a26',
            cursor: editing ? 'text' : 'inherit',
            pointerEvents: editing ? 'auto' : 'none',
          }}
        />
        {footer && (
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
            color: '#5a5a52', marginTop: '0.5rem', letterSpacing: '0.02em',
          }}>
            {footer}
          </p>
        )}
      </div>

      {onDelete && hover && !editing && (
        <button
          title="Delete note"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onDelete}
          style={{
            position: 'absolute', top: -9, right: -9,
            width: 22, height: 22, borderRadius: '50%', border: 'none',
            cursor: 'none', background: 'var(--ink)', color: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <X size={12} />
        </button>
      )}
    </div>
  )
}
