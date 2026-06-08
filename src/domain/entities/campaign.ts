/** 모집 구분 선택지 */
export const RECRUIT_TYPE_OPTIONS = ['쇼호스트', '모델', '스태프', '기타'] as const

/** 카테고리 선택지 */
export const CAMPAIGN_CATEGORY_OPTIONS = ['뷰티', '패션', '식품', '라이프', '가전', '기타'] as const

export type RecruitType = (typeof RECRUIT_TYPE_OPTIONS)[number]
export type CampaignCategory = (typeof CAMPAIGN_CATEGORY_OPTIONS)[number]

/** 공고 등록 폼 전체 값 */
export interface CampaignFormValues {
  liveThumbnail: string | null
  coverImage: string | null
  brandName: string
  title: string
  summary: string
  description: string
  recruitType: RecruitType | ''
  category: CampaignCategory | ''
  payment: string
  recruitCount: string
  location: string
  shootingDate: string
  applyDeadline: string
  startTime: string
  endTime: string
}

/** 저장된 공고 엔티티 */
export interface Campaign extends CampaignFormValues {
  id: string
  isLive: boolean
  likeCount: number
  createdAt: string
  updatedAt: string
  isDraft: boolean
}

/** 등록 위저드 단계 (1~4) */
export type CampaignCreateStep = 1 | 2 | 3 | 4

/** 폼 필드별 검증 에러 맵 */
export type CampaignFormErrors = Partial<Record<keyof CampaignFormValues, string>>
