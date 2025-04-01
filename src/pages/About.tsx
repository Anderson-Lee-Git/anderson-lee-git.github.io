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
                        I'm an incoming PhD student at Princeton University advised by Professor <a href="https://www.korolova.com/" target="_blank" rel="noopener noreferrer">Aleksandra Korolova</a>. My research interest is in making ML systems more reliable and trustworthy, including
                        <ul>
                            <li>
                                <b>Privacy</b>: In the application of generative models, what's the notion of privacy around training data, in-context learning, generated content, and other components in the lifecycle?
                            </li>
                            <li>
                                <b>Evaluation</b>: With the diverse capabilities of foundation models, what evaluation metrics are appropriate for assessing models' set of skills and their robustness toward different tasks?
                            </li>
                            <li>
                                <b>Trustworthiness</b>: What metrics are convincing to make users willing to <i>trust</i> ML systems with their tasks?
                            </li>
                        </ul>
                        Prior to Princeton, I got my undergraduate degree in Computer Science at University of Washington, advised by Professor Jamie Morgenstern and Rachel Hong. I was very fortunate to work with them on <i>evaluating bias mitigation methods with incomplete demographic information setup</i>. I also had an amazing opportunity to work with Emmanuel Mensah on <i>low-resource audio-visual transformers for wildlife monitoring</i>.
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
