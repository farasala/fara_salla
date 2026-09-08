'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
import { WORKS } from '@/lib/works';
import { Reveal } from './Reveal';

const COLUMNS: { slugs: string[]; depth: number; anim: string; dur: string; offset?: string }[] = [
  { slugs: ['mba-global', 'ielts-free', 'grant-50', 'ielts-prep'], depth: 0.6, anim: 'animate-scrollUp', dur: '34s' },
  { slugs: ['aqtau-event', 'mba-webinar', 'foundation-collage', 'dmuk-postupi'], depth: 1.1, anim: 'animate-scrollDown', dur: '40s', offset: '-34px' },
  { slugs: ['it-challenge', 'business-competition', 'ec-council', 'nauryz-open-day'], depth: 0.8, anim: 'animate-scrollUp', dur: '46s' },
];

const pick = (slugs: string[]) =>
  slugs
    .map((s) => WORKS.find((w) => w.slug === s))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

const STATS = [
  { value: '64', label: 'статичных креатива' },
  { value: '17', label: 'моушн-роликов' },
  { value: '5', label: 'направлений дизайна' },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  /** Параллакс колонок коллажа по движению курсора. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      hero.querySelectorAll<HTMLElement>('[data-depth]').forEach((col) => {
        const d = Number.parseFloat(col.dataset.depth ?? '0.5') || 0.5;
        col.style.transform = `translate3d(${cx * d * -18}px, ${cy * d * -12}px, 0)`;
      });
    };

    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <header
      id="top"
      ref={heroRef}
      className="relative mx-auto max-w-shell px-shell pb-[clamp(60px,8vw,96px)] pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[10%] h-[70%] w-[55%] blur-[20px]"
        style={{ background: 'radial-gradient(closest-side, rgba(22,207,146,0.16), transparent)' }}
      />

      <div className="relative grid items-center gap-[clamp(28px,5vw,72px)] min-[861px]:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal className="mb-7 inline-flex items-center gap-[9px] rounded-full border border-white/[0.14] bg-white/[0.03] px-[15px] py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/[0.74]">
            <span className="h-[7px] w-[7px] animate-pulseDot rounded-full bg-accent" />
            Открыт для проектов
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mb-6 text-[clamp(38px,5.6vw,76px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              Создаю рекламные креативы, которые{' '}
              <span className="text-accent">привлекают внимание</span> и увеличивают продажи.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mb-9 max-w-[520px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-white/[0.66]">
              Разрабатываю статичные и анимированные рекламные креативы для Meta, TikTok, Google,
              Telegram и других платформ.
            </p>
          </Reveal>

          <Reveal delay={240} className="flex flex-wrap gap-3.5">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 rounded-tile bg-accent px-[26px] py-4 text-[15.5px] font-bold text-accent-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Посмотреть работы →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-tile border border-white/[0.16] bg-white/[0.05] px-[26px] py-4 text-[15.5px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Обсудить проект
            </a>
          </Reveal>

          <Reveal delay={320} className="mt-12 flex gap-[clamp(20px,4vw,44px)]">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[30px] font-extrabold tracking-[-0.03em]">{s.value}</div>
                <div className="mt-0.5 text-[13px] text-white/50">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="collage-mask relative grid h-[460px] grid-cols-3 gap-4 min-[861px]:h-[clamp(520px,64vh,680px)]">
          {COLUMNS.map((col, i) => {
            const pics = pick(col.slugs);
            return (
              <div
                key={i}
                data-depth={col.depth}
                className="overflow-hidden transition-transform duration-[250ms] ease-out"
                style={{ marginTop: col.offset }}
              >
                {/* Содержимое дублируется дважды — иначе петля идёт с рывком. */}
                <div
                  className={`flex flex-col gap-4 ${col.anim}`}
                  style={{ '--dur': col.dur } as React.CSSProperties}
                >
                  {[0, 1].map((copy) =>
                    pics.map((p) => (
                      <div
                        key={`${copy}-${p.slug}`}
                        className="aspect-[4/5] shrink-0 overflow-hidden rounded-tile border border-white/10 shadow-collage"
                      >
                        <img
                          src={asset(p.src)}
                          alt={copy === 0 ? p.title : ''}
                          aria-hidden={copy === 1}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )),
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
