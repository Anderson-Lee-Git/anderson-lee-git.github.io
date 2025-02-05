import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';

export interface ExperienceAbstract {
    title: string;
    organization: string;
    period: string;
    description: string;
    imageUrl: string;
}

const ExperienceCard: React.FC<ExperienceAbstract> = ({
    title,
    organization,
    period,
    description,
    imageUrl
}) => {
    const { theme } = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                padding: theme.spacing(3),
                margin: theme.spacing(2),
                border: `1px solid ${theme.secondary}`,
                background: 'transparent',
                borderRadius: theme.spacing(2),
                display: 'flex',
                gap: theme.spacing(3)
            }}
        >
            <Box
                component="img"
                src={imageUrl}
                alt={organization}
                sx={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: theme.spacing(1)
                }}
            />
            <Box>
                <Typography sx={{
                    ...theme.typography.h5,
                    color: theme.primary,
                    marginBottom: theme.spacing(1)
                }}>
                    {title}
                </Typography>
                <Typography sx={{
                    ...theme.typography.body1,
                    color: theme.text,
                    fontWeight: 'bold',
                    marginBottom: theme.spacing(0.5)
                }}>
                    {organization}
                </Typography>
                <Typography sx={{
                    ...theme.typography.body2,
                    color: theme.secondary,
                    marginBottom: theme.spacing(1)
                }}>
                    {period}
                </Typography>
                <Typography sx={{
                    ...theme.typography.body1,
                    color: theme.text
                }}>
                    {description}
                </Typography>
            </Box>
        </Paper>
    );
};

export default ExperienceCard;
