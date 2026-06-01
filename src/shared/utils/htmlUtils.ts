/**
 * HTML 유틸리티 함수
 */

/**
 * HTML 콘텐츠를 텍스트로 변환하는 함수
 * @param html - HTML 문자열
 * @returns 변환된 텍스트 문자열
 */
export const htmlToText = (html: string): string => {
  if (typeof window === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

