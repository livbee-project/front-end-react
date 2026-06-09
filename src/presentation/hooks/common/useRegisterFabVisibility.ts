import { useMemo } from 'react';
import type { UserRole } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useRoleAccess } from '@/presentation/hooks/common/useRoleAccess';
import { isRegisterFabEnabled } from '@/shared/config/registerFabConfig';

type RegisterFabTargetRole = 'brand' | 'showhost';

/**
 * 등록 FAB(플로팅 버튼) 표시 여부를 결정합니다.
 * - 비로그인: FAB 표시 (클릭 시 로그인 모달)
 * - 로그인 + 해당 역할 보유 + currentRole 일치: FAB 표시
 * - 그 외: FAB 숨김
 *
 * @param targetRole - FAB이 필요한 역할 ('brand': 모집공고 등록, 'showhost': 쇼호스트/모델 등록)
 */
export const useRegisterFabVisibility = (targetRole: RegisterFabTargetRole) => {
  const fabEnabled = isRegisterFabEnabled();
  const { isLoggedIn } = useAuth();
  const { currentRole, hasBrandRole, hasShowhostRole } = useRoleAccess();

  const hasTargetRole = targetRole === 'brand' ? hasBrandRole : hasShowhostRole;
  const oppositeRole: UserRole = targetRole === 'brand' ? 'showhost' : 'brand';

  const shouldHideRegisterFab = useMemo(
    () => !fabEnabled || (isLoggedIn && (currentRole === oppositeRole || !hasTargetRole)),
    [fabEnabled, isLoggedIn, currentRole, oppositeRole, hasTargetRole]
  );

  return {
    shouldHideRegisterFab,
    shouldShowRegisterFab: !shouldHideRegisterFab,
  };
};
