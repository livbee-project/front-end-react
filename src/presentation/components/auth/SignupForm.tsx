import React from 'react';
import Button from '@/presentation/components/ui/Button';
import { SignupFormInputs } from '@/presentation/components/auth/SignupFormInputs';
import { SignupFormFooter } from '@/presentation/components/auth/SignupFormFooter';
import { FormContainer, ButtonSpacer } from '@/presentation/components/auth/styled/LoginFormStyles';
import type { UserRole, BusinessVerificationResult } from '@/domain/entities/User';

interface SignupFormProps {
  userType: UserRole;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  brandName?: string;
  companyName?: string;
  businessNumber?: string;
  nickname?: string;
  snsLink?: string;
  introduction?: string;
  isLoading: boolean;
  isFromKakao?: boolean;
  isPhoneVerified?: boolean;
  verificationCode?: string;
  onVerificationCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timer?: { secondsLeft: number; isRunning: boolean };
  hasRequestedCode?: boolean;
  onSendSmsCode?: () => void;
  onVerifyCode?: () => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onBrandNameChange?: (value: string) => void;
  onCompanyNameChange?: (value: string) => void;
  onBusinessNumberChange?: (value: string) => void;
  openingDate?: string;
  representativeName?: string;
  onOpeningDateChange?: (value: string) => void;
  onRepresentativeNameChange?: (value: string) => void;
  businessVerificationResult?: BusinessVerificationResult | null;
  onVerifyBusiness?: () => void;
  isVerifyingBusiness?: boolean;
  onNicknameChange?: (value: string) => void;
  onSnsLinkChange?: (value: string) => void;
  onIntroductionChange?: (value: string) => void;
  onSignup: () => void;
  onLoginClick: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
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
  onOpeningDateChange,
  onRepresentativeNameChange,
  businessVerificationResult,
  onVerifyBusiness,
  isVerifyingBusiness,
  nickname,
  snsLink,
  introduction,
  isLoading,
  isFromKakao,
  isPhoneVerified,
  verificationCode,
  onVerificationCodeChange,
  timer,
  hasRequestedCode,
  onSendSmsCode,
  onVerifyCode,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onPhoneChange,
  onBrandNameChange,
  onCompanyNameChange,
  onBusinessNumberChange,
  onNicknameChange,
  onSnsLinkChange,
  onIntroductionChange,
  onSignup,
  onLoginClick,
}) => {
  const handleLoginClick = () => {
    onLoginClick();
  };

  const isBusinessVerificationRequired = userType === 'brand' && Boolean(businessNumber);
  const isBusinessVerified = businessVerificationResult?.valid === true;
  const isSignupDisabled =
    isLoading || !isPhoneVerified || (isBusinessVerificationRequired && !isBusinessVerified);

  return (
    <FormContainer>
      <SignupFormInputs
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
        onOpeningDateChange={onOpeningDateChange}
        onRepresentativeNameChange={onRepresentativeNameChange}
        businessVerificationResult={businessVerificationResult}
        onVerifyBusiness={onVerifyBusiness}
        isVerifyingBusiness={isVerifyingBusiness}
        nickname={nickname}
        snsLink={snsLink}
        introduction={introduction}
        isLoading={isLoading}
        isFromKakao={isFromKakao}
        isPhoneVerified={isPhoneVerified}
        verificationCode={verificationCode}
        onVerificationCodeChange={onVerificationCodeChange}
        timer={timer}
        hasRequestedCode={hasRequestedCode}
        onSendSmsCode={onSendSmsCode}
        onVerifyCode={onVerifyCode}
        onNameChange={onNameChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onPasswordConfirmChange={onPasswordConfirmChange}
        onPhoneChange={onPhoneChange}
        onBrandNameChange={onBrandNameChange}
        onCompanyNameChange={onCompanyNameChange}
        onBusinessNumberChange={onBusinessNumberChange}
        onNicknameChange={onNicknameChange}
        onSnsLinkChange={onSnsLinkChange}
        onIntroductionChange={onIntroductionChange}
        onEnterPress={onSignup}
      />

      <ButtonSpacer>
        <Button variant="primary" fullWidth onClick={onSignup} disabled={isSignupDisabled}>
          {isLoading ? '가입 중...' : '회원가입'}
        </Button>
      </ButtonSpacer>

      <SignupFormFooter onLogin={handleLoginClick} />
    </FormContainer>
  );
};

export default SignupForm;
