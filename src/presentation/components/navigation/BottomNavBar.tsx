import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';
import { setAuthRedirectPath } from '@/shared/utils/authRedirect';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import LoginRequiredModal from '@/presentation/components/navigation/LoginRequiredModal';
import { BottomNavIcon, type BottomNavIconType } from '@/presentation/components/navigation/BottomNavIcons';

type BottomNavKey = BottomNavIconType;

const BOTTOM_TABS: ReadonlyArray<{ key: BottomNavKey; label: string; path: string }> = [
  { key: 'home', label: '홈', path: ROUTE_PATHS.home },
  { key: 'hosts', label: '쇼호스트', path: ROUTE_PATHS.portfolios },
  { key: 'models', label: '모델', path: ROUTE_PATHS.models },
  { key: 'campaigns', label: '공고', path: ROUTE_PATHS.campaigns },
  { key: 'mypage', label: '마이페이지', path: ROUTE_PATHS.myPage },
];

const AUTH_REQUIRED_PATHS = new Set<string>([ROUTE_PATHS.myPage]);

const primaryLight = '#f1ebff';

// 하단 탭 활성 키 계산
const resolveBottomNavKey = (pathname: string): BottomNavKey | undefined => {
  if (pathname === ROUTE_PATHS.home) return 'home';
  if (pathname === ROUTE_PATHS.portfolios || pathname.startsWith(`${ROUTE_PATHS.portfolios}/`)) return 'hosts';
  if (pathname === ROUTE_PATHS.models || pathname.startsWith(`${ROUTE_PATHS.models}/`)) return 'models';
  if (pathname === ROUTE_PATHS.campaigns || pathname.startsWith(`${ROUTE_PATHS.campaigns}/`)) return 'campaigns';
  if (pathname === ROUTE_PATHS.myPage || pathname.startsWith(`${ROUTE_PATHS.myPage}/`)) return 'mypage';
  return undefined;
};

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const activeKey = resolveBottomNavKey(location.pathname);

  const handleNavigate = (path: string) => {
    if (location.pathname === path) return;

    if (AUTH_REQUIRED_PATHS.has(path) && !isLoggedIn) {
      setPendingPath(path);
      setIsLoginModalOpen(true);
      return;
    }

    navigate(path);
  };

  const handleLoginConfirm = () => {
    if (!pendingPath) return;
    setAuthRedirectPath(pendingPath);
    setIsLoginModalOpen(false);
    navigate(ROUTE_PATHS.login, { replace: true });
    setPendingPath(null);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    setPendingPath(null);
  };

  return (
    <>
      <Nav aria-label="하단 네비게이션">
        {BOTTOM_TABS.map((tab) => {
          const isActive = activeKey === tab.key;

          return (
            <NavLink
              key={tab.key}
              to={tab.path}
              $active={isActive}
              onClick={(event) => {
                event.preventDefault();
                handleNavigate(tab.path);
              }}
            >
              <IconWrap $active={isActive}>
                <BottomNavIcon type={tab.key} />
              </IconWrap>
              <Label>{tab.label}</Label>
            </NavLink>
          );
        })}
      </Nav>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onConfirm={handleLoginConfirm}
      />
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 74px;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  box-shadow: 0 -8px 22px rgba(36, 33, 43, 0.04);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  min-width: 0;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : '#4b4654')};
  font-size: 10.5px;
  font-weight: 850;
  line-height: 1;
  letter-spacing: -0.2px;
  text-decoration: none;
`;

const IconWrap = styled.span<{ $active: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  color: currentColor;
  background: ${({ $active }) => ($active ? primaryLight : 'transparent')};

  svg {
    width: 23px;
    height: 23px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${({ $active, theme }) =>
    $active
      ? `
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -6px;
      width: 4px;
      height: 4px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: ${theme.colors.primary};
    }
  `
      : ''}
`;

const Label = styled.span`
  display: block;
  white-space: nowrap;
`;

export default BottomNavBar;
