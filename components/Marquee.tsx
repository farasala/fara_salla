const TAGS = [
  'Meta Ads',
  'TikTok Ads',
  'Google Ads',
  'Telegram',
  'Performance Creative',
  'Графический дизайн',
  'AI Design',
  'Соцсети',
  'Брендинг',
];

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex gap-12 pr-12" aria-hidden={hidden}>
      {TAGS.map((t, i) => (
        <span key={t} className="contents">
          {i > 0 && <span className="text-accent">◆</span>}
          <span>{t}</span>
        </span>
      ))}
    </div>
  );
}

/** Бегущая строка. Список дублируется дважды — петля идёт до -50% без шва. */
export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/[0.08] bg-white/[0.015] py-[18px]">
      <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.16em] text-white/40">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
