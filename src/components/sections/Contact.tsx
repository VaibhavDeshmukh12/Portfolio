'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { siteConfig } from '@/lib/constants'
import { Github, Linkedin, Mail, Code2, Send, MessageCircle } from 'lucide-react'
import { TextScramble } from '@/components/effects/TextScramble'
import { MagicParticles } from '@/components/effects/MagicParticles'
import { WordReveal } from '@/components/effects/TextReveal'

const contactLinks = [
  { icon: Mail, href: siteConfig.social.email, label: 'Email', detail: siteConfig.email },
  { icon: Github, href: siteConfig.social.github, label: 'GitHub', detail: 'VaibhavDeshmukh12' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn', detail: 'Vaibhav Deshmukh' },
  { icon: Code2, href: siteConfig.social.leetcode, label: 'LeetCode', detail: 'vaibhav_64' },
  { icon: MessageCircle, href: 'https://wa.me/917420950162', label: 'WhatsApp', detail: '+91 74209 50162' },
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.3])

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ scale: backgroundScale, opacity: backgroundOpacity }}
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-electric-blue/20 via-electric-purple/10 to-electric-cyan/20 blur-3xl" />
      </motion.div>

      {/* Floating particles */}
      <MagicParticles count={18} color="rgba(59, 130, 246, 0.3)" />

      <div ref={ref} className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block text-sm font-mono text-electric-cyan tracking-wider uppercase px-4 py-1.5 rounded-full border border-electric-cyan/20 bg-electric-cyan/5">
              <TextScramble text="Contact" delay={0.2} />
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-6 text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
          >
            <WordReveal text="Let's build something" className="text-white" delay={0.2} />
            <br />
            <WordReveal text="exceptional together." className="gradient-text" delay={0.6} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-white/50 text-lg max-w-xl mx-auto"
          >
            I&apos;m always open to discussing new opportunities, interesting projects, and collaborations.
          </motion.p>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400">Available for opportunities</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
            className="mt-10"
          >
            <MagneticButton
              href={siteConfig.social.email}
              className="px-8 py-4 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 border-white/20 hover:border-white/30"
            >
              <Send size={16} className="mr-2 inline" />
              <span className="text-white text-base">Get in Touch</span>
            </MagneticButton>
          </motion.div>

          {/* Contact links grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' }}
                animate={isInView
                  ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                  : { opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <link.icon size={24} className="text-white/40 group-hover:text-electric-blue transition-colors mx-auto" />
                </motion.div>
                <p className="text-sm font-medium text-white/80 mt-3 text-center">{link.label}</p>
                <p className="text-xs text-white/40 mt-1 text-center truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300" title={link.detail}>{link.detail}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
