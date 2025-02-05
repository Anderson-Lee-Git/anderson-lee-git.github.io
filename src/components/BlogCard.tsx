import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';

export interface BlogPostAbstract {
    id: string;
    title: string;
    date: string;
    description: string;
    slug: string;
}

const BlogCard: React.FC<BlogPostAbstract> = ({ title, date, description, slug }) => {
    const { theme } = useTheme();

    return (
        <Link
            to={`/blog/${slug}`}
            style={{ textDecoration: 'none' }}
        >
            <Paper
                elevation={0}
                sx={{
                    padding: theme.spacing(3),
                    margin: theme.spacing(2),
                    border: `1px solid ${theme.secondary}`,
                    background: 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        borderColor: theme.primary,
                        transition: 'all 0.2s ease-in-out',
                    },
                    borderRadius: theme.spacing(2),
                }}
            >
                <Typography sx={{
                    ...theme.typography.h5,
                    color: theme.primary,
                    marginBottom: theme.spacing(1)
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    ...theme.typography.body2,
                    color: theme.secondary,
                    marginBottom: theme.spacing(1)
                }}>
                    {date}
                </Typography>
                <Typography sx={{
                    ...theme.typography.body1,
                    color: theme.text
                }}>
                    {description}
                </Typography>
            </Paper>
        </Link>
    );
};

export default BlogCard;
