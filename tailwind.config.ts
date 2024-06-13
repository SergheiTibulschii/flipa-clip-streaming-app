import { screens } from './src/lib/screens';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'pink-100': '#CFD0D6',
      pink: '#FF00B8',
      violet: '#8349FF',
      white: '#fff',
      'gray-primary': '#262626',
      'gray-secondary': '#616161',
      dark: '#121517',
      transparent: 'transparent',
    },
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
    screens: {
      xsm: `${screens.xsm}px`,
      sm: `${screens.sm}px`,
      md: `${screens.md}px`,
      lg: `${screens.lg}px`,
    },
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
    },
  },
  plugins: [],
};
