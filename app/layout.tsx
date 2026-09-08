import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import { asset } from '@/lib/asset';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const SITE = 'https://farasala.github.io/fara_salla/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Фархат Салахиев — рекламные креативы, графика и таргет',
  description:
    'Фархат Салахиев — дизайнер рекламных креативов. Статичные и анимированные креативы для Meta, TikTok, Google и Telegram. Графический дизайн, AI-дизайн, оформление соцсетей.',
  openGraph: {
    title: 'Фархат Салахиев — рекламные креативы, которые продают',
    description:
      'Создаю рекламные креативы, которые привлекают внимание и увеличивают продажи.',
    type: 'website',
    locale: 'ru_RU',
    url: SITE,
    images: [{ url: asset('img/dmu-ent-grant.jpg'), width: 900, height: 1125 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фархат Салахиев — рекламные креативы, которые продают',
    description:
      'Создаю рекламные креативы, которые привлекают внимание и увеличивают продажи.',
  },
  icons: { icon: asset('favicon.svg') },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c0d0e',
};

/** Schema.org: автор + перечень работ. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Фархат Салахиев',
  jobTitle: 'Дизайнер рекламных креативов',
  email: 'salahiev.farhat@gmail.com',
  url: SITE,
  sameAs: ['https://t.me/fara_salla'],
  knowsAbout: [
    'Рекламные креативы',
    'Графический дизайн',
    'Дизайн для соцсетей',
    'AI-дизайн',
    'Креативы для таргетированной рекламы',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jetbrains.variable}`}>
      <body>
        {/* Без JS reveal-анимации не запустятся — показываем контент сразу. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
