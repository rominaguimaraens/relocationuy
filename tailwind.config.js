import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'ui-sans-serif', 'system-ui'],
        display: ['Bogart', 'Marcellus', 'serif'],
        quote: ['"Playfair Display"', 'serif'],
      },
      colors: {
        beige: '#f7c6d7',
        blush: '#f7c6d7',
        sage: '#CFE8CF',
        sky: '#f77fa7',
        lavender: '#7a55d8',
        ink: '#5f4d53',
      },
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [
      {
        relocationuy: {
          primary: '#5734a0',
          secondary: '#7a55d8',
          accent: '#f77fa7',
          neutral: '#5f4d53',
          'base-100': '#ffdce3',
          info: '#f77fa7',
          success: '#CFE8CF',
          warning: '#FBC02D',
          error: '#F87171',
        },
      },
    ],
    darkTheme: false,
  },
};

export default config;
