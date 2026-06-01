/**
 * 포트폴리오 관련 유틸리티 함수
 */

/**
 * 날짜 문자열을 포맷팅하는 함수
 */
export const formatDateLabel = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ko-KR').replace(/\s/g, '');
};

