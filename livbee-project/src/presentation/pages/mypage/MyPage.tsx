import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useMyPageData } from '@/presentation/hooks/useMyPageData';
import { TypeSwitcher } from '@/presentation/components/mypage/TypeSwitcher';
import { ProfileSection } from '@/presentation/components/mypage/ProfileSection';
import { MenuSection } from '@/presentation/components/mypage/MenuSection';
import { LogoutButton } from '@/presentation/components/mypage/LogoutButton';
import { AppInfo } from '@/presentation/components/mypage/AppInfo';
import type { UserType } from '@/types/mypage';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn, user, isLoading } = useAuth();
  const { showToast } = useToast();
  
  const [userType, setUserType] = useState<UserType>('brand');

  // 사용자 역할에 따라 userType 업데이트
  useEffect(() => {
    if (user?.role === 'brand') {
      setUserType('brand');
    } else if (user?.role === 'showhost') {
      setUserType('showhost');
    }
  }, [user?.role]);

  // 로그인 안되어있으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    showToast('로그아웃되었습니다.');
  };

  const { profileData, menuItems } = useMyPageData(userType);

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
        <TypeSwitcher
          availableTypes={availableTypes}
          selectedType={userType}
          onTypeChange={setUserType}
        />
        <ProfileSection profileData={profileData} />
        <MenuSection menuItems={menuItems} />
        <LogoutButton onClick={handleLogout} />
        <AppInfo />
      </PageInner>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.primaryOpacity['25']};
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

export default MyPage;
