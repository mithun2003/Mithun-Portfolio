import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CursorFollower } from '@/components/cursor-follower'
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
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <CursorFollower />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
