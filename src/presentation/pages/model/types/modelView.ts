export type ModelFilterKey = '전체' | '뷰티' | '패션' | '피팅' | '라이프' | '키즈';

export type ModelDetailTab = 'intro' | 'portfolio' | 'gallery';

export interface ModelListItemView {
  id: string;
  name: string;
  summary: string;
  profileImage: string;
  modelType: string;
  filterKey: ModelFilterKey;
  height?: number;
  location?: string;
  tags?: string[];
  description?: string;
}

export interface ModelDetailExtraView {
  mood: string;
  mainStrength: string;
  portfolioFileName: string;
  fileSize: string;
  joinedAt: string;
  profileStatus: string;
  tags: string[];
  description?: string;
}

export interface ModelFileView {
  id: string;
  fileName: string;
  fileType: 'PDF' | 'PPT' | 'IMAGE';
  fileSize: string;
  uploadedAt: string;
}
