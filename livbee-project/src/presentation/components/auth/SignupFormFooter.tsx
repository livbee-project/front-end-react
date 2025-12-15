import React from 'react';
import { SignUpRow, SignUpLink } from '@/presentation/components/auth/styled/LoginFormStyles';

interface SignupFormFooterProps {
  onLogin: () => void;
}

export const SignupFormFooter: React.FC<SignupFormFooterProps> = ({ onLogin }) => (
  <SignUpRow>
    <span>이미 계정이 있으신가요?</span>
    <SignUpLink type="button" onClick={onLogin}>
      로그인
    </SignUpLink>
  </SignUpRow>
);

export default SignupFormFooter;
