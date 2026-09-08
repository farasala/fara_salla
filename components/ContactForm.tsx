'use client';

import { useState } from 'react';

const SERVICES = [
  'Рекламные креативы для таргета',
  'Оформление соцсетей',
  'Баннеры / графика',
  'AI Creative Design',
  'Другое',
];

const FIELD =
  'rounded-field border border-white/[0.14] bg-white/[0.05] px-[17px] py-[15px] text-[15px] text-white outline-none transition-colors placeholder:text-white/40 focus:border-accent';

/**
 * Заявка уходит в Telegram: бэкенда у статичного сайта нет, поэтому форма
 * собирает текст и открывает переписку. Экран успеха показывается после отправки.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Заявка с сайта`,
      `Имя: ${data.get('name')}`,
      `Контакт: ${data.get('contact')}`,
      `Задача: ${data.get('service')}`,
      data.get('brief') ? `Детали: ${data.get('brief')}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://t.me/fara_salla?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center px-3 py-10 text-center">
        <div className="mb-[22px] flex h-16 w-16 items-center justify-center rounded-full bg-accent text-[30px] text-accent-ink">
          ✓
        </div>
        <div className="mb-2.5 text-[22px] font-extrabold tracking-[-0.02em]">Заявка отправлена!</div>
        <div className="max-w-[300px] text-[15px] leading-[1.55] text-white/60">
          Спасибо. Я свяжусь с тобой в ближайшее время — а быстрее всего написать в Telegram.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-[22px] text-[19px] font-extrabold tracking-[-0.02em]">Оставить заявку</div>
      <div className="flex flex-col gap-3.5">
        <input required name="name" placeholder="Как тебя зовут" className={FIELD} />
        <input required name="contact" placeholder="Telegram, телефон или email" className={FIELD} />
        <select name="service" defaultValue="" className={`${FIELD} text-white/80`}>
          <option value="" className="text-[#111]">
            Что нужно сделать?
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s} className="text-[#111]">
              {s}
            </option>
          ))}
        </select>
        <textarea
          name="brief"
          rows={3}
          placeholder="Коротко о задаче (необязательно)"
          className={`${FIELD} resize-y`}
        />
        <button
          type="submit"
          className="mt-1 rounded-field bg-accent p-[17px] text-base font-bold text-accent-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
        >
          Отправить заявку →
        </button>
        <div className="text-center text-[12.5px] text-white/40">
          Нажимая кнопку, ты соглашаешься на обработку данных.
        </div>
      </div>
    </form>
  );
}
