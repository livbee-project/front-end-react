import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoginBubblePosition } from '@/presentation/hooks/common/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';
import { PageWrapper } from '@/presentation/pages/auth/styled/LoginPageStyles';
import type { UserRole } from '@/domain/entities/User';

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // URL 파라미터에서 userType 확인 (쇼호스트/모델 페이지에서 플로팅 버튼 클릭 시)
  const userTypeParam = searchParams.get('userType');
  const defaultUserType: UserRole = userTypeParam === 'showhost' ? 'showhost' : 'brand';

  const {
    userType,
    email,
    password,
    isLoading,
    setUserType,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUpClick,
  } = useLoginForm({
    defaultUserType,
    // onSuccess는 제거 - useAuth의 login 함수에서 이미 리다이렉트 처리
  });

  const bubbleLeft = useLoginBubblePosition({
    showhostButtonRef,
    tabContainerRef,
    userType,
  });

  return (
    <PageWrapper>
      <LoginLogo />

      <UserTypeTabs
        userType={userType}
        onTypeChange={setUserType}
        showhostButtonRef={showhostButtonRef}
        tabContainerRef={tabContainerRef}
        bubbleLeft={bubbleLeft}
      />

      <LoginForm
        email={email}
        password={password}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onSignUp={handleSignUpClick}
      />
    </PageWrapper>
  );
};

export default LoginPage;
