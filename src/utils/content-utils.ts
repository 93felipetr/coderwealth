import { getCollection, type CollectionEntry } from 'astro:content';
import type { Post } from '../content/config';

export type PostEntry = CollectionEntry<'articles'>;

/**
 * Get all published posts, sorted by publication date (newest first)
 */
export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('articles', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: Post['category']): Promise<PostEntry[]> {
  const posts = await getCollection('articles', ({ data }) =>
    !data.draft && data.category === category
  );
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<PostEntry[]> {
  const posts = await getCollection('articles', ({ data }) =>
    !data.draft && data.featured
  );
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Get recent posts (limited by count)
 */
export async function getRecentPosts(count: number = 6): Promise<PostEntry[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<PostEntry[]> {
  const posts = await getCollection('articles', ({ data }) =>
    !data.draft && data.tags?.includes(tag)
  );
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach(post => {
    post.data.tags?.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get related posts based on category and tags
 */
export async function getRelatedPosts(
  currentPost: PostEntry,
  limit: number = 3
): Promise<PostEntry[]> {
  const allPosts = await getAllPosts();

  // Filter out current post and get posts from same category or with shared tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post => {
      const sameCategory = post.data.category === currentPost.data.category;
      const sharedTags = post.data.tags?.some(tag =>
        currentPost.data.tags?.includes(tag)
      );
      return sameCategory || sharedTags;
    })
    .slice(0, limit);

  return relatedPosts;
}

/**
 * Calculate reading time based on content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: string = 'pt-BR'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get category display information
 */
export function getCategoryInfo(category: Post['category']) {
  const categoryData: Record<Post['category'], { label: string; color: string; description: string }> = {
    security: {
      label: 'Security',
      color: 'red',
      description: 'Articles about cybersecurity, privacy and data protection'
    },
    offgrid: {
      label: 'Offgrid & DIY',
      color: 'amber',
      description: 'Smart rural living, solar energy, satellite internet, and self-reliant DIY projects including 3D printing and custom hardware.'
    },
    finance: {
      label: 'Finance',
      color: 'green',
      description: 'Analysis about cryptocurrencies, investments and personal finance'
    }
  };

  return categoryData[category];
}

/**
 * Generate excerpt from post content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/[#*`]/g, '').trim();
  if (text.length <= maxLength) return text;

  const excerpt = text.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');

  return lastSpace > 0
    ? excerpt.substring(0, lastSpace) + '...'
    : excerpt + '...';
}