import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import cvPdf from '../assets/cv.pdf';

const About: React.FC = () => {
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
            <Box
                sx={{
                    display: 'flex',
                    gap: theme.spacing(6),
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                        flexDirection: 'column',
                        gap: theme.spacing(4),
                        alignItems: 'center'
                    }
                }}
            >
                <Box
                    sx={{
                        flex: '0 0 30%',
                        display: 'flex',
                        justifyContent: 'center',
                        [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                            width: '100%',
                            flex: 'auto'
                        }
                    }}
                >
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        style={{
                            marginTop: theme.spacing(1),
                            width: '100%',
                            maxWidth: '400px', // Limit max width on mobile
                            borderRadius: theme.spacing(2),
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                    />
                </Box>
                <Box sx={{
                    flex: '0 0 65%',
                    [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                        width: '100%',
                        flex: 'auto'
                    }
                }}>
                    <Typography
                        variant="h1"
                        sx={{
                            ...theme.typography.h1,
                            color: theme.text,
                            fontSize: theme.typography.h1.fontSize, // Ensure precedence
                            [`@media (max-width: ${theme.breakpoints.mobile})`]: {
                                fontSize: '2rem', // Smaller on mobile
                                textAlign: 'center'
                            }
                        }}
                    >
                        Anderson Lee
                    </Typography>
                    <Typography
                        component="div"
                        sx={{
                            ...theme.typography.body1,
                            color: theme.text,
                            '& a': {
                                color: theme.primary,
                                textDecoration: 'none',
                                fontWeight: 500,
                                transition: 'color 0.2s',
                                '&:hover': {
                                    color: theme.accent,
                                    textDecoration: 'underline'
                                }
                            }
                        }}
                    >
                        I'm a first-year PhD student at Princeton University advised by Professor <a href="https://www.korolova.com/" target="_blank" rel="noopener noreferrer">Aleksandra Korolova</a>. My research interest includes:
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
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
                        Before coming to the United States, I was born and raised in Tainan City, Taiwan 🇹🇼. Outside of school and work, I enjoy playing badminton and guitar.
                    </Typography>
                    <Box
                        sx={{
                            mt: theme.spacing(2),
                            mb: theme.spacing(2),
                            borderTop: '2px solid rgba(0, 0, 0, 0.08)',
                            width: '100%'
                        }}
                    />
                    <Box
                        sx={{
                            mt: theme.spacing(1),
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            fontSize: '0.95rem',
                            color: theme.text,
                            '& a': {
                                color: theme.primary,
                                textDecoration: 'none',
                                fontWeight: 500,
                                transition: 'color 0.2s',
                                '&:hover': {
                                    color: theme.accent,
                                    textDecoration: 'underline'
                                }
                            },
                            '& > *:not(:last-of-type)': {
                                position: 'relative',
                                paddingRight: theme.spacing(2),
                                marginRight: theme.spacing(2),
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    transform: 'translateY(-50%)',
                                    width: '1px',
                                    height: '1.2rem',
                                    backgroundColor: 'rgba(0, 0, 0, 0.20)'
                                }
                            }
                        }}
                    >
                        <Typography component="span">
                            <a href={cvPdf} target="_blank" rel="noopener noreferrer">
                                CV
                            </a>
                        </Typography>
                        <Typography component="span">
                            <a
                                href="https://scholar.google.com/citations?hl=en&user=o6UuNqgAAAAJ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Scholar
                            </a>
                        </Typography>
                        <Typography component="span">
                            cl6486 [ at ] princeton [ dot ] edu
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
