'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { value: '3+', label: 'YEARS OF EXPERIENCE' },
  { value: '15+', label: 'PROJECTS SHIPPED' },
  { value: '10+', label: 'HAPPY CLIENTS' },
  { value: '5+', label: 'TECHNOLOGIES' },
]

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest text-muted-foreground mb-4"
        >
          01 / ABOUT
        </motion.div>

        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold mb-16"
        >
          About<span className="text-muted-foreground">Me</span>
        </motion.h2>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs tracking-widest text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-light leading-relaxed"
            >
              <span className="text-muted-foreground">&ldquo;</span>
              I build systems that don&apos;t just work — they scale, stay fast, and stay clean under pressure.
              <span className="text-muted-foreground">&rdquo;</span>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              3+ years of experience building full-stack applications for clients worldwide. 
              From B2B SaaS platforms to e-commerce solutions, I work end-to-end: architecture, 
              backend, front-end, and deployment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed"
            >
              Core stack: React, Next.js, Node.js, Python, PostgreSQL. Also fluent in TypeScript, 
              AWS, Docker, and CI/CD pipelines. I care about the whole system — not just the feature.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link
                href="https://github.com/mithun2003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border px-5 py-3 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                <Github className="w-4 h-4" />
                GITHUB
              </Link>
              <Link
                href="https://www.linkedin.com/in/mithunthomas3897/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border px-5 py-3 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LINKEDIN
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face"
                alt="Mithun Thomas"
                fill
                className="object-cover rounded-2xl grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
