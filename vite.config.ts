import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: 'https://yrsh-02-n.github.io/newsletters-tools',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  publicDir: 'public',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
