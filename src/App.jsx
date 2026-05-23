import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Photography from './pages/Photography'
import FigmaCursor from './components/FigmaCursor'
import StyleSwitcher from './components/StyleSwitcher'
import Tutorial from './components/Tutorial'
import TopBar from './components/TopBar'
import { installClickSounds } from './lib/sound'

export default function App() {
  useEffect(() => { installClickSounds() }, [])

  return (
    <>
      <FigmaCursor />
      <StyleSwitcher />
      <Tutorial />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
    </>
  )
}
