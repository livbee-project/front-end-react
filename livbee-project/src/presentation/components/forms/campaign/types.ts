export interface CampaignFormData {
  brandName: string;
  title: string;
  content: string;
  detailedContent: string;
  recruitmentType: 'showhost' | 'staff' | 'model' | 'other' | 'store';
  category: 'food' | 'fashion' | 'beauty' | 'electronics' | 'lifestyle';
  location: string;
  filmingDate: string;
  deadline: string;
  startTime: string;
  endTime: string;
  productName: string;
}

