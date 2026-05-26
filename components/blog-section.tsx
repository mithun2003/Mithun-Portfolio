'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const blogs = [
  {
    id: 1,
    title: 'Building Scalable APIs with FastAPI and PostgreSQL',
    excerpt: 'Learn how to build production-ready APIs with proper authentication, rate limiting, and database optimization techniques.',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    views: '2.4K',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
  {
    id: 2,
    title: 'Modern React Patterns Every Developer Should Know',
    excerpt: 'Exploring advanced React patterns including compound components, render props, and custom hooks for cleaner code.',
    date: 'Dec 28, 2023',
    readTime: '12 min read',
    views: '5.1K',
    tags: ['React', 'TypeScript', 'Patterns'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
  {
    id: 3,
    title: 'Mastering Git: Advanced Techniques for Teams',
    excerpt: 'From rebasing strategies to advanced branching workflows - everything you need for professional Git usage.',
    date: 'Nov 10, 2023',
    readTime: '10 min read',
    views: '3.8K',
    tags: ['Git', 'DevOps', 'Workflow'],
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=500&fit=crop',
    link: 'https://mithun003.medium.com/',
  },
]

function BlogCard({ blog, index }: { blog: typeof blogs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Link href={blog.link} target="_blank" className="block hoverable">
        <div className="floating-card rounded-2xl overflow-hidden">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Read indicator */}
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowUpRight className="w-5 h-5 text-background" />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {blog.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {blog.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {blog.views}
              </span>
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-border/30 mb-8"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="text-sm tracking-wider text-muted-foreground">THOUGHTS & INSIGHTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold"
          >
            Latest <span className="font-light italic text-muted-foreground/40">Blogs</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            Sharing knowledge and experiences from my journey in software development
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="https://mithun003.medium.com/"
            target="_blank"
            className="group relative inline-flex items-center gap-3 hoverable"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 rounded-full overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 gradient-border rounded-full" />
              <div className="absolute inset-[2px] bg-background rounded-full" />
              
              <span className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-wider">
                READ MORE ON MEDIUM
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Scrolling text decoration */}
        <motion.div
          style={{ x }}
          className="mt-20 overflow-hidden"
        >
          <div className="flex gap-8 text-[120px] font-bold text-muted/10 whitespace-nowrap">
            <span>ARTICLES</span>
            <span>&middot;</span>
            <span>TUTORIALS</span>
            <span>&middot;</span>
            <span>INSIGHTS</span>
            <span>&middot;</span>
            <span>ARTICLES</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
