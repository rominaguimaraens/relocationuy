import matter from 'gray-matter';
import { Buffer } from 'buffer';

const globalBuffer = globalThis as typeof globalThis & { Buffer?: typeof Buffer };
if (!globalBuffer.Buffer) {
  globalBuffer.Buffer = Buffer;
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  content: string;
};

const files = import.meta.glob('../content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

function pathToSlug(path: string) {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

const posts: BlogPost[] = Object.entries(files).map(([path, raw]) => {
  const { data, content } = matter(raw as string);
  const slug = pathToSlug(path);

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? new Date().toISOString(),
    readingTime: (data.readingTime as string) ?? '',
    summary: (data.summary as string) ?? '',
    content,
  };
});

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getAllPosts() {
  return sortedPosts;
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
