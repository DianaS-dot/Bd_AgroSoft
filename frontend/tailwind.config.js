export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        agro: {
          50:  '#edfaf2',
          100: '#d4f3e3',
          200: '#a7e7c5',
          300: '#6dd4a0',
          400: '#33bb78',
          500: '#10a35d',
          600: '#008149',
          700: '#005a2b',   /* PRIMARY */
          800: '#004020',
          900: '#002e16',
        },
      },
      boxShadow: {
        'card':      '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'card-hover':'0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'sidebar':   '2px 0 8px 0 rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}