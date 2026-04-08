import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-portfolio.pages.dev',
  output: 'server',
  adapter: undefined,
  build: {
    assets: 'assets'
  },
  vite: {
    resolve: {
      conditions: ['workerd', 'browser']
    }
  }
});