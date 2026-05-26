'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'B2B / B2C MARKETPLACE',
    year: '2024',
    description: 'Dual-sided marketplace platform with real-time inventory, Redis-cached feeds, React seller dashboard. 30% DB latency reduction.',
    tech: ['REACT', 'NODE.JS', 'POSTGRESQL', 'REDIS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'Project Dashboard',
    category: 'SAAS PLATFORM',
    year: '2024',
    description: 'Full stack project management dashboard with secure team collaboration, analytics tracking, and automated workflow features.',
    tech: ['NEXT.JS', 'TYPESCRIPT', 'AWS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'FinTech Mobile App',
    category: 'FINANCIAL PLATFORM',
    year: '2023',
    description: 'A secure financial tracking app with expense analytics, budget planning, real-time notifications and multi-currency support.',
    tech: ['REACT NATIVE', 'NODE.JS', 'MONGODB'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
    link: '#',
  },
]

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative w-full mb-16"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main project container */}
      <motion.div 
        style={{ scale }}
        className="relative w-full min-h-[85vh] flex items-center rounded-3xl overflow-hidden"
      >
        {/* Large background image with parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />
          
          {/* Mouse follow light effect */}
          {isHovered && (
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, oklch(0.5 0.1 250 / 0.15), transparent 70%)',
                left: mousePosition.x - 300,
                top: mousePosition.y - 300,
              }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>

        {/* Floating info card - positioned on the right like reference */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
          className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-20"
        >
          <div className="floating-card rounded-2xl p-8 w-[320px] md:w-[380px] relative overflow-hidden group">
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 50% 50%, oklch(0.5 0.1 250 / 0.2), transparent 70%)',
              }}
            />
            
            <div className="relative z-10">
              {/* Category and year */}
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground mb-4">
                <span>{project.category}</span>
                <span>&middot;</span>
                <span>{project.year}</span>
              </div>
              
              {/* Title with hover effect */}
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.title}
              </motion.h3>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-xs tracking-wider text-muted-foreground border border-border/30 px-3 py-1.5 rounded-full hover:border-foreground/50 hover:text-foreground transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              {/* View project button */}
              <MagneticButton>
                <Link 
                  href={project.link}
                  className="inline-flex items-center gap-2 border border-border/50 px-6 py-3 rounded-full text-sm tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 hoverable group/btn"
                >
                  VIEW PROJECT
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </motion.span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Project number indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10"
        >
          <span className="text-xs tracking-[0.5em] text-muted-foreground">
            0{index + 1} / 0{projects.length}
          </span>
        </motion.div>
      </motion.div>

      {/* Category banner at bottom with stagger animation */}
      <div className="w-full overflow-hidden py-6 border-t border-border/10">
        <motion.div
          initial={{ x: '-100%' }}
          whileInView={{ x: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center"
        >
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-muted/10 tracking-wider whitespace-nowrap">
            {project.category}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section id="work" ref={containerRef} className="py-32 relative">
      {/* Animated background gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-[0.3em] text-muted-foreground mb-8"
          >
            SELECTED WORK &middot; {projects.length} PROJECTS
          </motion.div>

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-7xl md:text-9xl font-bold leading-none"
            >
              Selected
            </motion.h2>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, type: 'spring' }}
              className="text-7xl md:text-9xl font-light italic text-muted-foreground/20"
            >
              Work
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <p className="text-sm tracking-[0.3em] text-muted-foreground">
              SCROLL TO EXPLORE
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Overview label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground">
            &middot;&middot;
          </span>
          <h3 className="text-4xl md:text-6xl font-bold text-muted-foreground/10 mt-4">
            OVERVIEW
          </h3>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* See More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="https://github.com/mithun2003" target="_blank" className="hoverable">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden group"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 gradient-border rounded-full" />
              <div className="absolute inset-[2px] bg-background rounded-full" />
              
              {/* Hover fill effect */}
              <motion.div
                className="absolute inset-[2px] bg-foreground rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <span className="relative z-10 text-sm font-medium tracking-wider group-hover:text-background transition-colors duration-300">
                VIEW ALL PROJECTS
              </span>
              <ExternalLink className="relative z-10 w-4 h-4 group-hover:text-background transition-colors duration-300" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
