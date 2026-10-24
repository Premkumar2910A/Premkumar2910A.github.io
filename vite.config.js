import { defineConfig } from 'vite';
import { seoTags } from './src/lib/seo.js';

export default defineConfig({
  plugins: [{ name: 'portfolio-metadata', transformIndexHtml: () => seoTags() }],
});
