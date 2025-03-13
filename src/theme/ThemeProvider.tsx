import React, { createContext, useContext, useState, ReactNode } from 'react';
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
    toggleTheme: () => void;
}

const lightTheme: Theme = {
    text: '#0a0f10',
    background: '#f2f6f7',
    primary: '#6c9aa3',
    secondary: '#6b7284',
    accent: '#858ab2',
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 650,
            marginBottom: '1rem'
        },
        h2: {
            fontSize: '1.2rem',
            fontWeight: 500,
            marginBottom: '1rem'
        },
        h3: {
            fontSize: '2.0rem',
            fontWeight: 550,
            marginBottom: '1rem'
        },
        h5: {
            fontSize: '1.4rem',
            fontWeight: 550,
            marginBottom: '0.2rem',
        },
        body1: {
            fontSize: '1.1rem',
            lineHeight: 1.6
        },
        body2: {
            fontSize: '0.9rem',
            lineHeight: 1.4
        },
        nav: {
            fontSize: '1.2rem',
            fontWeight: 400
        }
    },
    spacing: (multiplier: number) => `${0.5 * multiplier}rem`
};

export const darkTheme: Theme = {
    text: '#e1e5e6',
    background: '#1a1a1a',
    primary: '#7eb8c2',
    secondary: '#8b93ad',
    accent: '#6168a3',
    typography: {
        ...lightTheme.typography
    },
    spacing: lightTheme.spacing
};

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? darkTheme : lightTheme;
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Global
                styles={css`
                    body {
                        background-color: ${theme.background};
                        color: ${theme.text};
                        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
                        margin: 0;
                        padding: 0;
                    }
                `}
            />
            {children}
        </ThemeContext.Provider>
    );
};
