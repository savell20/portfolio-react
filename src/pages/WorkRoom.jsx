import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import RoomShell from '../components/RoomShell'

const EASE = [0.16, 1, 0.3, 1]
const U = (id) => `https://images.unsplash.com/photo-${id}?w=1100&q=80`

const WORK = {
  hubspot: {
    number: '02',
    name: 'HubSpot',
    title: 'Designing for millions, inside the CRM.',
    role: 'UI/UX Designer',
    dates: 'Jan 2025 — Dec 2025',
    tag: 'CRM Platform',
    image: U('1497366754035-f200968a6e72'),
    caption: 'HUBSPOT · PRODUCT DESIGN',
    intro:
      'UI/UX Designer on one of the world’s leading CRM platforms — designing product experiences used daily by sales, marketing, and service teams at scale.',
    body:
      'At HubSpot scale, design is a discipline of restraint. Millions of users meant every change rippled outward, so I learned to ship deliberately: prototype, test against real workflows, and defend each decision with evidence rather than taste alone.',
    notes: [
      'Shipped product surfaces across the sales and service hubs.',
      'Worked inside an established design system — extending patterns, not reinventing them.',
      'Partnered tightly with engineering and PM on scoped, measurable releases.',
    ],
  },
  captura: {
    number: '03',
    name: 'Captura tu mundo',
    title: 'Building a company from nothing.',
    role: 'Founder & Designer',
    dates: 'Jun 2020 — May 2023',
    tag: 'Startup',
    image: U('1452780212940-6f5c0d14d848'),
    caption: 'CAPTURA TU MUNDO · FOUNDER',
    intro:
      'Founded and ran a startup focused on visual storytelling — wearing every hat from designer to founder to builder.',
    body:
      'Captura tu mundo taught me the whole arc: finding the idea, shaping the product, talking to the first users, and keeping it alive. It’s where I learned that design isn’t a department — it’s how you decide what to build and why.',
    notes: [
      'Designed and built the entire product and brand end to end.',
      'Owned strategy, customer conversations, and day-to-day operations.',
      'Learned to make confident calls with incomplete information.',
    ],
  },
}

export default function WorkRoom() {
  const { slug } = useParams()
  const data = WORK[slug]
  if (!data) return <Navigate to="/" replace />

  return (
    <RoomShell number={data.number} name={data.name}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.6rem 6rem' }}>

        {/* Stamps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
        >
          {[data.role, data.dates, data.tag].map(s => (
            <span key={s} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--ink-soft)', letterSpacing: '0.06em',
              border: '1px solid var(--line)', padding: '0.22rem 0.55rem',
              textTransform: 'uppercase',
            }}>
              {s}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.06, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(1.9rem, 4.6vw, 3.2rem)', lineHeight: 1.06,
            letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '2.5rem',
          }}
        >
          {data.title}
        </motion.h1>

        {/* Framed print */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          style={{
            background: 'var(--rebate)', padding: '9px 9px 0',
            boxShadow: '0 22px 44px rgba(22,19,16,0.26)', marginBottom: '3rem',
          }}
        >
          <img
            src={data.image}
            alt={data.name}
            data-loupe
            draggable={false}
            style={{
              width: '100%', display: 'block', aspectRatio: '16/9',
              objectFit: 'cover',
            }}
          />
          <div style={{ padding: '8px 4px 9px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
              color: 'rgba(237,234,225,0.55)', letterSpacing: '0.1em',
            }}>
              {data.caption}
            </span>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontStyle: 'italic',
            lineHeight: 1.5, color: 'var(--ink)', marginBottom: '1.75rem',
          }}
        >
          {data.intro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.85,
            marginBottom: '3rem',
          }}
        >
          {data.body}
        </motion.p>

        {/* Notes — film-frame list */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
            color: 'var(--grease)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}
        >
          Contact notes
        </motion.p>

        <div>
          {data.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: EASE }}
              style={{
                display: 'grid', gridTemplateColumns: '44px 1fr', gap: '1rem',
                padding: '1.1rem 0', borderTop: '1px solid var(--line)',
                alignItems: 'baseline',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--ink-faint)', letterSpacing: '0.04em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                {note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </RoomShell>
  )
}
