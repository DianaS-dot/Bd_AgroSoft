import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#effdf4',
          100: '#d9fbe5',
          200: '#b6f4cd',
          300: '#7ee9aa',
          400: '#3fd37e',
          500: '#19b861',
          600: '#0d934b',
          700: '#0c743d',
          800: '#0d5c34',
          900: '#0b3f26',
          950: '#052416',
        },
      },
      boxShadow: {
        soft: '0 18px 60px rgba(5, 36, 22, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
