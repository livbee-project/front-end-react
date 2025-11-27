import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { useAuth } from '@/presentation/hooks/useAuth';
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

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
};

