'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { asset } from '@/lib/asset';
import { CATEGORIES, catLabel, type FilterId } from '@/lib/types';
import { WORKS } from '@/lib/works';
import { Reveal } from './Reveal';

export function WorkGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  const [activeCat, setActiveCat] = useState<FilterId>('all');

  const counts = useMemo(() => {
    const map = new Map<FilterId, number>([['all', WORKS.length]]);
    for (const w of WORKS) map.set(w.cat, (map.get(w.cat) ?? 0) + 1);
    return map;
  }, []);

  const items = useMemo(
    () => (activeCat === 'all' ? WORKS : WORKS.filter((w) => w.cat === activeCat)),
    [activeCat],
  );

  return (
    <section id="portfolio" className="bg-bg-lightAlt px-shell py-[clamp(80px,10vw,130px)] text-ink">
      <div className="mx-auto max-w-shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="mb-[18px] font-mono text-xs uppercase tracking-[0.16em] text-accent-dark">
              // портфолио
            </div>
            <h2 className="text-[clamp(30px,4.4vw,58px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Избранные работы
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-ink-subtle">
              Наведи на карточку и открой проект, чтобы увидеть детали, инструменты и особенности
              дизайна.
            </p>
          </Reveal>
        </div>

        <div className="mb-[34px] flex flex-wrap gap-[9px]">
          {CATEGORIES.map((c) => {
            const on = c.id === activeCat;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveCat(c.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-[17px] py-2.5 text-sm font-semibold transition-all duration-200 ${
                  on
                    ? 'border-ink bg-ink text-white'
                    : 'border-black/10 bg-white text-ink-muted hover:border-black/20'
                }`}
              >
                {c.label}
                <span className="font-mono text-[11.5px] opacity-60">{counts.get(c.id) ?? 0}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry на CSS-колонках: карточки сохраняют натуральную пропорцию. */}
        <div className="[column-gap:16px] [column-count:2] min-[641px]:[column-count:3] min-[981px]:[column-count:4] min-[1281px]:[column-count:5]">
          <AnimatePresence initial={false}>
            {items.map((w) => (
              <motion.button
                key={w.slug}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                onClick={() => onOpen(w.slug)}
                aria-label={`Открыть проект «${w.title}»`}
                className="group relative mb-[18px] block w-full break-inside-avoid overflow-hidden rounded-card border border-black/[0.06] bg-white text-left shadow-work transition-[transform,box-shadow] duration-[350ms] ease-soft hover:-translate-y-1 hover:shadow-workHover"
              >
                <div className="overflow-hidden">
                  <img
                    src={asset(w.src)}
                    alt={w.title}
                    loading="lazy"
                    className="block h-auto w-full transition-transform duration-[600ms] ease-soft group-hover:scale-[1.06]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(8,9,10,0.86)_0%,rgba(8,9,10,0.2)_45%,transparent_70%)] p-5 opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 group-focus-visible:opacity-100">
                  <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-hover">
                    {catLabel(w.cat)}
                  </div>
                  <div className="mb-3.5 text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-white">
                    {w.title}
                  </div>
                  <span className="inline-flex self-start items-center gap-[7px] rounded-full bg-accent px-[15px] py-[9px] text-[13px] font-bold text-accent-ink">
                    Подробнее →
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
