import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import Polaroid from '../components/Polaroid'
import {
  PageTitle, BioCard, PrincipleCard, FactCard, StickyNote,
} from '../components/CanvasCards'
import fotoPersonal from '../assets/foto-personal.jpeg'

/* Bento-grid layout — every card aligns to a 320-px column grid so the
   page reads as deliberate, not scattered. Three columns × four rows. */
const COL = 320
const GAP = 20
const X0 = 80
const Y0 = 80
const colX = (n) => X0 + n * (COL + GAP)
const rowY = (n) => Y0 + n * (160 + GAP)

const OBJECTS = [
  // Row 1 — Title (spans 2 cols)
  { id: 'title', type: 'title', x: colX(0), y: rowY(0), w: COL * 2 + GAP, h: 160,
    data: {
      kicker: '# about me',
      title: 'Hi, I’m Santiago.',
      blurb: 'Bogotá-born product designer turning complex systems into things that feel obvious.',
    } },

  // Row 1 — Polaroid (col 3, taller)
  { id: 'me', type: 'identity', x: colX(2), y: rowY(0), w: COL, h: 340 },

  // Row 2 — Bio (spans 2 cols)
  { id: 'bio', type: 'bio', x: colX(0), y: rowY(1), w: COL * 2 + GAP, h: 380,
    data: {
      frame: 'about-me.case',
      kicker: 'the long version',
      title: 'Bogotá → SCAD → here',
      paragraphs: [
        'I grew up in Bogotá — a city that taught me how to design with constraints. Limited resources, big ambitions, zero tolerance for things that don’t work.',
        'At 18 I started Captura tu mundo, ran it for three years, then took the lessons to SCAD, HubSpot, and now Zolvo (YC P26) as founding designer.',
        'The thread through all of it: I care about what gets shipped, not what gets shown.',
      ],
    } },

  // Row 2 — 4 fact chips stacked in the right column
  { id: 'fact-1', type: 'fact', x: colX(2), y: rowY(0) + 360, w: COL, h: 72,
    data: { icon: '📍', label: 'Based', value: 'United States · from Bogotá' } },
  { id: 'fact-2', type: 'fact', x: colX(2), y: rowY(0) + 360 + 92, w: COL, h: 72,
    data: { icon: '🎓', label: 'School', value: 'SCAD — Service Design' } },
  { id: 'fact-3', type: 'fact', x: colX(2), y: rowY(0) + 360 + 184, w: COL, h: 72,
    data: { icon: '💼', label: 'Currently', value: 'Founding Designer · Zolvo (YC P26)' } },
  { id: 'fact-4', type: 'fact', x: colX(2), y: rowY(0) + 360 + 276, w: COL, h: 72,
    data: { icon: '✦', label: 'Open for', value: 'Design partnerships · advising' } },

  // Row 3 — 3 principle cards (each 1 col)
  { id: 'p-1', type: 'principle', x: colX(0), y: 720, w: COL, h: 220,
    data: { n: '01', title: 'Shipping over showing',
      body: 'Real impact comes from the version that ships, not the version that wins the dribble.' } },
  { id: 'p-2', type: 'principle', x: colX(1), y: 720, w: COL, h: 220,
    data: { n: '02', title: 'Systems over screens',
      body: 'Great UI is rarely about a screen — it’s about the system underneath. I design the data model first.' } },
  { id: 'p-3', type: 'principle', x: colX(2), y: 720, w: COL, h: 220,
    data: { n: '03', title: 'Defensible decisions',
      body: 'Every call should survive a 30-second "why" from engineering or PM. If it can’t, it isn’t ready.' } },

  // Row 4 — wide takeaway sticky (spans 3 cols)
  { id: 'tag', type: 'sticky', x: colX(0), y: 960, w: COL * 3 + GAP * 2, h: 140, z: 4, draggable: true,
    data: { text: 'A designer who thinks like an owner — every pixel tied to a real outcome.',
      color: 'var(--sticky-blue)', rotate: -1, tall: false } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':     return <PageTitle data={obj.data} />
    case 'identity':  return <Polaroid src={fotoPersonal} caption="Santiago Avella" rotate={-2} />
    case 'bio':       return <BioCard data={obj.data} />
    case 'fact':      return <FactCard data={obj.data} />
    case 'principle': return <PrincipleCard data={obj.data} />
    case 'sticky':    return <StickyNote data={obj.data} />
    default: return null
  }
}

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Content bbox: x:80–1080 (1000w), y:80–1100 (1020h). Centered around (580, 590).
  const scale = Math.min(0.78, (w - 100) / 1000, (h - 160) / 1020)
  return {
    scale,
    x: w / 2 - 580 * scale,
    y: h / 2 - 590 * scale,
  }
}

export default function About() {
  const [view] = useState(initialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
