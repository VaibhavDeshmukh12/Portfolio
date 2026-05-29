'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, Heart, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/constants'

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: siteConfig.social.leetcode, label: 'LeetCode' },
  { icon: Mail, href: siteConfig.social.email, label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/917420950162', label: 'WhatsApp' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05]">
      {/* Animated gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & tagline */}
          <div>
            <motion.span
              className="text-2xl font-display font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              VD
            </motion.span>
            <p className="text-sm text-white/40 mt-2">
              Building exceptional software experiences.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon size={18} className="text-white/60" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Vaibhav Deshmukh
            </p>
            <p className="text-xs text-white/25 mt-1 flex items-center justify-end gap-1">
              Built with <Heart size={10} style={{ color: 'rgb(var(--accent-secondary))' }} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
