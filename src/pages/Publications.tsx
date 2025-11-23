import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import PublicationCard from '../components/PublicationCard';
import publicationsData from '../data/publications.json';

const Publications: React.FC = () => {
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
                variant="h3"
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
                Publications
            </Typography>
            <Box>
                {publicationsData.publications.map((pub, index) => (
                    <PublicationCard
                        key={index}
                        title={pub.title}
                        mainAuthors={pub.main_authors}
                        contributors={pub.contributors}
                        venue={pub.venue}
                        paper_url={pub.paper_url}
                        code_url={pub.code_url}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Publications;
