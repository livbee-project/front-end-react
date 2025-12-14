import React from 'react';
import { SignUpRow, SignUpLink } from '@/presentation/components/auth/styled/LoginFormStyles';

interface LoginFormFooterProps {
  onSignUp: () => void;
}

export const LoginFormFooter: React.FC<LoginFormFooterProps> = ({ onSignUp }) => (
  <SignUpRow>
    <span>아직 계정이 없으신가요?</span>
    <SignUpLink type="button" onClick={onSignUp}>
      회원가입
    </SignUpLink>
  </SignUpRow>
);

