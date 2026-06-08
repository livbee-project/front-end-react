import type { CampaignFormValues } from '@/domain/entities/campaign'

/** 빈 공고 등록 폼 초기값 생성 */
export function createEmptyCampaignForm(): CampaignFormValues {
  return {
    liveThumbnail: null,
    coverImage: null,
    brandName: '',
    title: '',
    summary: '',
    description: '',
    recruitType: '',
    category: '',
    payment: '',
    recruitCount: '',
    location: '',
    shootingDate: '',
    applyDeadline: '',
    startTime: '',
    endTime: '',
  }
}
