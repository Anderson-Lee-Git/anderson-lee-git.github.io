import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';

const About: React.FC = () => {
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
            <Box
                sx={{
                    display: 'flex',
                    gap: theme.spacing(6),
                    alignItems: 'flex-start'
                }}
            >
                <Box sx={{ flex: '0 0 30%' }}>
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        style={{
                            marginTop: theme.spacing(1),
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: theme.spacing(2),
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                </Box>
                <Box sx={{ flex: '0 0 65%' }}>
                    <Typography 
                        sx={{ 
                            ...theme.typography.h1, 
                            color: theme.text, 
                            margin: 0 
                        }}
                    >
                        Anderson Lee
                    </Typography>
                    <Typography 
                        sx={{ 
                            ...theme.typography.body1, 
                            color: theme.text 
                        }}
                    >
                        Hi there! I recently got my bachelor degree in Computer Science at University of Washington in 2024. My research interest is around fairness in machine learning, interpretability, adaptation in online setting and efficient machine learning. My most recent work is on evaluating bias mitigation methods in the robustness and fairness space under incomplete and full demographic information. I'm actively applying to PhD program for Fall 2025.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
