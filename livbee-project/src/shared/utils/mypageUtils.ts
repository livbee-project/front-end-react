import { formatNumberCompact } from '@/shared/utils/formatUtils';
import type { ProfileStat } from '@/types/mypage';

/**
 * 프로필 통계 값을 포맷팅하는 함수
 */
export const formatStatValue = (stat: ProfileStat): string => {
  switch (stat.format) {
    case 'rating':
      return `${stat.value.toFixed(1)}★`;
    case 'compact':
      return `${formatNumberCompact(stat.value)}${stat.unit ?? ''}`;
    case 'count':
      return `${stat.value.toLocaleString()}${stat.unit ?? ''}`;
    default:
      return stat.unit ? `${stat.value.toLocaleString()}${stat.unit}` : stat.value.toLocaleString();
  }
};

