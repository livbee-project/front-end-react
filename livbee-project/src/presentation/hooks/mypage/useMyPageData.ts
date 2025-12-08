import type { UserType } from '@/types/mypage';
import { useProfileData } from './useProfileData';
import { useMenuData } from './useMenuData';

/**
 * 마이페이지 데이터를 생성하는 커스텀 훅
 * SRP 준수: 프로필 데이터와 메뉴 데이터 생성을 각각의 훅에 위임
 * OCP 준수: Strategy 패턴을 사용하여 새로운 타입 추가 시 기존 코드 수정 없이 확장 가능
 */
export const useMyPageData = (userType: UserType) => {
  const profileData = useProfileData(userType);
  const menuItems = useMenuData(userType);

  return {
    profileData,
    menuItems,
  };
};

