import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Plus, X } from 'lucide-react'
import EditableSticky from './EditableSticky'
import { supabase } from '../lib/supabase'
import { playPop } from '../lib/sound'

const LS_KEY = 'testimonials-local-v1'
const COLORS = ['var(--sticky-yellow)', 'var(--sticky-pink)', 'var(--sticky-blue)', 'var(--sticky-mint)']

function readLocal() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}

async function fetchAll() {
  if (supabase) {
    const { data, error } = await supabase
      .from('testimonials').select('*').order('created_at', { ascending: true })
    if (!error && data) return data
  }
  return readLocal()
}

async function insertOne(t) {
  if (supabase) {
    const { data, error } = await supabase.from('testimonials').insert(t).select().single()
    if (!error && data) return data
  }
  const row = { ...t, id: 'local-' + Date.now() }
  const all = readLocal()
  all.push(row)
  localStorage.setItem(LS_KEY, JSON.stringify(all))
  return row
}

function Field({ label, textarea, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: '0.9rem' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink-faint)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        {label}
      </span>
      {textarea
        ? <textarea {...props} style={fieldStyle(true)} />
        : <input {...props} style={fieldStyle(false)} />}
    </label>
  )
}
function fieldStyle(area) {
  return {
    width: '100%', marginTop: 4, padding: '0.55rem 0.7rem',
    background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 8,
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink)',
    outline: 'none', resize: area ? 'vertical' : 'none',
    minHeight: area ? 76 : undefined,
  }
}

export default function TestimonialWall() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', message: '' })
  const [busy, setBusy] = useState(false)

  useEffect(() => { fetchAll().then(setItems) }, [])

  const submit = async () => {
    if (!form.name.trim() || !form.message.trim() || busy) return
    setBusy(true)
    const row = {
      name: form.name.trim(),
      role: form.role.trim(),
      message: form.message.trim(),
      color: COLORS[items.length % COLORS.length],
    }
    const saved = await insertOne(row)
    setItems(prev => [...prev, saved])
    playPop()
    setForm({ name: '', role: '', message: '' })
    setBusy(false)
    setOpen(false)
  }

  return (
    <div style={{
      background: 'var(--surface)', border: 'var(--border-card)',
      borderRadius: 'var(--radius)', padding: '1.75rem 1.9rem 2rem',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent)',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            # the wall
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem',
            letterSpacing: '-0.02em', color: 'var(--ink)',
          }}>
            Worked with me? Pin a note.
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginTop: '0.35rem' }}>
            Past teammates, clients, collaborators — leave an honest word.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          onPointerDown={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'none',
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 9, padding: '0.6rem 0.95rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
          }}
        >
          <Plus size={14} /> leave a testimonial
        </button>
      </div>

      {/* Stickies */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.1rem', marginTop: '1.75rem' }}>
        {items.length === 0 && (
          <p style={{
            fontFamily: 'var(--font-hand)', fontSize: '1.5rem', color: 'var(--ink-faint)',
            padding: '1rem 0',
          }}>
            be the first to pin one ✎
          </p>
        )}
        {items.map((t, idx) => (
          <div key={t.id} style={{ width: 224, transform: `rotate(${(idx % 2 ? 1 : -1) * (1.5 + (idx % 3))}deg)` }}>
            <EditableSticky
              readOnly
              text={t.message}
              color={t.color || COLORS[idx % COLORS.length]}
              footer={`— ${t.name}${t.role ? ' · ' + t.role : ''}`}
            />
          </div>
        ))}
      </div>

      {/* Add modal — portaled to body so position:fixed escapes the
          canvas's transformed layer */}
      {open && createPortal(
        <div
          onPointerDown={e => e.stopPropagation()}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: 'rgba(24,24,26,0.55)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 420, background: 'var(--surface)',
              border: '1px solid var(--line)', borderRadius: 16, padding: '1.6rem 1.7rem',
              boxShadow: '0 30px 70px rgba(0,0,0,0.35)', position: 'relative',
              animation: 'pop-in 0.3s var(--ease) both',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 14, right: 14, cursor: 'none',
                background: 'var(--canvas)', border: '1px solid var(--line)',
                width: 28, height: 28, borderRadius: '50%', color: 'var(--ink-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={13} />
            </button>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem',
              color: 'var(--ink)', marginBottom: '1.25rem',
            }}>
              Leave a testimonial
            </h3>
            <Field label="Your name" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} maxLength={40} />
            <Field label="Role / where (optional)" value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))} maxLength={48} />
            <Field label="What was it like working with me?" textarea value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))} maxLength={220} />
            <button
              onClick={submit}
              disabled={busy || !form.name.trim() || !form.message.trim()}
              style={{
                width: '100%', cursor: 'none', border: 'none', borderRadius: 9,
                padding: '0.7rem', marginTop: '0.3rem',
                background: 'var(--accent)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontSize: '0.76rem', fontWeight: 500,
                opacity: (busy || !form.name.trim() || !form.message.trim()) ? 0.5 : 1,
              }}
            >
              {busy ? 'pinning…' : 'pin it to the wall'}
            </button>
            {!supabase && (
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                color: 'var(--ink-faint)', marginTop: '0.8rem', textAlign: 'center',
              }}>
                saved locally — connect Supabase to share it with everyone
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
