import type { UserRole } from '@/domain/entities/User';
import { useAuth } from './useAuth';

export const useRoleAccess = () => {
  const { user } = useAuth();
  const role = user?.role;

  const hasRole = (allowedRoles?: UserRole[]) => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    if (!role) {
      return false;
    }
    return allowedRoles.includes(role);
  };

  return {
    role,
    hasRole,
  };
};

