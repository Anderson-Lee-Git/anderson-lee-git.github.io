import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';

interface PublicationCardProps {
    title: string;
    mainAuthors: string[];
    contributors: string[];
    venue: string;
    paper_url: string;
    code_url: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
    title,
    mainAuthors,
    contributors,
    venue,
    paper_url,
    code_url
}) => {
    const { theme } = useTheme();

    const formatAuthors = () => {
        const allAuthors = [...mainAuthors, ...contributors];
        return (
            <Typography sx={{
                ...theme.typography.body1,
                color: theme.text
            }}>
                {allAuthors.map((author, index) => (
                    (author === "Chung Peng Lee") ?
                        <React.Fragment key={index}>
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                {author}
                                {mainAuthors.includes(author) && "*"}
                            </Box>
                            {index < allAuthors.length - 1 && ", "}
                        </React.Fragment> :
                        <React.Fragment key={index}>
                            {author}
                            {mainAuthors.includes(author) && "*"}
                            {index < allAuthors.length - 1 && ", "}
                        </React.Fragment>
                ))}
            </Typography>
        );
    };

    return (
        <Paper
            elevation={0}
            sx={{
                padding: theme.spacing(1),
                margin: theme.spacing(2),
                background: 'transparent',
            }}
        >
            <Typography sx={{
                ...theme.typography.body1,
                color: theme.text,
                fontWeight: 'bold',
            }}>
                {title}
            </Typography>
            {formatAuthors()}
            <Typography sx={{
                ...theme.typography.body1,
                color: theme.text,
                fontStyle: 'italic',
            }}>
                {venue}
            </Typography>
            {paper_url && (
                <Typography sx={{ ...theme.typography.body1, display: 'inline', marginRight: '10px' }}>
                    <a
                        href={paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: theme.primary,
                            textDecoration: 'none'
                        }}
                    >
                        Paper
                    </a>
                </Typography>
            )}
            {code_url && (
                <Typography sx={{ ...theme.typography.body1, display: 'inline' }}>
                    <a
                        href={code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: theme.primary,
                            textDecoration: 'none'
                        }}
                    >
                        Code
                    </a>
                </Typography>
            )}
        </Paper>
    );
};

export default PublicationCard;