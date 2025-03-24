import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://wheel-automata-server.sliplane.app/api',
        changeOrigin: true
      },
      '/ws': {
        target: 'https://wheel-automata-server.sliplane.app/ws',
        changeOrigin: true
      },
      '/auth': {
        target: 'https://wheel-automata-server.sliplane.app/auth',
        changeOrigin: true
      }
    }
  }
})
