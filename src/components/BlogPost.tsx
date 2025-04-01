import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useTheme, Theme } from '../theme/ThemeProvider';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from '@emotion/styled';
import { BlogPostAbstract } from './BlogCard';
import { ErrorBoundary } from 'react-error-boundary';

const BlogContent = styled.div<{ theme: Theme }>`
    line-height: 1.6;
    
    h1, h2, h3, h4, h5, h6 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        color: ${props => props.theme.text};
    }
    
    p {
        margin-bottom: 1.2em;
        color: ${props => props.theme.text};
    }
    
    code {
        background-color: ${props => props.theme.secondary}20;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-family: monospace;
    }
    
    pre {
        margin: 1em 0;
        border-radius: 5px;
        overflow: auto;
    }
`;

interface BlogPostProps {
    blogPosts: BlogPostAbstract[];
}

const BlogPost: React.FC<BlogPostProps> = ({ blogPosts }) => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const [markdownContent, setMarkdownContent] = useState('');

    const post = blogPosts.find(post => post.slug === slug);

    useEffect(() => {
        if (slug) {
            fetch(`/blog/${slug}.md`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load blog post');
                    }
                    return response.text();
                })
                .then(text => {
                    setMarkdownContent(text);
                })
                .catch(error => {
                    console.error('Error loading markdown:', error);
                    setMarkdownContent('# Error\nFailed to load blog post content.');
                });
        }
    }, [slug]);

    if (!post) {
        return (
            <Box
                component="main"
                sx={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: (theme) => theme.spacing(4),
                }}
            >
                <Typography variant="h4" color={theme.text}>
                    Blog post not found
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: '1000px',
                margin: '0 auto',
            }}
        >
            <BlogContent theme={theme}>
                <ErrorBoundary
                    fallbackRender={({ error }) => (
                        <div>
                            <Typography color="error" variant="h6">Error rendering markdown</Typography>
                            <Typography color="error">{error.message}</Typography>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                Raw content:
                            </Typography>
                            <pre style={{
                                backgroundColor: '#f5f5f5',
                                padding: '1rem',
                                overflow: 'auto',
                                maxHeight: '300px'
                            }}>
                                {markdownContent}
                            </pre>
                        </div>
                    )}
                >
                    <ReactMarkdown
                        components={{
                            code({ className, children, ...rest }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                    <SyntaxHighlighter
                                        PreTag="div"
                                        language={match[1]}
                                        style={oneDark as any}
                                        {...rest}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </ErrorBoundary>
            </BlogContent>
        </Box>
    );
};

export default BlogPost; 