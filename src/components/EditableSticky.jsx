import { useState, useRef, useEffect } from 'react'

// A sticky note. Read-only by default so the parent CanvasObject can drag it;
// double-click enters edit mode. Used for both free user stickies and
// (read-only) testimonial notes.
export default function EditableSticky({
  text = '',
  color = 'var(--sticky-yellow)',
  rotate = 0,
  readOnly = false,
  defaultEditing = false,
  footer,
  placeholder = 'type something…',
  onChange,
}) {
  const [editing, setEditing] = useState(defaultEditing)
  const [val, setVal] = useState(text)
  const taRef = useRef(null)

  useEffect(() => { setVal(text) }, [text])
  useEffect(() => {
    if (editing && taRef.current) {
      taRef.current.focus()
      taRef.current.setSelectionRange(val.length, val.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing])

  const finish = () => {
    setEditing(false)
    if (onChange && val !== text) onChange(val)
  }

  return (
    <div
      onDoubleClick={() => { if (!readOnly) setEditing(true) }}
      style={{
        background: color,
        borderRadius: 3,
        padding: '0.9rem 1rem',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
        minHeight: 150,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <textarea
        ref={taRef}
        value={val}
        readOnly={!editing}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
        onBlur={finish}
        onPointerDown={editing ? (e) => e.stopPropagation() : undefined}
        onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); finish() } }}
        rows={1}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'var(--font-hand)',
          fontWeight: 600,
          fontSize: '1.35rem',
          lineHeight: 1.18,
          color: '#2a2a26',
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
  )
}
