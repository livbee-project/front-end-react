export type PortfolioFilterKey = '전체' | '뷰티' | '패션' | '푸드' | '라이프';

export type PortfolioDetailTab = 'intro' | 'portfolio' | 'live' | 'gallery';

export interface PortfolioListItemView {
  id: string;
  name: string;
  summary: string;
  profileImage: string;
  category: string;
  experienceYears: number;
}

export interface PortfolioDetailExtraView {
  registerType: string;
  responseTone: string;
  mainStrength: string;
  portfolioFileName: string;
  recentLiveTitle: string;
  recentLiveUrl: string;
  liveUrlLabel: string;
  joinedAt: string;
  profileStatus: string;
  tags: string[];
  description?: string;
  location?: string;
}

export interface PortfolioFileView {
  id: string;
  fileName: string;
  fileType: 'PDF' | 'PPT' | 'IMAGE';
  fileSize: string;
  uploadedAt: string;
}

export interface PortfolioLiveLinkView {
  id: string;
  title: string;
  url: string;
  label: string;
  uploadedAt: string;
}
