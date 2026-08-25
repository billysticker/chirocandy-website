import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chirocandy.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/sample-page') && !page.includes('/thank-you'),
    }),
    mdx(),
  ],
  trailingSlash: 'always',
  compressHTML: true,
});
