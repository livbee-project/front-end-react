import React from 'react';
import Button from '@/presentation/components/ui/Button';
import {
  SignUpRow,
  SignUpLink,
  KakaoButtonWrapper,
} from '@/presentation/components/auth/styled/LoginFormStyles';

interface LoginFormFooterProps {
  onSignUp: () => void;
  onKakaoClick?: () => void;
  isKakaoLoading?: boolean;
}

export const LoginFormFooter: React.FC<LoginFormFooterProps> = ({
  onSignUp,
  onKakaoClick,
  isKakaoLoading,
}) => (
  <>
    <SignUpRow>
      <span>아직 계정이 없으신가요?</span>
      <SignUpLink type="button" onClick={onSignUp}>
        회원가입
      </SignUpLink>
    </SignUpRow>

    {onKakaoClick && (
      <KakaoButtonWrapper>
        <Button
          variant="outline"
          fullWidth
          onClick={onKakaoClick}
          disabled={isKakaoLoading}
          type="button"
        >
          {isKakaoLoading ? '연결 중...' : '카카오로 시작하기'}
        </Button>
      </KakaoButtonWrapper>
    )}
  </>
);

