import React, { useLayoutEffect, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from '@/presentation/components/navigation/BottomNavBar';
import AppFooter from '@/presentation/components/footer/AppFooter';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import { ApiErrorToastListener } from '@/presentation/components/error/ApiErrorToastListener';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const mainContentRef = useRef<HTMLElement>(null);

  // 채팅 페이지 경로 목록 (스크롤 복원 제외)
  const chatPaths = [ROUTE_PATHS.chat, ROUTE_PATHS.chatRoom];
  const isChatPage = chatPaths.includes(location.pathname) || location.pathname.startsWith('/chat/');

  // 브라우저의 기본 스크롤 복원 비활성화 (앱 초기화 시 한 번만 실행)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 경로 변경 시 채팅 페이지가 아닌 경우 스크롤을 최상단으로 이동
  // useLayoutEffect를 사용하여 렌더링 전에 스크롤 위치 설정
  useLayoutEffect(() => {
    if (!isChatPage) {
      // MainContent 스크롤 컨테이너를 최상단으로 이동
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
      }
      // window 레벨 스크롤도 최상단으로 이동 (혹시 모를 경우 대비)
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isChatPage]);

  return (
    <ToastProvider>
      <RootContainer>
        <MainContent ref={mainContentRef} className="hide-scrollbar">
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
