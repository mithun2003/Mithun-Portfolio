'use client'

import { motion } from 'framer-motion'
import { skillCategories, marqueeItems } from '@/lib/data'

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest text-muted-foreground mb-4"
        >
          04 / SKILLS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold mb-8"
        >
          Built to<span className="text-muted-foreground"> Scale.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-16"
        >
          A comprehensive toolkit for building modern, scalable applications. 
          From frontend interfaces to backend systems, I bring the full stack together.
        </motion.p>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-background/50 rounded-2xl border border-border"
            >
              <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-8 border-y border-border">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className="text-4xl md:text-6xl font-bold text-muted-foreground/20 mx-8"
            >
              {item}
              <span className="mx-8">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
