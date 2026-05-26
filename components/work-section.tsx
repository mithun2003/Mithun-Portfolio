'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects as PROJECTS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const SCENE_COUNT = PROJECTS.length + 1;

function faceAtStop(i: number): number {
  if (i < 6) return i;
  return 1 + ((i - 2) % 4);
}

const FACE_TRANSFORMS: string[] = [
  'rotateX(-90deg) translateZ(calc(var(--ch) / 2))', // 0 top
  'translateZ(calc(var(--cw) / 2))',                  // 1 front
  'rotateY(90deg) translateZ(calc(var(--cw) / 2))',   // 2 right
  'rotateY(180deg) translateZ(calc(var(--cw) / 2))',  // 3 back
  'rotateY(-90deg) translateZ(calc(var(--cw) / 2))',  // 4 left
  'rotateX(90deg) translateZ(calc(var(--ch) / 2))',   // 5 bottom
];

function buildStops(n: number): { rx: number; ry: number }[] {
  const base = [
    { rx: 90,  ry: 0 },
    { rx: 0,   ry: 0 },
    { rx: 0,   ry: -90 },
    { rx: 0,   ry: -180 },
    { rx: 0,   ry: -270 },
    { rx: -90, ry: -360 },
  ];
  const out = base.slice(0, Math.min(n, 6));
  for (let i = 6; i < n; i++) {
    out.push({ rx: 0, ry: -360 - (i - 6) * 90 });
  }
  return out;
}

const STOPS = buildStops(SCENE_COUNT);
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function getCubeTransform(progress: number): { rx: number; ry: number } {
  const t = progress * (SCENE_COUNT - 1);
  const i = Math.min(Math.floor(t), SCENE_COUNT - 2);
  const f = easeIO(t - i);
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return { rx: a.rx + (b.rx - a.rx) * f, ry: a.ry + (b.ry - a.ry) * f };
}

function sceneFromProgress(progress: number): number {
  return Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));
}

const SWAP_RADIUS = 3;

function deriveFaceImages(stopIdx: number): (number | null)[] {
  const images: (number | null)[] = Array(6).fill(null);
  for (let offset = -SWAP_RADIUS; offset <= SWAP_RADIUS; offset++) {
    const si = stopIdx + offset;
    if (si < 0 || si >= SCENE_COUNT) continue;
    const fi = faceAtStop(si);
    const pi = si - 1; 
    if (pi >= 0 && pi < PROJECTS.length) {
      images[fi] = pi;
    }
  }
  return images;
}

function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    interface Dot {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      a: number;
      aMin: number;
      aMax: number;
      aDir: number;
      aSpd: number;
    }

    const COUNT = 160;
    const make = (): Dot => {
      const isStar = Math.random() < 0.25;
      const aMax = isStar ? 0.12 + Math.random() * 0.1 : 0.04 + Math.random() * 0.06;
      const aMin = aMax * 0.15;
      return {
        x: Math.random() * (w || window.innerWidth),
        y: Math.random() * (h || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14 - 0.025,
        r: isStar ? 0.75 + Math.random() * 0.9 : 0.35 + Math.random() * 0.55,
        a: aMin + Math.random() * (aMax - aMin),
        aMin,
        aMax,
        aDir: Math.random() < 0.5 ? 1 : -1,
        aSpd: 0.00025 + Math.random() * 0.0005,
      };
    };

    const dots: Dot[] = Array.from({ length: COUNT }, make);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < -2) d.x = w + 2;
        else if (d.x > w + 2) d.x = -2;
        if (d.y < -2) d.y = h + 2;
        else if (d.y > h + 2) d.y = -2;

        d.a += d.aSpd * d.aDir;
        if (d.a >= d.aMax) { d.a = d.aMax; d.aDir = -1; }
        else if (d.a <= d.aMin) { d.a = d.aMin; d.aDir = 1; }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a.toFixed(3)})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function ProjectCard({ project, align }: { project: any; align: 'left' | 'right' }) {
  const right = align === 'right';
  return (
    <div
      style={{
        padding: '1.75rem 1.5rem',
        background: 'rgba(12,12,12,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        borderLeft: right ? 'none' : '1px solid rgba(255,255,255,0.07)',
        borderRight: right ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
      className="font-sans"
    >
      <div
        style={{
          width: '2rem',
          height: '1px',
          background: 'rgba(255,255,255,0.5)',
          marginBottom: '1.1rem',
          marginLeft: right ? 'auto' : 0,
        }}
      />

      <p
        style={{
          fontSize: '0.5rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: '0.75rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.category}&nbsp;·&nbsp;{project.year}
      </p>

      <h3
        style={{
          fontWeight: 900,
          fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.88,
          color: 'rgba(255,255,255,0.92)',
          marginBottom: '0.9rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: '0.73rem',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.32)',
          marginBottom: '1rem',
          textAlign: right ? 'right' : 'left',
        }}
      >
        {project.description}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          marginBottom: '1.2rem',
          justifyContent: right ? 'flex-end' : 'flex-start',
        }}
      >
        {project.tech.map((t: string) => (
          <span
            key={t}
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.28)',
              fontSize: '0.48rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '0.18rem 0.5rem',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {project.link && project.link !== '#' && (
        <div style={{ display: 'flex', justifyContent: right ? 'flex-end' : 'flex-start' }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.5rem 0.9rem',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.07)';
              el.style.color = 'rgba(255,255,255,0.9)';
              el.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'transparent';
              el.style.color = 'rgba(255,255,255,0.45)';
              el.style.borderColor = 'rgba(255,255,255,0.14)';
            }}
          >
            View Project
            <ArrowUpRight size={9} />
          </a>
        </div>
      )}
    </div>
  );
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const hudPctRef = useRef<HTMLDivElement>(null);
  const hudFillRef = useRef<HTMLDivElement>(null);
  const hudSceneRef = useRef<HTMLDivElement>(null);
  const captionNumRef = useRef<HTMLDivElement>(null);
  const captionLabelRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);
  const activeSceneRef = useRef(0);
  const [faceImages, setFaceImages] = useState<(number | null)[]>(() => deriveFaceImages(0));

  useEffect(() => {
    if (!sectionRef.current || !cubeRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: containerRef.current,
        onUpdate(self) {
          const p = self.progress;

          const { rx, ry } = getCubeTransform(p);
          if (cubeRef.current) {
            cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
          }

          const pct = Math.round(p * 100);
          if (hudPctRef.current) {
            hudPctRef.current.textContent = String(pct).padStart(3, '0') + '%';
          }
          if (hudFillRef.current) {
            hudFillRef.current.style.width = `${pct}%`;
          }

          const newScene = sceneFromProgress(p);
          if (newScene !== activeSceneRef.current) {
            activeSceneRef.current = newScene;

            const label =
              newScene === 0 ? 'OVERVIEW' : PROJECTS[newScene - 1].category.toUpperCase();

            if (hudSceneRef.current) hudSceneRef.current.textContent = label;
            if (captionNumRef.current) {
              captionNumRef.current.textContent = String(newScene).padStart(2, '0');
            }
            if (captionLabelRef.current) captionLabelRef.current.textContent = label;

            setActiveScene(newScene);
            setFaceImages(deriveFaceImages(newScene));
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const project = activeScene > 0 ? PROJECTS[activeScene - 1] : null;
  const isRight = activeScene > 0 && activeScene % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ height: `${SCENE_COUNT * 100}vh`, background: '#0A0A0A', position: 'relative' }}
      className="w-full overflow-x-hidden"
    >
      <div ref={containerRef} style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <BackgroundCanvas />

          <div className="hidden md:block absolute inset-0" style={{ overflow: 'hidden' }}>
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-15%',
                width: '75vw',
                height: '75vw',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)',
              }}
              animate={{ x: [0, 40, -25, 0], y: [0, 30, -40, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                bottom: '-25%',
                right: '-18%',
                width: '70vw',
                height: '70vw',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.007) 45%, transparent 70%)',
              }}
              animate={{ x: [0, -35, 20, 0], y: [0, -25, 35, 0] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="absolute top-7 left-8 z-20 flex items-center gap-3">
          <span
            className="text-[0.52rem] tracking-[0.25em] uppercase font-medium text-white/20"
          >
            02 / Work
          </span>
          <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span
            className="text-[0.52rem] tracking-[0.25em] uppercase font-medium text-white/10"
          >
            {PROJECTS.length} Projects
          </span>
        </div>

        <div className="absolute top-7 right-8 z-20 text-right">
          <div
            ref={hudPctRef}
            className="font-mono text-[0.58rem] tracking-[0.18em] text-white/20"
          >
            000%
          </div>
          <div
            style={{
              width: '6rem',
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
              marginTop: '0.4rem',
              marginLeft: 'auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={hudFillRef}
              style={{
                position: 'absolute',
                inset: '0 auto 0 0',
                width: '0%',
                background: 'rgba(255,255,255,0.55)',
              }}
            />
          </div>
          <div
            ref={hudSceneRef}
            className="text-[0.45rem] tracking-[0.22em] uppercase text-white/20 mt-1"
          >
            OVERVIEW
          </div>
        </div>

        <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {Array.from({ length: SCENE_COUNT }, (_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: i === activeScene ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.18)',
                transform: i === activeScene ? 'scale(1.6)' : 'scale(1)',
                transition: 'background 0.3s, transform 0.3s',
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1100px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            ref={cubeRef}
            style={
              {
                '--cw': 'min(82vw, 850px)',
                '--ch': 'calc(var(--cw) * 9 / 16)',
                width: 'var(--cw)',
                height: 'var(--ch)',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: 'rotateX(90deg) rotateY(0deg)',
                flexShrink: 0,
              } as React.CSSProperties
            }
          >
            {([0, 1, 2, 3, 4, 5] as const).map((fi) => {
              const isCapFace = fi === 0 || fi === 5;
              return (
                <div
                  key={fi}
                  style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: FACE_TRANSFORMS[fi],
                    background: `
                      repeating-linear-gradient(0deg,   rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
                      repeating-linear-gradient(90deg,  rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
                      #0e0c0b
                    `,
                    ...(isCapFace
                      ? {
                          left: 0,
                          right: 0,
                          top: 'calc(50% - var(--cw) / 2)',
                          width: 'var(--cw)',
                          height: 'var(--cw)',
                        }
                      : { inset: 0 }),
                  }}
                >
                  {faceImages[fi] !== null && (
                    <>
                      <Image
                        src={PROJECTS[faceImages[fi]!].image}
                        alt={PROJECTS[faceImages[fi]!].title}
                        fill
                        className="object-cover"
                        quality={90}
                        sizes="(max-width: 768px) 90vw, 1400px"
                        priority
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.28)',
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="md:hidden"
            style={{
              marginTop: '0.75rem',
              width: 'min(72vw, 700px)',
              maxWidth: 'calc(100% - 2rem)',
              flexShrink: 0,
              pointerEvents: 'auto',
            }}
          >
            <AnimatePresence mode="wait">
              {activeScene > 0 && project && (
                <motion.div
                  key={`mob-${activeScene}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.32 }}
                >
                  <ProjectCard project={project} align="left" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {activeScene === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
              className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
              style={{ zIndex: 10 }}
            >
              <div style={{ textAlign: 'center', maxWidth: '32rem', padding: '0 1.5rem' }}>
                <p
                  className="text-[0.52rem] tracking-[0.28em] uppercase text-white/20 mb-6"
                >
                  Selected Work&nbsp;·&nbsp;{PROJECTS.length} Projects
                </p>
                <h2
                  className="font-black tracking-[-0.05em] leading-[0.88] text-white/90 text-7xl lg:text-8xl"
                >
                  Selected <br />
                  <span
                    className="italic font-normal text-white/20"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    Work
                  </span>
                </h2>
                <p
                  className="text-[0.65rem] tracking-[0.18em] uppercase text-white/15 mt-8"
                >
                  Scroll to explore
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="md:hidden absolute left-1/2 z-10 pointer-events-none"
          style={{
            top: activeScene === 0 ? '50%' : '3.5rem',
            transform: `translateX(-50%) translateY(${activeScene === 0 ? '-50%' : '0'})`,
            transition: 'top 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)',
            textAlign: 'center',
            maxWidth: 'calc(100vw - 4rem)',
            width: 'max-content',
          }}
        >
          <AnimatePresence mode="wait">
            {activeScene === 0 ? (
              <motion.div
                key="mob-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p
                  className="text-[0.52rem] tracking-[0.28em] uppercase text-white/20 mb-5"
                >
                  Selected Work&nbsp;·&nbsp;{PROJECTS.length} Projects
                </p>
                <h2
                  className="font-black tracking-[-0.05em] leading-[0.88] text-white/90 text-5xl"
                >
                  Selected <br />
                  <span
                    className="italic font-normal text-white/20"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    Work
                  </span>
                </h2>
                <p
                  className="text-[0.6rem] tracking-[0.18em] uppercase text-white/15 mt-7"
                >
                  Scroll to explore
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="mob-compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p
                  className="text-[0.42rem] tracking-[0.25em] uppercase text-white/18 mb-1"
                >
                  02 / Work
                </p>
                <h2
                  className="font-black tracking-[-0.04em] leading-[1] text-white/50 text-3xl whitespace-nowrap"
                >
                  Selected{' '}
                  <span
                    className="italic font-normal"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    Work
                  </span>
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="absolute hidden md:block z-10"
          style={{
            left: 'clamp(4rem, 7vw, 7rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(21rem, 28%)',
          }}
        >
          <AnimatePresence mode="wait">
            {!isRight && activeScene > 0 && project && (
              <motion.div
                key={`left-${activeScene}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.38 }}
              >
                <ProjectCard project={project} align="left" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="absolute hidden md:block z-10"
          style={{
            right: 'clamp(4rem, 7vw, 7rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(21rem, 28%)',
          }}
        >
          <AnimatePresence mode="wait">
            {isRight && activeScene > 0 && project && (
              <motion.div
                key={`right-${activeScene}`}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.38 }}
              >
                <ProjectCard project={project} align="right" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="absolute bottom-7 right-8 z-20"
          style={{ pointerEvents: 'none', textAlign: 'right' }}
        >
          <span
            className="font-mono text-[0.52rem] tracking-[0.18em] text-white/18"
          >
            {String(activeScene).padStart(2, '0')}&nbsp;/&nbsp;{String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        <div
          className="absolute bottom-7 left-1/2 z-20"
          style={{ transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}
        >
          <div
            ref={captionNumRef}
            className="font-mono text-[0.45rem] tracking-[0.3em] uppercase text-white/20 mb-1"
          >
            00
          </div>
          <div
            ref={captionLabelRef}
            className="font-black text-2xl lg:text-4xl tracking-[-0.03em] leading-[1] uppercase text-white/5"
          >
            OVERVIEW
          </div>
        </div>

      </div>
    </section>
  );
}
