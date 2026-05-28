import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, AwardCard, StickyNote, PhotoPrint } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, labelYAfter, moduleYAfterLabel, pageInitialView } from '../lib/layout'

/* /testimonials = RECOGNITION: awards + testimonials + conference photos.
   Spacing follows the shared design system. */
const AWARD_H = 130
const STICKY_H = 200
const CONF_H = 230

const AWARDS_LABEL = FIRST_MODULE_Y
const AWARDS_ROW   = moduleYAfterLabel(AWARDS_LABEL)
const TEST_LABEL   = labelYAfter(AWARDS_ROW + AWARD_H)
const TEST_ROW     = moduleYAfterLabel(TEST_LABEL)
const CONF_LABEL   = labelYAfter(TEST_ROW + STICKY_H)
const CONF_ROW     = moduleYAfterLabel(CONF_LABEL)

const OBJECTS = [
  // Hero
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# awards & recognition',
      title: 'Awards, kind words, talks.',
      blurb: 'A little wall of the recognition I’ve been lucky to get, plus the places I’ve been invited to talk.',
    } },

  // ─── Section 1: AWARDS ───
  { id: 'sec-awards', type: 'section-label', x: PAGE.X, y: AWARDS_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '01', title: 'Awards I’ve won' } },
  { id: 'award-1', type: 'award', x: PAGE.X,                                       y: AWARDS_ROW, w: 280, h: AWARD_H,
    data: { icon: 'trophy', title: 'Site of the Day', org: 'Awwwards', year: '2024', rotate: -2 } },
  { id: 'award-2', type: 'award', x: PAGE.X + 300,                                 y: AWARDS_ROW, w: 280, h: AWARD_H,
    data: { icon: 'award', title: 'Best UX · Fintech', org: 'CSS Design Awards', year: '2024', rotate: 1 } },
  { id: 'award-3', type: 'award', x: PAGE.X + 600,                                 y: AWARDS_ROW, w: 280, h: AWARD_H,
    data: { icon: 'star', title: 'Design Excellence Award', org: 'SCAD · Service Design', year: '2025', rotate: -1 } },

  // ─── Section 2: VOLUNTEER & TEAMMATE TESTIMONIALS ───
  { id: 'sec-test', type: 'section-label', x: PAGE.X, y: TEST_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '02', title: 'Words from people I’ve worked with' } },
  { id: 'q-1', type: 'sticky', x: PAGE.X,         y: TEST_ROW,      w: 280, h: STICKY_H, draggable: true,
    data: { text: '"Santi turns ambiguity into shipped product faster than anyone I\'ve worked with."\nMaria, PM at Zolvo',
      color: 'var(--sticky-blue)', rotate: -3, tall: true } },
  { id: 'q-2', type: 'sticky', x: PAGE.X + 300,   y: TEST_ROW + 20, w: 280, h: STICKY_H, draggable: true,
    data: { text: '"Rare designer, thinks like an engineer, ships like a founder."\nDavid, Engineering Lead',
      color: 'var(--sticky-pink)', rotate: 2, tall: true } },
  { id: 'q-3', type: 'sticky', x: PAGE.X + 600,   y: TEST_ROW,      w: 280, h: STICKY_H, draggable: true,
    data: { text: '"Calm under pressure, surgical feedback. The teammate I always want."\nAna, Director of Design',
      color: 'var(--sticky-mint)', rotate: -2, tall: true } },
  { id: 'q-4', type: 'sticky', x: PAGE.X + 900,   y: TEST_ROW + 20, w: 280, h: STICKY_H, draggable: true,
    data: { text: '"Designed our entire onboarding pro-bono. Same care as for a paying client."\nDiana, Volunteer org lead',
      color: 'var(--sticky-yellow)', rotate: 3, tall: true } },

  // ─── Section 3: CONFERENCE TALKS ───
  { id: 'sec-conf', type: 'section-label', x: PAGE.X, y: CONF_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '03', title: 'Places I’ve spoken at' } },
  { id: 'conf-1', type: 'photoprint', x: PAGE.X,         y: CONF_ROW,      w: 200, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', caption: 'SCAD Design Week · 2025', rotate: -3 } },
  { id: 'conf-2', type: 'photoprint', x: PAGE.X + 230,   y: CONF_ROW + 20, w: 200, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80', caption: 'LATAM Product Day · 2024', rotate: 2 } },
  { id: 'conf-3', type: 'photoprint', x: PAGE.X + 460,   y: CONF_ROW,      w: 200, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80', caption: 'YC AI panel · 2026', rotate: -2 } },
  { id: 'conf-4', type: 'photoprint', x: PAGE.X + 690,   y: CONF_ROW + 20, w: 200, h: CONF_H, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', caption: 'AIGA · Atlanta · 2025', rotate: 3 } },
]

function SectionLabel({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--accent)', letterSpacing: '0.16em',
        textTransform: 'uppercase', marginBottom: 4,
      }}>
        {data.kicker}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.65rem', letterSpacing: '-0.02em',
        color: 'var(--ink)', lineHeight: 1.05,
      }}>
        {data.title}
      </h2>
    </div>
  )
}

function renderObject(obj) {
  switch (obj.type) {
    case 'title':         return <PageTitle data={obj.data} />
    case 'section-label': return <SectionLabel data={obj.data} />
    case 'award':         return <AwardCard data={obj.data} />
    case 'sticky':        return <StickyNote data={obj.data} />
    case 'photoprint':    return <PhotoPrint data={obj.data} />
    default: return null
  }
}

export default function Testimonials() {
  const [view] = useState(pageInitialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
