import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CursorFollower } from '@/components/cursor-follower'
import { FloatingParticles } from '@/components/floating-particles'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist-sans'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: 'Mithun Thomas — Full Stack Developer',
  description: 'Full Stack Developer specializing in building modern web applications with React, Next.js, and Node.js. Based in India, available for remote work worldwide.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Node.js', 'Web Development', 'Mithun Thomas'],
  authors: [{ name: 'Mithun Thomas' }],
  openGraph: {
    title: 'Mithun Thomas — Full Stack Developer',
    description: 'Full Stack Developer specializing in building modern web applications',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mithun Thomas — Full Stack Developer',
    description: 'Full Stack Developer specializing in building modern web applications',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background overflow-x-hidden selection:bg-accent/30 selection:text-foreground">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden w-full relative`}>
        <FloatingParticles />
        <CursorFollower />
        <div className="relative z-10 w-full">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
