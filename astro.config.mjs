import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://daniellafeir.com',
  trailingSlash: 'always',
  markdown: {
    syntaxHighlight: false,
  },
});
