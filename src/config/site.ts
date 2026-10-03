export const site = {
    name: 'Anderson Lee',
    description: "Anderson Lee's personal website",
    /** Name as it appears in author lists; bolded on the publications page. */
    authorName: 'Chung Peng Lee',
    email: 'cl6486 [ at ] princeton [ dot ] edu',
    scholarUrl: 'https://scholar.google.com/citations?hl=en&user=o6UuNqgAAAAJ',
    cvUrl: '/cv.pdf',
} as const;

export interface NavItem {
    path: string;
    label: string;
}

export const navItems: NavItem[] = [
    { path: '/about/', label: 'about' },
    { path: '/publications/', label: 'publications' },
    // Only shown when the blog is enabled; see src/config/features.js.
    { path: '/blog/', label: 'blog' },
    // { path: '/experience/', label: 'Experience' }
];

/** True when `pathname` is `path` or a page beneath it, ignoring trailing slashes. */
export function isActivePath(path: string, pathname: string): boolean {
    const trim = (p: string) => p.replace(/\/+$/, '') || '/';
    const target = trim(path);
    const current = trim(pathname);
    return current === target || (target !== '/' && current.startsWith(`${target}/`));
}
