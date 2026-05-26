'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'WORK', href: '#work' },
  { name: 'SERVICES', href: '#services' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CREDENTIALS', href: '#credentials' },
];

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 32, mass: 0.75 };

function NavLink({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 px-3.5 py-2 rounded-full text-[0.63rem] font-medium tracking-widest uppercase text-white/55 hover:text-white hover:bg-white/8 transition-all duration-200 whitespace-nowrap font-sans"
    >
      {name}
    </Link>
  );
}

function HireBtn() {
  return (
    <Link
      href="#contact"
      className="group flex items-center bg-white rounded-full overflow-hidden hover:bg-white/80 transition-colors duration-200 shrink-0"
    >
      <span
        className="pl-4 pr-1.5 py-1.75 text-black text-[0.61rem] font-medium tracking-[0.14em] uppercase whitespace-nowrap font-sans"
      >
        Hire Me
      </span>
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 group-hover:bg-black/15 transition-colors mr-0.5 shrink-0">
        <ArrowRight size={11} className="text-black" />
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedW, setExpandedW] = useState(900);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const calc = () => {
      const padding = Math.min(Math.max(window.innerWidth * 0.04, 20), 80);
      setExpandedW(Math.min(window.innerWidth - padding * 2, 900));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      // Disable scroll on body and html
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.documentElement.style.overflow = 'unset';
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const COMPACT_W = 700;
  const targetW = scrolled ? expandedW : COMPACT_W;

  return (
    <>
      {/* DESKTOP */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block pointer-events-none">
        <div className="absolute top-4 inset-x-0 flex justify-center">
          <motion.div
            animate={{ width: targetW }}
            transition={SPRING}
            className="pointer-events-auto flex items-center rounded-full relative"
            style={{
              backdropFilter: scrolled ? 'blur(16px)' : 'blur(28px)',
              WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(28px)',
              backgroundColor: scrolled ? 'rgba(10,10,10,0.75)' : 'rgba(10,10,10,0.95)',
              border: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: scrolled
                ? '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
                : '0 8px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
              padding: '6px 10px 6px 14px',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-xs font-bold text-background">MT</span>
              </div>
            </Link>

            {/* Separator */}
            <div className="h-5 w-px bg-white/12 shrink-0 mr-1" />

            {/* Nav links */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
              {NAV_LINKS.map((l) => <NavLink key={l.name} {...l} />)}
            </div>

            <div className="flex-1" />

            {/* Separator */}
            <div className="h-5 w-px bg-white/12 shrink-0 ml-1 mr-3" />

            {/* CTA */}
            <HireBtn />
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden pointer-events-none">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-50">
          {/* Logo pill */}
          <Link
            href="/"
            className="flex items-center rounded-full px-4 py-2"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              backgroundColor: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
            }}
          >
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-background">MT</span>
            </div>
            <span className="font-semibold tracking-tight text-xs uppercase text-white">
              {personalInfo.firstName}
            </span>
          </Link>

          {/* Menu pill - with better z-index */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-full w-12 h-12 transition-colors hover:bg-white/10 relative z-50"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              backgroundColor: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 bg-black/95 backdrop-blur-2xl pt-24 px-6 pb-20 flex flex-col pointer-events-auto overflow-y-auto z-40"
              onClick={() => setMobileOpen(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-white/8 py-5"
                    >
                      <span className="font-bold text-3xl tracking-tight text-white uppercase">
                        {link.name}
                      </span>
                      <ArrowRight size={18} className="text-white/20" />
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-auto pt-8">
                  <Link
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 bg-white text-black rounded-full py-4 w-full"
                  >
                    <span className="text-[0.68rem] font-medium tracking-[0.18em] uppercase font-sans">
                      Hire Me
                    </span>
                    <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowRight size={10} className="text-black" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
