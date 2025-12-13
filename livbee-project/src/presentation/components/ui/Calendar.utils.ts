/**
 * 캘린더 유틸 함수
 */

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
 */
export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
 * 유효하지 않은 경우 undefined 반환
 */
export const parseDateString = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date : undefined;
};

/**
 * 영어 월 이름을 한국어 년월 형식으로 변환
 * 예: "December 2025" -> "2025년 12월"
 */
export const formatMonthYearToKorean = (englishText: string): string | null => {
  const date = new Date(englishText);
  if (isNaN(date.getTime())) return null;
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};

