'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
import { MOTION } from '@/lib/motion';
import { catLabel, type MotionClip } from '@/lib/types';
import { Reveal } from './Reveal';

/**
 * Карточка ролика. Видео играет только во вьюпорте и ВСЕГДА без звука:
 * `muted` выставляется свойством, а не атрибутом — React не переносит
 * атрибут в свойство, и звук прорывается.
 */
function MotionCard({ clip, onOpen }: { clip: MotionClip; onOpen: (slug: string) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const mute = () => {
      video.muted = true;
      video.volume = 0;
    };
    mute();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mute();
          video.style.opacity = '1';
          void video.play().catch(() => {});
        } else {
          video.pause();
          video.style.opacity = '0';
        }
      },
      { threshold: 0.3 },
    );

    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(clip.slug)}
      aria-label={`Открыть ролик «${clip.title}» со звуком`}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-card border border-white/[0.08] bg-bg-card text-left transition-[transform,box-shadow] duration-[350ms] ease-soft hover:-translate-y-1 hover:shadow-motionHover"
    >
      <div className="relative overflow-hidden">
        <img
          src={asset(clip.poster)}
          alt={clip.title}
          loading="lazy"
          className="block h-auto w-full"
        />
        <video
          ref={videoRef}
          src={asset(clip.video)}
          poster={asset(clip.poster)}
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[450ms]"
        />
        <div className="absolute right-[11px] top-[11px] z-[2] inline-flex items-center gap-[7px] rounded-full border border-white/[0.12] bg-[rgba(8,9,10,0.55)] px-[11px] py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-white backdrop-blur-[6px]">
          <span className="h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-accent" />
          {clip.dur}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end bg-[linear-gradient(to_top,rgba(8,9,10,0.9)_0%,rgba(8,9,10,0.28)_46%,transparent_74%)] p-[18px] opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent-hover">
          {catLabel(clip.cat)}
        </div>
        <div className="mb-3.5 text-base font-bold leading-[1.25] tracking-[-0.01em] text-white">
          {clip.title}
        </div>
        <span className="inline-flex self-start items-center gap-[7px] rounded-full bg-accent px-[15px] py-[9px] text-[12.5px] font-bold text-accent-ink">
          <span className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-accent-ink" />
          Смотреть со звуком
        </span>
      </div>
    </button>
  );
}

export function MotionGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section
      id="motion"
      className="relative overflow-hidden border-t border-white/[0.06] bg-bg-deep px-shell py-[clamp(80px,10vw,130px)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[6%] -top-[8%] h-[58%] w-[46%] blur-[30px]"
        style={{ background: 'radial-gradient(closest-side, rgba(22,207,146,0.10), transparent)' }}
      />
      <div className="relative mx-auto max-w-shell">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="mb-[18px] font-mono text-xs uppercase tracking-[0.16em] text-accent">
              // моушн
            </div>
            <h2 className="text-[clamp(30px,4.4vw,58px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
              Анимация, которая <span className="text-accent">оживляет</span> оффер
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[360px] text-[15px] leading-[1.6] text-white/60">
              Видео-креативы для Reels, TikTok, Stories и таргета — от идеи и раскадровки до
              финального рендера. Наведи, чтобы посмотреть, кликни — со звуком.
            </p>
          </Reveal>
        </div>

        <div className="[column-gap:16px] [column-count:1] min-[441px]:[column-count:2] min-[981px]:[column-count:3] min-[1281px]:[column-count:4]">
          {MOTION.map((clip) => (
            <MotionCard key={clip.slug} clip={clip} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
