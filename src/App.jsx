import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Photography from './pages/Photography'
import FigmaCursor from './components/FigmaCursor'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <>
      <FigmaCursor />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
    </>
  )
}
