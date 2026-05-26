'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  'Next.js',     'FastAPI',      'Django',        'PostgreSQL',
  'Redis',       'Docker',       'AWS',           'WebSockets',
  'TypeScript',  'React',        'Node.js',       'Python',
  'Microservices','REST APIs',   'CI/CD',         'Nginx',
  'Scalable',    'Resilient',    'Performant',    'Real-time',
  'Idempotent',  'Distributed',  'Type-safe',     'Secure',
];

const LINE1 = 'Built to Scale.';
const LINE2 = 'Engineered.';

function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

interface FloatWord {
  id: number; word: string;
  x: number; y: number;
  rot: number; size: number;
  delay: number; dur: number;
  opacity: number;
}

const round = (n: number, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

function buildFloatWords(): FloatWord[] {
  return Array.from({ length: 22 }, (_, i) => {
    const r = (n: number) => sr(i * 17 + n);
    const zone = Math.floor(r(0) * 4);
    let x: number, y: number;
    if      (zone === 0) { x = r(1) * 26 + 1;   y = r(2) * 85 + 7;  }
    else if (zone === 1) { x = r(1) * 26 + 73;  y = r(2) * 85 + 7;  }
    else if (zone === 2) { x = r(1) * 50 + 25;  y = r(2) * 18 + 2;  }
    else                 { x = r(1) * 50 + 25;  y = r(2) * 18 + 78; }
    return {
      id: i,
      word: WORDS[i % WORDS.length],
      x: round(x, 3),
      y: round(y, 3),
      rot:     round((r(3) - 0.5) * 14, 3),
      size:    round(1.0 + r(4) * 1.1, 4),
      delay:   round(r(5) * 2.5, 3),
      dur:     round(5 + r(6) * 5, 3),
      opacity: round(0.45 + r(7) * 0.35, 4),
    };
  });
}

const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({ target, suffix = '+', duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function StackSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const charRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const words       = useMemo(buildFloatWords, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const RADIUS = 90;

    const onMove = (e: MouseEvent) => {
      charRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0) {
          const p = (RADIUS - dist) / RADIUS;
          const mx = (dx / dist) * p * -24;
          const my = (dy / dist) * p * -24;
          el.style.transform = `translate(${mx}px,${my}px) scale(${1 + p * 0.06})`;
          el.style.opacity = String(1 - p * 0.45);
        } else {
          el.style.transform = '';
          el.style.opacity   = '';
        }
      });
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const l1 = LINE1.split('');
  const l2 = LINE2.split('');

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative w-full min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      {words.map((w) => (
        <motion.span
          key={w.id}
          aria-hidden
          className="absolute font-mono italic pointer-events-none select-none whitespace-nowrap"
          style={{
            left: `${w.x}%`,
            top: `${w.y}%`,
            fontSize: `${w.size}rem`,
            letterSpacing: '0.02em',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, w.opacity, w.opacity * 0.7, w.opacity, 0],
            filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
            y: [8, 0, -4, 0, -8],
            color: [
              'rgba(255,255,255,0.6)',
              'rgba(255,255,255,0.9)',
              'rgba(255,255,255,0.7)',
              'rgba(255,255,255,0.9)',
              'rgba(255,255,255,0.6)',
            ],
          }}
          transition={{
            duration: w.dur,
            delay: w.delay,
            repeat: Infinity,
            repeatDelay: w.dur * 0.8,
            ease: 'easeInOut',
          }}
        >
          {w.word}
        </motion.span>
      ))}

      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: '55vw',
          height: '55vw',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 45%, transparent 70%)',   
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.006) 50%, transparent 70%)',   
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="text-center relative z-10 px-6 sm:px-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <motion.p
          className="text-[0.52rem] tracking-[0.28em] uppercase text-white/18 mb-8 sm:mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          Technologies
        </motion.p>

        <h2
          className="font-black tracking-tight leading-[0.9] text-white/90 text-5xl sm:text-7xl lg:text-9xl mb-0 block font-sans"
        >
          {l1.map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el; }}
              className="inline-block transition-transform duration-300 ease-out transition-opacity"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <h2
          className="font-normal italic leading-[0.9] text-white/10 text-5xl sm:text-7xl lg:text-9xl mb-0 block font-mono"
        >
          {l2.map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[l1.length + i] = el; }}
              className="inline-block transition-transform duration-300 ease-out transition-opacity"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <motion.div
          className="w-10 h-px bg-white/10 my-10 sm:my-16 mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        />

        <motion.p
          className="text-[0.6rem] sm:text-xs tracking-[0.18em] uppercase text-white/20 max-w-md mx-auto leading-loose"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        >
          Production-grade systems built with<br />a modern, battle-tested stack.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-14 mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        >
          {[
            { target: 3,  label: 'Years' },
            { target: 25, label: 'Projects' },
            { target: 12, label: 'Technologies' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className="font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white/70 leading-none"
              >
                <CountUp target={stat.target} duration={1600 + idx * 200} />
              </div>
              <div
                className="text-[0.7rem] tracking-[0.22em] uppercase text-white/20 mt-2"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
