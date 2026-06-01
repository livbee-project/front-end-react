export type AppliedCampaignStatus =
  | 'accepted'
  | 'pending'
  | 'rejected'
  | 'in-progress'
  | 'recruiting'
  | 'completed';

export interface AppliedCampaign {
  id: string;
  companyName: string;
  campaignTitle: string;
  category: string;
  date: string;
  location: string;
  requirement: string;
  compensation: string;
  applicationDate: string;
  statuses: AppliedCampaignStatus[];
}

