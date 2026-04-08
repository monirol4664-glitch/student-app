import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.com', // Replace with your actual domain or leave as is for initial deployment
  base: '/',
  output: 'static', // Essential for pure Cloudflare Pages deployment
});