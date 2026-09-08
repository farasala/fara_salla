export type CategoryId = 'edu' | 'event' | 'ai' | 'biz' | 'social';
export type FilterId = 'all' | CategoryId;

/** Общее для статичной работы и моушн-ролика. */
interface BaseItem {
  slug: string;
  cat: CategoryId;
  title: string;
  desc: string;
  tools: string[];
  features: string[];
}

/** Статичный креатив: одно изображение из `public/img`. */
export interface Work extends BaseItem {
  kind: 'work';
  src: string;
}

/** Моушн-ролик: mp4 + постер-кадр из `public/video`. */
export interface MotionClip extends BaseItem {
  kind: 'motion';
  video: string;
  poster: string;
  dur: string;
}

export type Item = Work | MotionClip;

export const CATEGORIES: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'edu', label: 'Образование' },
  { id: 'event', label: 'Ивенты' },
  { id: 'ai', label: 'AI-дизайн' },
  { id: 'biz', label: 'Бизнес' },
  { id: 'social', label: 'Соцсети' },
];

export function catLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? '';
}
