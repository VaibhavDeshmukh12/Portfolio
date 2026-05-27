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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground overflow-x-hidden`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
