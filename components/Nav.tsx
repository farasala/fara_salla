'use client';

import { useState } from 'react';

const LINKS = [
  { href: '#portfolio', label: 'Работы' },
  { href: '#motion', label: 'Моушн' },
  { href: '#about', label: 'Обо мне' },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[90] flex items-center justify-end border-b border-white/[0.08] bg-[rgba(12,13,14,0.66)] px-shell py-4 backdrop-blur-[18px]">
        <div className="hidden items-center gap-[30px] text-sm font-medium text-white/[0.72] min-[861px]:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors duration-200 hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-[18px] py-2.5 font-bold text-accent-ink transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-accent-hover"
          >
            Обсудить проект
          </a>
        </div>

        <button
          type="button"
          aria-label="Меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-white/[0.16] bg-white/[0.04] text-white min-[861px]:hidden"
        >
          <span className="text-[18px] leading-none">≡</span>
        </button>
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[95] flex flex-col justify-center gap-2 bg-[rgba(8,9,10,0.94)] p-8 text-[28px] font-bold tracking-[-0.02em] backdrop-blur-[10px]"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/[0.08] py-2.5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3.5 rounded-tile bg-accent p-4 text-center text-[18px] text-accent-ink"
          >
            Обсудить проект
          </a>
        </div>
      )}
    </>
  );
}
