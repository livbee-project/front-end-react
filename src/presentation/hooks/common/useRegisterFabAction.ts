import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useRoleAccess } from '@/presentation/hooks/common/useRoleAccess';
import { useToast } from '@/presentation/contexts/ToastContext';
import { isRegisterFabAuthSkipped } from '@/shared/config/registerFabConfig';
import { setAuthRedirectPath, setOriginPage } from '@/shared/utils/authRedirect';

type RegisterFabTargetRole = 'brand' | 'showhost';

interface UseRegisterFabActionOptions {
  registerPath: string;
  originPage: string;
  redirectPath: string;
  targetRole: RegisterFabTargetRole;
  roleErrorMessage: string;
  loginPath?: string;
}

// 등록 FAB 클릭 시 로그인·권한 검사 또는 등록 페이지 이동 처리
export const useRegisterFabAction = ({
  registerPath,
  originPage,
  redirectPath,
  targetRole,
  roleErrorMessage,
  loginPath = '/login',
}: UseRegisterFabActionOptions) => {
  const navigate = useNavigate();
  const skipAuth = isRegisterFabAuthSkipped();
  const { isLoggedIn, currentRole } = useAuth();
  const { hasBrandRole, hasShowhostRole } = useRoleAccess();
  const { showToast } = useToast();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const hasTargetRole = targetRole === 'brand' ? hasBrandRole : hasShowhostRole;

  const handleRegisterClick = useCallback(() => {
    if (skipAuth) {
      navigate(registerPath);
      return;
    }

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (currentRole && currentRole !== targetRole) {
      showToast(roleErrorMessage, undefined, 'error');
      return;
    }

    if (!hasTargetRole) {
      showToast(roleErrorMessage, undefined, 'error');
      return;
    }

    navigate(registerPath);
  }, [
    skipAuth,
    isLoggedIn,
    currentRole,
    targetRole,
    hasTargetRole,
    roleErrorMessage,
    navigate,
    registerPath,
    showToast,
  ]);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const confirmLoginRedirect = useCallback(() => {
    setOriginPage(originPage);
    setAuthRedirectPath(redirectPath);
    setIsLoginModalOpen(false);
    navigate(loginPath, { replace: true });
  }, [navigate, loginPath, originPage, redirectPath]);

  return {
    handleRegisterClick,
    isLoginModalOpen: skipAuth ? false : isLoginModalOpen,
    closeLoginModal,
    confirmLoginRedirect,
  };
};
