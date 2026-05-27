import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import Polaroid from '../components/Polaroid'
import { PageTitle, BioCard, PrincipleCard, FactCard } from '../components/CanvasCards'
import fotoPersonal from '../assets/foto-personal.jpeg'

const OBJECTS = [
  // Top-left page title
  { id: 'title', type: 'title', x: 80, y: 80, w: 540, h: 220,
    data: {
      kicker: '# about me',
      title: 'Hi, I’m Santiago.',
      blurb: "Bogotá-born product designer turning complex systems into things that feel obvious. Welcome to my brain on a canvas.",
    } },

  // Identity polaroid — under the title
  { id: 'me', type: 'identity', x: 80, y: 360, w: 280, h: 340 },

  // Long-form bio card on the right
  { id: 'bio', type: 'bio', x: 700, y: 80, w: 640, h: 540,
    data: {
      frame: 'about-me.case',
      kicker: 'the long version',
      title: 'Bogotá → SCAD → here',
      paragraphs: [
        "I grew up in Bogotá, Colombia — a city that taught me how to design with constraints. Limited resources, big ambitions, and a culture that punishes anything that doesn't actually work.",
        "At 18 I started Captura tu mundo, a visual-storytelling company, and ran it for three years. I learned every part of building a business the hard way.",
        "Moved to the US for SCAD, fell deeper in love with product design, then carried those lessons into HubSpot. Now I'm founding designer at Zolvo (YC P26), building the financial OS for Latin American SMEs.",
        "The thread through all of it: I care about what gets shipped, not what gets shown.",
      ],
    } },

  // Quick facts — 2x2 grid below
  { id: 'fact-1', type: 'fact', x: 400, y: 360, w: 280, h: 80,
    data: { icon: '📍', label: 'Based', value: 'United States · from Bogotá' } },
  { id: 'fact-2', type: 'fact', x: 400, y: 460, w: 280, h: 80,
    data: { icon: '🎓', label: 'School', value: 'SCAD — Service Design' } },
  { id: 'fact-3', type: 'fact', x: 400, y: 560, w: 280, h: 80,
    data: { icon: '💼', label: 'Currently', value: 'Founding Designer · Zolvo (YC P26)' } },
  { id: 'fact-4', type: 'fact', x: 400, y: 660, w: 280, h: 80,
    data: { icon: '✦', label: 'Open for', value: 'Design partnerships · advising' } },

  // Principles — 3 columns at the bottom
  { id: 'p-1', type: 'principle', x: 80, y: 760, w: 300, h: 200,
    data: { n: '01', title: 'Shipping over showing',
      body: "Real impact comes from the version that ships, not the version that wins the dribble." } },
  { id: 'p-2', type: 'principle', x: 410, y: 760, w: 300, h: 200,
    data: { n: '02', title: 'Systems over screens',
      body: 'Great UI is rarely about a screen — it’s about the system underneath. I design the data model first.' } },
  { id: 'p-3', type: 'principle', x: 740, y: 760, w: 300, h: 200,
    data: { n: '03', title: 'Defensible decisions',
      body: "Every call should survive a 30-second 'why' from engineering or PM. If it can't, it isn't ready." } },

  // Tagline takeaway sticky
  { id: 'tag', type: 'sticky', x: 1080, y: 760, w: 280, h: 200, z: 4, draggable: true,
    data: { text: 'A designer who thinks like an owner — every pixel tied to a real outcome.',
      color: 'var(--sticky-blue)', rotate: -3, tall: true } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':     return <PageTitle data={obj.data} />
    case 'identity':  return <Polaroid src={fotoPersonal} caption="Santiago Avella" rotate={-3} />
    case 'bio':       return <BioCard data={obj.data} />
    case 'fact':      return <FactCard data={obj.data} />
    case 'principle': return <PrincipleCard data={obj.data} />
    case 'sticky':    return <StickyImport data={obj.data} />
    default: return null
  }
}

import { StickyNote } from '../components/CanvasCards'
function StickyImport({ data }) { return <StickyNote data={data} /> }

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Content bbox: x:80-1360, y:80-960 → 1280×880
  const scale = Math.min(0.85, (w - 100) / 1280, (h - 160) / 880)
  return {
    scale,
    x: w / 2 - 720 * scale,
    y: h / 2 - 520 * scale,
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
