import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import type { UserRole } from '@/domain/entities/User';
import { setAuthRedirectPath, consumeOriginPage, hasAuthRedirectPath } from '@/shared/utils/authRedirect';

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

  // Role mismatch 체크 (다중 역할 계정 지원)
  const hasRoleMismatch = allowedRoles && allowedRoles.length > 0 && (!user || !allowedRoles.some((allowedRole) => {
    if (allowedRole === 'brand') {
      return user.isBrand === true || (user.isBrand === undefined && user.role === 'brand');
    }
    if (allowedRole === 'showhost') {
      return user.isShowhost === true || (user.isShowhost === undefined && user.role === 'showhost');
    }
    return user.role === allowedRole;
  }));

  // Role mismatch 시 적절한 Toast 메시지 표시
  // 단, 로딩 중이거나 실제로 리다이렉트가 발생할 때만 표시
  useEffect(() => {
    // 로딩 중이면 토스트 표시하지 않음 (새로고침 시 user가 아직 로드되지 않았을 수 있음)
    if (isLoading) {
      return;
    }

    // 실제로 권한 불일치가 있고 리다이렉트가 발생할 때만 토스트 표시
    if (hasRoleMismatch && allowedRoles && allowedRoles.length > 0) {
      // 권한에 따른 메시지 결정
      const isBrandOnly = allowedRoles.includes('brand') && !allowedRoles.includes('showhost');
      const isShowhostOnly = allowedRoles.includes('showhost') && !allowedRoles.includes('brand');
      
      let message = '권한이 없습니다.';
      if (isBrandOnly) {
        message = '브랜드 권한 사용자만 이용 가능한 기능입니다.';
      } else if (isShowhostOnly) {
        message = '쇼호스트 권한 사용자만 이용 가능한 기능입니다.';
      }
      
      showToast(message, undefined, 'error');
    }
  }, [hasRoleMismatch, allowedRoles, showToast, isLoading]);

  if (isLoading) {
    return <LoadingState padding="32px" />;
  }

  if (requireAuth && !isLoggedIn) {
    const nextPath = location.pathname + location.search + location.hash;
    setAuthRedirectPath(nextPath);
    return <Navigate to="/login" replace />;
  }

  if (guestOnly && isLoggedIn) {
    // 리다이렉트 경로가 있으면 useAuth의 login 함수에서 처리하도록 함
    // (로그인 성공 후 등록 페이지 등으로 이동해야 하는 경우)
    if (hasAuthRedirectPath()) {
      // 리다이렉트 경로가 있으면 AuthGuard에서 리다이렉트하지 않음
      // useAuth의 login 함수에서 처리하도록 함
      return children;
    }
    return <Navigate to={redirectTo} replace />;
  }

  if (hasRoleMismatch) {
    // 등록 버튼을 누른 원래 페이지로 리다이렉트 (있으면)
    let originPage = consumeOriginPage();
    
    // originPage가 없으면 현재 경로에서 부모 경로를 추출
    // 예: /campaigns/register -> /campaigns
    if (!originPage && location.pathname.includes('/register')) {
      const pathParts = location.pathname.split('/');
      if (pathParts.length >= 2) {
        originPage = '/' + pathParts[1]; // /campaigns, /portfolios, /models 등
      }
    }
    
    const redirectPath = originPage || redirectTo;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

