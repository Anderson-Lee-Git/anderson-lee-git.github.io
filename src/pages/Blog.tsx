import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import BlogCard, { BlogPostAbstract } from '../components/BlogCard';
import blogData from '../data/blog_metadata.json';

const blogPosts: BlogPostAbstract[] = blogData.blog_posts.map((post, index) => ({
    id: index.toString(),
    title: post.title,
    date: post.date,
    description: post.description,
    slug: post.slug
}));


const Blog: React.FC = () => {
    const { theme } = useTheme();
    return (
        <Box
            component="main"
            sx={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: (theme) => theme.spacing(4),
            }}
        >
            <Typography
                sx={{
                    ...theme.typography.h3,
                    paddingLeft: theme.spacing(3),
                    paddingRight: theme.spacing(3),
                    color: theme.text,
                }}
            >
                Blog Posts
            </Typography>
            <Box>
                {blogPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                ))}
            </Box>
        </Box>
    );
};

export default Blog;