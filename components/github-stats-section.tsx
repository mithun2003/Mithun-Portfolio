'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitCommitHorizontal, ExternalLink } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;
const LEVEL_OPACITY = ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.22)', 'rgba(255,255,255,0.42)', 'rgba(255,255,255,0.65)', 'rgba(255,255,255,0.88)'];

interface GHEvent  { action: string; repo: string; time: string; }
interface GHDay    { date: string; count: number; level: number; }
interface GHData   { login: string; repos: number; followers: number; lastActive: string; totalLastYear: number; contributions: GHDay[]; events: GHEvent[]; }

function ContribGrid({ contributions }: { contributions: GHDay[] }) {
  const weeks: GHDay[][] = [];
  let week: GHDay[] = [];
  contributions.forEach((day, i) => {
    week.push(day);
    if (week.length === 7 || i === contributions.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  return (
    <div className="flex gap-[3px] overflow-hidden w-full">
      {weeks.map((wk, wi) => (
        <div key={wi} className="flex flex-col gap-[3px] flex-1 min-w-0">
          {wk.map((day, di) => (
            <div
              key={di}
              title={`${day.date}: ${day.count} contributions`}
              className="rounded-[2px]"
              style={{
                aspectRatio: '1',
                backgroundColor: LEVEL_OPACITY[day.level] ?? LEVEL_OPACITY[0],
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const [data, setData] = useState<GHData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => { 
        if (!d.error) {
          setData(d); 
        }
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      ref={ref}
      id="github"
      className="mt-[clamp(4rem,7vw,8rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="flex items-center gap-4 mb-8">
        <span
          className="text-[0.55rem] tracking-[0.28em] uppercase text-white/20 font-medium shrink-0"
        >
          Live on GitHub
        </span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <div
        className="relative border border-white/10 overflow-hidden rounded-xl"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        <div className="absolute top-0 right-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-px h-8 bg-white/18" />
          <div className="absolute top-0 right-0 w-8 h-px bg-white/18" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-px h-8 bg-white/18" />
          <div className="absolute bottom-0 left-0 w-8 h-px bg-white/18" />
        </div>

        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white/70" />
            </span>
            <span
              className="text-[0.58rem] tracking-[0.22em] uppercase text-white/40 font-medium"
            >
              {loading ? 'Fetching activity...' : `Active ${data?.lastActive ?? 'recently'}`}
            </span>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-200"
          >
            <span className="text-[0.55rem] tracking-[0.18em] uppercase">
              @{personalInfo.github.split('/').pop()}
            </span>
            <ExternalLink size={10} />
          </a>
        </div>

        {data && data.contributions.length > 0 && (
          <div className="px-6 pt-5 pb-5 border-b border-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[0.48rem] tracking-[0.2em] uppercase text-white/18">
                Contributions · Past Year
              </p>
              <p className="text-[0.52rem] tracking-[0.14em] uppercase font-semibold text-white/35">
                {data.totalLastYear.toLocaleString()} total
              </p>
            </div>
            <ContribGrid contributions={data.contributions} />
          </div>
        )}

        {data && (
          <div className="flex flex-wrap items-center gap-8 px-6 py-4 border-b border-white/6">
            {[
              { value: data.repos, label: 'Public Repos' },
              { value: data.followers, label: 'Followers' },
              { value: data.totalLastYear.toLocaleString(), label: 'Contributions / yr' },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-white/80 font-black leading-none tabular-nums text-3xl sm:text-4xl tracking-tight"
                >
                  {s.value}
                </p>
                <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/22 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="divide-y divide-white/6">
          {loading && (
            <div className="px-6 py-8 flex justify-center">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full bg-white/20"
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1, delay: i * 0.18, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          )}
          {!loading && data?.events.map((ev, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between px-6 py-4 group"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <GitCommitHorizontal size={12} className="text-white/20 shrink-0" />
                <span className="text-[0.7rem] text-white/35 shrink-0">
                  {ev.action}
                </span>
                <span className="text-[0.72rem] font-semibold text-white/70 truncate">
                  {ev.repo}
                </span>
              </div>
              <span className="text-[0.55rem] tracking-[0.14em] uppercase text-white/20 tabular-nums shrink-0 ml-4">
                {ev.time}
              </span>
            </motion.div>
          ))}
          {!loading && !data && (
            <p className="px-6 py-6 text-white/20 text-[0.72rem]">
              Could not load activity.
            </p>
          )}
        </div>

        <div className="px-6 py-3 border-t border-white/6">
          <p className="text-[0.48rem] tracking-[0.16em] uppercase text-white/12">
            Refreshes every hour · Public activity only
          </p>
        </div>
      </div>
    </motion.div>
  );
}
