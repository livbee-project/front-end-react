import { useState, useCallback } from 'react';
import type { UserRole as UserType } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { getAuthRedirectPath } from '@/shared/utils/authRedirect';
import { ROUTE_ROLE_PERMISSIONS } from '@/app/routes/routeMeta';
import { validateLoginForm } from '@/presentation/components/auth/utils/loginValidation';

interface UseLoginFormOptions {
  defaultUserType?: UserType;
  onSuccess?: () => void;
}

interface UseLoginFormReturn {
  userType: UserType;
  email: string;
  password: string;
  isLoading: boolean;
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
  const { login, logout } = useAuth();
  const { showToast } = useToast();

  const [userType, setUserType] = useState<UserType>(defaultUserType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    const validationError = validateLoginForm({ email, password });
    if (validationError) {
      showToast(validationError, undefined, 'error');
      return;
    }

    setIsLoading(true);

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

      const loggedInUser = await login({
        email: email.trim(),
        password,
        role: userType,
      });

      // 선택한 탭의 role과 실제 로그인한 사용자의 role이 일치하는지 확인
      if (loggedInUser.role !== userType) {
        // role이 일치하지 않으면 로그아웃 처리
        logout();
        
        const roleMismatchMessage = userType === 'brand' 
          ? '브랜드 계정으로 로그인해주세요.'
          : '쇼호스트 계정으로 로그인해주세요.';
        
        showToast(roleMismatchMessage, undefined, 'error');
        setIsLoading(false);
        return;
      }

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
      // API 에러는 ApiErrorToastListener에서 처리하므로 여기서는 토스트를 표시하지 않음
      // 단, API 에러가 아닌 경우를 대비해 에러를 다시 throw하지 않음 (이미 ApiErrorToastListener가 처리)
    } finally {
      setIsLoading(false);
    }
  }, [email, password, userType, login, logout, showToast, onSuccess]);

  const handleSignUpClick = useCallback(() => {
    // 회원가입 기능이 제거됨
    // TODO: 회원가입 기능이 필요하면 다시 구현
  }, []);

  return {
    userType,
    email,
    password,
    isLoading,
    setUserType,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUpClick,
  };
};

