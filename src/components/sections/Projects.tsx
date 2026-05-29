'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects } from '@/lib/constants'
import { TiltCard } from '@/components/ui/tilt-card'
import { ExternalLink, Github, X, Layers, Globe, Server, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import { TextScramble } from '@/components/effects/TextScramble'
import { MagicParticles } from '@/components/effects/MagicParticles'

const categories = ['All', 'Full Stack', 'Enterprise', 'Frontend']

const categoryIcons: Record<string, typeof Layers> = {
  'Full Stack': Layers,
  'Enterprise': Server,
  'Frontend': Monitor,
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(var(--accent-secondary), 0.1)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(var(--accent-tertiary), 0.1)' }} />
      </motion.div>

      <MagicParticles count={15} color="rgba(236, 72, 153, 0.25)" />

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
            style={{ color: 'rgb(var(--accent-secondary))', borderColor: 'rgba(var(--accent-secondary), 0.2)' }}
          >
            <TextScramble text="Projects" delay={0.2} />
          </motion.span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            A selection of projects showcasing my technical capabilities
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] w-fit mx-auto"
          onMouseLeave={() => setHoveredFilter(null)}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              onMouseEnter={() => setHoveredFilter(category)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-4 py-2 text-sm rounded-full transition-colors duration-200 relative',
                activeFilter === category
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
              )}
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 rounded-full border border-white/[0.15]"
                  style={{ background: 'linear-gradient(to right, rgba(var(--accent-secondary), 0.1), rgba(var(--accent-tertiary), 0.1))', boxShadow: '0 0 12px rgba(var(--accent-secondary), 0.1)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {hoveredFilter === category && activeFilter !== category && (
                <motion.div
                  layoutId="projectFilterHover"
                  className="absolute inset-0 bg-white/[0.04] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-10 font-medium">{category}</span>
              {activeFilter === category && (
                <motion.div
                  layoutId="projectFilterDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'rgb(var(--accent-secondary))' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid - 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = categoryIcons[project.category] || Globe
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 80, scale: 0.9, filter: 'blur(10px)' }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 80, scale: 0.9, filter: 'blur(10px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 * index,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  layout
                >
                  <TiltCard>
                    <motion.div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer group relative rounded-2xl overflow-hidden bg-navy-800/50 border border-white/[0.06] hover:border-white/[0.25] transition-all duration-500 h-full backdrop-blur-sm"
                      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
                    >
                      {/* Gradient background with more prominence */}
                      <div className={cn(
                        'absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-60 transition-opacity duration-700',
                        project.gradient
                      )} />

                      {/* Animated corner accents */}
                      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(to right, ${project.accentColor}, transparent)` }} />
                        <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: `linear-gradient(to bottom, ${project.accentColor}, transparent)` }} />
                      </div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 right-0 w-full h-[1px]" style={{ background: `linear-gradient(to left, ${project.accentColor}, transparent)` }} />
                        <div className="absolute bottom-0 right-0 h-full w-[1px]" style={{ background: `linear-gradient(to top, ${project.accentColor}, transparent)` }} />
                      </div>

                      {/* Glow effect behind card on hover */}
                      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
                        style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}20, transparent 70%)` }}
                      />

                      {/* Card content */}
                      <div className="relative z-10 p-8 flex flex-col h-full">
                        {/* Top row: Icon + Category */}
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className="p-2.5 rounded-xl border"
                            style={{ borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}08` }}
                            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                          >
                            <CategoryIcon size={20} style={{ color: project.accentColor }} />
                          </motion.div>
                          <motion.span
                            className="px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm"
                            style={{ borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}15`, color: project.accentColor }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {project.category}
                          </motion.span>
                        </div>

                        {/* Title area */}
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: `${project.accentColor}99` }}>{project.subtitle}</p>
                        
                        {/* Description */}
                        <p className="text-sm text-white/60 mt-4 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Separator line */}
                        <div className="mt-6 mb-4 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-colors" />

                        {/* Tech stack with better styling */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 text-xs rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 group-hover:border-white/[0.2] group-hover:bg-white/[0.08] group-hover:text-white/90 transition-all duration-300 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Click hint */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                          <span className="text-[10px] text-white/40 font-mono">Click to explore</span>
                        </div>
                      </div>

                      {/* Bottom gradient accent line - always slightly visible, brighter on hover */}
                      <div className="absolute bottom-0 inset-x-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
                      />

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-navy-900 border border-white/[0.1] p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              >
                <X size={18} className="text-white/60" />
              </button>

              <span className="px-3 py-1 text-xs rounded-full bg-white/[0.05] border border-white/[0.1] text-white/60">
                {selectedProject.category}
              </span>

              <h3 className="text-2xl font-display font-bold text-white mt-4">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-white/40 mt-1">{selectedProject.subtitle}</p>
              <p className="text-white/60 mt-4 leading-relaxed">{selectedProject.description}</p>

              {/* Features */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(var(--accent-primary))' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white/80 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/[0.05] border border-white/[0.1] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
