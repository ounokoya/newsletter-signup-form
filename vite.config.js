import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi par GitHub Pages sous /newsletter-signup-form/
export default defineConfig({
  base: '/newsletter-signup-form/',
  plugins: [tailwindcss()],
})
