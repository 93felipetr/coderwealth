import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
  category: z.enum(['security', 'offgrid', 'finance']),
  tags: z.array(z.string()).optional().default([]),
  image: z.string().optional(),
  canonicalURL: z.string().url().optional(),
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  author: z.string().optional().default('CoderWealth'),
  readingTime: z.number().optional(),
});

const postCollection = defineCollection({
  type: 'content',
  schema: postSchema,
});

export const collections = {
  articles: postCollection,
};

export type Post = z.infer<typeof postSchema>;