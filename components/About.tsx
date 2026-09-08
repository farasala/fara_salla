import { asset } from '@/lib/asset';
import { Reveal } from './Reveal';

const COMPETENCIES = [
  'Разработка рекламных креативов',
  'Графический дизайн',
  'Дизайн для соцсетей',
  'AI-дизайн',
  'Креативы для таргета',
];

export function About() {
  return (
    <section id="about" className="bg-bg-light px-shell py-[clamp(64px,7.5vw,104px)] text-ink">
      <div className="mx-auto grid max-w-about items-center gap-[clamp(28px,4.5vw,60px)] min-[721px]:grid-cols-[auto_1fr]">
        <Reveal>
          <img
            src={asset('img/profile.jpg')}
            alt="Фархат Салахиев"
            className="aspect-square w-[clamp(128px,15vw,188px)] rounded-photo object-cover [object-position:center_30%]"
          />
        </Reveal>

        <div>
          <Reveal className="mb-[18px] font-mono text-xs uppercase tracking-[0.16em] text-accent-dark">
            // обо мне
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-4 max-w-[22ch] text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.15] tracking-[-0.03em]">
              Фархат Салахиев — дизайнер рекламных креативов
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mb-[26px] max-w-[56ch] text-[16.5px] leading-[1.65] text-ink-muted">
              Помогаю брендам и экспертам выделяться в ленте и превращать показы в заявки. Соединяю
              сильную графику, маркетинговую логику и AI-инструменты — чтобы креатив работал на
              результат, а не просто красиво выглядел.
            </p>
          </Reveal>
          <Reveal delay={200} className="mb-[30px] flex flex-wrap gap-2">
            {COMPETENCIES.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-[15px] py-[9px] text-[13.5px] font-semibold text-ink-chip"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                {c}
              </span>
            ))}
          </Reveal>
          <Reveal delay={260}>
            <a
              href="#contact"
              className="inline-flex items-center gap-[9px] rounded-field bg-ink px-6 py-3.5 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-ink-hover"
            >
              Обсудить проект →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
