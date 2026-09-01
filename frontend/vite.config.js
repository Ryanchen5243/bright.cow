import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/allUsers': 'http://localhost:5001',
      '/myProfile': 'http://localhost:5001',
      '/auth': 'http://localhost:5001',
      '/api': 'http://localhost:5001',
      '/userByUuid': 'http://localhost:5001',
      '/user': 'http://localhost:5001',
      '/update_display_name': 'http://localhost:5001',
      '/update_bio': 'http://localhost:5001',
      '/posts': 'http://localhost:5001',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
