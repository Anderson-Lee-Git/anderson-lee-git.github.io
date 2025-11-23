import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import BlogCard, { BlogPostAbstract } from '../components/BlogCard';
import BlogPost from '../components/BlogPost';
import blogData from '../data/blog_metadata.json';

const blogPosts: BlogPostAbstract[] = blogData.blog_posts.map((post, index) => ({
    id: index.toString(),
    title: post.title,
    date: post.date,
    description: post.description,
    slug: post.slug,
    tags: post.tags
}));

// Component for the blog list page
const BlogList: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Box
            component="main"
            sx={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: theme.spacing(4),
                [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                    padding: theme.spacing(2)
                }
            }}
        >
            <Typography
                component="div"
                sx={{
                    ...theme.typography.h3,
                    paddingLeft: theme.spacing(3),
                    paddingRight: theme.spacing(3),
                    color: theme.text,
                    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                        paddingLeft: theme.spacing(1),
                        paddingRight: theme.spacing(1),
                        fontSize: '1.5rem'
                    }
                }}
            >
                Blog
            </Typography>
            <Typography
                component="div"
                sx={{
                    ...theme.typography.body1,
                    paddingLeft: theme.spacing(3),
                    paddingRight: theme.spacing(3),
                    color: theme.text,
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(3),
                    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                        paddingLeft: theme.spacing(1),
                        paddingRight: theme.spacing(1),
                        fontSize: '0.9rem'
                    }
                }}
            >
                A collection of my thoughts toward concepts. No guarantee to pass AI-generated content check :) Feel free to contact me if there is any mistake made in the blog posts.
            </Typography>
            <Box
                sx={{
                    padding: theme.spacing(1),
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: theme.spacing(2),
                    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                        gridTemplateColumns: '1fr',
                        padding: 0
                    }
                }}
            >
                {blogPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                ))}
            </Box>
        </Box>
    );
};

// Main Blog component that handles routing
const Blog: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/:slug" element={<BlogPost blogPosts={blogPosts} />} />
        </Routes>
    );
};

export default Blog;
