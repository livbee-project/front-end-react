import React, { useRef } from 'react';
import { useLoginBubblePosition } from '@/presentation/hooks/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';
import { PageWrapper } from './styled/LoginPageStyles';

const LoginPage: React.FC = () => {
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const {
    userType,
    email,
    password,
    isLoading,
    error,
    setUserType,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUpClick,
  } = useLoginForm({
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
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
        onSignUp={handleSignUpClick}
      />
    </PageWrapper>
  );
};

export default LoginPage;
