import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import FilmEdge from './FilmEdge'

const EASE = [0.16, 1, 0.3, 1]

export default function RoomShell({ number, name, children }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>

      {/* Fixed header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--paper)',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.15rem 1.6rem',
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
              color: 'var(--ink-soft)', letterSpacing: '0.05em',
              textTransform: 'uppercase', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--grease)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
          >
            <ArrowLeft size={12} /> contact sheet
          </button>

          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 500,
            color: 'var(--ink)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            {name}
          </span>

          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
            color: 'var(--ink-faint)', letterSpacing: '0.06em',
            minWidth: 84, textAlign: 'right',
          }}>
            FRAME {number}
          </span>
        </div>
        <FilmEdge orientation="horizontal" count={28} thickness={15} />
      </header>

      {/* Content — zooms in like stepping into the frame */}
      <motion.main
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ paddingTop: '4.5rem' }}
      >
        {children}
      </motion.main>
    </div>
  )
}
