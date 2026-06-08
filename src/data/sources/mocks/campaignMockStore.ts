import type { Campaign, CampaignFormValues } from '@/domain/entities/campaign'

const campaigns = new Map<string, Campaign>()

/** 고유 ID 생성 */
function createId(): string {
  return `campaign-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** 폼 값을 공고 엔티티로 변환 */
function toCampaign(
  values: CampaignFormValues,
  isDraft: boolean,
  existing?: Campaign,
): Campaign {
  const now = new Date().toISOString()
  return {
    ...values,
    id: existing?.id ?? createId(),
    isLive: existing?.isLive ?? true,
    likeCount: existing?.likeCount ?? 0,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    isDraft,
  }
}

/** 시드 공고 데이터 초기화 */
export function seedCampaignMocks(): void {
  if (campaigns.size > 0) return
  const sample: CampaignFormValues = {
    liveThumbnail: null,
    coverImage: null,
    brandName: '글로우 뷰티',
    title: '신제품 뷰티 라이브 쇼호스트 모집',
    summary: '뷰티 신제품 라이브 방송 진행 쇼호스트를 모집합니다.',
    description: '라이브 커머스 경험자 우대. 제품 시연 및 소구력이 뛰어난 분을 찾습니다.',
    recruitType: '쇼호스트',
    category: '뷰티',
    payment: '500000',
    recruitCount: '1',
    location: '서울 강남구',
    shootingDate: '2026-06-20',
    applyDeadline: '2026-06-10',
    startTime: '14:00',
    endTime: '16:00',
  }
  const c = toCampaign(sample, false)
  campaigns.set(c.id, c)
}

/** 목 저장소에 공고 등록 */
export function mockCreateCampaign(values: CampaignFormValues): Campaign {
  const campaign = toCampaign(values, false)
  campaigns.set(campaign.id, campaign)
  return campaign
}

/** 목 저장소에 임시 저장 */
export function mockSaveCampaignDraft(values: CampaignFormValues, draftId?: string): Campaign {
  const existing = draftId ? campaigns.get(draftId) : undefined
  const campaign = toCampaign(values, true, existing)
  campaigns.set(campaign.id, campaign)
  return campaign
}

/** ID로 목 공고 조회 */
export function mockGetCampaignById(id: string): Campaign | null {
  return campaigns.get(id) ?? null
}

/** 목 공고 목록 조회 (임시저장 제외) */
export function mockListCampaigns(): Campaign[] {
  return Array.from(campaigns.values())
    .filter((c) => !c.isDraft)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}
