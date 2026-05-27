'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { GlowCard } from '@/components/ui/glow-card'
import { stats } from '@/lib/constants'
import { Code2, Layers, Cpu, Globe } from 'lucide-react'
import { TextScramble } from '@/components/effects/TextScramble'
import { MagicParticles } from '@/components/effects/MagicParticles'
import { WordReveal } from '@/components/effects/TextReveal'

const interests = [
  { icon: Code2, label: 'System Design', color: '#3b82f6' },
  { icon: Layers, label: 'Enterprise Engineering', color: '#8b5cf6' },
  { icon: Cpu, label: 'AI Integrations', color: '#06b6d4' },
  { icon: Globe, label: 'Cloud Technologies', color: '#ec4899' },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotateCard = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background particles */}
      <MagicParticles count={20} color="rgba(139, 92, 246, 0.3)" />

      <div ref={ref} className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="inline-block text-sm font-mono text-electric-blue tracking-wider uppercase px-4 py-1.5 rounded-full border border-electric-blue/20 bg-electric-blue/5">
                <TextScramble text="About Me" delay={0.3} />
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight"
            >
              <WordReveal text="Passionate about" className="text-white" delay={0.3} />
              <br />
              <WordReveal text="building exceptional" className="gradient-text" delay={0.6} />
              <br />
              <WordReveal text="software" className="text-white" delay={0.9} />
            </motion.h2>

            <div className="mt-6 space-y-4">
              {[
                'I am passionate about building scalable software systems, enterprise applications, modern web experiences, and full-stack solutions.',
                <>Currently working at <span className="text-electric-blue font-medium">PTC Software</span> as an Associate Software Engineer, I contribute to ThingWorx Composer, enterprise mashup development, dynamic UI systems, and performance optimization for industrial IoT platforms.</>,
                'I continuously explore system design, data structures, full stack architecture, and performance engineering to build exceptional products.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={isInView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 30, filter: 'blur(6px)' }
                  }
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-white/60 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Interest tags with stagger + hover */}
            <div className="mt-8 flex flex-wrap gap-3">
              {interests.map((interest, i) => (
                <motion.div
                  key={interest.label}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={isInView
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.5, rotate: -10 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: `0 8px 25px ${interest.color}30`,
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] cursor-default hover:border-white/20 transition-colors"
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <interest.icon size={14} style={{ color: interest.color }} />
                  </motion.div>
                  <span className="text-sm text-white/60">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Stats & Card with parallax */}
          <motion.div style={{ y: parallaxY }} className="space-y-8">
            {/* Profile card with 3D tilt on scroll */}
            <motion.div
              style={{ rotateX: rotateCard }}
              initial={{ opacity: 0, x: 80, rotateY: 15 }}
              animate={isInView
                ? { opacity: 1, x: 0, rotateY: 0 }
                : { opacity: 0, x: 80, rotateY: 15 }
              }
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="perspective-1000"
            >
              <GlowCard className="p-8 relative overflow-hidden">
                {/* Animated gradient sweep inside card */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center text-2xl font-bold font-display"
                      animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.3)', '0 0 40px rgba(139,92,246,0.4)', '0 0 20px rgba(59,130,246,0.3)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      VD
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Vaibhav Deshmukh</h3>
                      <p className="text-sm text-white/50">Associate Software Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Company', value: 'PTC Software' },
                      { label: 'Focus', value: 'ThingWorx Composer & Full Stack' },
                      { label: 'Location', value: 'Pune, India' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-white/40">{item.label}</span>
                        <span className="text-white/80">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Stats grid with count-up animations */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.12,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                >
                  <GlowCard className="p-6">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
