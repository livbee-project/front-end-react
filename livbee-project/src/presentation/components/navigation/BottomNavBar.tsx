import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavItem from './BottomNavItem';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useAuth } from '@/presentation/hooks/useAuth';
// (추가) react-icons/ri (Remix Icon) 라이브러리에서 아이콘들을 임포트합니다.
import {
  RiHomeLine,
  RiArchiveDrawerLine,
  RiUserStarLine,
  RiUser3Line,
  RiUserSettingsLine,
} from 'react-icons/ri';

/**
 * (수정) 탭 메뉴의 데이터
 * icon 속성을 텍스트('[H]')에서 임포트한 아이콘 컴포넌트(RiHomeLine)로 변경합니다.
 * Flutter의 RemixIcons 이름과 거의 동일합니다.
 */
const TABS = [
  { label: '홈', path: '/', icon: RiHomeLine },
  { label: '모집공고', path: '/campaigns', icon: RiArchiveDrawerLine },
  { label: '모델', path: '/models', icon: RiUserStarLine },
  { label: '포트폴리오', path: '/portfolios', icon: RiUser3Line },
  { label: '마이페이지', path: '/mypage', icon: RiUserSettingsLine },
];
/**
 * 로그인이 필요한 경로
 * Flutter의 authRequiredRoutes
 * (현재는 비활성화 - 필요시 다시 활성화)
 */
const AUTH_REQUIRED_PATHS: string[] = [];

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

    // 2. 마이페이지 클릭 시 로그인 페이지로 이동
    if (path === '/mypage' && !isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }

    // 3. 로그인이 필요한 경로인지 확인
    if (AUTH_REQUIRED_PATHS.includes(path) && !isLoggedIn) {
      // Flutter의 showCommonPromptDialog 로직
      showToast('로그인이 필요합니다.\n회원 전용 서비스입니다.');
      navigate('/login', { replace: true });
    } else {
      // 4. 페이지 이동
      // Flutter의 context.replace와 동일하게 { replace: true } 옵션 사용
      navigate(path, { replace: true });
    }
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
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -8px 22px rgba(0, 0, 0, 0.06);
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 100%;
`;

export default BottomNavBar;
