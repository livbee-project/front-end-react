import type { AppliedCampaignStatus } from '@/domain/entities/AppliedCampaign';

export const getStatusLabel = (status: AppliedCampaignStatus): string => {
  switch (status) {
    case 'accepted':
      return '합격';
    case 'pending':
      return '대기';
    case 'rejected':
      return '불합격';
    case 'in-progress':
      return '진행중';
    case 'recruiting':
      return '모집중';
    case 'completed':
      return '진행완료';
    default:
      return status;
  }
};

