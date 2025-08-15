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
                        I'm a first-year PhD student at Princeton University advised by Professor <a href="https://www.korolova.com/" target="_blank" rel="noopener noreferrer">Aleksandra Korolova</a>. My research interest includes:
                        <ul>
                            <li>
                                <b>Data-centric ML</b>: How do we construct, filter, and use high-quality and diverse data for training ML models efficiently under a fixed-algorithm paradigm?
                            </li>
                            <li>
                                <b>Reliability</b>: How can we make ML systems robust to adversarial or distribution shifts? How do models generalize to unseen domains and data given a massive amount of training data?
                            </li>
                        </ul>
                        Prior to Princeton, I got my undergraduate degree in Computer Science at University of Washington, advised by Professor <a href="https://jamiemorgenstern.com/#" target="_blank" rel="noopener noreferrer">Jamie Morgenstern</a> and <a href="https://rachelhong.me/" target="_blank" rel="noopener noreferrer">Rachel Hong</a>. I was very fortunate to work with them on <i>evaluating bias mitigation methods with incomplete demographic information setup</i>. I also had an amazing opportunity to work with <a href="https://emazuh.github.io/" target="_blank" rel="noopener noreferrer">Emmanuel Mensah</a> on <i>low-resource audio-visual transformers for wildlife monitoring</i>.
                        <br></br>
                        <br></br>
                        Outside of school and work, I enjoy playing badminton and guitar. I'm also learning how to snowboard.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
