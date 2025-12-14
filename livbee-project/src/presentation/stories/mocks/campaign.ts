import type { Campaign } from '@/domain/entities/Campaign';

let campaignCounter = 1;

const baseCampaign: Campaign = {
  id: 'cmp-000',
  brandName: '브랜드명',
  title: '캠페인 제목',
  content: '캠페인 설명',
  category: '패션',
  prefix: '모델모집',
  shootDate: '2024-12-01T10:00:00.000Z',
  closeAt: '2024-12-10T10:00:00.000Z',
  durationHours: 3,
  startTime: '10:00',
  endTime: '13:00',
  location: '서울',
  fee: 150000,
  feeNegotiable: true,
  isAd: false,
  isApplied: false,
  createdAt: '2024-11-01T00:00:00.000Z',
  updatedAt: '2024-11-01T00:00:00.000Z',
};

export const createMockCampaign = (override: Partial<Campaign> = {}): Campaign => ({
  ...baseCampaign,
  id: override.id ?? `cmp-${String(campaignCounter++).padStart(3, '0')}`,
  ...override,
});

