import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '@/presentation/styles/breakpoints'
import { theme } from '@/presentation/styles/theme'

const NAV_ITEMS = [
  { label: '쇼호스트', path: '/hosts' },
  { label: '모델', path: '/models' },
  { label: '공고', path: '/campaigns' },
  { label: '이벤트', path: '/events' },
  { label: '뉴스', path: '/news' },
  { label: '숏클립', path: '/clips' },
] as const

interface AppShellProps {
  children: React.ReactNode
  hideNav?: boolean
}

/** Sticky 헤더·모바일 하단 네비 레이아웃 */
export function AppShell({ children, hideNav = false }: AppShellProps) {
  const { pathname } = useLocation()
  const isCreateFlow = pathname.includes('/create')

  return (
    <Shell>
      {!hideNav && !isCreateFlow && (
        <Header>
          <Logo to="/">LIVBEE</Logo>
          <DesktopNav>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} $active={pathname.startsWith(item.path)}>
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>
          <HeaderRight>
            <IconLink to="/mypage">MY</IconLink>
          </HeaderRight>
        </Header>
      )}
      <Main>{children}</Main>
      {!hideNav && !isCreateFlow && (
        <MobileBottomNav>
          <BottomLink to="/" $active={pathname === '/'}>홈</BottomLink>
          <BottomLink to="/hosts" $active={pathname.startsWith('/hosts')}>쇼호스트</BottomLink>
          <BottomLink to="/models" $active={pathname.startsWith('/models')}>모델</BottomLink>
          <BottomLink to="/campaigns" $active={pathname.startsWith('/campaigns')}>공고</BottomLink>
          <BottomLink to="/mypage" $active={pathname.startsWith('/mypage')}>MY</BottomLink>
        </MobileBottomNav>
      )}
    </Shell>
  )
}

const Shell = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 20px;
  height: 56px;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};
`

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.primary};
  text-decoration: none;
  flex-shrink: 0;
`

const DesktopNav = styled.nav`
  display: none;
  gap: 20px;
  flex: 1;

  ${media.desktopUp} {
    display: flex;
  }
`

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
`

const HeaderRight = styled.div`
  margin-left: auto;
`

const IconLink = styled(Link)`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
`

const Main = styled.main`
  flex: 1;
  padding-bottom: 60px;

  ${media.desktopUp} {
    padding-bottom: 0;
  }
`

const MobileBottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.border};
  z-index: 50;

  ${media.desktopUp} {
    display: none;
  }
`

const BottomLink = styled(Link)<{ $active: boolean }>`
  flex: 1;
  padding: 10px 4px;
  text-align: center;
  font-size: 11px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`
