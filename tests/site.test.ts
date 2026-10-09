// Checks the static build output in build/. Run via `npm test`, which builds first.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import { blogPublic } from '../src/config/features.js';
import { site } from '../src/config/site';
import publicationsData from '../src/content/publications.json';

// The public site, as deployed (blog disabled unless blogPublic is true)
const outDir = join(import.meta.dirname, '..', 'build');
// The same site built with SHOW_BLOG=true, for testing the blog itself
const blogOutDir = join(import.meta.dirname, '..', '.build-with-blog');

const read = (path: string, dir = outDir) => readFileSync(join(dir, path), 'utf8');
const page = (path: string, dir = outDir) => parseHTML(read(path, dir)).document;
const blogPage = (path: string) => page(path, blogOutDir);
const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

const postSlugs = ['inheritance', 'test', 'exception', 'getter_setter'];

describe('build output', () => {
    it('emits every route as a directory index', () => {
        const routes = ['index.html', 'about/index.html', 'publications/index.html', 'experience/index.html',
            '404.html', 'sitemap-index.xml', 'cv.pdf'];
        for (const route of routes) expect(existsSync(join(outDir, route)), route).toBe(true);
    });

    it('disables Jekyll so GitHub Pages serves underscore folders like _astro/', () => {
        expect(existsSync(join(outDir, '.nojekyll'))).toBe(true);
    });

    it('loads no external scripts; the mobile menu toggle is the only JavaScript', () => {
        const scripts = [...page('publications/index.html').querySelectorAll('script')];
        expect(scripts.filter(script => script.hasAttribute('src'))).toEqual([]);
        expect(scripts).toHaveLength(1);
    });
});

describe('navigation', () => {
    it('marks the current section, including on nested pages', () => {
        const current = (path: string) =>
            [...page(path).querySelectorAll('nav a[aria-current="page"]')].map(a => a.getAttribute('href'));
        expect(current('publications/index.html')).toEqual(['/publications/', '/publications/']);
        expect(current('index.html')).toEqual([]);
    });
});

describe('about', () => {
    it('keeps spaces around inline links', () => {
        const bio = text(page('about/index.html').querySelector('.bio'));
        expect(bio).toContain('Jamie Morgenstern and Rachel Hong.');
        expect(bio).toContain('Emmanuel Mensah on low-resource');
        expect(bio).toContain('Professor Aleksandra Korolova. Things');
    });

    it('points canonical at the root URL from both entry points', () => {
        for (const path of ['index.html', 'about/index.html']) {
            expect(page(path).querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${new URL('/', 'https://anderson-lee-git.github.io')}`);
        }
    });
});

describe('publications', () => {
    const doc = page('publications/index.html');

    it('lists every publication in file order', () => {
        const titles = [...doc.querySelectorAll('.publication .title')].map(text);
        expect(titles).toEqual(publicationsData.publications.map(pub => pub.title));
    });

    it('explains the star and dagger once, below the page title', () => {
        expect(text(doc.querySelector('h1 + .intro'))).toBe('* denotes equal contribution. † denotes equal advising.');
    });

    it('bolds the site author and stars main authors only when they share first authorship', () => {
        const self = [...doc.querySelectorAll('.self')].map(text);
        expect(self.length).toBeGreaterThan(0);
        expect(self.every(name => name.replace(/\*$/, '') === site.authorName)).toBe(true);
        expect(self).toContain(`${site.authorName}*`);
    });

    it('daggers equal advisors and stars only shared main authors', () => {
        const cards = [...doc.querySelectorAll('.publication')];
        publicationsData.publications.forEach((pub, i) => {
            const advisors = ('equal_advisors' in pub && pub.equal_advisors) || [];
            const authors = text(cards[i].querySelector('.title + p'));
            for (const name of advisors) expect(authors).toContain(`${name}†`);
            const starred = pub.main_authors.length > 1;
            for (const name of pub.main_authors) expect(authors.includes(`${name}*`), name).toBe(starred);
        });
    });

    it('hides empty paper and code links', () => {
        const linkCount = publicationsData.publications.reduce((n, pub) => n + (pub.paper_url ? 1 : 0) + (pub.code_url ? 1 : 0), 0);
        expect(doc.querySelectorAll('.publication .link a')).toHaveLength(linkCount);
    });
});

describe.skipIf(blogPublic)('blog, when not public', () => {
    it('is left out of the public build entirely', () => {
        for (const path of ['blog', 'rss.xml']) expect(existsSync(join(outDir, path)), path).toBe(false);
        expect(read('sitemap-0.xml')).not.toContain('/blog');
        const doc = page('index.html');
        expect(doc.querySelector('nav a[href^="/blog"]')).toBeNull();
        expect(doc.querySelector('link[type="application/rss+xml"]')).toBeNull();
    });
});

describe('blog, when enabled', () => {
    it('adds the nav link and marks it current on posts', () => {
        const links = [...blogPage('blog/test/index.html').querySelectorAll('nav a[aria-current="page"]')];
        expect(new Set(links.map(a => a.getAttribute('href')))).toEqual(new Set(['/blog/']));
    });

    it('lists posts newest first with formatted dates and tags', () => {
        const doc = blogPage('blog/index.html');
        const hrefs = [...doc.querySelectorAll('.card-link')].map(a => a.getAttribute('href'));
        expect(hrefs).toEqual(postSlugs.map(slug => `/blog/${slug}/`));
        expect(text(doc.querySelector('.card .date'))).toBe('2025-04-01');
        expect([...doc.querySelectorAll('.card')][0].querySelectorAll('.chip')).toHaveLength(2);
    });

    it('renders a post with metadata, highlighting and literal punctuation', () => {
        const doc = blogPage('blog/test/index.html');
        expect(doc.title).toBe(`Test | ${site.name}`);
        expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('An overview of testing');
        expect([...doc.querySelectorAll('.post h1')].map(text)).toEqual(['Testing', 'Types of Testing', 'Unit Test']);
        expect(doc.querySelector('.post pre.language-java code .token.keyword')).not.toBeNull();
        const body = text(doc.querySelector('.post'));
        expect(body).toContain("Let's say");
        expect(body).not.toMatch(/title:|description:/);
    });

    it('bundles figures referenced by posts', () => {
        const src = blogPage('blog/exception/index.html').querySelector('.post img')?.getAttribute('src');
        expect(src).toMatch(/^\/_astro\/exception_execution_flow\.\w+\.\w+$/);
        expect(existsSync(join(blogOutDir, src!))).toBe(true);
    });

    it('publishes an RSS feed with every post', () => {
        const rss = read('rss.xml', blogOutDir);
        for (const slug of postSlugs) expect(rss).toContain(`https://anderson-lee-git.github.io/blog/${slug}/`);
    });
});
