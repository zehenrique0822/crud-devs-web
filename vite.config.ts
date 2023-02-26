import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({

  build: { chunkSizeWarningLimit: 10000 },
  envPrefix: ['REACT_APP_', 'VITE_'],
  plugins: [
    // viteCommonjs(),
    // viteTsconfigPaths(),
    // svgr(),
    react()],
  resolve: {
    alias: {
      emitter: 'events',
      // process: "process/browser",
      // stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: 'util',
      // buffer: 'buffer',
      // crypto: 'crypto-browserify',
      // path: 'path-browserify',
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