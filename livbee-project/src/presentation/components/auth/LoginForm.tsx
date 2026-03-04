import React from 'react';
import Button from '@/presentation/components/ui/Button';
import { LoginFormInputs } from '@/presentation/components/auth/LoginFormInputs';
import { LoginFormFooter } from '@/presentation/components/auth/LoginFormFooter';
import { FormContainer, ButtonSpacer } from '@/presentation/components/auth/styled/LoginFormStyles';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
  onKakaoClick?: () => void;
  isKakaoLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onSignUp,
  onKakaoClick,
  isKakaoLoading,
}) => (
  <FormContainer>
    <LoginFormInputs
      email={email}
      password={password}
      isLoading={isLoading}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onEnterPress={onLogin}
    />

    <ButtonSpacer>
      <Button variant="primary" fullWidth onClick={onLogin} disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </ButtonSpacer>

    <LoginFormFooter
      onSignUp={onSignUp}
      onKakaoClick={onKakaoClick}
      isKakaoLoading={isKakaoLoading}
    />
  </FormContainer>
);

