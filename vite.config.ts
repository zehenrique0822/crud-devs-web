import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({

  build: { chunkSizeWarningLimit: 10000 },
  envPrefix: ['REACT_APP_', 'VITE_'],
  plugins: [
    react()],
  resolve: {
    alias: {
      emitter: 'events',
      global: 'global/window',
      crypto: 'crypto-browserify',
      "@": path.resolve(__dirname, "./src")
    },
  },
  server: {
    host: true,
    port: 3000,
    hmr: {
      clientPort: 3000
    }
  }
})