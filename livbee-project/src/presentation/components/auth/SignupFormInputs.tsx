import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import { StyledInput } from '@/presentation/components/auth/styled/LoginFormStyles';
import { PMuted } from '@/presentation/components/styled/Typography';
import { formatPhoneNumber, removePhoneHyphens } from '@/shared/utils/formatUtils';
import type { UserRole } from '@/domain/entities/User';

const FieldLabel = styled(PMuted)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`;

const RequiredBadge = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  resize: vertical;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const VerificationRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const TimerText = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
  min-width: 2.5em;
`;

const VerificationInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const VerificationInput = styled(StyledInput)`
  flex: 1;
  min-width: 0;
`;

interface SignupFormInputsProps {
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
  onNicknameChange?: (value: string) => void;
  onSnsLinkChange?: (value: string) => void;
  onIntroductionChange?: (value: string) => void;
  onEnterPress: () => void;
}

export const SignupFormInputs: React.FC<SignupFormInputsProps> = ({
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
  isFromKakao,
  isPhoneVerified,
  verificationCode = '',
  onVerificationCodeChange,
  timer,
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
  onEnterPress,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isLoading) {
      onEnterPress();
    }
  };

  const timerDisplay =
    timer?.isRunning && timer.secondsLeft != null
      ? `${Math.floor(timer.secondsLeft / 60)}:${(timer.secondsLeft % 60).toString().padStart(2, '0')}`
      : null;

  const showVerificationInput = (timer?.isRunning ?? false) || isPhoneVerified === true;

  return (
    <>
      <InputWrapper>
        <FieldLabel>
          이름
          <RequiredBadge>*</RequiredBadge>
        </FieldLabel>
        <StyledInput
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </InputWrapper>

      <InputWrapper>
        <FieldLabel>
          이메일
          <RequiredBadge>*</RequiredBadge>
        </FieldLabel>
        <StyledInput
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          onKeyPress={handleKeyPress}
          readOnly={isFromKakao === true}
          disabled={isLoading}
        />
      </InputWrapper>

      {!isFromKakao && (
        <>
          <InputWrapper>
            <FieldLabel>
              비밀번호
              <RequiredBadge>*</RequiredBadge>
            </FieldLabel>
            <StyledInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>
              비밀번호 확인
              <RequiredBadge>*</RequiredBadge>
            </FieldLabel>
            <StyledInput
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordConfirm}
              onChange={(event) => onPasswordConfirmChange(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>
        </>
      )}

      <InputWrapper>
        <FieldLabel>
          전화번호
          <RequiredBadge>*</RequiredBadge>
        </FieldLabel>
        <StyledInput
          type="tel"
          placeholder="전화번호를 입력해주세요. (예: 010-1234-5678)"
          value={formatPhoneNumber(phone)}
          onChange={(event) => {
            const digitsOnly = removePhoneHyphens(event.target.value);
            onPhoneChange(digitsOnly);
          }}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {onSendSmsCode != null && (
          <>
            <VerificationRow>
              <Button
                variant="outline"
                size="small"
                onClick={onSendSmsCode}
                disabled={isPhoneVerified === true || timer?.isRunning === true || isLoading}
                type="button"
              >
                인증번호 받기
              </Button>
              {timerDisplay != null && <TimerText>{timerDisplay}</TimerText>}
            </VerificationRow>
            {showVerificationInput && onVerifyCode != null && onVerificationCodeChange != null && (
              <VerificationInputRow>
                <VerificationInput
                  type="text"
                  inputMode="numeric"
                  placeholder="인증번호 6자리"
                  value={verificationCode}
                  onChange={onVerificationCodeChange}
                  disabled={isLoading}
                />
                <Button
                  variant="primary"
                  size="small"
                  onClick={onVerifyCode}
                  disabled={!verificationCode.trim() || isLoading}
                  type="button"
                >
                  인증하기
                </Button>
              </VerificationInputRow>
            )}
          </>
        )}
      </InputWrapper>

      {userType === 'brand' && (
        <>
          <InputWrapper>
            <FieldLabel>
              브랜드명
              <RequiredBadge>*</RequiredBadge>
            </FieldLabel>
            <StyledInput
              type="text"
              placeholder="브랜드명을 입력해주세요."
              value={brandName || ''}
              onChange={(event) => onBrandNameChange?.(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>회사명</FieldLabel>
            <StyledInput
              type="text"
              placeholder="회사명을 입력해주세요."
              value={companyName || ''}
              onChange={(event) => onCompanyNameChange?.(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>사업자등록번호</FieldLabel>
            <StyledInput
              type="text"
              placeholder="사업자등록번호를 입력해주세요."
              value={businessNumber || ''}
              onChange={(event) => onBusinessNumberChange?.(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>
        </>
      )}

      {userType === 'showhost' && (
        <>
          <InputWrapper>
            <FieldLabel>닉네임</FieldLabel>
            <StyledInput
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname || ''}
              onChange={(event) => onNicknameChange?.(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>SNS 링크</FieldLabel>
            <StyledInput
              type="url"
              placeholder="SNS 링크를 입력해주세요."
              value={snsLink || ''}
              onChange={(event) => onSnsLinkChange?.(event.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>자기소개</FieldLabel>
            <StyledTextarea
              placeholder="자기소개를 입력해주세요."
              value={introduction || ''}
              onChange={(event) => onIntroductionChange?.(event.target.value)}
              disabled={isLoading}
            />
          </InputWrapper>
        </>
      )}
    </>
  );
};

export default SignupFormInputs;
