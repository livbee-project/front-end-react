import type { UserRole } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';

export const useRoleAccess = () => {
  const { user } = useAuth();
  const role = user?.role;

  const hasRole = (allowedRoles?: UserRole[]) => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    if (!user) {
      return false;
    }
    
    // 다중 역할 계정 지원: isBrand/isShowhost 플래그를 우선 확인하고, 없으면 기존 role 필드로 확인 (하위 호환)
    return allowedRoles.some((allowedRole) => {
      if (allowedRole === 'brand') {
        return user.isBrand === true || (user.isBrand === undefined && user.role === 'brand');
      }
      if (allowedRole === 'showhost') {
        return user.isShowhost === true || (user.isShowhost === undefined && user.role === 'showhost');
      }
      return user.role === allowedRole;
    });
  };

  return {
    role,
    hasRole,
  };
};

