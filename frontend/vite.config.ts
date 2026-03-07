import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: false  // ← THIS DISABLES public folder requirement
})
