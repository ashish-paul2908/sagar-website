import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps the build portable: works on GitHub Pages (/sagar-website/)
// today and on a custom domain later without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
})
