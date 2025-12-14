import { useState, useCallback } from 'react';
import type { UserRole as UserType } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { getAuthRedirectPath } from '@/shared/utils/authRedirect';
import { ROUTE_ROLE_PERMISSIONS } from '@/app/routes/routeMeta';
import { validateLoginForm, loginMessages } from '@/presentation/components/auth/utils/loginValidation';

interface UseLoginFormOptions {
  defaultUserType?: UserType;
  onSuccess?: () => void;
}

interface UseLoginFormReturn {
  userType: UserType;
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setUserType: (type: UserType) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => Promise<void>;
  handleSignUpClick: () => void;
}

export const useLoginForm = ({
  defaultUserType = 'brand',
  onSuccess,
}: UseLoginFormOptions = {}): UseLoginFormReturn => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [userType, setUserType] = useState<UserType>(defaultUserType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    const validationError = validateLoginForm({ email, password });
    if (validationError) {
      setError(validationError);
      showToast(validationError, undefined, 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 리다이렉트 경로가 등록 페이지인지 확인
      const redirectPath = getAuthRedirectPath();
      const isRegisterPage = redirectPath?.includes('/register') || false;

      // 등록 페이지의 권한 요구사항 확인
      let hasPermission = true;
      if (isRegisterPage && redirectPath) {
        const requiredRoles = ROUTE_ROLE_PERMISSIONS[redirectPath as keyof typeof ROUTE_ROLE_PERMISSIONS];
        if (requiredRoles && requiredRoles.length > 0) {
          // userType을 UserRole로 변환 (brand -> 'brand', showhost -> 'showhost')
          const userRole = userType === 'brand' ? 'brand' : 'showhost';
          hasPermission = requiredRoles.includes(userRole);
        }
      }

      await login({
        email: email.trim(),
        password,
        role: userType,
      });

      // 등록 페이지로 리다이렉트하는 경우:
      // - 권한이 일치하면 성공 토스트 표시 (초록색)
      // - 권한이 불일치하면 토스트 표시하지 않음 (AuthGuard에서 권한 오류 메시지를 표시함)
      if (isRegisterPage && hasPermission) {
        showToast('로그인되었습니다.', undefined, 'success');
      } else if (!isRegisterPage) {
        showToast('로그인되었습니다.');
      }
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : loginMessages.GENERIC_ERROR;
      setError(errorMessage);
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, userType, login, showToast, onSuccess]);

  const handleSignUpClick = useCallback(() => {
    showToast('회원가입은 아직 준비 중입니다.', undefined, 'info');
  }, [showToast]);

  return {
    userType,
    email,
    password,
    isLoading,
    error,
    setUserType,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUpClick,
  };
};

