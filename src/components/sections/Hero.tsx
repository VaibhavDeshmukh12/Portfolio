'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Code2, MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { siteConfig, rotatingTitles } from '@/lib/constants'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { GradientMesh } from '@/components/effects/GradientMesh'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  if (hour >= 17 && hour < 21) return 'Good evening'
  return 'Hello, night owl'
}

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then(mod => ({ default: mod.HeroScene })),
  { ssr: false }
)

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: siteConfig.social.leetcode, label: 'LeetCode' },
  { icon: Mail, href: siteConfig.social.email, label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/917420950162', label: 'WhatsApp' },
]

export function Hero() {
  const greeting = useMemo(() => getGreeting(), [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient mesh */}
      <GradientMesh />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-sm text-white/60">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {greeting} — Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
          >
            <span className="text-white">Vaibhav</span>{' '}
            <span className="gradient-text">Deshmukh</span>
          </motion.h1>

          {/* Role */}
          <motion.div variants={staggerItem} className="mt-4 md:mt-6">
            <p className="text-lg md:text-xl text-white/60">
              {siteConfig.role} at{' '}
              <span className="text-electric-blue font-medium">{siteConfig.company}</span>
            </p>
          </motion.div>

          {/* Typing Animation */}
          <motion.div variants={staggerItem} className="mt-4 h-8 md:h-10">
            <TypingAnimation
              words={rotatingTitles}
              className="text-lg md:text-2xl font-display text-white/80"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={staggerItem}
            className="mt-6 text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="bg-electric-blue/10 border-electric-blue/30 hover:bg-electric-blue/20"
            >
              <span className="text-electric-blue">View Projects</span>
            </MagneticButton>
            <MagneticButton
              href={siteConfig.resumeUrl}
              className="bg-electric-purple/10 border-electric-purple/30 hover:bg-electric-purple/20"
            >
              <span className="text-electric-purple">Download Resume</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="bg-electric-cyan/10 border-electric-cyan/30 hover:bg-electric-cyan/20"
            >
              <span className="text-electric-cyan">Contact Me</span>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={staggerItem}
            className="mt-10 flex items-center justify-center gap-3"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon size={20} className="text-white/60" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
