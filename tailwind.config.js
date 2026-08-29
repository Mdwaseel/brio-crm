/**
 * Brio design tokens.
 *
 * Two green families carry the whole system:
 *   forest — deep pine, used for ink, dark surfaces, primary actions and chart bars
 *   lime   — spring green, used for the accent, hero gradients and positive emphasis
 *
 * `brand` and `bronze` are kept as aliases of forest/lime so the existing
 * class names across the app inherit the new palette without page-level edits.
 */
const forest = {
  50: '#f1f7f3',
  100: '#dcefe3',
  200: '#bbdfc8',
  300: '#8dc6a5',
  400: '#5aa77f',
  500: '#358a61',
  600: '#236e4c',
  700: '#1c573e',
  800: '#184533',
  900: '#12352a',
  950: '#0b211a',
}

const lime = {
  50: '#f5fce9',
  100: '#e9f9cf',
  200: '#d8f4a8',
  300: '#c2ec7e',
  400: '#a8e05a',
  500: '#8fd13f',
  600: '#71b02a',
  700: '#527d18',
  800: '#426318',
  900: '#385318',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest,
        lime,
        brand: forest,
        bronze: lime,
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        'surface-sunken': 'rgb(var(--surface-sunken) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
        'line-strong': 'rgb(var(--border-strong) / <alpha-value>)',
        ink: 'rgb(var(--text-primary) / <alpha-value>)',
        'ink-2': 'rgb(var(--text-secondary) / <alpha-value>)',
        'ink-3': 'rgb(var(--text-tertiary) / <alpha-value>)',
        success: { DEFAULT: '#1f8f5f', soft: '#e6f5ee', ink: '#136544' },
        warning: { DEFAULT: '#b4770a', soft: '#fdf3e0', ink: '#8a5a05' },
        danger: { DEFAULT: '#d63f3f', soft: '#fdeceb', ink: '#a32a2a' },
        info: { DEFAULT: '#2b7fb8', soft: '#eaf4fa', ink: '#1e5f8c' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '15px' }],
      },
      borderRadius: {
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '26px',
        '4xl': '32px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(11 33 26 / 0.04)',
        sm: '0 1px 2px 0 rgb(11 33 26 / 0.04), 0 2px 6px -2px rgb(11 33 26 / 0.06)',
        md: '0 2px 4px -1px rgb(11 33 26 / 0.04), 0 8px 20px -6px rgb(11 33 26 / 0.10)',
        lg: '0 10px 30px -8px rgb(11 33 26 / 0.14), 0 2px 6px -2px rgb(11 33 26 / 0.06)',
        pop: '0 20px 56px -16px rgb(11 33 26 / 0.28)',
        lift: '0 1px 2px 0 rgb(11 33 26 / 0.03), 0 12px 28px -12px rgb(11 33 26 / 0.16)',
        'lime-glow': '0 10px 30px -10px rgb(143 209 63 / 0.55)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        'scale-in': { from: { opacity: '0', transform: 'translateY(6px) scale(.985)' }, to: { opacity: '1', transform: 'none' } },
        'slide-left': { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        'slide-down': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'none' } },
        'toast-in': { from: { opacity: '0', transform: 'translateY(12px) scale(.97)' }, to: { opacity: '1', transform: 'none' } },
        'dot-pulse': { '0%, 100%': { opacity: '.28' }, '50%': { opacity: '1' } },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-6%, 4%, 0) scale(1.08)' },
        },
        'orb-spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-in': 'fade-in .18s ease-out both',
        'fade-up': 'fade-up .24s cubic-bezier(.22,1,.36,1) both',
        'scale-in': 'scale-in .18s cubic-bezier(.22,1,.36,1) both',
        'slide-left': 'slide-left .28s cubic-bezier(.22,1,.36,1) both',
        'slide-down': 'slide-down .14s ease-out both',
        'toast-in': 'toast-in .22s cubic-bezier(.22,1,.36,1) both',
        'dot-pulse': 'dot-pulse 1.2s cubic-bezier(.4,0,.2,1) infinite',
        drift: 'drift 14s ease-in-out infinite',
        'orb-spin': 'orb-spin 18s linear infinite',
      },
    },
  },
  plugins: [],
}
