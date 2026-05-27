# Vaibhav Deshmukh — Premium Portfolio

A world-class personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js, and Lenis smooth scrolling.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion + GSAP
- **3D**: React Three Fiber + Three.js + Drei
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── effects/      # Visual effects (particles, cursor glow, gradients)
│   ├── layout/       # Navbar, Footer, ScrollProgress
│   ├── providers/    # Smooth scroll, animation providers
│   ├── sections/     # Hero, About, Experience, Skills, Projects, Education, Contact
│   ├── three/        # Three.js 3D components
│   └── ui/           # Reusable UI primitives
├── hooks/            # Custom React hooks
├── lib/              # Utilities, constants, animation presets
└── styles/           # Font configuration
```

## Features

- Cinematic dark theme with glassmorphism
- Full immersive 3D hero scene (interactive morphing sphere, particle clouds, orbital rings)
- Smooth scroll with Lenis
- Scroll-triggered animations
- Animated typing text
- Magnetic hover buttons
- 3D tilt cards
- Animated counters
- Progress indicators
- Responsive on all devices
- SEO optimized with full metadata
- Cursor glow trail
- Floating particle network
- Animated loading screen
- Command palette navigation
- Bento grid project showcase

## Deployment

Push to GitHub and connect to Vercel for automatic deployments.

## Customization

All portfolio data (experience, projects, skills, education) is centralized in `src/lib/constants.ts` for easy updates.

## License

MIT
