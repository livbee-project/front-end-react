import type { Campaign, CampaignFormValues } from '@/domain/entities/campaign'
import {
  mockCreateCampaign,
  mockGetCampaignById,
  mockListCampaigns,
  mockSaveCampaignDraft,
  seedCampaignMocks,
} from '@/data/sources/mocks/campaignMockStore'

seedCampaignMocks()

/** 공고 등록 완료 */
export async function createCampaign(values: CampaignFormValues): Promise<Campaign> {
  return mockCreateCampaign(values)
}

/** 공고 임시 저장 */
export async function saveCampaignDraft(
  values: CampaignFormValues,
  draftId?: string,
): Promise<Campaign> {
  return mockSaveCampaignDraft(values, draftId)
}

/** ID로 공고 조회 */
export async function getCampaignById(id: string): Promise<Campaign | null> {
  return mockGetCampaignById(id)
}

/** 공고 목록 조회 */
export async function listCampaigns(): Promise<Campaign[]> {
  return mockListCampaigns()
}
