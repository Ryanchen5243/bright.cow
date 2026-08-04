import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/allUsers': 'http://localhost:5000',
      '/myProfile': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
      '/userByUuid': 'http://localhost:5000',
      '/user': 'http://localhost:5000',
      '/update_display_name': 'http://localhost:5000',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
