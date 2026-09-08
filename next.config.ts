import type { NextConfig } from 'next';

/**
 * Сайт публикуется статикой на GitHub Pages по адресу
 * https://farasala.github.io/fara_salla/ — отсюда basePath.
 * Локально (`npm run dev`) basePath пустой, поэтому пути к ассетам
 * всегда собираются через `lib/asset.ts`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
