'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-electric-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Glitchy 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative"
        >
          <h1 className="text-[8rem] md:text-[12rem] font-display font-bold leading-none gradient-text select-none">
            404
          </h1>
          {/* Glitch layers */}
          <motion.h1
            className="absolute inset-0 text-[8rem] md:text-[12rem] font-display font-bold leading-none text-electric-blue/20 select-none"
            animate={{ x: [-2, 2, -1, 0], opacity: [0.5, 0.8, 0.3, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'steps(4)' }}
          >
            404
          </motion.h1>
          <motion.h1
            className="absolute inset-0 text-[8rem] md:text-[12rem] font-display font-bold leading-none text-electric-purple/20 select-none"
            animate={{ x: [2, -2, 1, 0], opacity: [0.3, 0.6, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'steps(4)' }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-white/50 font-mono"
        >
          Page not found in the matrix
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-2 text-sm text-white/30"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue hover:bg-electric-blue/20 hover:border-electric-blue/50 transition-all duration-300 font-medium"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Terminal-style error */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 inline-block text-left font-mono text-xs text-white/20 bg-white/[0.02] border border-white/[0.05] rounded-lg p-4"
        >
          <p><span className="text-red-400/60">Error</span>: ENOENT</p>
          <p className="mt-1">  at resolve (navigation:1:1)</p>
          <p>  at render (portfolio:404:0)</p>
          <p className="mt-1 text-white/30">// Try going back home</p>
        </motion.div>
      </div>
    </div>
  )
}
