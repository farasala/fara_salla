'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
import { catLabel, type Item } from '@/lib/types';

/** Видео в лайтбоксе — единственное место, где звук включён. */
function LightboxVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    void v.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls
      autoPlay
      loop
      playsInline
      className="max-h-[78vh] w-full max-w-[420px] rounded-xl bg-black shadow-media"
    />
  );
}

export function Lightbox({ item, onClose }: { item: Item | null; onClose: () => void }) {
  /** Пока лайтбокс открыт, страница под ним не скроллится. */
  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(7,8,9,0.86)] p-[clamp(14px,3vw,40px)] backdrop-blur-[10px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-lightbox overflow-auto rounded-panel border border-white/[0.12] bg-bg-panel min-[861px]:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="flex min-h-[300px] items-center justify-center bg-bg-deep p-6">
              {item.kind === 'motion' ? (
                <LightboxVideo src={asset(item.video)} poster={asset(item.poster)} />
              ) : (
                <img
                  src={asset(item.src)}
                  alt={item.title}
                  className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-media"
                />
              )}
            </div>

            <div className="p-[clamp(26px,3vw,40px)] text-white">
              <div className="mb-6 flex items-start justify-between gap-4">
                <span className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {catLabel(item.cat)}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Закрыть"
                  className="h-10 w-10 shrink-0 rounded-[11px] border border-white/[0.16] bg-white/[0.05] text-[18px] text-white transition-colors hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <h3 className="mb-3.5 text-[clamp(24px,2.6vw,32px)] font-extrabold leading-[1.12] tracking-[-0.025em]">
                {item.title}
              </h3>
              <p className="mb-7 text-[15px] leading-[1.65] text-white/[0.64]">{item.desc}</p>

              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                Инструменты
              </div>
              <div className="mb-7 flex flex-wrap gap-2">
                {item.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-2 text-[13px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                Особенности дизайна
              </div>
              <div className="mb-8 flex flex-col gap-2.5">
                {item.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-[11px] text-[14.5px] leading-[1.45] text-white/[0.78]"
                  >
                    <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-accent/15 text-[11px] text-accent">
                      ✓
                    </span>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-[9px] rounded-field bg-accent px-6 py-[15px] text-[15px] font-bold text-accent-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                Хочу такой креатив →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
