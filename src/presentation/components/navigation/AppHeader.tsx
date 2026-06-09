import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { BellIcon, MenuIcon } from '@/presentation/components/navigation/AppHeaderIcons';
import {
  AppHeaderActions,
  AppHeaderRoot,
  AppHeaderTop,
  AppLogo,
  AppNav,
  AppSearch,
  HeaderAccountLink,
  HeaderIconButton,
  MobileMenuButton,
} from '@/presentation/components/navigation/appHeader.styles';

type TopNavKey = 'home' | 'events' | 'news' | 'clips' | 'community';

const TOP_NAV_ITEMS: ReadonlyArray<{ key: TopNavKey; label: string; path: string }> = [
  { key: 'home', label: '홈', path: ROUTE_PATHS.home },
  { key: 'events', label: '이벤트', path: ROUTE_PATHS.event },
  { key: 'news', label: '뉴스', path: ROUTE_PATHS.news },
  { key: 'clips', label: '숏클립', path: ROUTE_PATHS.clips },
  { key: 'community', label: '커뮤니티', path: ROUTE_PATHS.community },
];

const COMING_SOON_PATHS = new Set<string>([ROUTE_PATHS.event]);

// 경로에 맞는 상단 탭 활성 키 반환
const resolveTopNavKey = (pathname: string): TopNavKey | undefined => {
  if (pathname === ROUTE_PATHS.home) return 'home';
  if (pathname === ROUTE_PATHS.event || pathname.startsWith(`${ROUTE_PATHS.event}/`)) return 'events';
  if (pathname === ROUTE_PATHS.news || pathname.startsWith(`${ROUTE_PATHS.news}/`)) return 'news';
  if (pathname === ROUTE_PATHS.clips || pathname.startsWith(`${ROUTE_PATHS.clips}/`)) return 'clips';
  if (pathname === ROUTE_PATHS.community || pathname.startsWith(`${ROUTE_PATHS.community}/`)) return 'community';
  return undefined;
};

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const activeKey = resolveTopNavKey(location.pathname);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!COMING_SOON_PATHS.has(path)) return;
    event.preventDefault();
    showToast('준비중인 서비스입니다.');
  };

  return (
    <AppHeaderRoot>
      <AppHeaderTop>
        <AppLogo as={Link} to={ROUTE_PATHS.home}>
          Livbee
        </AppLogo>

        <AppNav aria-label="상단 탭 메뉴">
          {TOP_NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={activeKey === item.key ? 'active' : undefined}
              onClick={(event) => handleNavClick(event, item.path)}
            >
              {item.label}
            </Link>
          ))}
        </AppNav>

        <AppHeaderActions>
          <AppSearch aria-label="검색">
            <span aria-hidden>⌕</span>
            <input placeholder="검색어를 입력하세요" readOnly />
          </AppSearch>
          <HeaderIconButton type="button" aria-label="알림">
            <BellIcon />
          </HeaderIconButton>
          <HeaderAccountLink
            as={Link}
            to={isLoggedIn ? ROUTE_PATHS.myPage : ROUTE_PATHS.login}
          >
            {isLoggedIn ? 'MY' : '로그인'}
          </HeaderAccountLink>
          <MobileMenuButton type="button" aria-label="메뉴" onClick={() => showToast('준비중인 서비스입니다.')}>
            <MenuIcon />
          </MobileMenuButton>
        </AppHeaderActions>
      </AppHeaderTop>
    </AppHeaderRoot>
  );
};

export default AppHeader;
