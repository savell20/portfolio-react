import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import {
  PageTitle, PhotoPrint, PhotoBoothCabin, AnnotationLabel,
} from '../components/CanvasCards'
import { DarkRoomDoor, DarkRoomModal } from '../components/DarkRoom'
import PhotoBooth from '../components/PhotoBooth'

const PRINTS = [
  { id: 'photo-1',  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'peaks',  x: 80,   y: 380, rotate: -4 },
  { id: 'photo-2',  src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'dusk',   x: 280,  y: 400, rotate: 5 },
  { id: 'photo-3',  src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'coast',  x: 480,  y: 380, rotate: 3 },
  { id: 'photo-4',  src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', caption: 'road',   x: 680,  y: 400, rotate: -3 },
  { id: 'photo-5',  src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', caption: 'valley', x: 80,   y: 600, rotate: 4 },
  { id: 'photo-6',  src: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=600&q=80', caption: 'forest', x: 280,  y: 620, rotate: -2 },
  { id: 'photo-7',  src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&q=80', caption: 'desert', x: 480,  y: 600, rotate: 6 },
  { id: 'photo-8',  src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'shore',  x: 680,  y: 620, rotate: -5 },
  { id: 'photo-9',  src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', caption: 'town',   x: 880,  y: 380, rotate: 2 },
  { id: 'photo-10', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80', caption: 'falls',  x: 880,  y: 600, rotate: -3 },
  { id: 'photo-11', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', caption: 'summit', x: 1080, y: 380, rotate: -4 },
  { id: 'photo-12', src: 'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=600&q=80', caption: 'lake',   x: 1080, y: 600, rotate: 5 },
]

const OBJECTS = [
  { id: 'title', type: 'title', x: 80, y: 80, w: 600, h: 240,
    data: {
      kicker: '# the world through my eyes',
      title: 'Off the clock, on film.',
      blurb: 'A slow roll of 35mm — weekends, in-betweens, the trips I almost forgot to bring a camera on. Grab any print and drag it anywhere.',
    } },

  // Hint sticky
  { id: 'note-drag', type: 'sticky', x: 720, y: 100, w: 220, h: 130, z: 4, draggable: true,
    data: { text: '✦ everything below is draggable — make your own mood board',
      color: 'var(--sticky-yellow)', rotate: -3, tall: false } },

  // 12 draggable photo prints in a loose grid
  ...PRINTS.map(p => ({
    id: p.id, type: 'photoprint', x: p.x, y: p.y, w: 180, h: 200, draggable: true,
    data: { src: p.src, caption: p.caption, rotate: p.rotate },
  })),

  // Photo booth cabin
  { id: 'booth', type: 'photobooth', x: 1320, y: 380, w: 220, h: 360, z: 6, to: '__photobooth__' },
  { id: 'note-booth', type: 'note', x: 1300, y: 310, w: 260, h: 80, z: 8,
    data: { text: 'snap a strip', arrow: '↓', rotate: 2 } },

  // Dark room door
  { id: 'darkroom', type: 'darkroom', x: 1580, y: 380, w: 220, h: 360, z: 6, to: '__darkroom__' },
  { id: 'note-dark', type: 'note', x: 1580, y: 310, w: 260, h: 80, z: 8,
    data: { text: 'enter the darkroom', arrow: '↓', rotate: -2 } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':      return <PageTitle data={obj.data} />
    case 'photoprint': return <PhotoPrint data={obj.data} />
    case 'photobooth': return <PhotoBoothCabin />
    case 'darkroom':   return <DarkRoomDoor />
    case 'note':       return <AnnotationLabel data={obj.data} />
    case 'sticky':     return <StickyImport data={obj.data} />
    default: return null
  }
}

import { StickyNote } from '../components/CanvasCards'
function StickyImport({ data }) { return <StickyNote data={data} /> }

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Larger content bbox now that there are 12 prints + cabin + darkroom.
  const scale = Math.min(0.75, (w - 100) / 1800, (h - 160) / 780)
  return {
    scale,
    x: w / 2 - 940 * scale,
    y: h / 2 - 460 * scale,
  }
}

export default function Photography() {
  const [view] = useState(initialView)
  const [boothOpen, setBoothOpen] = useState(false)
  const [darkOpen, setDarkOpen] = useState(false)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.to === '__photobooth__') setBoothOpen(true)
    else if (obj.to === '__darkroom__') setDarkOpen(true)
  }

  const addPolaroid = () => { /* No persistence on this page — booth strip just saves locally via download */ }

  return (
    <>
      <MiniCanvas
        objects={OBJECTS}
        connectors={[]}
        initialView={view}
        renderObject={renderObject}
        onActivate={onActivate}
      />
      {boothOpen && <PhotoBooth onClose={() => setBoothOpen(false)} onSave={addPolaroid} />}
      {darkOpen && <DarkRoomModal onClose={() => setDarkOpen(false)} />}
    </>
  )
}
