/**
 * 라이비 MVP 기획서 v1.0 디자인 토큰 (원시값)
 * 시맨틱 매핑은 theme.ts에서 수행합니다.
 */

export const palette = {
  primary: '#8B7CFF',
  primaryHover: '#7A6CE8',
  accent: '#FFB7E7',
  background: '#FFF9FD',
  surface: '#FFFFFF',
  text: '#24212B',
  subText: '#7A7485',
  border: '#EEE7F5',
  white: '#FFFFFF',
  error: '#FF5A5F',
  errorForeground: '#FFFFFF',
} as const;

/** Primary 위에 올리는 연한 배경·오버레이 */
export const primaryMutedSurface = '#F3F0FF';

export const spacingPx = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

export const radiusPx = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const fontFamily =
  `'NexonLv2Gothic', -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif`;

export const fontScale = {
  h1: { size: 28, weight: 700, lineHeight: 1.4 },
  h2: { size: 22, weight: 700, lineHeight: 1.4 },
  h3: { size: 18, weight: 600, lineHeight: 1.4 },
  p1: { size: 14, weight: 400, lineHeight: 1.6 },
  p2: { size: 13, weight: 400, lineHeight: 1.4 },
  caption: { size: 12, weight: 400, lineHeight: 1.4 },
} as const;

export const aspectRatio = {
  live: '1 / 1',
  host: '3 / 4',
  model: '3 / 4',
  ad: '3 / 4',
  campaign: '4 / 3',
  news: '16 / 9',
  clip: '2 / 3',
  flip: '2 / 3',
} as const;

export const gridColumns = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
} as const;

/** 반응형 카드 그리드 구간 (기획 반응형 그리드 가이드) */
export const gridBreakpoints = {
  /** 디자인 최소 뷰포트 (문서·가이드용) */
  mobileMin: '375px',
  mobileMax: '767px',
  tabletMin: '768px',
  tabletMax: '1279px',
  wideMin: '1280px',
} as const;

export const breakpoints = {
  tablet: '768px',
  desktop: '1024px',
  /** 카드 그리드 4열 기준 (기획 1280px+) */
  wide: '1280px',
} as const;

export const layoutMaxWidth = '1280px';

/** primaryOpacity 단계 (0–1) */
export const primaryOpacityLevels = {
  '05': 0.05,
  '10': 0.1,
  '15': 0.15,
  '20': 0.2,
  '25': 0.25,
  '30': 0.3,
  '35': 0.35,
  '60': 0.6,
} as const;

export const cssVarNames = {
  colorPrimary: '--livbee-color-primary',
  colorPrimaryHover: '--livbee-color-primary-hover',
  colorAccent: '--livbee-color-accent',
  colorBackground: '--livbee-color-background',
  colorSurface: '--livbee-color-surface',
  colorText: '--livbee-color-text',
  colorSubText: '--livbee-color-sub-text',
  colorBorder: '--livbee-color-border',
  colorError: '--livbee-color-error',
  fontFamily: '--livbee-font-family',
  fontH1: '--livbee-font-h1',
  fontH2: '--livbee-font-h2',
  fontH3: '--livbee-font-h3',
  fontP1: '--livbee-font-p1',
  fontP2: '--livbee-font-p2',
  fontCaption: '--livbee-font-caption',
  spaceXs: '--livbee-space-xs',
  spaceSm: '--livbee-space-sm',
  spaceMd: '--livbee-space-md',
  spaceLg: '--livbee-space-lg',
  spaceXl: '--livbee-space-xl',
  space2xl: '--livbee-space-2xl',
  space3xl: '--livbee-space-3xl',
  space4xl: '--livbee-space-4xl',
  radiusSm: '--livbee-radius-sm',
  radiusMd: '--livbee-radius-md',
  radiusLg: '--livbee-radius-lg',
  radiusXl: '--livbee-radius-xl',
} as const;
