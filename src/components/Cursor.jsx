import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(max-width: 768px)').matches
    if (isTouchDevice) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.1
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.1
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`
        followerRef.current.style.top = `${followerPos.current.y}px`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const expand = () => {
    if (followerRef.current) {
      followerRef.current.style.width = '52px'
      followerRef.current.style.height = '52px'
      followerRef.current.style.borderColor = '#e8442a'
    }
  }
  const shrink = () => {
    if (followerRef.current) {
      followerRef.current.style.width = '32px'
      followerRef.current.style.height = '32px'
      followerRef.current.style.borderColor = 'rgba(255,255,255,0.5)'
    }
  }

  useEffect(() => {
    const els = document.querySelectorAll('a, button')
    els.forEach(el => { el.addEventListener('mouseenter', expand); el.addEventListener('mouseleave', shrink) })
    return () => els.forEach(el => { el.removeEventListener('mouseenter', expand); el.removeEventListener('mouseleave', shrink) })
  })

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', width: 8, height: 8, background: '#fff',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)', transition: 'background 0.2s',
      }} />
      <div ref={followerRef} style={{
        position: 'fixed', width: 32, height: 32,
        border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
      }} />
    </>
  )
}
