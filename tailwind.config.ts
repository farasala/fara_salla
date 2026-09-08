import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0c0d0e',
          deep: '#08090a',
          card: '#111214',
          panel: '#101113',
          light: '#f4f3ef',
          lightAlt: '#efeee9',
        },
        accent: {
          DEFAULT: '#16cf92',
          hover: '#3ee0a9',
          ink: '#062018',
          dark: '#16a877',
        },
        ink: {
          DEFAULT: '#1a1916',
          hover: '#302e29',
          muted: '#56544d',
          subtle: '#74726a',
          chip: '#3d3b35',
        },
        brand: {
          telegram: '#229ed9',
          whatsapp: '#25d366',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.2,.7,.2,1)',
      },
      maxWidth: {
        shell: '1320px',
        contact: '1160px',
        about: '1120px',
        lightbox: '1060px',
      },
      borderRadius: {
        card: '18px',
        panel: '24px',
        field: '13px',
        tile: '14px',
        row: '16px',
        photo: '28px',
      },
      boxShadow: {
        collage: '0 14px 40px rgba(0,0,0,0.4)',
        work: '0 1px 3px rgba(0,0,0,0.05)',
        workHover: '0 24px 50px rgba(0,0,0,0.16)',
        motionHover: '0 24px 54px rgba(0,0,0,0.55)',
        media: '0 20px 60px rgba(0,0,0,0.5)',
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        scrollUp: 'scrollUp var(--dur, 34s) linear infinite',
        scrollDown: 'scrollDown var(--dur, 40s) linear infinite',
        marquee: 'marquee 34s linear infinite',
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
