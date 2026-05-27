'use client'

import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

export function CursorGlow() {
  const { x, y } = useMousePosition()
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px) scale(${isHovering ? 1.5 : 1})`
    }
    // Animate trail particles with staggered delay
    trailRefs.current.forEach((trail, i) => {
      if (trail) {
        setTimeout(() => {
          trail.style.transform = `translate(${x - 3}px, ${y - 3}px)`
          trail.style.opacity = `${0.6 - i * 0.15}`
        }, (i + 1) * 40)
      }
    })
  }, [x, y, isHovering])

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, [data-hover]')
      setIsHovering(!!isInteractive)
    }
    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [])

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9990] w-[400px] h-[400px] rounded-full opacity-20 transition-transform duration-300 ease-out will-change-transform hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
        }}
      />
      {/* Trail particles */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el }}
          className="pointer-events-none fixed top-0 left-0 z-[9998] w-[6px] h-[6px] rounded-full hidden md:block will-change-transform"
          style={{
            background: `rgba(255, 255, 255, ${0.4 - i * 0.1})`,
            transition: `transform ${0.15 + i * 0.05}s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s`,
            boxShadow: `0 0 ${6 - i}px rgba(139, 92, 246, ${0.4 - i * 0.1})`,
          }}
        />
      ))}
      {/* White dot cursor - main */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[12px] h-[12px] rounded-full hidden md:block will-change-transform"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, rgba(139, 92, 246, 0.8) 100%)',
          boxShadow: '0 0 12px rgba(255,255,255,0.6), 0 0 24px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
          transition: 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />
    </>
  )
}
