'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, siteConfig } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-background/60 backdrop-blur-2xl border-b border-white/[0.05]'
            : 'py-5 bg-transparent'
        )}
      >
        {/* Animated bottom border glow when scrolled */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-primary), 0.3), transparent)' }}
          />
        )}

        <div className="container-custom flex items-center justify-between">
          {/* Logo with glow */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home') }}
            className="relative z-10 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xl font-display font-bold gradient-text relative">
              VD
              <motion.span
                className="absolute -inset-2 rounded-lg blur-md"
                style={{ background: 'rgba(var(--accent-primary), 0.1)' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1)
              const isHovered = hoveredItem === item.href

              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  className={cn(
                    'px-4 py-2 text-sm rounded-full transition-colors duration-200 relative',
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  )}
                >
                  {/* Active indicator (follows active section) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavSection"
                      className="absolute inset-0 bg-white/[0.1] rounded-full border border-white/[0.15]"
                      style={{ boxShadow: '0 0 15px rgba(var(--accent-primary), 0.15)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover indicator (follows mouse) */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/[0.05] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <motion.span
                    className="relative z-10 font-medium"
                    animate={isActive ? { scale: 1 } : {}}
                  >
                    {item.label}
                  </motion.span>

                  {/* Active dot indicator below text */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: 'rgb(var(--accent-primary))' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'text-2xl font-display transition-colors relative',
                    activeSection === item.href.slice(1) ? 'text-white' : 'text-white/60'
                  )}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{ background: 'rgb(var(--accent-primary))' }}
                      layoutId="mobileActiveIndicator"
                    />
                  )}
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
