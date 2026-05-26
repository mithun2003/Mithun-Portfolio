import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Mithun Thomas — Full Stack Developer & AI Specialist',
  description: 'Full Stack Developer specializing in building modern web applications with React, Next.js, Node.js, and AI integration. Based in Kerala, India. Available for remote work worldwide.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'FastAPI',
    'Python Developer',
    'AI Developer',
    'Web Development',
    'Software Engineering',
    'Mithun Thomas',
    'India',
    'Kerala',
    'Remote Developer'
  ],
  authors: [{ name: 'Mithun Thomas', url: 'https://mithunthomas.dev' }],
  creator: 'Mithun Thomas',
  publisher: 'Mithun Thomas',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mithunthomas.dev',
    languages: {
      'en-US': 'https://mithunthomas.dev',
    },
  },
  openGraph: {
    title: 'Mithun Thomas — Full Stack Developer & AI Specialist',
    description: 'Full Stack Developer specializing in building modern web applications with React, Next.js, Node.js, and AI integration.',
    type: 'website',
    url: 'https://mithunthomas.dev',
    siteName: 'Mithun Thomas',
    images: [
      {
        url: 'https://mithunthomas.dev/mithun_hero.png',
        width: 1200,
        height: 630,
        alt: 'Mithun Thomas - Full Stack Developer',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mithun Thomas — Full Stack Developer & AI Specialist',
    description: 'Full Stack Developer specializing in building modern web applications with React, Next.js, and AI.',
    images: ['https://mithunthomas.dev/mithun_hero.png'],
    creator: '@mithun_thomas._',
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
  manifest: '/manifest.json',
  verification: {
    google: 'googled1a6ace907b7a17c',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background overflow-x-hidden selection:bg-accent/30 selection:text-foreground">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mithun Thomas',
              url: 'https://mithunthomas.dev',
              image: 'https://mithunthomas.dev/mithun_hero.png',
              description: 'Full Stack Developer specializing in building modern web applications with React, Next.js, Node.js, and AI integration.',
              jobTitle: 'Full Stack Developer',
              location: {
                '@type': 'Place',
                name: 'Kerala, India',
              },
              sameAs: [
                'https://github.com/mithun2003',
                'https://www.linkedin.com/in/mithunthomas3897/',
                'https://twitter.com/mithun_thomas._',
                'https://www.instagram.com/mithun_thomas._/',
              ],
              email: 'mithunthomas3897@gmail.com',
              telephone: '+91 9895493897',
            }),
          }}
        />
        {/* Alternative JSON-LD for Portfolio */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mithun Thomas - Full Stack Developer',
              url: 'https://mithunthomas.dev',
              description: 'Portfolio of Mithun Thomas, Full Stack Developer',
              author: {
                '@type': 'Person',
                name: 'Mithun Thomas',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://mithunthomas.dev/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
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
