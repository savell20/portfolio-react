import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import {
  PageTitle, PhotoPrint, PhotoBoothCabin, AnnotationLabel,
} from '../components/CanvasCards'
import { DarkRoomDoor, DarkRoomModal } from '../components/DarkRoom'
import PhotoBooth from '../components/PhotoBooth'

const OBJECTS = [
  { id: 'title', type: 'title', x: 80, y: 80, w: 540, h: 240,
    data: {
      kicker: '# the world through my eyes',
      title: 'Off the clock, on film.',
      blurb: 'A slow roll of 35mm — weekends, in-betweens, the trips I almost forgot to bring a camera on.',
    } },

  // Photo prints — 2x2 cluster
  { id: 'photo-1', type: 'photoprint', x: 700, y: 90, w: 180, h: 200, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'peaks', rotate: -4 } },
  { id: 'photo-2', type: 'photoprint', x: 900, y: 110, w: 180, h: 200, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'dusk', rotate: 5 } },
  { id: 'photo-3', type: 'photoprint', x: 700, y: 310, w: 180, h: 200, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'coast', rotate: 3 } },
  { id: 'photo-4', type: 'photoprint', x: 900, y: 330, w: 180, h: 200, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', caption: 'road', rotate: -3 } },

  // Photo booth cabin
  { id: 'booth', type: 'photobooth', x: 1150, y: 100, w: 220, h: 360, z: 6, to: '__photobooth__' },
  { id: 'note-booth', type: 'note', x: 1130, y: 30, w: 260, h: 80, z: 8,
    data: { text: 'snap a strip', arrow: '↓', rotate: 2 } },

  // Dark room door
  { id: 'darkroom', type: 'darkroom', x: 1410, y: 100, w: 220, h: 360, z: 6, to: '__darkroom__' },
  { id: 'note-dark', type: 'note', x: 1410, y: 30, w: 260, h: 80, z: 8,
    data: { text: 'enter the darkroom', arrow: '↓', rotate: -2 } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':      return <PageTitle data={obj.data} />
    case 'photoprint': return <PhotoPrint data={obj.data} />
    case 'photobooth': return <PhotoBoothCabin />
    case 'darkroom':   return <DarkRoomDoor />
    case 'note':       return <AnnotationLabel data={obj.data} />
    default: return null
  }
}

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  const scale = Math.min(0.85, (w - 100) / 1620, (h - 160) / 580)
  return {
    scale,
    x: w / 2 - 850 * scale,
    y: h / 2 - 320 * scale,
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
