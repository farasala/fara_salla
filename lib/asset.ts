/**
 * Пути к статике. На GitHub Pages сайт живёт в подкаталоге, поэтому
 * ссылки на `public/` нужно префиксовать basePath — `next/image`
 * здесь не используется (экспорт статики, 64 готовых JPEG).
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\//, '')}`;
}
