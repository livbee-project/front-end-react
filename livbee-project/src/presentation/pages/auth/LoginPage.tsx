import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginBubblePosition } from '@/presentation/hooks/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';
import { useAuth } from '@/presentation/hooks/useAuth';
import { PageWrapper } from './styled/LoginPageStyles';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
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
    onSuccess: () => navigate('/mypage'),
  });

  const bubbleLeft = useLoginBubblePosition({
    showhostButtonRef,
    tabContainerRef,
    userType,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/mypage', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
