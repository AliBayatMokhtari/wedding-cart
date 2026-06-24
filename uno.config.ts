import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        display: ['"Great Vibes"', '"Cormorant Garamond"', 'cursive'],
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      rose: {
        50: '#fbf1ee',
        100: '#f3dcd5',
        200: '#e8c0b6',
        300: '#d4a5a5',
        400: '#b87979',
        500: '#9b5b5f',
        600: '#7d4247',
        700: '#5e2f33',
      },
      mauve: {
        300: '#c9a0ae',
        400: '#a87a8b',
      },
      champagne: {
        100: '#f6ead8',
        200: '#e8d4b8',
        300: '#d6b890',
        400: '#b89766',
      },
      gold: {
        DEFAULT: '#c9a961',
        soft: '#e2c98a',
      },
      ivory: '#faf5ee',
      cream: '#f7efe4',
      ink: {
        DEFAULT: '#4a3b3a',
        soft: '#7a6a68',
        muted: '#a89a98',
      },
    },
    fontFamily: {
      display: 'var(--un-font-display, "Great Vibes"), cursive',
      serif: 'var(--un-font-serif, "Cormorant Garamond"), serif',
      sans: 'var(--un-font-sans, Inter), system-ui, sans-serif',
    },
    boxShadow: {
      soft: '0 4px 18px rgba(155, 91, 95, 0.08)',
      elev: '0 10px 40px rgba(155, 91, 95, 0.14)',
    },
  },
  shortcuts: {
    section: 'py-[4.5rem] sm:py-24 px-5 sm:px-6',
    container: 'mx-auto w-full max-w-[26rem] sm:max-w-[36rem]',
    eyebrow: 'font-sans text-[0.72rem] tracking-[0.32em] uppercase text-champagne-400 font-medium',
    btn: 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-[background-color,box-shadow,transform,ring-color] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
    'btn-primary':
      'btn bg-rose-500 text-white shadow-soft hover:bg-rose-400 hover:shadow-elev hover:-translate-y-0.5',
    'btn-ghost':
      'btn bg-transparent text-ink ring-1 ring-rose-200 hover:bg-rose-50 hover:ring-rose-300 focus-visible:ring-rose-400',
    'btn-gold':
      'btn bg-gradient-to-br from-champagne-300 to-gold text-ink shadow-soft hover:shadow-elev hover:-translate-y-0.5 focus-visible:ring-gold',
    'btn-cta':
      'btn w-full mt-8 text-[1.05rem] font-bold tracking-wide text-rose-400 bg-rose-500 shadow-[0_14px_40px_rgba(155,91,95,0.55)] ring-2 ring-rose-300 hover:bg-rose-600 hover:shadow-elev hover:-translate-y-0.5 hover:text-ivory focus-visible:ring-rose-500 disabled:bg-rose-200 disabled:text-rose-400 disabled:shadow-none disabled:ring-rose-200 disabled:cursor-not-allowed disabled:hover:bg-rose-200 disabled:hover:translate-y-0 disabled:hover:shadow-none',
    'input-base':
      'w-full bg-white/80 ring-1 ring-rose-100 rounded-xl px-4 py-3 text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-rose-300 transition',
  },
  safelist: [
    'i-mdi-heart',
    'i-mdi-flower-tulip',
    'i-mdi-flower',
    'i-mdi-calendar-blank-outline',
    'i-mdi-clock-outline',
    'i-mdi-map-marker-outline',
    'i-mdi-email-outline',
    'i-mdi-check',
    'i-mdi-close',
    'i-mdi-chevron-down',
    'i-mdi-arrow-down',
    'i-mdi-star-four-points',
    'i-mdi-loading',
  ],
})
