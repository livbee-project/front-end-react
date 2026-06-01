import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateCampaignForm } from '../campaignValidation';
import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';

const baseFormData: CampaignFormData = {
  brandName: '테스트 브랜드',
  brandIntroduction: '',
  title: '테스트 공고',
  content: '테스트 내용',
  recruitmentType: 'showhost',
  category: 'food',
  location: '',
  filmingDate: '',
  deadline: '',
  startTime: '',
  endTime: '',
  productName: '',
  fee: '',
  feeNegotiable: false,
  qualifications: [],
};

describe('validateCampaignForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('촬영일이 오늘 이전이면 에러', () => {
    const result = validateCampaignForm({
      ...baseFormData,
      filmingDate: '2025-03-14',
      deadline: '2025-03-10',
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('촬영일은 오늘 이후여야 합니다.');
  });

  it('마감일이 촬영일보다 크거나 같으면 에러', () => {
    const result = validateCampaignForm({
      ...baseFormData,
      filmingDate: '2025-03-20',
      deadline: '2025-03-20',
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('마감일은 촬영일보다 이전이어야 합니다. 같은 날은 허용되지 않습니다.');
  });

  it('마감일 < 촬영일, 촬영일 >= 오늘이면 유효', () => {
    const result = validateCampaignForm({
      ...baseFormData,
      filmingDate: '2025-03-20',
      deadline: '2025-03-18',
    });
    expect(result.isValid).toBe(true);
  });
});
