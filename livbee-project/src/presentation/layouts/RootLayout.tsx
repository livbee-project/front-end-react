import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import BottomNavBar from '@/presentation/components/navigation/BottomNavBar';
import AppFooter from '@/presentation/components/footer/AppFooter';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import { ApiErrorToastListener } from '@/presentation/components/error/ApiErrorToastListener';

const RootLayout: React.FC = () => {
  return (
    <ToastProvider>
      <RootContainer>
        <MainContent className="hide-scrollbar">
          <ApiErrorToastListener />
          <Outlet />
          <AppFooter />
        </MainContent>
        <BottomNavBar />
      </RootContainer>
    </ToastProvider>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 32px;

  @media (max-width: 768px) {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }
`;

export default RootLayout;
