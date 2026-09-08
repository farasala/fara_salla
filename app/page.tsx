'use client';

import { useCallback, useMemo, useState } from 'react';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Hero } from '@/components/Hero';
import { Lightbox } from '@/components/Lightbox';
import { Marquee } from '@/components/Marquee';
import { MotionGrid } from '@/components/MotionGrid';
import { Nav } from '@/components/Nav';
import { WorkGrid } from '@/components/WorkGrid';
import { MOTION } from '@/lib/motion';
import type { Item } from '@/lib/types';
import { WORKS } from '@/lib/works';

const ALL: Item[] = [...WORKS, ...MOTION];

export default function Page() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openItem = useMemo(
    () => ALL.find((i) => i.slug === openSlug) ?? null,
    [openSlug],
  );
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <WorkGrid onOpen={setOpenSlug} />
        <MotionGrid onOpen={setOpenSlug} />
        <About />
        <Contact />
      </main>
      <Lightbox item={openItem} onClose={close} />
    </>
  );
}
