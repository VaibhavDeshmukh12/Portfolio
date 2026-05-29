'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
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
import { GridBackground } from '@/components/effects/GridBackground'
import { LoadingScreen } from '@/components/effects/LoadingScreen'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { AuroraBackground } from '@/components/effects/AuroraBackground'
import { SectionDivider } from '@/components/effects/SectionDivider'

const InteractiveBackground = dynamic(
  () => import('@/components/three/InteractiveBackground').then(mod => ({ default: mod.InteractiveBackground })),
  { ssr: false }
)

export default function Home() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <LoadingScreen />
      <NoiseOverlay />
      <InteractiveBackground />
      <AuroraBackground />
      <CursorGlow />
      <GridBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SectionDivider variant="wave" />
        <About />
        <SectionDivider variant="dots" />
        <Experience />
        <SectionDivider variant="line" />
        <Skills />
        <SectionDivider variant="wave" />
        <Projects />
        <SectionDivider variant="dots" />
        <Education />
        <SectionDivider variant="line" />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
