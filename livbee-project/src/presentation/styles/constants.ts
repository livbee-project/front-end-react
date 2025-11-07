/**
 * 공통 스타일 상수 정의
 */

/**
 * 입력 필드 기본 스타일
 */
export const INPUT_BASE_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  paddingRight: '40px',
  backgroundColor: 'var(--white)',
  borderRadius: 12,
  border: '1px solid var(--paint-gray, #E5E7ED)',
  fontSize: 'var(--h3)', // 16px
  color: 'var(--black)',
  fontWeight: 400,
  outline: 'none',
  boxSizing: 'border-box',
};

/**
 * 입력 필드 포커스 스타일
 */
export const INPUT_FOCUS_STYLE: React.CSSProperties = {
  borderColor: 'var(--primary)',
};

/**
 * 입력 필드 에러 스타일
 */
export const INPUT_ERROR_STYLE: React.CSSProperties = {
  borderColor: 'var(--error, #FF0000)',
};

