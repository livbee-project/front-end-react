import { useEffect, useMemo, useState } from 'react';
import type { UserType } from '@/types/mypage';
import type { UserRole } from '@/domain/entities/User';

export const useMyPageType = (role?: UserRole | null) => {
  const [userType, setUserType] = useState<UserType>('brand');

  useEffect(() => {
    if (role === 'brand') {
      setUserType('brand');
    } else if (role === 'showhost') {
      setUserType((prev) => (prev === 'model' ? prev : 'showhost'));
    }
  }, [role]);

  const availableTypes: UserType[] = useMemo(() => {
    if (role === 'brand') {
      return ['brand'];
    }
    return ['showhost', 'model'];
  }, [role]);

  return {
    userType,
    setUserType,
    availableTypes,
  };
};

