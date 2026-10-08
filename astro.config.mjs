// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repository && repository !== 'Juls1609.github.io' ? `/${repository}` : undefined;

export default defineConfig({
  site: 'https://juls1609.github.io',
  base,
});
