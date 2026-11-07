// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE_URL и BASE_PATH задаются в CI для GitHub Pages;
// по умолчанию — финальный домен.
// TODO: заменить домен по умолчанию после подключения своего домена.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://slovospace.ru',
  base: process.env.BASE_PATH ?? '/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
