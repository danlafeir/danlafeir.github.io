import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const playbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playbook' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
});

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ideas' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const measure = z.object({
  qty: z.number().positive(),
  unit: z.string().optional(),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    yield: measure.required({ unit: true }).optional(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        measures: z.array(measure).min(1),
      }),
    ),
  }),
});

export const collections = { playbook, pages, ideas, recipes };
