import React, { useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLoginBubblePosition } from '@/presentation/hooks/common/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';
import { PageWrapper } from '@/presentation/pages/auth/styled/LoginPageStyles';
import type { KakaoUserInfo, UserRole } from '@/domain/entities/User';
import { useKakaoAuth } from '@/presentation/hooks/auth/useKakaoAuth';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import Modal from '@/presentation/components/ui/Modal';
import Button from '@/presentation/components/ui/Button';
import { H2, P } from '@/presentation/components/styled/Typography';

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [isKakaoSignupConfirmOpen, setIsKakaoSignupConfirmOpen] = useState(false);
  const [pendingKakaoInfo, setPendingKakaoInfo] = useState<KakaoUserInfo | null>(null);

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

  const { loginWithKakao, isLoading: isKakaoLoading } = useKakaoAuth();
  const { loginWithKakaoAccount } = useAuth();

  const handleOpenKakaoSignupConfirm = (info: KakaoUserInfo) => {
    setPendingKakaoInfo(info);
    setIsKakaoSignupConfirmOpen(true);
  };

  const handleCloseKakaoSignupConfirm = () => {
    setIsKakaoSignupConfirmOpen(false);
    setPendingKakaoInfo(null);
  };

  const handleConfirmKakaoSignup = () => {
    if (pendingKakaoInfo && typeof window !== 'undefined') {
      window.sessionStorage.setItem('kakao_signup_info', JSON.stringify(pendingKakaoInfo));
    }

    const userTypeParamForSignup = userType === 'showhost' ? 'showhost' : 'brand';
    navigate(`/signup?userType=${userTypeParamForSignup}`, { replace: true });

    setIsKakaoSignupConfirmOpen(false);
    setPendingKakaoInfo(null);
  };

  const handleKakaoClick = async () => {
    try {
      const info = await loginWithKakao();
      const role = userType === 'showhost' ? 'showhost' : 'brand';

      const loggedInUser = await loginWithKakaoAccount(info, role);

      // 아직 우리 서비스에 가입되지 않은 카카오 계정인 경우 → 회원가입 플로우로 이동
      if (!loggedInUser) {
        handleOpenKakaoSignupConfirm(info);
      }
    } catch {
      // useKakaoAuth에서 토스트 처리
    }
  };

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
        onKakaoClick={handleKakaoClick}
        isKakaoLoading={isKakaoLoading}
      />

      <Modal
        isOpen={isKakaoSignupConfirmOpen}
        onClose={handleCloseKakaoSignupConfirm}
        maxWidth="400px"
        closeOnOverlayClick={true}
      >
        <KakaoModalContent>
          <H2>카카오 회원가입 안내</H2>
          <P>
            선택하신 유형으로 카카오 계정 가입 이력이 없습니다.
            <br />
            신규 회원가입 페이지로 이동하시겠어요?
          </P>
          <KakaoModalButtonGroup>
            <Button variant="outline" onClick={handleCloseKakaoSignupConfirm} fullWidth>
              아니요
            </Button>
            <Button variant="primary" onClick={handleConfirmKakaoSignup} fullWidth>
              이동할게요
            </Button>
          </KakaoModalButtonGroup>
        </KakaoModalContent>
      </Modal>
    </PageWrapper>
  );
};

const KakaoModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const KakaoModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export default LoginPage;
