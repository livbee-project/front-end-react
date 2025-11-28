import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import type { UserRole } from '@/domain/entities/User';
import { setAuthRedirectPath } from '@/shared/utils/authRedirect';

interface AuthGuardProps {
  children: React.ReactElement;
  requireAuth?: boolean;
  guestOnly?: boolean;
  redirectTo?: string;
  allowedRoles?: UserRole[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  guestOnly = false,
  redirectTo = '/',
  allowedRoles,
}) => {
  const location = useLocation();
  const { isLoggedIn, isLoading, user } = useAuth();
  const { showToast } = useToast();

  // Role mismatch 체크
  const hasRoleMismatch = allowedRoles && allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role));

  // Role mismatch 시 Toast 메시지 표시
  useEffect(() => {
    if (hasRoleMismatch) {
      showToast('브랜드 권한 사용자만 이용 가능한 기능입니다.', undefined, 'error');
    }
  }, [hasRoleMismatch, showToast]);

  if (isLoading) {
    return <LoadingState padding="32px" />;
  }

  if (requireAuth && !isLoggedIn) {
    const nextPath = location.pathname + location.search + location.hash;
    setAuthRedirectPath(nextPath);
    return <Navigate to="/login" replace />;
  }

  if (guestOnly && isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (hasRoleMismatch) {
    return <Navigate to="/" replace />;
  }

  return children;
};

