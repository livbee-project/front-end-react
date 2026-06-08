import type { CampaignCreateStep } from '@/domain/entities/campaign'

/** 공고 등록 위저드 단계 메타 */
export const CAMPAIGN_CREATE_STEPS: {
  step: CampaignCreateStep
  title: string
  description: string
}[] = [
  { step: 1, title: '기본 정보', description: '대표·라이브 이미지와 텍스트를 입력합니다.' },
  { step: 2, title: '모집 정보', description: '모집 구분, 출연료, 인원을 입력합니다.' },
  { step: 3, title: '일정 및 장소', description: '촬영일, 마감일, 시간을 입력합니다.' },
  { step: 4, title: '미리보기', description: '카드 노출을 최종 확인합니다.' },
]
