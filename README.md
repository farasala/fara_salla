# Портфолио Фархата Салахиева

Одностраничный сайт-портфолио дизайнера рекламных креативов: 64 статичных
креатива и 17 моушн-роликов, фильтры по направлениям, лайтбокс с деталями
проекта и блок контактов.

**Живая версия:** https://farasala.github.io/fara_salla/

## Стек

- **Next.js 15** (App Router, статический экспорт `output: 'export'`)
- **TypeScript** в строгом режиме
- **Tailwind CSS** — токены дизайна вынесены в `tailwind.config.ts`
- **Framer Motion** — reveal по скроллу, layout-анимация фильтров, лайтбокс
- **next/font** — Manrope и JetBrains Mono, self-hosted (без запросов к Google)

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # статический экспорт в out/
npm run typecheck
```

## Структура

```
app/           layout (метаданные, шрифты, Schema.org) и страница
components/    секции сайта: Nav, Hero, Marquee, WorkGrid, MotionGrid,
               About, Contact, Lightbox + примитив Reveal
lib/           данные работ и роликов, типы, хелпер путей к ассетам
public/img/    64 креатива + profile.jpg
public/video/  17 роликов mp4 + постер-кадр к каждому
```

Данные работ — статические типизированные массивы (`lib/works.ts`,
`lib/motion.ts`). Структура записи готова к переносу в CMS.

## Деплой

`.github/workflows/deploy.yml` собирает статику и публикует её на GitHub Pages
при каждом пуше в `main`. Сайт живёт в подкаталоге `/fara_salla`, поэтому сборка
идёт с `NEXT_PUBLIC_BASE_PATH=/fara_salla`; все ссылки на ассеты проходят через
`lib/asset.ts`, так что локально с пустым basePath всё работает так же.

Чтобы деплой заработал, в настройках репозитория **Settings → Pages → Source**
должно стоять **GitHub Actions**.

## Решения, о которых стоит знать

- **Звук у роликов.** В сетке моушна видео всегда без звука: `muted` и `volume`
  выставляются императивно в `useEffect`, а не атрибутом — React не переносит
  атрибут `muted` в свойство, и звук прорывается. Со звуком играет только
  видео, открытое в лайтбоксе.
- **Воспроизведение только во вьюпорте.** У роликов `preload="none"`,
  `IntersectionObserver` с порогом `0.3` запускает и останавливает их.
- **Reveal-анимации.** Скрытое состояние держит Framer Motion (`whileInView`),
  а не инлайновый `opacity` — иначе ре-рендер возвращал бы элемент в скрытое
  положение. Для случая без JS в `app/layout.tsx` лежит `<noscript>`-стиль,
  который показывает весь контент сразу.
- **Форма заявки.** У статичного сайта нет бэкенда, поэтому форма собирает
  текст заявки и открывает переписку в Telegram, после чего показывает экран
  успеха. Если появится сервер или форм-сервис, менять нужно только
  `components/ContactForm.tsx`.
- **Изображения.** `next/image` не используется: экспорт статический, а работы
  уже сжаты под сетку. Все `<img>` идут с `loading="lazy"`.

## Контакты

Telegram [@fara_salla](https://t.me/fara_salla) · WhatsApp +7 776 226 57 26 ·
salahiev.farhat@gmail.com
