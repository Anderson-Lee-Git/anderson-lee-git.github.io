import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, Theme } from '../theme/ThemeProvider';
import styled from '@emotion/styled';

const Nav = styled.nav<{ theme: Theme }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: ${props => props.theme.spacing(3)} 0;
    z-index: 1000;
    height: 30px;
    background-color: ${props => props.theme.background};
`;

const NavContainer = styled.div<{ theme: Theme }>`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
`;

const NavLinks = styled.div<{ theme: Theme }>`
    display: flex;
    gap: ${props => props.theme.spacing(2)};
    align-items: center;
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

const NavSpacer = styled.div<{ theme: Theme }>`
    height: 60px;
    width: 100%;
`;

interface NavItem {
    path: string;
    label: string;
}

const Navigation: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();

    const navItems: NavItem[] = [
        { path: '/about', label: 'about' },
        { path: '/publications', label: 'publications' },
        { path: '/blog', label: 'blog' },
        // { path: '/experience', label: 'Experience' }
    ];

    return (
        <>
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
                    </NavLinks>
                </NavContainer>
            </Nav>
            <NavSpacer theme={theme} />
        </>
    );
};

export default Navigation;