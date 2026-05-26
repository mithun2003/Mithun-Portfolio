'use client'

import { motion, useInView } from 'framer-motion'
import { Github, Code2 } from 'lucide-react'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'

// Generate random contribution data
const generateContributions = () => {
  const weeks = 7
  const days = 7
  const contributions = []
  
  for (let w = 0; w < weeks; w++) {
    const week = []
    for (let d = 0; d < days; d++) {
      // Random contribution level (0-4)
      week.push(Math.floor(Math.random() * 5))
    }
    contributions.push(week)
  }
  return contributions
}

const contributions = generateContributions()

const languages = [
  { name: 'Python', percentage: 35, color: 'from-cyan-400 to-cyan-500' },
  { name: 'TypeScript', percentage: 25, color: 'from-purple-400 to-purple-500' },
  { name: 'JavaScript', percentage: 20, color: 'from-yellow-400 to-yellow-500' },
  { name: 'Java', percentage: 15, color: 'from-blue-400 to-blue-500' },
  { name: 'Other', percentage: 5, color: 'from-gray-400 to-gray-500' },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * value))
        if (progress < 1) requestAnimationFrame(animate)
      }
      animate()
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

function ContributionGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const getContributionColor = (level: number) => {
    const colors = [
      'bg-blue-950/50',
      'bg-blue-800/60',
      'bg-blue-600/70',
      'bg-blue-500/80',
      'bg-blue-400',
    ]
    return colors[level]
  }

  return (
    <div ref={ref} className="grid grid-cols-7 gap-1.5">
      {contributions.map((week, weekIndex) =>
        week.map((level, dayIndex) => (
          <motion.div
            key={`${weekIndex}-${dayIndex}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: (weekIndex * 7 + dayIndex) * 0.02,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className={`w-5 h-5 rounded-sm ${getContributionColor(level)} transition-all duration-300 hover:scale-125 hover:brightness-125`}
          />
        ))
      )}
    </div>
  )
}

function LanguageBar({ language, index }: { language: typeof languages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{language.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-muted-foreground"
        >
          {language.percentage}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${language.percentage}%` } : {}}
          transition={{ delay: index * 0.1, duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${language.color}`}
        />
      </div>
    </div>
  )
}

function DonutChart() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const size = 200
  const strokeWidth = 30
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  let offset = 0
  const colors = ['#22d3ee', '#a855f7', '#fbbf24', '#3b82f6', '#6b7280']

  return (
    <svg ref={ref} width={size} height={size} className="transform -rotate-90">
      {languages.map((lang, index) => {
        const percentage = lang.percentage
        const strokeDasharray = (percentage / 100) * circumference
        const currentOffset = offset
        offset += strokeDasharray
        
        return (
          <motion.circle
            key={lang.name}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors[index]}
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeDasharray} ${circumference}`}
            strokeDashoffset={-currentOffset}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 1.5, ease: 'easeOut' }}
            className="transition-all duration-300 hover:brightness-125"
          />
        )
      })}
    </svg>
  )
}

export function GitHubStatsSection() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground">CONTRIBUTIONS</span>
          <h2 className="text-5xl md:text-7xl font-bold mt-4">
            GitHub <span className="font-light italic text-muted-foreground/40">Stats</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="floating-card rounded-2xl p-8 relative overflow-hidden group"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-2px] rounded-2xl gradient-border opacity-30" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Github className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">GitHub Stats</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                Contribution Activity (Last 12 Months)
              </p>
              
              <ContributionGrid />
              
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-sm ${
                        level === 0 ? 'bg-blue-950/50' :
                        level === 1 ? 'bg-blue-800/60' :
                        level === 2 ? 'bg-blue-600/70' :
                        level === 3 ? 'bg-blue-500/80' :
                        'bg-blue-400'
                      }`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Link
                  href="https://github.com/mithun2003"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hoverable"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Profile
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, rotateY: -5 }}
            className="floating-card rounded-2xl p-8 relative overflow-hidden group"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-2px] rounded-2xl gradient-border opacity-30" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Top Languages</h3>
              </div>
              
              <div className="space-y-5 mb-8">
                {languages.map((lang, index) => (
                  <LanguageBar key={lang.name} language={lang} index={index} />
                ))}
              </div>
              
              <div className="flex justify-center">
                <DonutChart />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { label: 'Repositories', value: 45 },
            { label: 'Commits', value: 1247 },
            { label: 'Stars', value: 89 },
            { label: 'Contributions', value: 523 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-xl bg-muted/10 border border-border/30 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
