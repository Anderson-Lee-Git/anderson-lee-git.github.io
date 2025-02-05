import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import ExperienceCard, { ExperienceAbstract } from '../components/ExperienceCard';

// Mock data - replace with actual data source
const experiencesMock: ExperienceAbstract[] = [
    {
        title: 'Research Assistant',
        organization: 'Computer Science Lab',
        period: 'Jan 2022 - Present',
        description: 'Conducted research in machine learning and data analysis...',
        imageUrl: '/images/cs-lab.jpg'
    },
    // Add more experiences here
];

const Experience: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Box
            component="main"
            sx={{
                maxWidth: '1000px',
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
                Other Stuffs
            </Typography>
            <Box>
                {experiencesMock.map((experience, index) => (
                    <ExperienceCard key={index} {...experience} />
                ))}
            </Box>
        </Box>
    );
};

export default Experience;
