import { describe, it, expect } from 'vitest';
import { validateCampaignApplyForm } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyValidation';
import { buildCampaignApplyRequest } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyRequestBuilder';

describe('campaignApplyValidation', () => {
  it('should pass validation when all fields are valid', () => {
    const result = validateCampaignApplyForm({
      campaignId: 'campaign-1',
      selectedPortfolio: 42,
      message: '안녕하세요, 지원합니다.',
      availableDate: '2025-11-30',
      availableTime: '10:00',
    });

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it('should fail when any required field is missing', () => {
    const result = validateCampaignApplyForm({
      campaignId: '',
      selectedPortfolio: null,
      message: '   ',
      availableDate: '',
      availableTime: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBeDefined();
  });

  it('should fail when message exceeds max length', () => {
    const longMessage = 'a'.repeat(401);
    const result = validateCampaignApplyForm({
      campaignId: 'campaign-1',
      selectedPortfolio: 1,
      message: longMessage,
      availableDate: '2025-11-30',
      availableTime: '10:00',
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('400');
  });
});

describe('buildCampaignApplyRequest', () => {
  it('should trim message and set portfolioId', () => {
    const payload = buildCampaignApplyRequest({
      campaignId: 'campaign-1',
      selectedPortfolio: '123',
      message: '  지원합니다.  ',
      availableDate: '2025-11-30',
      availableTime: '10:00',
    });

    expect(payload).toEqual({
      campaignId: 'campaign-1',
      portfolioId: '123',
      message: '지원합니다.',
      availableDate: '2025-11-30',
      availableTime: '10:00',
    });
  });
});

