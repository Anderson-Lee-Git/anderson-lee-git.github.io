import { getCollection } from 'astro:content';

/** Published blog posts, newest first. */
export async function getBlogPosts() {
    const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
    return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export async function getPublications() {
    const publications = await getCollection('publications');
    return publications.sort((a, b) => a.id.localeCompare(b.id)).map(entry => entry.data);
}

/** Formats a date as YYYY-MM-DD. */
export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
