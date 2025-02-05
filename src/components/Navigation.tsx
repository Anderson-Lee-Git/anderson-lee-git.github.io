import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import styled from '@emotion/styled';

const Nav = styled.nav<{ theme: any }>`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${props => props.theme.spacing(2)};
  z-index: 1000;
`;

const NavContainer = styled.div<{ theme: any }>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: ${props => props.theme.spacing(4)};
  justify-content: flex-end;
  padding-right: ${props => props.theme.spacing(4)};
`;

const NavLink = styled(Link)<{ isActive: boolean; theme: any }>`
  color: ${props => props.isActive ? props.theme.primary : props.theme.text};
  text-decoration: none;
  font-size: ${props => props.theme.typography.nav.fontSize};
  font-weight: ${props => props.theme.typography.nav.fontWeight};
  transition: color 0.2s ease;
  padding-bottom: ${props => props.theme.spacing(1)};
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
  const { theme } = useTheme();
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/about', label: 'About' },
    { path: '/publications', label: 'Publications' },
    // { path: '/blog', label: 'Blog' },
    // { path: '/experience', label: 'Experience' }
  ];

  return (
    <Nav theme={theme}>
      <NavContainer theme={theme}>
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
      </NavContainer>
    </Nav>
  );
};

export default Navigation;