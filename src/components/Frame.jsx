import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Irregular hand-drawn "grease pencil" oval — drawn around a select.
const GREASE_PATH =
  'M40,14 C90,4 168,6 196,20 C220,32 218,78 204,98 C190,116 96,124 48,116 C14,110 4,76 8,46 C11,24 22,18 40,14'

export default function Frame({ frame, index }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.09, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(frame.to)}
      style={{ position: 'relative', cursor: 'none' }}
    >
      {/* Grease-pencil select mark */}
      <svg
        viewBox="0 0 224 132"
        preserveAspectRatio="none"
        style={{
          position: 'absolute', inset: '-14px', width: 'calc(100% + 28px)',
          height: 'calc(100% + 28px)', pointerEvents: 'none', zIndex: 3,
          overflow: 'visible',
        }}
      >
        <motion.path
          d={GREASE_PATH}
          fill="none"
          stroke="var(--grease)"
          strokeWidth={3.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{
            pathLength: { duration: 0.55, ease: EASE },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>

      {/* Film frame — rebate border */}
      <motion.div
        animate={{ scale: hovered ? 1.035 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          background: 'var(--rebate)',
          padding: '7px 7px 0',
          boxShadow: hovered
            ? '0 22px 44px rgba(22,19,16,0.34)'
            : '0 8px 20px rgba(22,19,16,0.16)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Exposure (image) */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '5/4' }}>
          <img
            src={frame.image}
            alt={frame.label}
            draggable={false}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: hovered
                ? 'saturate(1) brightness(1) contrast(1)'
                : 'saturate(0.12) brightness(0.84) contrast(0.92)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'filter 0.55s ease, transform 0.55s ' +
                'cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          {/* Frame index — printed in the rebate corner */}
          <span style={{
            position: 'absolute', top: 6, left: 7,
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500,
            color: hovered ? 'var(--grease)' : 'rgba(237,234,225,0.55)',
            letterSpacing: '0.06em', transition: 'color 0.3s ease',
            mixBlendMode: 'screen',
          }}>
            ▸{frame.number}
          </span>
        </div>

        {/* Rebate footer — label */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 4px 8px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 500,
            color: 'var(--paper)', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {frame.label}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            color: 'rgba(237,234,225,0.4)', letterSpacing: '0.04em',
          }}>
            {frame.meta}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
