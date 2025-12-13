import React, { useLayoutEffect, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNavBar from '@/presentation/components/navigation/BottomNavBar';
import AppFooter from '@/presentation/components/footer/AppFooter';
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
  // 단, 크롭 페이지에서 돌아올 때는 스크롤 위치 유지
  // useLayoutEffect를 사용하여 렌더링 전에 스크롤 위치 설정
  useLayoutEffect(() => {
    // sessionStorage에서 저장된 스크롤 위치 확인 (크롭 페이지에서 돌아온 경우)
    const savedScrollData = sessionStorage.getItem('scrollPosition');
    
    if (savedScrollData) {
      try {
        const scrollData = JSON.parse(savedScrollData);
        // 저장된 경로와 현재 경로가 일치하는 경우에만 복원
        if (scrollData.path === location.pathname) {
          // 모바일에서 DOM 렌더링 완료를 보장하기 위해 여러 단계로 스크롤 복원
          const restoreScroll = () => {
            if (mainContentRef.current) {
              mainContentRef.current.scrollTop = scrollData.mainContentScrollTop || 0;
            }
            if (scrollData.scrollY) {
              window.scrollTo(0, scrollData.scrollY);
            }
            
            // 모바일 브라우저의 뷰포트 높이 변화를 고려하여 추가 확인
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (mainContentRef.current) {
                  const currentScroll = mainContentRef.current.scrollTop;
                  const targetScroll = scrollData.mainContentScrollTop || 0;
                  // 스크롤 위치가 정확히 복원되지 않았으면 재시도
                  if (Math.abs(currentScroll - targetScroll) > 1) {
                    mainContentRef.current.scrollTop = targetScroll;
                  }
                }
              });
            });
          };
          
          // 즉시 복원 시도
          restoreScroll();
          
          // 모바일 브라우저의 뷰포트 높이 변화를 고려하여 약간의 지연 후 재시도
          setTimeout(() => {
            restoreScroll();
          }, 100);
          
          // 복원 후 sessionStorage에서 삭제
          sessionStorage.removeItem('scrollPosition');
          return;
        }
      } catch (error) {
        console.error('스크롤 위치 복원 실패:', error);
        sessionStorage.removeItem('scrollPosition');
      }
    }
    
    // 크롭 페이지에서 돌아온 경우가 아니고 채팅 페이지가 아닌 경우 스크롤을 최상단으로 이동
    if (!isChatPage) {
      // MainContent 스크롤 컨테이너를 최상단으로 이동
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
      }
      // window 레벨 스크롤도 최상단으로 이동 (혹시 모를 경우 대비)
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state, isChatPage]);

  return (
    <RootContainer>
      <MainContent ref={mainContentRef} className="hide-scrollbar">
        <ApiErrorToastListener />
        <Outlet />
        <AppFooter />
      </MainContent>
      <BottomNavBar />
    </RootContainer>
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
