/**
 * 공통 스타일 상수 정의
 */

// ===== 공통 간격 상수 =====
export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
} as const;

// ===== 공통 패딩 상수 =====
export const PADDING = {
  SM: '8px 16px',
  MD: '12px 16px',
  LG: '16px',
  XL: '16px 32px',
  PAGE: '16px',
  PAGE_BOTTOM: '16px',
  PAGE_BOTTOM_LARGE: '32px',
} as const;

// ===== 공통 마진 상수 =====
export const MARGIN = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
} as const;

// ===== 공통 간격(Gap) 상수 =====
export const GAP = {
  XS: '4px',
  SM: '5px',
  MD: '8px',
  LG: '10px',
  XL: '12px',
  XXL: '16px',
} as const;

// ===== 공통 Border Radius 상수 =====
export const BORDER_RADIUS = {
  SM: 8,
  MD: 10,
  LG: 12,
  XL: 16,
  CIRCLE: '50%',
} as const;

// ===== 공통 폰트 스타일 상수 =====
export const FONT_SIZE = {
  XS: '12px',
  SM: 'var(--p2)', // 14px
  MD: 'var(--h3)', // 16px
  LG: 'var(--h2)', // 18px
  XL: 'var(--h1)', // 20px
  P: 'var(--p)', // 16px
  P2: 'var(--p2)', // 14px
  CT: 'var(--ct)', // 14px (caption text)
} as const;

export const FONT_WEIGHT = {
  NORMAL: 400,
  MEDIUM: 500,
  BOLD: 700,
} as const;

// ===== 공통 색상 스타일 상수 =====
export const TEXT_COLOR = {
  BLACK: 'var(--black)',
  DARK_GRAY: 'var(--dark-gray)',
  PRIMARY: 'var(--primary)',
  SLATE_GRAY: 'var(--slate-gray)',
  LAVENDER_GRAY: 'var(--lavender-gray)',
  PAINT_GRAY: 'var(--paint-gray)',
  LIGHT_GRAY: 'var(--light-gray)',
  WHITE: 'var(--white)',
} as const;

// ===== 공통 레이아웃 스타일 =====
export const FLEX_CENTER: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const FLEX_ROW: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

export const FLEX_COLUMN: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const ELLIPSIS_TEXT: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// ===== 입력 필드 기본 스타일 =====
export const INPUT_BASE_STYLE: React.CSSProperties = {
  width: '100%',
  padding: PADDING.MD,
  paddingRight: '40px',
  backgroundColor: TEXT_COLOR.WHITE,
  borderRadius: BORDER_RADIUS.LG,
  border: '1px solid var(--paint-gray)',
  fontSize: FONT_SIZE.MD,
  color: TEXT_COLOR.BLACK,
  fontWeight: FONT_WEIGHT.NORMAL,
  outline: 'none',
  boxSizing: 'border-box',
};

/**
 * 입력 필드 포커스 스타일
 */
export const INPUT_FOCUS_STYLE: React.CSSProperties = {
  borderColor: TEXT_COLOR.PRIMARY,
};

/**
 * 입력 필드 에러 스타일
 */
export const INPUT_ERROR_STYLE: React.CSSProperties = {
  borderColor: 'var(--error, #FF0000)',
};

