import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    // Load no posts while the blog is disabled, so their images aren't published either.
    loader: glob({ pattern: import.meta.env.BLOG_ENABLED ? '*.md' : [], base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        description: z.string(),
        tags: z.array(z.string()).default([]),
        /** Drafts build in `astro dev` but are left out of production builds. */
        draft: z.boolean().default(false),
    }),
});

const publications = defineCollection({
    // Ids are zero-padded positions, so sorting by id keeps the file's order.
    loader: file('src/content/publications.json', {
        parser: text =>
            JSON.parse(text).publications.map((publication: object, index: number) => ({
                id: String(index).padStart(3, '0'),
                ...publication,
            })),
    }),
    schema: z.object({
        title: z.string(),
        main_authors: z.array(z.string()).min(1),
        contributors: z.array(z.string()),
        venue: z.string(),
        /** Empty string when there is no link. */
        paper_url: z.string(),
        code_url: z.string(),
    }),
});

const experience = defineCollection({
    loader: file('src/content/experience.json'),
    schema: z.object({
        title: z.string(),
        organization: z.string(),
        period: z.string(),
        description: z.string(),
        imageUrl: z.string(),
    }),
});

export const collections = { blog, publications, experience };
