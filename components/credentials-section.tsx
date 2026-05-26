'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { certifications as CERTIFICATIONS, personalInfo } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOAT_WORDS = [
  'Certified', 'Verified', '2025', 'Full Stack',
  'Harvard', 'Meta', 'AWS', 'Python',
  'Engineering', 'Development', 'Backend', 'Frontend',
  'Internship', 'PostgreSQL', 'Accredited', 'Remote',
  'Awarded', 'Completed', '3+ Years', 'Production',
];

function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const round = (n: number, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

interface FloatItem {
  id: number; word: string;
  x: number; y: number;
  rot: number; size: number;
  delay: number; dur: number;
  opacity: number;
}

function buildFloatItems(): FloatItem[] {
  return Array.from({ length: 18 }, (_, i) => {
    const r = (n: number) => sr(i * 13 + n + 7);
    const zone = Math.floor(r(0) * 4);
    let x: number, y: number;
    if      (zone === 0) { x = r(1) * 22 + 1;   y = r(2) * 80 + 8;  }
    else if (zone === 1) { x = r(1) * 22 + 75;  y = r(2) * 80 + 8;  }
    else if (zone === 2) { x = r(1) * 48 + 26;  y = r(2) * 16 + 2;  }
    else                 { x = r(1) * 48 + 26;  y = r(2) * 16 + 80; }
    return {
      id: i,
      word: FLOAT_WORDS[i % FLOAT_WORDS.length],
      x: round(x), y: round(y),
      rot:     round((r(3) - 0.5) * 12, 3),
      size:    round(0.75 + r(4) * 0.9, 4),
      delay:   round(r(5) * 3, 3),
      dur:     round(5 + r(6) * 5, 3),
      opacity: round(0.45 + r(7) * 0.35, 4),
    };
  });
}

function MagneticBtn({ href }: { href: string }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 28 });
  const y = useSpring(rawY, { stiffness: 300, damping: 28 });

  return (
    <motion.a
      href={href}
      download
      style={{ x, y, display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - rect.left - rect.width / 2) * 0.32);
        rawY.set((e.clientY - rect.top - rect.height / 2) * 0.32);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="group border border-white/20 px-8 py-4 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-300 rounded-full"
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
    >
      <span className="text-[0.65rem] tracking-[0.22em] uppercase font-medium">
        Download Resume
      </span>
      <ArrowDownRight
        size={13}
        className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200"
      />
    </motion.a>
  );
}

function CertRow({
  cert,
  index,
  hoveredIndex,
  onHover,
}: {
  cert: any;
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && !isHovered;
  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 380, damping: 32 });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: isDimmed ? 0.28 : 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="border-b border-white/8 relative overflow-hidden"
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-white/30 origin-top"
        animate={{ scaleY: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      <a
        href={cert.file}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 lg:gap-10 py-7 lg:py-9 w-full pl-4"
        onMouseEnter={() => { onHover(index); rawX.set(8); }}
        onMouseLeave={() => { onHover(null); rawX.set(0); }}
      >
        <motion.span
          className="text-[0.58rem] tracking-[0.22em] font-semibold tabular-nums shrink-0"
          animate={{ color: isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}
          transition={{ duration: 0.25 }}
        >
          {cert.num}
        </motion.span>

        <motion.div
          className="hidden lg:block h-px bg-white/10 shrink-0"
          style={{ width: '2rem' }}
          animate={{ scaleX: isHovered ? 1 : 0.5, opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div style={{ x }} className="flex-1 min-w-0">
          <span
            className="block font-black text-white tracking-[-0.03em] leading-none text-xl sm:text-2xl lg:text-3xl"
          >
            {cert.title}
          </span>
        </motion.div>

        <motion.span
          className="hidden md:block text-[0.6rem] tracking-[0.18em] uppercase font-medium shrink-0"
          animate={{ color: isHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)' }}
          transition={{ duration: 0.25 }}
        >
          {cert.issuer}
        </motion.span>

        <span
          className="text-[0.58rem] tracking-[0.18em] uppercase text-white/20 font-medium shrink-0 tabular-nums hidden sm:block"
        >
          {cert.year}
        </span>

        <motion.div
          className="shrink-0 w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm"
          animate={{
            borderColor: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)',
            backgroundColor: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ x: isHovered ? 1 : 0, y: isHovered ? -1 : 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <ArrowUpRight
              size={12}
              className="text-white/30 group-hover:text-white/80 transition-colors duration-200"
            />
          </motion.div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export function CredentialsSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const resumeRef    = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });
  const resumeInView  = useInView(resumeRef,  { once: true, margin: '-8%'  });
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const floatItems = useMemo(buildFloatItems, []);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="w-full bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block pointer-events-none">
        <div ref={lineRef} className="w-full h-full bg-white/20" />
      </div>

      {floatItems.map((item) => (
        <motion.span
          key={item.id}
          aria-hidden
          className="hidden md:block font-mono italic"
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            letterSpacing: '0.02em',
            rotate: item.rot,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, item.opacity, item.opacity * 0.7, item.opacity, 0],
            filter: ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(5px)'],
            y: [8, 0, -4, 0, -8],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: item.dur * 0.9,
            ease: 'easeInOut',
          }}
        >
          {item.word}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex items-center gap-4 mb-16">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
            initial={{ opacity: 0, x: -16 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            05 / Credentials
          </motion.span>
          <motion.div
            className="flex-1 h-px bg-white/10"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </div>

        <h2
          className="font-black text-white tracking-tight leading-[0.9] mb-16 text-5xl sm:text-7xl lg:text-9xl"
        >
          <span className="inline-block overflow-hidden mr-[0.22em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            >
              Proof
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden mr-[0.22em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              of
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden">
            <motion.span
              className="block italic font-normal text-white/20 font-mono"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              Work
            </motion.span>
          </span>
        </h2>

        <motion.div
          ref={resumeRef}
          className="relative border border-white/10 p-8 sm:p-12 mb-20 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 28 }}
          animate={resumeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(130deg, rgba(255,255,255,0.03) 0%, transparent 55%)',
            }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="flex flex-col gap-5">
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/22 font-medium">
                Resume · PDF · 2024
              </span>

              <div className="overflow-hidden">
                <motion.h3
                  className="font-black text-white tracking-tight leading-[0.92] text-4xl sm:text-6xl"
                  initial={{ y: '110%' }}
                  animate={resumeInView ? { y: 0 } : {}}
                  transition={{ delay: 0.22, duration: 0.75, ease: EASE }}
                >
                  {personalInfo.name}
                </motion.h3>
              </div>

              <p className="text-white/35 italic font-mono text-lg sm:text-xl">
                {personalInfo.role} — 3+ years · Remote
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {['Next.js', 'FastAPI', 'Django', 'PostgreSQL', 'AWS', 'Docker'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="border border-white/12 text-white/28 text-[0.52rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full"
                    initial={{ opacity: 0, y: 6 }}
                    animate={resumeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.52 + i * 0.06, duration: 0.38, ease: EASE }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={resumeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            >
              <MagneticBtn href="/resume.pdf" />
            </motion.div>
          </div>

          <div className="absolute top-0 right-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-px h-10 bg-white/18" />
            <div className="absolute top-0 right-0 w-10 h-px bg-white/18" />
          </div>
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-px h-10 bg-white/18" />
            <div className="absolute bottom-0 left-0 w-10 h-px bg-white/18" />
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[0.55rem] tracking-[0.28em] uppercase text-white/20 font-medium shrink-0">
              Certifications
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <motion.div
            className="border-t border-white/8"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            {CERTIFICATIONS.map((cert, i) => (
              <CertRow
                key={cert.num}
                cert={cert}
                index={i}
                hoveredIndex={hoveredCert}
                onHover={setHoveredCert}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
