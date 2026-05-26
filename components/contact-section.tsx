'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export function ContactSection() {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest text-muted-foreground mb-4"
        >
          05 / CONTACT
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold mb-8"
        >
          Let&apos;s<span className="text-muted-foreground"> Talk.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-12"
        >
          Have a project in mind? Looking for a developer to join your team? 
          I&apos;m always open to discussing new opportunities and interesting projects.
        </motion.p>

        {/* Contact buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link
            href="mailto:mithunthomas3897@gmail.com"
            className="flex items-center gap-2 bg-foreground text-background px-6 py-4 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            SEND A MESSAGE
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/mithunthomas3897/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border px-6 py-4 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            LINKEDIN
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden"
        >
          <div className="bg-background p-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs tracking-widest">LOCATION</span>
            </div>
            <p className="text-lg font-medium">Remote · Worldwide</p>
          </div>
          <div className="bg-background p-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs tracking-widest">RESPONSE</span>
            </div>
            <p className="text-lg font-medium">Within 24 hours</p>
          </div>
          <div className="bg-background p-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs tracking-widest">STATUS</span>
            </div>
            <p className="text-lg font-medium">Available for projects</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
