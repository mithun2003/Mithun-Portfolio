'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    index: '01',
    title: 'Full Stack Development',
    short: 'End-to-end web applications.',
    body: 'React/Next.js front-end, FastAPI/Node.js back-end, PostgreSQL persistence. I handle architecture, API design, state management, and deployment — from zero to production.',
    keywords: ['React', 'Next.js', 'FastAPI', 'Node.js', 'PostgreSQL'],
  },
  {
    index: '02',
    title: 'AI & Machine Learning',
    short: 'Intelligent systems and models.',
    body: 'Deep learning models, image processing, natural language processing. I build AI-integrated solutions like watermark removers and healthcare diagnostics tools.',
    keywords: ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Gemini AI'],
  },
  {
    index: '03',
    title: 'Cloud & DevOps',
    short: 'AWS · Docker · CI/CD.',
    body: 'Container orchestration, GitHub Actions pipelines, zero-downtime deploys, environment management. I set up infrastructure that is scalable and reliable.',
    keywords: ['AWS', 'Docker', 'GitHub Actions', 'Terraform', 'Nginx'],
  },
  {
    index: '04',
    title: 'Ecommerce Systems',
    short: 'Payments, inventory, conversions.',
    body: 'Stripe integration, secure payment gateways, real-time inventory management, and optimized checkout flows. Headless or full-stack solutions.',
    keywords: ['Stripe', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    index: '05',
    title: 'Performance Audits',
    short: "Find and fix what's slow.",
    body: 'Database query optimization, frontend bundle reduction, and Core Web Vitals improvement. I find bottlenecks and eliminate them with data-driven evidence.',
    keywords: ['PostgreSQL', 'Lighthouse', 'Vercel', 'CDN'],
  },
];

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-5 shrink-0">
      <motion.span
        className="absolute left-0 top-1/2 block w-5 h-px bg-white/50 origin-center"
        animate={{ rotate: open ? 45 : 0, y: open ? 0 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ translateY: '-50%' }}
      />
      <motion.span
        className="absolute left-0 top-1/2 block w-5 h-px bg-white/50 origin-center"
        animate={{ rotate: open ? -45 : 90 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ translateY: '-50%' }}
      />
    </div>
  );
}

function ServiceRow({
  service,
  index,
  isOpen,
  hasOpenSibling,
  onToggle,
}: {
  service: typeof SERVICES[0];
  index: number;
  isOpen: boolean;
  hasOpenSibling: boolean;
  onToggle: () => void;
}) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const inView  = useInView(rowRef, { once: true, margin: '-8%' });
  const [hovered, setHovered] = useState(false);

  const rawX   = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 380, damping: 32 });

  return (
    <motion.div
      ref={rowRef}
      animate={{ opacity: hasOpenSibling ? 0.35 : 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="border-b border-white/8 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -16 }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-white/30 origin-top"
        animate={{ scaleY: hovered || isOpen ? 1 : 0, opacity: hovered || isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <button
        onClick={onToggle}
        onMouseEnter={() => { setHovered(true); rawX.set(10); }}
        onMouseLeave={() => { setHovered(false); rawX.set(0); }}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left pl-4 lg:pl-6"
      >
        <motion.div
          style={{ x: springX }}
          className="flex items-baseline gap-6 lg:gap-10 flex-1 min-w-0"
        >
          <motion.span
            className="text-[0.6rem] tracking-[0.2em] uppercase font-medium shrink-0 tabular-nums font-mono"
            animate={{ color: hovered || isOpen ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.22)' }}
            transition={{ duration: 0.25 }}
          >
            {service.index}
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-8 flex-1 min-w-0">
            <div className="overflow-hidden">
              <motion.h3
                className="font-black text-white tracking-tight leading-none text-2xl sm:text-4xl lg:text-5xl"
                initial={{ y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.75, delay: index * 0.09, ease: EASE }}
              >
                {service.title}
              </motion.h3>
            </div>

            <motion.p
              className="text-white/35 text-sm lg:text-base hidden lg:block shrink-0 uppercase tracking-widest text-[0.6rem]"
              animate={{ opacity: isOpen ? 0 : hovered ? 0.6 : 0.35 }}
              transition={{ duration: 0.2 }}
            >
              {service.short}
            </motion.p>
          </div>
        </motion.div>

        <div className="ml-4">
          <ToggleIcon open={isOpen} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-[calc(1rem+1.5rem+1.5rem)] lg:pl-[calc(1.5rem+2.5rem+2.5rem)] pr-4 lg:pr-6">
              <p
                className="text-white/50 leading-relaxed max-w-2xl mb-6 text-sm sm:text-base lg:text-lg"
              >
                {service.body.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4, delay: i * 0.022, ease: EASE }}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.keywords.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, y: 10, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.07, ease: EASE }}
                    className="border border-white/15 text-white/35 text-[0.58rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm"   
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      id="services"
      className="w-full bg-[#0A0A0A] relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block pointer-events-none">
        <div ref={lineRef} className="w-full h-full bg-white/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex items-center gap-4 mb-16">
          <motion.span
            className="text-[0.7rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
            initial={{ opacity: 0, x: -16 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            03 / Services
          </motion.span>
          <motion.div
            className="flex-1 h-px bg-white/10"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </div>

        <h2
          className="font-black text-white tracking-tight leading-[0.9] mb-16 text-5xl sm:text-6xl lg:text-8xl w-full flex"
        >
          <span className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            >
              What
            </motion.span>
          </span>
          <span className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              I
            </motion.span>
          </span>
          <span className="inline-block overflow-visible">
            <motion.span
              className="block italic font-normal text-white/30 font-mono"
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              Build
            </motion.span>
          </span>
        </h2>

        <motion.div
          className="border-t border-white/8"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={sectionInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.index}
              service={service}
              index={i}
              isOpen={openIndex === i}
              hasOpenSibling={openIndex !== null && openIndex !== i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
