import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import BottomNavBar from '@/presentation/components/navigation/BottomNavBar';
import AppFooter from '@/presentation/components/footer/AppFooter';
import { ToastProvider } from '@/presentation/contexts/ToastContext';

const RootLayout: React.FC = () => {
  return (
    <ToastProvider>
      <RootContainer>
        <MainContent className="hide-scrollbar">
          <Outlet />
          <AppFooter />
        </MainContent>
        <Footer>
          <BottomNavBar />
        </Footer>
      </RootContainer>
    </ToastProvider>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Footer = styled.footer`
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;

export default RootLayout;
