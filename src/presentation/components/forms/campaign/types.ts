export interface CampaignFormData {
  brandName: string;
  brandIntroduction: string;
  title: string;
  content: string;
  recruitmentType: 'showhost' | 'staff' | 'model' | 'other' | 'store';
  category: 'food' | 'fashion' | 'beauty' | 'electronics' | 'lifestyle';
  location: string;
  filmingDate: string;
  deadline: string;
  startTime: string;
  endTime: string;
  productName: string;
  fee: string;
  feeNegotiable: boolean;
  qualifications: string[];
}

