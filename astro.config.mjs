// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://astro-antiques.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  }
});
