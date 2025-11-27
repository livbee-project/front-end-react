/**
 * 캠페인 관련 유틸리티 함수
 */

/**
 * 모집구분 영문 코드를 한글명으로 변환
 */
export const mapPrefixToKorean = (
  prefix: 'showhost' | 'staff' | 'model' | 'other' | null | undefined
): '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집' | null => {
  const prefixMap: Record<string, '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집'> = {
    showhost: '쇼호스트모집',
    staff: '촬영스태프',
    model: '모델모집',
    other: '기타모집',
  };
  return prefix ? prefixMap[prefix] || null : null;
};

/**
 * 카테고리 영문 코드를 한글명으로 변환
 */
export const mapCategoryToKorean = (
  category: 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle' | null | undefined
): '뷰티' | '패션' | '식품' | '가전' | '생활/리빙' | null => {
  const categoryMap: Record<string, '뷰티' | '패션' | '식품' | '가전' | '생활/리빙'> = {
    beauty: '뷰티',
    fashion: '패션',
    food: '식품',
    electronics: '가전',
    lifestyle: '생활/리빙',
  };
  return category ? categoryMap[category] || null : null;
};

/**
 * 한글 모집구분을 영문 코드로 변환
 */
export const mapKoreanToPrefix = (
  korean: '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집' | string
): 'showhost' | 'staff' | 'model' | 'other' => {
  const koreanMap: Record<string, 'showhost' | 'staff' | 'model' | 'other'> = {
    쇼호스트모집: 'showhost',
    촬영스태프: 'staff',
    모델모집: 'model',
    기타모집: 'other',
  };
  return koreanMap[korean] || 'showhost';
};

/**
 * 한글 카테고리를 영문 코드로 변환
 */
export const mapKoreanToCategory = (
  korean: '뷰티' | '패션' | '식품' | '가전' | '생활/리빙' | string
): 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle' => {
  const koreanMap: Record<string, 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle'> = {
    뷰티: 'beauty',
    패션: 'fashion',
    식품: 'food',
    가전: 'electronics',
    '생활/리빙': 'lifestyle',
  };
  return koreanMap[korean] || 'food';
};

