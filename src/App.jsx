import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Photography from './pages/Photography'
import About from './pages/About'
import Hobbies from './pages/Hobbies'
import Testimonials from './pages/Testimonials'
import Story from './pages/Story'
import FigmaCursor from './components/FigmaCursor'
import TopNavbar from './components/TopNavbar'
import ToolsFloater from './components/ToolsFloater'
import { installClickSounds } from './lib/sound'

function Chrome() {
  // Single global chrome on every route. The navbar already has a Home
  // link, so no separate back button is needed.
  return (
    <>
      <TopNavbar />
      <ToolsFloater />
    </>
  )
}

export default function App() {
  useEffect(() => { installClickSounds() }, [])

  return (
    <>
      <FigmaCursor />
      <Chrome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/about" element={<About />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </>
  )
}
