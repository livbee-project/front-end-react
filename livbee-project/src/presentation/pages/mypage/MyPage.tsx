import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  User,
  Bell,
  MessageSquare,
  LogOut,
  Briefcase,
  Users,
  Send,
  CreditCard,
  FileText,
  Video,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';

type UserType = 'brand' | 'showhost' | 'model';

interface MenuItemData {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  description: string;
  count?: number;
  onClick: () => void;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn, user, isLoading } = useAuth();
  const { showToast } = useToast();
  
  const [userType, setUserType] = React.useState<UserType>('brand');

  // 사용자 역할에 따라 userType 업데이트
  React.useEffect(() => {
    if (user?.role === 'brand') {
      setUserType('brand');
    } else if (user?.role === 'showhost') {
      setUserType('showhost');
    }
  }, [user?.role]);

  // 로그인 안되어있으면 로그인 페이지로 리다이렉트
  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    showToast('로그아웃되었습니다.');
  };

  // 유저 타입별 프로필 데이터 (임시)
  const profileData = React.useMemo(() => {
    switch (userType) {
      case 'brand':
        return {
          name: '스타일코리아',
          role: '패션 브랜드',
          badges: ['패션', '브랜드'],
          stats: [
            { label: '진행 캠페인', value: '5개' },
            { label: '계약 호스트', value: '12명' },
            { label: '평점', value: '4.9★' },
          ],
        };
      case 'showhost':
        return {
          name: '김지현',
          role: '패션 전문 쇼호스트',
          badges: ['패션', '뷰티'],
          stats: [
            { label: '라이브', value: '24회' },
            { label: '팔로워', value: '1.2K' },
            { label: '평점', value: '4.8★' },
          ],
        };
      case 'model':
        return {
          name: '한지우',
          role: '프리랜스 모델',
          badges: ['패션', '뷰티'],
          stats: [
            { label: '촬영', value: '32회' },
            { label: '팔로워', value: '2.5K' },
            { label: '평점', value: '4.9★' },
          ],
        };
    }
  }, [userType]);

  // 유저 타입별 메뉴 데이터
  const menuItems = React.useMemo(() => {
    const commonMenu: MenuItemData[] = [
      {
        icon: User,
        label: '개인정보 관리',
        description: '비밀번호 변경 및 인증',
        onClick: () => console.log('개인정보 관리 클릭'),
      },
      {
        icon: Bell,
        label: '알림 설정',
        description: '알림 수신 설정 관리',
        onClick: () => console.log('알림 설정 클릭'),
      },
      {
        icon: MessageSquare,
        label: '메시지',
        description: '받은 메시지 확인',
        onClick: () => console.log('메시지 클릭'),
      },
    ];

    switch (userType) {
      case 'brand':
        return [
          [
            {
              icon: Briefcase,
              label: '캠페인 목록',
              description: '등록한 캠페인 관리',
              onClick: () => console.log('캠페인 목록 클릭'),
            },
            {
              icon: Users,
              label: '지원자 현황',
              description: '지원자 확인 및 관리',
              onClick: () => console.log('지원자 현황 클릭'),
            },
            {
              icon: Send,
              label: '보낸 제안',
              description: '보낸 제안 내역',
              onClick: () => console.log('보낸 제안 클릭'),
            },
            {
              icon: CreditCard,
              label: '계약 및 정산',
              description: '계약서 및 정산 내역',
              onClick: () => console.log('계약 및 정산 클릭'),
            },
          ],
          commonMenu,
        ];
      case 'showhost':
      case 'model':
        return [
          [
            {
              icon: Briefcase,
              label: '내가 지원한 캠페인',
              description: '지원한 캠페인 확인',
              onClick: () => console.log('내가 지원한 캠페인 클릭'),
            },
            {
              icon: FileText,
              label: '포트폴리오 관리',
              description: '포트폴리오 수정 및 관리',
              onClick: () => navigate('/mypage/portfolios'),
            },
            {
              icon: Video,
              label: '숏클립 관리',
              description: '숏클립 업로드 및 관리',
              onClick: () => navigate('/mypage/clips'),
            },
            {
              icon: Mail,
              label: '받은 제안',
              description: '받은 제안 확인',
              onClick: () => console.log('받은 제안 클릭'),
            },
            {
              icon: CreditCard,
              label: '계약 정산',
              description: '계약서 및 정산 내역',
              onClick: () => console.log('계약 정산 클릭'),
            },
          ],
          commonMenu,
        ];
    }
  }, [userType, navigate]);

  // 로딩 중이거나 로그인 안되어있으면 아무것도 렌더링하지 않음
  if (isLoading || !isLoggedIn || !user) {
    return null;
  }

  // 사용자 역할에 따라 표시할 타입 버튼 결정
  const availableTypes: UserType[] = user.role === 'brand' 
    ? ['brand'] 
    : ['showhost', 'model'];

  return (
    <PageWrapper>
      <PageInner>
        {availableTypes.length > 1 && (
          <TypeSwitcher>
            {availableTypes.includes('brand') && (
              <TypeBadge $isActive={userType === 'brand'} onClick={() => setUserType('brand')}>
                브랜드
              </TypeBadge>
            )}
            {availableTypes.includes('showhost') && (
              <TypeBadge $isActive={userType === 'showhost'} onClick={() => setUserType('showhost')}>
                쇼호스트
              </TypeBadge>
            )}
            {availableTypes.includes('model') && (
              <TypeBadge $isActive={userType === 'model'} onClick={() => setUserType('model')}>
                모델
              </TypeBadge>
            )}
          </TypeSwitcher>
        )}

        <ProfileCard>
          <ProfileHeader>
            <Avatar>
              <User size={40} strokeWidth={2} />
            </Avatar>
            <ProfileInfo>
              <ProfileName>{profileData.name}</ProfileName>
              <ProfileRole>{profileData.role}</ProfileRole>
              <ProfileBadges>
                {profileData.badges.map((badge) => (
                  <SmallBadge key={badge}>{badge}</SmallBadge>
                ))}
              </ProfileBadges>
            </ProfileInfo>
          </ProfileHeader>

          <StatsContainer>
            {profileData.stats.map((stat) => (
              <StatItem key={stat.label}>
                <StatLabel>{stat.label}</StatLabel>
                <StatValue>{stat.value}</StatValue>
              </StatItem>
            ))}
          </StatsContainer>
        </ProfileCard>

        {menuItems.map((menuGroup, groupIndex) => (
          <MenuCard key={groupIndex}>
            {menuGroup.map((item, itemIndex) => (
              <MenuItem
                key={item.label}
                $isLast={itemIndex === menuGroup.length - 1}
                onClick={item.onClick}
              >
                <MenuIcon>
                  <item.icon size={20} strokeWidth={2} />
                </MenuIcon>
                <MenuContent>
                  <MenuHeader>
                    <MenuLabel>{item.label}</MenuLabel>
                    {item.count != null && <CountBadge>{item.count}</CountBadge>}
                  </MenuHeader>
                  <MenuDescription>{item.description}</MenuDescription>
                </MenuContent>
                <MenuChevron>
                  <ChevronRight size={20} />
                </MenuChevron>
              </MenuItem>
            ))}
          </MenuCard>
        ))}

        <LogoutButton onClick={handleLogout}>
          <LogOut size={16} strokeWidth={2} />
          로그아웃
        </LogoutButton>

        <AppInfo>
          <AppVersion>버전 1.0.0</AppVersion>
          <AppLinks>
            <AppLink href="#" onClick={(e) => e.preventDefault()}>
              이용약관
            </AppLink>
            <span>·</span>
            <AppLink href="#" onClick={(e) => e.preventDefault()}>
              개인정보처리방침
            </AppLink>
          </AppLinks>
        </AppInfo>
      </PageInner>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: rgba(245, 246, 255, 0.33);
  padding: 2rem 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2.5rem 1.5rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 3rem 2rem;
  }
`;

const PageInner = styled.div`
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const TypeSwitcher = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TypeBadge = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
  ${({ $isActive }) =>
    $isActive
      ? css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryForeground};
        `
      : css`
          background: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.foreground};
        `}
  &:hover {
    background: rgba(104, 124, 244, 0.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, rgba(104, 124, 244, 0.6) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.25rem;
`;

const ProfileRole = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const ProfileBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SmallBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.p`
  margin: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
`;

const MenuCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const MenuItem = styled.button<{ $isLast: boolean }>`
  width: 100%;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: ${({ $isLast, theme }) => ($isLast ? 'none' : `1px solid ${theme.colors.border}`)};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background: rgba(245, 246, 255, 0.5);
  }
`;

const MenuIcon = styled.div`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MenuHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const MenuLabel = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const CountBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const MenuDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
`;

const MenuChevron = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: 1px solid #ff5a5f;
  color: #ff5a5f;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
  margin-bottom: 1.5rem;
  &:hover {
    background: #ff5a5f;
    color: #ffffff;
  }
`;

const AppInfo = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const AppVersion = styled.p`
  margin: 0;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const AppLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
`;

const AppLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default MyPage;
