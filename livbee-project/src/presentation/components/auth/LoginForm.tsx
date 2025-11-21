import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import { Input } from '@/presentation/components/styled/CommonStyles';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onSignUp,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      onLogin();
    }
  };

  return (
    <FormContainer>
      <InputWrapper>
        <StyledInput
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </InputWrapper>

      {error && <ErrorText>{error}</ErrorText>}

      <ButtonSpacer>
        <Button variant="primary" fullWidth onClick={onLogin} disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </ButtonSpacer>

      <SignUpRow>
        <span>아직 계정이 없으신가요?</span>
        <SignUpLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSignUp();
          }}
        >
          회원가입
        </SignUpLink>
      </SignUpRow>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StyledInput = styled(Input)`
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font: ${({ theme }) => theme.fonts.caption};
  margin: 0;
  text-align: center;
`;

const ButtonSpacer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SignUpRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const SignUpLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
`;

