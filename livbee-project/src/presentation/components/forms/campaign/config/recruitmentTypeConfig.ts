import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';

/**
 * 모집구분 타입 매핑 설정
 * OCP 준수: 새로운 타입 추가 시 이 설정만 수정하면 됨
 */
export const RECRUITMENT_TYPE_MAP: Partial<
  Record<CampaignFormData['recruitmentType'], 'showhost' | 'staff' | 'model' | 'other'>
> = {
  store: 'showhost',
  showhost: 'showhost',
  model: 'model',
  staff: 'staff',
} as const;

/**
 * 기본 모집구분 타입
 */
const DEFAULT_RECRUITMENT_TYPE: 'showhost' | 'staff' | 'model' | 'other' = 'showhost';

/**
 * 모집구분을 영문 코드로 변환
 * OCP 준수: 설정 파일을 사용하여 새로운 타입 추가 시 함수 수정 없이 확장 가능
 */
export const mapRecruitmentType = (
  type: CampaignFormData['recruitmentType']
): 'showhost' | 'staff' | 'model' | 'other' => {
  return RECRUITMENT_TYPE_MAP[type] || DEFAULT_RECRUITMENT_TYPE;
};

