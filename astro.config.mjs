// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { blogPublic } from './src/config/features.js';

/**
 * Adds the blog routes from src/routes/ when the blog is enabled: always in
 * `astro dev`, in builds when `blogPublic` is true or SHOW_BLOG=true.
 * Exposes the result to pages as `import.meta.env.BLOG_ENABLED`.
 * @returns {import('astro').AstroIntegration}
 */
function blog() {
    return {
        name: 'blog-routes',
        hooks: {
            'astro:config:setup': ({ command, injectRoute, updateConfig }) => {
                const enabled = command === 'dev' || blogPublic || process.env.SHOW_BLOG === 'true';
                updateConfig({ vite: { define: { 'import.meta.env.BLOG_ENABLED': JSON.stringify(enabled) } } });
                if (!enabled) return;
                injectRoute({ pattern: '/blog', entrypoint: './src/routes/blog/index.astro' });
                injectRoute({ pattern: '/blog/[slug]', entrypoint: './src/routes/blog/[slug].astro' });
                injectRoute({ pattern: '/rss.xml', entrypoint: './src/routes/rss.xml.ts' });
            },
        },
    };
}

export default defineConfig({
    site: 'https://anderson-lee-git.github.io',
    outDir: './build',
    integrations: [blog(), sitemap()],
    markdown: {
        // Prism (with the One Dark theme in src/styles) matches the React site's code blocks.
        syntaxHighlight: 'prism',
        // Keep quotes and dashes exactly as written.
        processor: satteri({ features: { smartPunctuation: false } }),
    },
    server: { port: 3000 },
});
