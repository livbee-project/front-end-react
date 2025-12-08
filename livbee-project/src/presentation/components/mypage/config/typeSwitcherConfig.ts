import type { UserType } from '@/types/mypage';

/**
 * 타입 스위처 설정 인터페이스
 */
export interface TypeSwitcherConfig {
  type: UserType;
  label: string;
}

/**
 * 타입별 설정 배열
 * OCP 준수: 새로운 타입 추가 시 이 배열에만 항목을 추가하면 됨
 */
export const TYPE_SWITCHER_CONFIGS: TypeSwitcherConfig[] = [
  { type: 'brand', label: '브랜드' },
  { type: 'showhost', label: '쇼호스트' },
  { type: 'model', label: '모델' },
];

/**
 * 타입별 라벨을 가져오는 헬퍼 함수
 */
export const getTypeLabel = (type: UserType): string => {
  const config = TYPE_SWITCHER_CONFIGS.find((c) => c.type === type);
  return config?.label || type;
};

