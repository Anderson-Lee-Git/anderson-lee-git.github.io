import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
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
        <Card
            sx={{
                margin: theme.spacing(2),
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
            <CardActionArea component={Link} to={`/blog/${slug}`}>
                <CardContent>
                    <Typography
                        component="div"
                        sx={{
                            ...theme.typography.h5,
                            color: theme.primary,
                            marginBottom: theme.spacing(1),
                            transition: 'none'
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        color={theme.secondary}
                        sx={{
                            ...theme.typography.body1,
                            marginBottom: theme.spacing(2),
                            transition: 'none'
                        }}
                    >
                        {date}
                    </Typography>
                    <Typography
                        color={theme.text}
                        sx={{
                            ...theme.typography.body2,
                            transition: 'none'
                        }}
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BlogCard;
