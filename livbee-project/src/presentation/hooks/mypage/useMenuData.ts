import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType, MenuItemData } from '@/types/mypage';
import {
  UserTypeStrategyFactory,
  createCommonMenu,
} from './strategies/UserTypeStrategy';

/**
 * 메뉴 데이터를 생성하는 커스텀 훅
 * SRP 준수: 메뉴 데이터 생성만 담당
 */
export const useMenuData = (userType: UserType): MenuItemData[][] => {
  const navigate = useNavigate();

  // 전략 패턴을 사용하여 타입별 메뉴 데이터 생성
  const strategy = useMemo(
    () => UserTypeStrategyFactory.createStrategy(userType, navigate),
    [userType, navigate]
  );

  return useMemo<MenuItemData[][]>(() => {
    const commonMenu = createCommonMenu(navigate);
    return strategy.getMenuItems(commonMenu);
  }, [strategy, navigate]);
};

