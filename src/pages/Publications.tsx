import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import { PublicationCard } from '../components/PublicationCard';
import publicationsData from '../data/publications.json';

interface Publication {
    title: string;
    main_authors: string[];
    contributors: string[];
    venue: string;
    url: string;
}

const Publications: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Box
            component="main"
            sx={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: theme.spacing(4)
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
                        url={pub.url}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Publications;
