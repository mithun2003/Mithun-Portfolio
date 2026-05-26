'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { experiences } from '@/lib/data'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080&fit=crop"
          alt=""
          fill
          className="object-cover grayscale"
          sizes="100vw"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest text-muted-foreground mb-4"
        >
          04 / EXPERIENCE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold mb-16"
        >
          Work<span className="text-muted-foreground">History</span>
        </motion.h2>

        {/* Experience timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group grid md:grid-cols-[200px_1fr_200px] gap-8 py-12 border-t border-border items-start"
            >
              {/* Year */}
              <div className="text-6xl md:text-8xl font-bold text-muted-foreground/30 group-hover:text-accent/30 transition-colors">
                {exp.year}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold group-hover:text-accent transition-colors">
                  {exp.role}
                </h3>
                <p className="text-sm tracking-widest text-muted-foreground uppercase">
                  {exp.company}
                </p>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs tracking-wider text-muted-foreground border border-border px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Index */}
              <div className="text-right text-sm tracking-widest text-muted-foreground hidden md:block">
                {String(index + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
