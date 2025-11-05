import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavItem from './BottomNavItem';
// (추가) react-icons/ri (Remix Icon) 라이브러리에서 아이콘들을 임포트합니다.
import {
  RiHomeLine,
  RiArchiveDrawerLine,
  RiUserStarLine,
  RiUser3Line,
  RiUserSettingsLine,
} from 'react-icons/ri';
// CSS 변수를 사용하기 위해 global.css 임포트
import '../styles/global.css';

/**
 * (임시) 인증 상태를 확인하는 훅
 * TODO: 추후 React Context API 등을 사용한
 * 실제 useAuth 훅으로 교체해야 합니다.
 * Flutter의 AuthProvider 역할을 대신합니다.
 */
const useAuth = () => {
  // 테스트를 위해 'false'로 설정
  // 이 값을 'true'로 바꾸면 '마이페이지' 탭이 정상 동작합니다.
  const isLoggedIn = false;
  return { isLoggedIn };
};

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
 */
const AUTH_REQUIRED_PATHS = ['/mypage'];

/**
 * 화면 하단에 고정되는 공통 네비게이션 바 컴포넌트
 * Flutter의 CommonBottomNavBar 위젯에 해당합니다.
 */
const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 인증 상태 가져오기

  /**
   * 탭 클릭 시 네비게이션을 처리하는 함수
   */
  const handleNavigate = (path: string) => {
    // 1. 현재 경로와 같으면 아무것도 하지 않음
    if (location.pathname === path) return;

    // 2. 로그인이 필요한 경로인지 확인
    if (AUTH_REQUIRED_PATHS.includes(path) && !isLoggedIn) {
      // Flutter의 showCommonPromptDialog 로직
      alert('로그인이 필요합니다.\n회원 전용 서비스입니다.');
      // TODO: 로그인 페이지로 이동하는 로직 추가
      // navigate('/login');
    } else {
      // 3. 페이지 이동
      // Flutter의 context.replace와 동일하게 { replace: true } 옵션 사용
      navigate(path, { replace: true });
    }
  };

  // --- 4. 스타일 정의 ---

  /** 최상위 <nav> 태그 스타일 */
  const navStyle: React.CSSProperties = {
    backgroundColor: 'var(--white)',
    width: '100%',
    // Flutter의 border/boxShadow
    borderTop: '1px solid #ECEFF1',
    boxShadow: '0 -8px 22px rgba(0, 0, 0, 0.06)',
    // iOS의 'safe area'를 고려한 하단 패딩
    paddingBottom: 'env(safe-area-inset-bottom, 0)',
    boxSizing: 'border-box',
  };

  /** 탭 버튼들을 감싸는 래퍼 스타일 (Flutter의 Row) */
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around', // Flutter의 spaceAround
    alignItems: 'stretch',
    height: '100%',
  };

  return (
    <nav style={navStyle}>
      <div style={wrapperStyle}>
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
      </div>
    </nav>
  );
};

export default BottomNavBar;
