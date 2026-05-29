'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/lib/constants'
import { GlowCard } from '@/components/ui/glow-card'
import { Briefcase, ChevronRight } from 'lucide-react'
import { TextScramble } from '@/components/effects/TextScramble'

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, { once: false, margin: '-50px' })

  const colors = [
    { accent: 'rgb(var(--accent-primary))', glow: 'rgba(var(--accent-primary), 0.15)' },
    { accent: 'rgb(var(--accent-secondary))', glow: 'rgba(var(--accent-secondary), 0.15)' },
    { accent: 'rgb(var(--accent-tertiary))', glow: 'rgba(var(--accent-tertiary), 0.15)' },
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120, rotateY: index % 2 === 0 ? -8 : 8, filter: 'blur(12px)' }}
      animate={isCardInView
        ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }
        : { opacity: 0, x: index % 2 === 0 ? -120 : 120, rotateY: index % 2 === 0 ? -8 : 8, filter: 'blur(12px)' }
      }
      transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative flex flex-col md:flex-row items-start gap-8 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot with ripple effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isCardInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full bg-background border-2" style={{ borderColor: color.accent }} />
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{ backgroundColor: color.accent }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: `1px solid ${color.accent}` }}
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: `1px solid ${color.accent}` }}
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
        >
          <GlowCard className="p-6 md:p-8 relative overflow-hidden" glowColor={color.glow}>
            {/* Animated shimmer inside card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
            />

            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={isCardInView ? { rotate: 0, scale: 1 } : { rotate: -180, scale: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 150 }}
                  className="p-2.5 rounded-xl border"
                  style={{ borderColor: `${color.accent}30`, backgroundColor: `${color.accent}10` }}
                >
                  <Briefcase size={20} style={{ color: color.accent }} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                  <motion.p
                    initial={{ opacity: 0, width: 0 }}
                    animate={isCardInView ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-sm font-medium overflow-hidden whitespace-nowrap"
                    style={{ color: color.accent }}
                  >
                    {exp.company}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-white/40 mt-1 font-mono"
                  >
                    {exp.period}
                  </motion.p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-white/60 leading-relaxed mb-4"
              >
                {exp.description}
              </motion.p>

              {/* Highlights with animated chevron */}
              <ul className="space-y-2 mb-5">
                {exp.highlights.map((h, hIndex) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                    animate={isCardInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -30, filter: 'blur(4px)' }}
                    transition={{ delay: 0.55 + hIndex * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    className="flex items-start gap-2 text-sm text-white/50 group/item"
                  >
                    <motion.span
                      animate={isCardInView ? { x: [0, 3, 0] } : {}}
                      transition={{ delay: 1 + hIndex * 0.2, duration: 0.8, repeat: 1 }}
                      className="mt-0.5 flex-shrink-0"
                    >
                      <ChevronRight size={12} style={{ color: color.accent }} />
                    </motion.span>
                    {h}
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags with pop-in */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, tIndex) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={isCardInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -20 }}
                    transition={{ delay: 0.8 + tIndex * 0.06, duration: 0.4, type: 'spring', stiffness: 300 }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 font-mono"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* Period label (opposite side) - with scramble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
      >
        <span className="text-sm text-white/30 font-mono">
          <TextScramble text={exp.period} delay={0.8} speed={40} />
        </span>
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%'])
  const lineGlow = useTransform(scrollYProgress, [0, 0.5], [0, 20])

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background elements with breathing */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'rgba(var(--accent-primary), 0.05)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{ background: 'rgba(var(--accent-secondary), 0.05)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

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
            style={{ color: 'rgb(var(--accent-primary))', borderColor: 'rgba(var(--accent-primary), 0.2)' }}
          >
            Experience
          </motion.span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            From internships to full-time engineering at PTC Software
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - grows with scroll */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-white/[0.05]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full"
            >
              <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom, rgb(var(--accent-primary)), rgb(var(--accent-secondary)), rgb(var(--accent-tertiary)))' }} />
            </motion.div>
          </div>

          {/* Experience cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
