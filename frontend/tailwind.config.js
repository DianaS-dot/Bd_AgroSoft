/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          500: '#10b981', // Verde esmeralda para el icono
          700: '#124d28',
          800: '#0d381d',
          900: '#0a2e18', // Fondo verde oscuro idéntico a tu imagen
        }
      }
    },
  },
  plugins: [],
}