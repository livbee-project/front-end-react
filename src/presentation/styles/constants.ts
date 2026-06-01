/**
 * @deprecated 이 파일은 레거시 호환성을 위해 유지됩니다.
 * 새로운 코드에서는 theme.ts를 직접 사용하세요.
 * 
 * 이 파일의 모든 상수는 theme.legacy에서 re-export됩니다.
 */

import type { CSSProperties } from 'react';
import { theme } from '@/presentation/styles/theme';

/**
 * @deprecated theme.spacing을 사용하세요
 */
export const SPACING = theme.legacy.spacing;

/**
 * @deprecated theme.spacing을 사용하세요
 */
export const GAP = theme.legacy.gap;

/**
 * @deprecated theme.radii를 사용하세요
 */
export const BORDER_RADIUS = theme.legacy.borderRadius;

/**
 * @deprecated theme.fonts를 사용하세요
 */
export const FONT_SIZE = theme.legacy.fontSize;

/**
 * @deprecated theme.fonts를 사용하세요
 */
export const FONT_WEIGHT = theme.legacy.fontWeight;

/**
 * @deprecated theme.colors를 사용하세요
 */
export const TEXT_COLOR = theme.legacy.textColor;

/**
 * @deprecated theme.colors를 사용하세요
 */
export const BACKGROUND_COLOR = {
  PLACEHOLDER: theme.colors.secondary,
  PRODUCT: theme.colors.secondary,
  PRODUCT_BORDER: theme.colors.border,
  WHITE: theme.colors.background,
  LIGHT_GRAY: theme.colors.secondary,
} as const;

/**
 * @deprecated CommonStyles의 FlexCenter, FlexRow, FlexColumn을 사용하세요
 */
export const FLEX_CENTER: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * @deprecated CommonStyles의 FlexRow를 사용하세요
 */
export const FLEX_ROW: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

/**
 * @deprecated CommonStyles의 FlexColumn을 사용하세요
 */
export const FLEX_COLUMN: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

/**
 * @deprecated CommonStyles의 EllipsisText를 사용하세요
 */
export const ELLIPSIS_TEXT: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

/**
 * @deprecated theme.input을 사용하세요
 */
export const INPUT_BASE_STYLE: CSSProperties = {
  width: '100%',
  padding: theme.input.padding,
  paddingRight: '40px',
  backgroundColor: theme.input.backgroundColor,
  borderRadius: theme.input.borderRadius,
  border: `1px solid ${theme.colors.border}`,
  fontSize: '14px',
  color: theme.colors.foreground,
  fontWeight: 400,
  outline: 'none',
  boxSizing: 'border-box',
};

/**
 * @deprecated theme.input.focusBorderColor를 사용하세요
 */
export const INPUT_FOCUS_STYLE: CSSProperties = {
  borderColor: theme.input.focusBorderColor,
};

/**
 * @deprecated theme.colors.error를 사용하세요
 */
export const INPUT_ERROR_STYLE: CSSProperties = {
  borderColor: theme.colors.error,
};

/**
 * @deprecated 사용하지 않습니다. theme.spacing을 사용하세요
 */
export const PADDING = {
  SM: '8px 16px',
  MD: '12px 16px',
  LG: '16px',
  XL: '16px 32px',
  PAGE: '16px',
  PAGE_BOTTOM: '16px',
  PAGE_BOTTOM_LARGE: '32px',
} as const;

/**
 * @deprecated 사용하지 않습니다. theme.spacing을 사용하세요
 */
export const MARGIN = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
} as const;
