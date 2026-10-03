// Plain JavaScript so astro.config.mjs can import it on any Node version.

/**
 * Publish the blog (/blog, posts, RSS feed and nav link). When false, the blog
 * is left out of production builds but still shows in `npm run dev`.
 */
export const blogPublic = false;
