import React, { useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLoginBubblePosition } from '@/presentation/hooks/common/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { SignupForm } from '@/presentation/components/auth/SignupForm';
import { useSignupForm } from '@/presentation/components/auth/hooks/useSignupForm';
import { PageWrapper } from '@/presentation/pages/auth/styled/LoginPageStyles';
import type { UserRole, KakaoUserInfo } from '@/domain/entities/User';
import { error as logError } from '@/shared/utils/logger';

const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const userTypeParam = searchParams.get('userType');
  const defaultUserType: UserRole = userTypeParam === 'showhost' ? 'showhost' : 'brand';

  const {
    userType,
    name,
    email,
    password,
    passwordConfirm,
    phone,
    brandName,
    companyName,
    businessNumber,
    openingDate,
    representativeName,
    setOpeningDate,
    setRepresentativeName,
    businessVerificationResult,
    handleVerifyBusiness,
    isVerifyingBusiness,
    nickname,
    snsLink,
    introduction,
    isLoading,
    isFromKakao,
    isPhoneVerified,
    verificationCode,
    setVerificationCode,
    timer,
    hasRequestedCode,
    handleSendSmsCode,
    handleVerifyCode,
    handleKakaoSuccess,
    setUserType,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setPhone,
    setBrandName,
    setCompanyName,
    setBusinessNumber,
    setNickname,
    setSnsLink,
    setIntroduction,
    handleSignup,
  } = useSignupForm({
    defaultUserType,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.sessionStorage.getItem('kakao_signup_info');
    if (!stored) return;

    try {
      const info = JSON.parse(stored) as KakaoUserInfo;
      handleKakaoSuccess(info);
    } catch (error) {
       
      logError('SignupPage', 'kakao_signup_info 파싱 실패', error);
    } finally {
      window.sessionStorage.removeItem('kakao_signup_info');
    }
  }, [handleKakaoSuccess]);

  const bubbleLeft = useLoginBubblePosition({
    showhostButtonRef,
    tabContainerRef,
    userType,
  });

  const handleLoginClick = () => {
    navigate('/login', { replace: true });
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

      <SignupForm
        userType={userType}
        name={name}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        phone={phone}
        brandName={brandName}
        companyName={companyName}
        businessNumber={businessNumber}
        openingDate={openingDate}
        representativeName={representativeName}
        onOpeningDateChange={setOpeningDate}
        onRepresentativeNameChange={setRepresentativeName}
        businessVerificationResult={businessVerificationResult}
        onVerifyBusiness={handleVerifyBusiness}
        isVerifyingBusiness={isVerifyingBusiness}
        nickname={nickname}
        snsLink={snsLink}
        introduction={introduction}
        isLoading={isLoading}
        isFromKakao={isFromKakao}
        isPhoneVerified={isPhoneVerified}
        verificationCode={verificationCode}
        onVerificationCodeChange={(e) => setVerificationCode(e.target.value)}
        timer={timer}
        hasRequestedCode={hasRequestedCode}
        onSendSmsCode={handleSendSmsCode}
        onVerifyCode={handleVerifyCode}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onPasswordConfirmChange={setPasswordConfirm}
        onPhoneChange={setPhone}
        onBrandNameChange={setBrandName}
        onCompanyNameChange={setCompanyName}
        onBusinessNumberChange={setBusinessNumber}
        onNicknameChange={setNickname}
        onSnsLinkChange={setSnsLink}
        onIntroductionChange={setIntroduction}
        onSignup={handleSignup}
        onLoginClick={handleLoginClick}
      />
    </PageWrapper>
  );
};

export default SignupPage;
