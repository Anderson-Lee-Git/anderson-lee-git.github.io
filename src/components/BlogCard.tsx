import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';

export interface BlogPostAbstract {
    id: string;
    title: string;
    date: string;
    description: string;
    slug: string;
    tags?: string[];
}

const BlogCard: React.FC<BlogPostAbstract> = ({ title, date, description, slug, tags = [] }) => {
    const { theme } = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                backgroundColor: theme.background,
                borderColor: theme.primary,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: theme.spacing(1),
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)'
                }
            }}
        >
            <CardActionArea
                component={Link}
                to={`/blog/${slug}`}
                sx={{
                    textDecoration: 'none !important',
                    '&:hover': {
                        textDecoration: 'none !important'
                    },
                    '& a': {
                        textDecoration: 'none !important'
                    }
                }}
            >
                <CardContent>
                    <Typography
                        component="div"
                        sx={{
                            ...theme.typography.h5,
                            color: theme.primary,
                            marginBottom: theme.spacing(1),
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        color={theme.secondary}
                        sx={{
                            ...theme.typography.body1,
                            marginBottom: theme.spacing(2),
                        }}
                    >
                        {date}
                    </Typography>
                    <Typography
                        color={theme.text}
                        sx={{
                            ...theme.typography.body2,
                            marginBottom: theme.spacing(2),
                        }}
                    >
                        {description}
                    </Typography>
                    {tags.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        backgroundColor: `${theme.background}20`,
                                        color: theme.primary,
                                        borderColor: theme.primary,
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderRadius: `${theme.spacing(0.5)}`,
                                        '&:hover': {
                                            backgroundColor: `${theme.primary}30`,
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BlogCard;
