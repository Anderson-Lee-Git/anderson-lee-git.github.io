# anderson-lee-git.github.io

Personal academic website, built with [Astro](https://astro.build) and deployed to GitHub Pages. Pages are rendered to static HTML at build time; the only client-side JavaScript is the mobile menu toggle.

## Development

```sh
npm install
npm run dev        # http://localhost:3000
npm run check      # type-check .astro and .ts files
npm run lint
npm test           # build, then test the generated HTML
npm run build      # check + production build into build/
npm run preview    # serve the production build
```

Pushing to `main` runs lint, type check, build and tests in CI, then publishes `build/` to the `gh-pages` branch.

## Layout

```
src/
  config/site.ts         name, contact links, nav items
  config/features.js     feature flags (blog publishing)
  content.config.ts      content collection schemas (validated at build time)
  content/               everything you edit to update the site
    publications.json    publication list
    experience.json      experience entries (page not yet linked in nav)
    blog/*.md            blog posts, metadata in front matter
    blog/figure/         images used by posts
  styles/global.css      theme tokens (colors, fonts) and typography classes
  styles/prism-one-dark.css  code block colors
  layouts/BaseLayout.astro   <head>, navigation, centered main column
  components/            cards, navigation, page header
  pages/                 one file per route
  routes/                blog routes, added only when the blog is enabled
public/                  static files served as-is (photo, CV)
tests/                   checks against the built site
```

## Common edits

- **Add a publication:** append to `src/content/publications.json`. Leave `paper_url` / `code_url` empty to hide the link. Authors named `site.authorName` are bolded; `main_authors` get an asterisk.
- **Add a blog post:** create `src/content/blog/<slug>.md`:

  ```md
  ---
  title: My Post
  date: 2025-05-01
  description: One-line summary for the card, page description and RSS
  tags: [concept, oop]
  draft: true   # optional: visible in `npm run dev` only
  ---
  ```

  The build fails with a clear message if a field is missing. Put images in `src/content/blog/figure/` and reference them relatively, e.g. `![diagram](./figure/diagram.png)`; they are optimized at build time. Fenced code blocks (```` ```java ```` or `~~~java`) are highlighted at build time.
- **Publish the blog:** the blog is currently hidden from the public site. Set `blogPublic = true` in `src/config/features.js` to publish `/blog`, the posts, the RSS feed and the nav link. While it's hidden, the blog still shows in `npm run dev`, and `SHOW_BLOG=true npm run build` builds it for a local preview.
- **Add a page:** create `src/pages/<name>.astro` using `BaseLayout` and `PageHeader`, and add it to `navItems` in `src/config/site.ts` to show it in the nav.
- **Update the CV:** replace `public/cv.pdf`. It is served at the stable URL `/cv.pdf`.

The build also generates `/sitemap-index.xml` for search engines, and `/rss.xml` when the blog is published. `public/.nojekyll` stops GitHub Pages from running Jekyll, which would hide Astro's `_astro/` asset folder.
