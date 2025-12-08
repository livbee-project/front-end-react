import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType, ProfileData } from '@/types/mypage';
import { UserTypeStrategyFactory } from './strategies/UserTypeStrategy';

/**
 * 프로필 데이터를 생성하는 커스텀 훅
 * SRP 준수: 프로필 데이터 생성만 담당
 */
export const useProfileData = (userType: UserType): ProfileData => {
  const navigate = useNavigate();

  // 전략 패턴을 사용하여 타입별 프로필 데이터 생성
  const strategy = useMemo(
    () => UserTypeStrategyFactory.createStrategy(userType, navigate),
    [userType, navigate]
  );

  return useMemo<ProfileData>(() => strategy.getProfileData(), [strategy]);
};

