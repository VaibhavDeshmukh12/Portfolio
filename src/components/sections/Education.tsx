'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { education } from '@/lib/constants'
import { GlowCard } from '@/components/ui/glow-card'
import { GraduationCap, MapPin, Award } from 'lucide-react'
import { TextScramble } from '@/components/effects/TextScramble'
import { MagicParticles } from '@/components/effects/MagicParticles'

function EducationCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, margin: '-50px' })

  const colors = [
    { bg: 'bg-electric-blue/10', border: 'border-electric-blue/20', text: 'text-electric-blue', glow: 'rgba(59, 130, 246, 0.15)', hex: '#3b82f6' },
    { bg: 'bg-electric-purple/10', border: 'border-electric-purple/20', text: 'text-electric-purple', glow: 'rgba(139, 92, 246, 0.15)', hex: '#8b5cf6' },
    { bg: 'bg-electric-cyan/10', border: 'border-electric-cyan/20', text: 'text-electric-cyan', glow: 'rgba(6, 182, 212, 0.15)', hex: '#06b6d4' },
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -10 : 10, filter: 'blur(12px)' }}
      animate={isInView
        ? { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }
        : { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -10 : 10, filter: 'blur(12px)' }
      }
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}>
        <GlowCard className="p-6 md:p-8 relative overflow-hidden" glowColor={color.glow}>
          {/* Animated gradient sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-12"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
          />
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: `linear-gradient(to left, ${color.hex}, transparent)` }} />
            <div className="absolute top-0 right-0 h-full w-[1px]" style={{ background: `linear-gradient(to bottom, ${color.hex}, transparent)` }} />
          </div>

          <div className="relative z-10 flex items-start gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.2, type: 'spring', stiffness: 180 }}
              className={`p-3 rounded-xl ${color.bg} border ${color.border} relative`}
            >
              <GraduationCap size={24} className={color.text} />
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-1 rounded-xl"
                style={{ border: `1px solid ${color.hex}` }}
                animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15, filter: 'blur(4px)' }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                    className="text-lg font-semibold text-white"
                  >
                    {edu.institution}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                    className="text-sm text-white/60 mt-1"
                  >
                    {edu.degree}
                  </motion.p>
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
                  transition={{ delay: 0.4 + index * 0.2, type: 'spring', stiffness: 300 }}
                  className="text-sm text-white/40 font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06]"
                >
                  <TextScramble text={edu.period} delay={0.6 + index * 0.2} speed={35} />
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="flex items-center gap-1.5 mt-2"
              >
                <MapPin size={12} className="text-white/30" />
                <span className="text-xs text-white/40">{edu.location}</span>
              </motion.div>
              {edu.grade && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.5, type: 'spring' }}
                  className="mt-4 inline-flex items-center gap-2"
                >
                  <Award size={14} style={{ color: color.hex }} />
                  <span className="px-3 py-1 text-xs font-mono rounded-full border text-white/70"
                    style={{ borderColor: `${color.hex}30`, backgroundColor: `${color.hex}10` }}
                  >
                    {edu.grade}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  )
}

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-purple/5 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-electric-blue/5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      <MagicParticles count={10} color="rgba(139, 92, 246, 0.25)" />

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
            className="inline-block text-sm font-mono text-electric-purple tracking-wider uppercase px-4 py-1.5 rounded-full border border-electric-purple/20 bg-electric-purple/5"
          >
            <TextScramble text="Education" delay={0.2} />
          </motion.span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-white">Academic </span>
            <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        {/* Education cards */}
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
