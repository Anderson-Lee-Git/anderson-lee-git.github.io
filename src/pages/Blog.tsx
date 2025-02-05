import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import BlogCard, { BlogPostAbstract } from '../components/BlogCard';

// Mock data - replace this with actual data fetching logic
const mockBlogPosts: BlogPostAbstract[] = [
    {
        id: '1',
        title: 'Getting Started with React and TypeScript',
        date: '2023-06-15',
        description: 'Learn how to set up a new project with React and TypeScript...',
        slug: 'react-typescript-setup',
    },
    // Add more blog posts here
];

const Blog: React.FC = () => {
    const { theme } = useTheme();
    return (
        <Box
            component="main"
            sx={{
                maxWidth: '900px',
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
                {mockBlogPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                ))}
            </Box>
        </Box>
    );
};

export default Blog;