import matter from 'gray-matter';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
  published?: boolean;
  body: string;
  filename: string;
};

const files = import.meta.glob('/src/content/posts/**/*.md', { as: 'raw', eager: true });

function filenameToSlug(filename: string) {
  const base = filename.split('/').pop()!.replace('.md', '');
  return base.toLowerCase().replace(/^[0-9-]+/, '').replace(/[^a-z0-9-]+/g, '-');
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(files)) {
    const { data, content } = matter(raw as string);
    const fm = data || {};
    const slug = (fm.slug as string) || filenameToSlug(path);
    const published = fm.published !== false;

    posts.push({
      slug,
      title: (fm.title as string) || slug,
      date: (fm.date as string) || new Date().toISOString(),
      author: (fm.author as string) || 'Uruguay Relocation Companion',
      excerpt: (fm.excerpt as string) || '',
      cover: (fm.cover as string) || '',
      tags: (fm.tags as string[]) || [],
      published,
      body: content,
      filename: path,
    });
  }

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
