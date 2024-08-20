import { screens } from './src/lib/screens';
import { colors } from './src/lib/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    fontFamily: {
      primary: ['Poppins', 'sans-serif'],
    },
    borderRadius: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
    },
    screens: Object.fromEntries(
      Object.entries(screens).map(([key, value]) => [key, `${value}px`])
    ),
    lineHeight: {
      1: '1',
      '1.25': '1.25',
      '1.5': '1.5',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        full: '9999px',
      },
      aspectRatio: {
        xs: '343/383',
      },
      animationDuration: {
        1000: '1000ms',
      },
      animation: {
        appear: 'appear 1s ease-in-out',
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
