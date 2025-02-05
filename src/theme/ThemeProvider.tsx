import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface Theme {
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
    secondary: '#a7afc8',
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
            fontWeight: 500,
            marginBottom: '0.5rem'
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

const darkTheme: Theme = {
    text: '#eff4f5',
    background: '#080c0d',
    primary: '#5c8a93',
    secondary: '#373f58',
    accent: '#4d527a',
    typography: {
        ...lightTheme.typography,
        nav: {
            fontSize: '1.2rem',
            fontWeight: 400
        }
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
            {children}
        </ThemeContext.Provider>
    );
};
