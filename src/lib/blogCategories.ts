import { getAllPosts, getPostBySlug } from './blog';
import type { BlogPost } from './blog';

const CATEGORY_LABELS: Record<string, string> = {
  'is-uruguay-right-for-me': 'Before You Move',
  'cost-of-living-uruguay': 'Cost of Living',
  'residency-uruguay-guide': 'Residency & Paperwork',
};

const DEFAULT_CATEGORY = 'Daily Life';

const CATEGORY_SET = Array.from(new Set(Object.values(CATEGORY_LABELS)));

export const BLOG_CATEGORIES = ['All', ...CATEGORY_SET];

export type CategorizedPost = BlogPost & { category: string };

export function categoryLabelToSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_SLUG_LOOKUP = CATEGORY_SET.reduce<Record<string, string>>((acc, label) => {
  acc[categoryLabelToSlug(label)] = label;
  return acc;
}, {});

export function slugToCategoryLabel(slug: string | undefined) {
  if (!slug) return null;
  return CATEGORY_SLUG_LOOKUP[slug.toLowerCase()] ?? null;
}

export function getCategorizedPosts(): CategorizedPost[] {
  return getAllPosts().map((post) => ({
    ...post,
    category: CATEGORY_LABELS[post.slug] ?? DEFAULT_CATEGORY,
  }));
}

export function getCategorizedPost(slug: string): CategorizedPost | null {
  const post = getPostBySlug(slug);
  if (!post) return null;
  return {
    ...post,
    category: CATEGORY_LABELS[post.slug] ?? DEFAULT_CATEGORY,
  };
}
