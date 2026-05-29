import type { Metadata } from 'next'
import { inter, spaceGrotesk } from '@/styles/fonts'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vaibhav Deshmukh | Software Engineer',
  description: 'Associate Software Analyst at PTC Software. Building scalable enterprise systems, immersive user experiences, and intelligent software solutions.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Enterprise Software', 'ThingWorx', 'PTC Software'],
  authors: [{ name: 'Vaibhav Deshmukh' }],
  creator: 'Vaibhav Deshmukh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Vaibhav Deshmukh | Software Engineer',
    description: 'Building scalable enterprise systems, immersive user experiences, and intelligent software solutions.',
    siteName: 'Vaibhav Deshmukh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Deshmukh | Software Engineer',
    description: 'Building scalable enterprise systems, immersive user experiences, and intelligent software solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vaibhav Deshmukh',
  jobTitle: 'Associate Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'PTC Software',
  },
  url: 'https://vaibhavdeshmukh.dev',
  sameAs: [
    'https://github.com/VaibhavDeshmukh12',
    'https://linkedin.com/in/vaibhav-deshmukh-30428622a',
    'https://leetcode.com/u/vaibhav_64/',
  ],
  knowsAbout: ['Software Engineering', 'React', 'Next.js', 'TypeScript', 'ThingWorx', 'Enterprise Software', 'Full Stack Development'],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University of Pune',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground overflow-x-hidden`}>
        <a href="#home" className="skip-to-content">Skip to content</a>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
