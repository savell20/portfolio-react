import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, AnnotationLabel, PhotoBoothCabin } from '../components/CanvasCards'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'
import { DarkRoomDoor, DarkRoomModal } from '../components/DarkRoom'
import { TravelGameTile, TravelGameModal } from '../components/TravelGame'
import PhotoBooth from '../components/PhotoBooth'
import { PAGE, FIRST_MODULE_Y, labelYAfter, moduleYAfterLabel, pageInitialView } from '../lib/layout'

const GAME_W = 380   // 3 game tiles: 3·380 + 2·32 = 1204
const GAME_GAP = 32
const gameX = (n) => PAGE.X + n * (GAME_W + GAME_GAP)
const GAME_H = 360

const GAMES_ROW = FIRST_MODULE_Y
const TOYS_LABEL = labelYAfter(GAMES_ROW + GAME_H)
const TOYS_ROW = moduleYAfterLabel(TOYS_LABEL)

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# fun',
      title: 'The fun zone.',
      blurb: 'A few little experiments I built for fun. Snap a photo strip, develop some film, guess where I’ve travelled, or strum the guitar — go ahead, play around.',
    } },

  // ─── Games row ───
  { id: 'g-booth',  type: 'photobooth', x: gameX(0), y: GAMES_ROW, w: GAME_W, h: GAME_H, z: 6, to: '__photobooth__' },
  { id: 'g-dark',   type: 'darkroom',   x: gameX(1), y: GAMES_ROW, w: GAME_W, h: GAME_H, z: 6, to: '__darkroom__' },
  { id: 'g-travel', type: 'travel',     x: gameX(2), y: GAMES_ROW, w: GAME_W, h: GAME_H, z: 6, to: '__travel__' },

  // ─── Things I love (hobby toys) ───
  { id: 'sec-love', type: 'section-title', x: PAGE.X, y: TOYS_LABEL, w: 600, h: PAGE.LABEL_H,
    data: { title: 'Things I love' } },
  { id: 'toy-guitar', type: 'guitar', x: PAGE.X,       y: TOYS_ROW,       w: 220, h: 360,
    data: { label: 'I love guitar' } },
  { id: 'toy-f1',     type: 'f1',     x: PAGE.X + 360, y: TOYS_ROW + 50,  w: 320, h: 240,
    data: { label: 'I love Formula One' } },
  { id: 'toy-plane',  type: 'flight', x: PAGE.X + 760, y: TOYS_ROW + 40,  w: 360, h: 260,
    data: { label: 'I love traveling' } },
  { id: 'toy-note', type: 'note', x: PAGE.X - 10, y: TOYS_ROW + 380, w: 280, h: 80, z: 8,
    data: { text: 'click the guitar', arrow: '↑', rotate: -2 } },
]

function SimpleSectionTitle({ data }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: 6 }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.7rem', letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1,
      }}>
        {data.title}
      </h2>
    </div>
  )
}

function makeRenderObject() {
  return function renderObject(obj) {
    switch (obj.type) {
      case 'title':         return <PageTitle data={obj.data} />
      case 'section-title': return <SimpleSectionTitle data={obj.data} />
      case 'photobooth':    return <PhotoBoothCabin />
      case 'darkroom':      return <DarkRoomDoor />
      case 'travel':        return <TravelGameTile />
      case 'guitar':        return <Guitar label={obj.data?.label} />
      case 'f1':            return <F1Car label={obj.data?.label} />
      case 'flight':        return <FlightMap label={obj.data?.label} />
      case 'note':          return <AnnotationLabel data={obj.data} />
      default: return null
    }
  }
}

export default function Hobbies() {
  const [view] = useState(pageInitialView)
  const [renderObject] = useState(() => makeRenderObject())
  const [darkRoomOpen, setDarkRoomOpen] = useState(false)
  const [travelOpen, setTravelOpen] = useState(false)
  const [booth, setBooth] = useState(false)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.to === '__photobooth__') setBooth(true)
    else if (obj.to === '__darkroom__') setDarkRoomOpen(true)
    else if (obj.to === '__travel__') setTravelOpen(true)
  }

  return (
    <>
      <MiniCanvas
        objects={OBJECTS}
        connectors={[]}
        initialView={view}
        renderObject={renderObject}
        onActivate={onActivate}
      />
      {booth && <PhotoBooth onClose={() => setBooth(false)} onSave={() => setBooth(false)} />}
      {darkRoomOpen && <DarkRoomModal onClose={() => setDarkRoomOpen(false)} />}
      {travelOpen && <TravelGameModal onClose={() => setTravelOpen(false)} />}
    </>
  )
}
