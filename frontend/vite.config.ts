import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/sensores': 'http://localhost:3000',
      '/sensor-lecturas': 'http://localhost:3000',
      '/sensor-alertas': 'http://localhost:3000',
      '/tipos-sensores': 'http://localhost:3000',
      '/iot-global-config': 'http://localhost:3000',
    },
  },
})
