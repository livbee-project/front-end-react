/** 홈 화면 전용 뷰 모델 (test_codex homeData 기준) */
export interface HomeLiveItem {
  id: string;
  liveThumbnail: string;
  productImage?: string;
  productName?: string;
  title: string;
  shootingDate: string;
}

export interface HomeCampaignItem {
  id: string;
  coverImage: string;
  brandName: string;
  title: string;
  payment: number;
  shootingDate: string;
}

export interface HomeProfileItem {
  id: string;
  profileImage: string;
  name: string;
  summary: string;
  category?: string;
  modelType?: string;
  experienceYears?: number;
  height?: number;
}

export interface HomeClipItem {
  id: string;
  thumbnail: string;
  title: string;
  summary: string;
}

export interface HomeNewsItem {
  id: string;
  thumbnail: string;
  category: string;
  title: string;
  createdAt: string;
}

export interface HomeHeroData {
  image: string;
  href: string;
}
