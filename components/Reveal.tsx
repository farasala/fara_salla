'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  /** Задержка каскада в миллисекундах, как в макете (80 / 120 / 160 / …). */
  delay?: number;
  as?: 'div' | 'p' | 'h2' | 'span' | 'a';
};

/**
 * Появление по скроллу. Состояние держит Framer Motion через `whileInView`,
 * поэтому ре-рендер не возвращает элемент в скрытое положение —
 * ровно та ловушка, о которой предупреждает хендофф.
 */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
