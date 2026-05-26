'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { techStack, personalInfo } from '@/lib/data'

export function HeroSection() {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm tracking-widest text-muted-foreground uppercase">{personalInfo.availability}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm tracking-widest text-muted-foreground uppercase"
            >
              {personalInfo.workType}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold leading-none"
            >
              <span className="block">{personalInfo.firstName}</span>
              <span className="block text-muted-foreground">{personalInfo.lastName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-md"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs tracking-wider text-muted-foreground border border-border px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="#work"
                className="flex items-center gap-2 border border-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                VIEW WORK
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                CONTACT
              </Link>
            </motion.div>
          </div>

          {/* Right content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden"
          >
            <div className="relative w-full aspect-square max-w-md lg:max-w-lg mx-auto overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-linear-to-t from-muted/20 via-muted/10 to-transparent rounded-3xl" />
              {/* <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face"
                alt={personalInfo.name}
                fill
                className="object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-500"
                priority
              /> */}
              <Image
                src= "/mithun_hero.webp"
                alt={personalInfo.name}
                fill
                className="object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-500"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-muted-foreground">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>

      {/* Side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <span className="text-xs tracking-widest text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          FULL STACK · 3+ YEARS · REMOTE
        </span>
      </motion.div>
    </section>
  )
}
