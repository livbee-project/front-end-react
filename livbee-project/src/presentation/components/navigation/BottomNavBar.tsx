import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavItem from './BottomNavItem';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useAuth } from '@/presentation/hooks/useAuth';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';
import { setAuthRedirectPath } from '@/shared/utils/authRedirect';
// 커스텀 네비게이션 아이콘 컴포넌트
import {
  IconHome,
  IconSearch,
  IconMic,
  IconCamera,
  IconSmile,
} from '@/presentation/components/icons/NavigationIcons';

/**
 * 하단 네비게이션 탭 메뉴 데이터
 * 디자인 스펙에 따라 커스텀 SVG 아이콘 사용
 */
const TABS = [
  { label: '홈', path: ROUTE_PATHS.home, icon: IconHome },
  { label: '캠페인', path: ROUTE_PATHS.campaigns, icon: IconSearch },
  { label: '쇼호스트', path: ROUTE_PATHS.portfolios, icon: IconMic },
  { label: '모델', path: ROUTE_PATHS.models, icon: IconCamera },
  { label: 'MY', path: ROUTE_PATHS.myPage, icon: IconSmile },
];
/**
 * 로그인이 필요한 경로
 * Flutter의 authRequiredRoutes
 * (현재는 비활성화 - 필요시 다시 활성화)
 */
const AUTH_REQUIRED_PATHS = new Set<string>([ROUTE_PATHS.myPage]);

/**
 * 화면 하단에 고정되는 공통 네비게이션 바 컴포넌트
 * Flutter의 CommonBottomNavBar 위젯에 해당합니다.
 */
const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 인증 상태 가져오기
  const { showToast } = useToast();

  /**
   * 탭 클릭 시 네비게이션을 처리하는 함수
   */
  const handleNavigate = (path: string) => {
    // 1. 현재 경로와 같으면 아무것도 하지 않음
    if (location.pathname === path) return;

    const redirectToLogin = () => {
      setAuthRedirectPath(path);
      showToast('로그인이 필요합니다.\n회원 전용 서비스입니다.');
      navigate(ROUTE_PATHS.login, { replace: true });
    };

    // 2. 로그인이 필요한 경로인지 확인
    if (AUTH_REQUIRED_PATHS.has(path) && !isLoggedIn) {
      redirectToLogin();
      return;
    }

    // 3. 페이지 이동
    navigate(path);
  };

  return (
    <Nav>
      <Wrapper>
        {/*
          --- (수정) TABS.map() 내부 ---
          복잡한 <button> JSX 대신 BottomNavItem 컴포넌트를 렌더링
        */}
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <BottomNavItem
              key={tab.path}
              label={tab.label}
              icon={tab.icon}
              isActive={isActive}
              onClick={() => handleNavigate(tab.path)}
            />
          );
        })}
      </Wrapper>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 1200px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -8px 22px rgba(0, 0, 0, 0.06);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-sizing: border-box;
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  width: 100%;
`;

export default BottomNavBar;
