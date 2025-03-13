import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, Theme } from '../theme/ThemeProvider';
import { darkTheme } from '../theme/ThemeProvider';
import styled from '@emotion/styled';
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";

const Nav = styled.nav<{ theme: Theme }>`
    position: fixed;
    top: 0;
    width: 100%;
    padding: ${props => props.theme.spacing(2)};
    z-index: 1000;
`;

const NavContainer = styled.div<{ theme: Theme }>`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: ${props => `0 ${props.theme.spacing(3)}`};
`;

const NavLinks = styled.div<{ theme: Theme }>`
    display: flex;
    gap: ${props => props.theme.spacing(4)};
    align-items: center;
`;

const ThemeToggleWrapper = styled.div<{ theme: Theme }>`
    margin-left: ${props => props.theme.spacing(1)};
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 2rem;

    /* Style the toggle */
    .theme-toggle {
        transform: scale(1.5);
        color: ${props => props.theme.text};
    }

    /* Adjust the color of both states */
    .theme-toggle--clicked,
    .theme-toggle--unclicked {
        color: ${props => props.theme.text};
    }
`;

const NavLink = styled(Link) <{ isActive: boolean; theme: Theme }>`
    color: ${props => props.isActive ? props.theme.primary : props.theme.text};
    text-decoration: none;
    font-size: ${props => props.theme.typography.nav.fontSize};
    font-weight: ${props => props.theme.typography.nav.fontWeight};
    transition: color 0.2s ease;
    padding-bottom: ${props => props.theme.spacing(0.5)};
    border-bottom: 2px solid ${props =>
        props.isActive ? props.theme.primary : 'transparent'
    };

    &:hover {
        color: ${props => props.theme.primary};
    }
`;

interface NavItem {
    path: string;
    label: string;
}

const Navigation: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isDarkTheme = theme === darkTheme;

    const navItems: NavItem[] = [
        { path: '/about', label: 'About' },
        { path: '/publications', label: 'Publications' },
        { path: '/blog', label: 'Blog' },
        // { path: '/experience', label: 'Experience' }
    ];

    return (
        <Nav theme={theme}>
            <NavContainer theme={theme}>
                <NavLinks theme={theme}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            isActive={location.pathname === item.path}
                            theme={theme}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <ThemeToggleWrapper theme={theme}>
                        <Classic
                            duration={750}
                            toggled={isDarkTheme}
                            onToggle={toggleTheme}
                            {...{} as any}
                        />
                    </ThemeToggleWrapper>
                </NavLinks>
            </NavContainer>
        </Nav>
    );
};

export default Navigation;