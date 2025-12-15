import React, { useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLoginBubblePosition } from '@/presentation/hooks/common/useLoginBubblePosition';
import { LoginLogo } from '@/presentation/components/auth/LoginLogo';
import { UserTypeTabs } from '@/presentation/components/auth/UserTypeTabs';
import { SignupForm } from '@/presentation/components/auth/SignupForm';
import { useSignupForm } from '@/presentation/components/auth/hooks/useSignupForm';
import { PageWrapper } from '@/presentation/pages/auth/styled/LoginPageStyles';
import type { UserRole } from '@/domain/entities/User';

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
    nickname,
    snsLink,
    introduction,
    isLoading,
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
        nickname={nickname}
        snsLink={snsLink}
        introduction={introduction}
        isLoading={isLoading}
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
