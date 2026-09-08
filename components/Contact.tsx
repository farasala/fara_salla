import { ContactForm } from './ContactForm';
import { MailIcon, TelegramIcon, WhatsAppIcon } from './icons';
import { Reveal } from './Reveal';

const CHANNELS = [
  {
    href: 'https://t.me/fara_salla',
    Icon: TelegramIcon,
    bg: 'bg-brand-telegram',
    glyphColor: 'text-white',
    title: 'Telegram',
    sub: '@fara_salla',
    external: true,
  },
  {
    href: 'https://wa.me/77762265726',
    Icon: WhatsAppIcon,
    bg: 'bg-brand-whatsapp',
    glyphColor: 'text-accent-ink',
    title: 'WhatsApp',
    sub: '+7 776 226 57 26',
    external: true,
  },
  {
    href: 'mailto:salahiev.farhat@gmail.com',
    Icon: MailIcon,
    bg: 'bg-accent',
    glyphColor: 'text-accent-ink',
    title: 'Email',
    sub: 'salahiev.farhat@gmail.com',
    external: false,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.07] bg-bg-dark px-shell py-[clamp(80px,10vw,150px)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[80%] w-[80%] -translate-x-1/2 blur-[20px]"
        style={{ background: 'radial-gradient(closest-side, rgba(22,207,146,0.14), transparent)' }}
      />
      <div className="relative mx-auto max-w-contact">
        <div className="grid items-start gap-[clamp(40px,6vw,80px)] min-[861px]:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="mb-[22px] font-mono text-xs uppercase tracking-[0.16em] text-accent">
              // контакты
            </div>
            <h2 className="mb-[26px] text-[clamp(30px,4.4vw,56px)] font-extrabold leading-[1.06] tracking-[-0.035em]">
              Готов создать креатив, который привлечёт внимание и принесёт результат?
            </h2>
            <p className="mb-9 max-w-[440px] text-[17px] leading-[1.6] text-white/[0.62]">
              Напиши мне в удобном мессенджере или оставь заявку — обсудим задачу и я предложу
              решение.
            </p>

            <div className="flex max-w-[420px] flex-col gap-3">
              {CHANNELS.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="flex items-center justify-between rounded-row border border-white/[0.12] bg-white/[0.04] px-[22px] py-[18px] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl ${c.bg} ${c.glyphColor}`}
                    >
                      <c.Icon className="h-[21px] w-[21px]" />
                    </span>
                    <span>
                      <span className="block text-base font-bold">{c.title}</span>
                      <span className="text-[13.5px] text-white/[0.55]">{c.sub}</span>
                    </span>
                  </span>
                  <span className="text-white/40">→</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-panel border border-white/10 bg-white/[0.035] p-[clamp(24px,3vw,36px)]"
          >
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
