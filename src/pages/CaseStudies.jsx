import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, ProjectCard } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, labelYAfter, moduleYAfterLabel, pageInitialView } from '../lib/layout'

const PROFESSIONAL = {
  zolvo: {
    company: 'Zolvo (YC P26)', frame: 'zolvo.case', year: "'26",
    role: 'Founding Designer',
    blurb: 'Designed five core fintech modules, AI invoice verification, reconciliation, collections, in eight weeks.',
    tags: ['Fintech', 'AI', '0→1'],
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
    badge: { type: 'yc', label: 'YC P26' },
  },
  hubspot: {
    company: 'HubSpot', frame: 'hubspot.case', year: "'25",
    role: 'UI/UX Designer',
    blurb: 'Product experiences for sales & service teams across a CRM used by millions.',
    tags: ['CRM', 'Scale', 'Systems'],
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
    badge: { type: 'hubspot', label: 'HubSpot' },
  },
  captura: {
    company: 'Captura tu mundo', frame: 'captura.case', year: "'20",
    role: 'Founder & Designer',
    blurb: 'Founded a visual-storytelling startup, designed and built the entire product.',
    tags: ['Founder', 'Brand', 'Product'],
    cover: 'linear-gradient(135deg,#1F8A6E,#3FBE96)',
  },
}

const SCHOOL = {
  loomi: {
    company: 'Loomi', frame: 'loomi.case', year: "'24",
    role: 'Solo SCAD Project',
    blurb: 'A reading buddy app for kids, designed and prototyped a gamified reading flow with adaptive difficulty.',
    tags: ['Student', 'Edtech', 'Mobile'],
    cover: 'linear-gradient(135deg,#8A4FFF,#B47BFF)',
  },
  greenstep: {
    company: 'GreenStep', frame: 'greenstep.case', year: "'23",
    role: 'SCAD Service Design',
    blurb: 'A carbon-footprint tracker for everyday choices, researched, designed, and tested with 12 students.',
    tags: ['Student', 'Climate', 'Research'],
    cover: 'linear-gradient(135deg,#1F8A6E,#7CCFB4)',
  },
}

// 3 columns spanning the same width as the rest of the design system.
const COL = (PAGE.W - PAGE.COL_GAP * 2) / 3
const colX = (n) => PAGE.X + n * (COL + PAGE.COL_GAP)
const CARD_H = 380

const PRO_LABEL    = FIRST_MODULE_Y
const PRO_ROW      = moduleYAfterLabel(PRO_LABEL)
const SCHOOL_LABEL = labelYAfter(PRO_ROW + CARD_H)
const SCHOOL_ROW   = moduleYAfterLabel(SCHOOL_LABEL)

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# all projects',
      title: 'Projects.',
      blurb: 'Three professional projects I’ve led design on, plus two SCAD school deep-dives.',
    } },

  { id: 'sec-pro', type: 'section', x: PAGE.X, y: PRO_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'Professional' } },
  { id: 'zolvo',   type: 'project', x: colX(0), y: PRO_ROW, w: COL, h: CARD_H, to: '/work/zolvo',   data: PROFESSIONAL.zolvo },
  { id: 'hubspot', type: 'project', x: colX(1), y: PRO_ROW, w: COL, h: CARD_H, to: '/work/hubspot', data: PROFESSIONAL.hubspot },
  { id: 'captura', type: 'project', x: colX(2), y: PRO_ROW, w: COL, h: CARD_H, to: '/work/captura', data: PROFESSIONAL.captura },

  { id: 'sec-school', type: 'section', x: PAGE.X, y: SCHOOL_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { kicker: '#', title: 'School projects · SCAD' } },
  { id: 'loomi',     type: 'project', x: colX(0), y: SCHOOL_ROW, w: COL, h: CARD_H, to: '/work/loomi',     data: SCHOOL.loomi },
  { id: 'greenstep', type: 'project', x: colX(1), y: SCHOOL_ROW, w: COL, h: CARD_H, to: '/work/greenstep', data: SCHOOL.greenstep },
]

function SectionLabel({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingBottom: 4 }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--accent)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: 4,
      }}>
        {data.kicker}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.7rem', letterSpacing: '-0.02em',
        color: 'var(--ink)', lineHeight: 1,
      }}>
        {data.title}
      </h2>
    </div>
  )
}

function renderObject(obj) {
  switch (obj.type) {
    case 'title':   return <PageTitle data={obj.data} />
    case 'section': return <SectionLabel data={obj.data} />
    case 'project': return <ProjectCard data={obj.data} />
    default: return null
  }
}

export default function CaseStudies() {
  const navigate = useNavigate()
  const [view] = useState(pageInitialView)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (obj && obj.to) navigate(obj.to)
  }

  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
      onActivate={onActivate}
    />
  )
}
