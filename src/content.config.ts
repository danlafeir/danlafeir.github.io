import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const playbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playbook' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
});

export const collections = { blog, playbook, pages };
