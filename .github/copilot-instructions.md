# Purpose
The codebase is for an academic-style personal website with a consistent theme color, built with Astro. See README.md for the project layout.

# Pages
## About
- Name, profile picture and a paragraph of introduction
## Publications
- A list of publications from `src/content/publications.json`
## Blog
- A list of blog cards; posts are markdown files in `src/content/blog/` with front matter validated by `src/content.config.ts`
- Hidden from the public site until `blogPublic` in `src/config/features.js` is true; always visible in `npm run dev`
## Other Experience
- A list of experience cards with a picture on the left, title, period, and short description

# Development Requirements
- Use `.astro` components and TypeScript; keep pages static (avoid client-side JavaScript unless needed for interaction)
- Ensure components are re-usable; wrap pages in `BaseLayout` and use `PageHeader` for titles
- Styles come from `src/styles/global.css`: use the CSS variables (`--color-*`, `--font-*`) and typography classes (`t-h1`, `t-h3`, `t-card-title`, `t-body1`, `t-body2`). Don't hard-code font sizes, weights, families or colors in components; add a token or class if something is missing
- Component styles go in the component's scoped `<style>` block; the mobile breakpoint is `@media (max-width: 768px)`
- In templates, a line break next to an inline element is dropped (as in JSX). Break lines between plain words, or keep the element and the following text on one line
- Avoid using background color, try to use lines to characterize elements
- Site-wide strings (name, links, nav items) live in `src/config/site.ts`
- Run `npm run lint`, `npm run check` and `npm test` before committing

# Theme Color
- text: #263238 (Blue Grey 900)
- background: #ffffff
- primary: #00796b (Teal 700)
- secondary: #004d40 (Teal 900)
- accent: #009688 (Teal 500)
- highlight: #ef6c00 (Orange 800)
