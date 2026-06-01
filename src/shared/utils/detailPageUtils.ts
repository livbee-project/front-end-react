/**
 * Detail 페이지 공통 유틸리티
 */

/**
 * 카테고리 추출 옵션
 */
export interface ExtractCategoriesOptions {
  description?: string | null;
}

/**
 * description에서 카테고리 추출
 */
export const extractCategories = (options: ExtractCategoriesOptions): string[] => {
  const categories: string[] = [];
  const description = options.description || '';
  
  if (description.includes('패션')) {
    categories.push('패션');
  }
  if (description.includes('뷰티')) {
    categories.push('뷰티');
  }
  if (description.includes('식품')) {
    categories.push('식품');
  }
  if (description.includes('가전')) {
    categories.push('가전');
  }
  if (description.includes('생활') || description.includes('리빙')) {
    categories.push('생활/리빙');
  }
  
  return categories;
};

/**
 * 태그 생성 옵션
 */
export interface GenerateTagsOptions {
  height?: number | null;
  weight?: number | null;
  topSize?: string | null;
  experienceYears?: number | null;
  isSizingPublic?: boolean; // Model의 경우 사이즈 공개 여부
}

/**
 * 프로필 정보로부터 태그 배열 생성
 */
export const generateProfileTags = (options: GenerateTagsOptions): string[] => {
  const tags: string[] = [];
  const { height, weight, topSize, experienceYears, isSizingPublic = true } = options;
  
  // 사이즈 공개 여부 확인 (Model의 경우)
  if (isSizingPublic) {
    if (height != null) {
      tags.push(`키 ${height}cm`);
    }
    if (weight != null) {
      tags.push(`몸무게 ${weight}kg`);
    }
    if (topSize) {
      tags.push(`사이즈 ${topSize}`);
    }
  }
  
  if (experienceYears != null && experienceYears > 0) {
    tags.push(`경력 ${experienceYears}년`);
  }
  
  return tags;
};

