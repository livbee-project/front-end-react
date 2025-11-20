import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useLoginBubblePosition } from '@/presentation/hooks/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import type { UserType } from '@/types/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const [userType, setUserType] = useState<UserType>('brand');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

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

  const handleLogin = async () => {
    if (!email.trim()) {
      const errorMsg = '이메일을 입력해주세요.';
      setError(errorMsg);
      showToast(errorMsg, undefined, 'error');
      return;
    }
    if (!password.trim()) {
      const errorMsg = '비밀번호를 입력해주세요.';
      setError(errorMsg);
      showToast(errorMsg, undefined, 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login({
        email: email.trim(),
        password,
        role: userType,
      });
      showToast('로그인되었습니다.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log('회원가입 클릭');
    // TODO: 회원가입 페이지로 이동
  };

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
        onSignUp={handleSignUp}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['5xl']} ${theme.spacing.lg}`};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing['3xl']};
`;

export default LoginPage;
