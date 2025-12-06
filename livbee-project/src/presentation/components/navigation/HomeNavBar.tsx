import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import logoImage from '@/presentation/assets/images/liveelogo.png';

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const NavInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.layout.pagePadding.mobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.desktop};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.foreground};
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  max-width: 120px;
  object-fit: contain;
  display: block;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const HomeNavBar: React.FC = () => (
  <NavBar>
    <NavInner>
      <LogoContainer>
        <LogoLink to="/">
          <LogoImage src={logoImage} alt="Livbee 로고" />
        </LogoLink>
      </LogoContainer>
      <IconContainer>
        <NotificationButton type="button" aria-label="알림">
          <Bell size={24} />
        </NotificationButton>
      </IconContainer>
    </NavInner>
  </NavBar>
);

export default HomeNavBar;

