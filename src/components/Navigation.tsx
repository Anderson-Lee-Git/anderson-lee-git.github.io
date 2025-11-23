import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme, Theme } from '../theme/ThemeProvider';
import styled from '@emotion/styled';

const Nav = styled.nav<{ theme: Theme }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: ${props => props.theme.spacing(2)} 0;
    z-index: 1000;
    background-color: ${props => props.theme.background};
    border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const NavContainer = styled.div<{ theme: Theme }>`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${props => props.theme.spacing(3)};
    position: relative;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        padding: 0 ${props => props.theme.spacing(2)};
    }
`;

const Logo = styled(Link)<{ theme: Theme }>`
    font-weight: 700;
    font-size: 1.2rem;
    color: ${props => props.theme.text};
    text-decoration: none;
    display: none; /* Hidden on desktop unless we want it, showing on mobile might be good */
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        display: block;
    }
`;

const NavLinks = styled.div<{ theme: Theme }>`
    display: flex;
    gap: ${props => props.theme.spacing(4)};
    align-items: center;
    margin-left: auto;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        display: none;
    }
`;

const NavLink = styled(Link) <{ isActive: boolean; theme: Theme }>`
    color: ${props => props.isActive ? props.theme.primary : props.theme.text};
    text-decoration: none;
    font-size: ${props => props.theme.typography.nav.fontSize};
    font-weight: ${props => props.theme.typography.nav.fontWeight};
    transition: all 0.2s ease;
    padding-bottom: ${props => props.theme.spacing(0.5)};
    border-bottom: 2px solid ${props =>
        props.isActive ? props.theme.primary : 'transparent'
    };

    &:hover {
        color: ${props => props.theme.primary};
    }
`;

const MobileMenuButton = styled.button<{ theme: Theme }>`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.text};
    padding: ${props => props.theme.spacing(1)};
    margin-left: auto;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const MobileMenu = styled.div<{ isOpen: boolean; theme: Theme }>`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${props => props.theme.background};
    padding: ${props => props.theme.spacing(2)} 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    align-items: center;
    gap: ${props => props.theme.spacing(2)};
    border-top: 1px solid rgba(0,0,0,0.05);

    @media (min-width: ${props => props.theme.breakpoints.mobile}) {
        display: none;
    }
`;

const MobileNavLink = styled(Link) <{ isActive: boolean; theme: Theme }>`
    color: ${props => props.isActive ? props.theme.primary : props.theme.text};
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(2)};
    width: 100%;
    text-align: center;
    
    &:hover {
        background-color: rgba(0,0,0,0.03);
        color: ${props => props.theme.primary};
    }
`;

const NavSpacer = styled.div<{ theme: Theme }>`
    height: 70px;
    width: 100%;
`;

interface NavItem {
    path: string;
    label: string;
}

const Navigation: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { path: '/about', label: 'about' },
        { path: '/publications', label: 'publications' },
        // { path: '/blog', label: 'Blog' },
        // { path: '/experience', label: 'Experience' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <Nav theme={theme}>
                <NavContainer theme={theme}>
                    <Logo to="/" theme={theme}>Anderson Lee</Logo>
                    
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

                    <MobileMenuButton theme={theme} onClick={toggleMenu} aria-label="Toggle menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </MobileMenuButton>

                    <MobileMenu isOpen={isMenuOpen} theme={theme}>
                        {navItems.map((item) => (
                            <MobileNavLink
                                key={item.path}
                                to={item.path}
                                isActive={location.pathname === item.path}
                                theme={theme}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </MobileNavLink>
                        ))}
                    </MobileMenu>
                </NavContainer>
            </Nav>
            <NavSpacer theme={theme} />
        </>
    );
};

export default Navigation;
