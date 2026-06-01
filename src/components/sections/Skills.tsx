'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { skillCategories } from '@/lib/constants'
import { TiltCard } from '@/components/ui/tilt-card'
import { cn } from '@/lib/utils'
import { TextScramble } from '@/components/effects/TextScramble'
import { MagicParticles } from '@/components/effects/MagicParticles'

function SkillCard({ skill, index, isActive }: { skill: { name: string; level: number }; index: number; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, margin: '-30px' })

  // Different gradient for each card based on skill level
  const gradientColor = skill.level >= 90
    ? 'from-electric-blue via-electric-cyan to-electric-blue'
    : skill.level >= 80
    ? 'from-electric-purple via-electric-blue to-electric-purple'
    : 'from-electric-cyan via-electric-purple to-electric-cyan'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 15, filter: 'blur(10px)' }}
      animate={isActive && isInView
        ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 60, scale: 0.85, rotateX: 15, filter: 'blur(10px)' }
      }
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <TiltCard>
        <motion.div
          className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.25] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
        >
          {/* Background glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(to bottom right, rgba(var(--accent-primary), 0.08), transparent, rgba(var(--accent-secondary), 0.08))' }} />
          
          {/* Animated border shimmer */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'conic-gradient(from 0deg, transparent, rgba(var(--accent-primary), 0.15), transparent, rgba(var(--accent-secondary), 0.15), transparent)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{skill.name}</h4>
              <motion.span
                className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/[0.05]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isActive && isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.6 + index * 0.07, type: 'spring', stiffness: 300 }}
              >
                <span className="text-white/50">{skill.level}%</span>
              </motion.span>
            </div>
            
            {/* Progress bar with advanced effects */}
            <div className="w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden relative">
              <motion.div
                className={`h-full rounded-full relative overflow-hidden bg-gradient-to-r ${gradientColor}`}
                initial={{ width: 0 }}
                animate={isActive && isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1.4, delay: 0.3 + index * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                />
              </motion.div>
              
              {/* Glowing tip at end of progress */}
              <motion.div
                className="absolute top-0 h-full w-3 rounded-full blur-sm"
                style={{ background: 'rgba(var(--accent-primary), 0.8)' }}
                initial={{ left: 0, opacity: 0 }}
                animate={isActive && isInView 
                  ? { left: `calc(${skill.level}% - 6px)`, opacity: [0, 1, 0.6] }
                  : { left: 0, opacity: 0 }
                }
                transition={{ duration: 1.4, delay: 0.3 + index * 0.07, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('languages')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const backgroundX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const activeSkills = skillCategories.find(c => c.id === activeCategory)?.skills || []

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Moving background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ x: backgroundX }}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(var(--accent-tertiary), 0.1)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(var(--accent-primary), 0.1)' }} />
      </motion.div>

      {/* Floating particles */}
      <MagicParticles count={12} color="rgba(6, 182, 212, 0.3)" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 60, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-sm font-mono tracking-wider uppercase px-4 py-1.5 rounded-full border bg-white/[0.03]"
            style={{ color: 'rgb(var(--accent-tertiary))', borderColor: 'rgba(var(--accent-tertiary), 0.2)' }}
          >
            <TextScramble text="Skills" delay={0.2} />
          </motion.span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-white">Technical </span>
            <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Technologies and tools I work with to build exceptional software
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-nowrap justify-start md:justify-center gap-1.5 md:gap-2 mb-12 p-1.5 rounded-2xl md:rounded-full bg-white/[0.02] border border-white/[0.05] max-w-full overflow-x-auto scrollbar-hide mx-auto md:w-fit"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              onMouseEnter={() => setHoveredTab(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + catIndex * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full transition-colors duration-200 relative whitespace-nowrap flex-shrink-0',
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              )}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full border border-white/[0.15]"
                  style={{ background: 'linear-gradient(to right, rgba(var(--accent-primary), 0.1), rgba(var(--accent-secondary), 0.1))', boxShadow: '0 0 12px rgba(var(--accent-primary), 0.1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {hoveredTab === category.id && activeCategory !== category.id && (
                <motion.div
                  layoutId="skillTabHover"
                  className="absolute inset-0 bg-white/[0.04] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-10 font-medium">{category.label}</span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="skillTabDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'rgb(var(--accent-tertiary))' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeSkills.map((skill, index) => (
            <SkillCard key={`${activeCategory}-${skill.name}`} skill={skill} index={index} isActive={true} />
          ))}
        </div>
      </div>
    </section>
  )
}
