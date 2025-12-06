import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useMyPageData } from '@/presentation/hooks/mypage/useMyPageData';
import { TypeSwitcher } from '@/presentation/components/mypage/TypeSwitcher';
import { ProfileSection } from '@/presentation/components/mypage/ProfileSection';
import { MenuSection } from '@/presentation/components/mypage/MenuSection';
import { LogoutButton } from '@/presentation/components/mypage/LogoutButton';
import { AppInfo } from '@/presentation/components/mypage/AppInfo';
import { useMyPageType } from '@/presentation/pages/mypage/hooks/useMyPageType';
import { PageWrapper, PageInner } from '@/presentation/pages/mypage/styled/MyPageStyles';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isLoggedIn, user, isLoading } = useAuth();
  const { showToast } = useToast();
  const { userType, setUserType, availableTypes } = useMyPageType(user?.role);

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

export default MyPage;
