import React, { createContext, useContext, ReactNode } from 'react';
import { Global, css } from '@emotion/react';

interface Typography {
    h1: {
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    h2: {
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    h3: {
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    h4: {
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    h5: {
        fontSize: string;
        fontWeight: number;
        marginBottom: string;
    };
    body1: {
        fontSize: string;
        lineHeight: number;
    };
    body2: {
        fontSize: string;
        lineHeight: number;
    };
    nav: {
        fontSize: string;
        fontWeight: number;
    };
}

export interface Theme {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    typography: Typography;
    spacing: (multiplier: number) => string;
}

interface ThemeContextType {
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const theme: Theme = {
    text: '#0a0f10',
    background: '#f2f6f7',
    primary: '#2a6b7b',
    secondary: '#5d6970',
    accent: '#3a4a8c',
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem'
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '0.8rem'
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            marginBottom: '0.7rem'
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '0.5rem'
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '0.5rem'
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.4
        },
        nav: {
            fontSize: '1.2rem',
            fontWeight: 400
        }
    },
    spacing: (multiplier: number) => `${0.5 * multiplier}rem`
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={{ theme }}>
            <Global
                styles={css`
                    body {
                        background-color: ${theme.background};
                        color: ${theme.text};
                        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
                        margin: 0;
                        padding: 0;
                    }
                    
                    /* Style links but exclude navigation links */
                    a:not(nav a) {
                        color: ${theme.primary};
                        text-decoration: none;
                        transition: color 0.2s ease;
                    }
                    
                    a:not(nav a):hover {
                        color: ${theme.accent};
                        text-decoration: underline;
                    }
                `}
            />
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
