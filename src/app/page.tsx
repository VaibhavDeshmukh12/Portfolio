'use client'

import { useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { FloatingParticles } from '@/components/effects/FloatingParticles'
import { GridBackground } from '@/components/effects/GridBackground'
import { LoadingScreen } from '@/components/effects/LoadingScreen'

export default function Home() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <FloatingParticles />
      <GridBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
