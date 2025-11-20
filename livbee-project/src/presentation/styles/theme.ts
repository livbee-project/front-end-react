/**
 * Hex 색상을 RGBA로 변환하는 유틸리티 함수
 * @param hex - Hex 색상 코드 (예: '#687CF4')
 * @param alpha - 투명도 (0-1)
 * @returns RGBA 색상 문자열
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const theme = {
  colors: {
    primary: '#687CF4',
    primaryHover: '#5b6de0',
    primaryForeground: '#ffffff',
    secondary: '#F5F6FF',
    background: '#ffffff',
    foreground: '#030213',
    muted: '#717182',
    border: 'rgba(0, 0, 0, 0.1)',
    card: '#ffffff',
    inputBackground: '#f3f3f5',
    error: '#ff5a5f',
    errorForeground: '#ffffff',
  },
  /**
   * Primary 색상의 opacity 값들
   * 자주 사용되는 opacity 레벨을 미리 정의
   */
  primaryOpacity: {
    '05': 'rgba(104, 124, 244, 0.05)',
    '10': 'rgba(104, 124, 244, 0.1)',
    '15': 'rgba(104, 124, 244, 0.15)',
    '20': 'rgba(104, 124, 244, 0.2)',
    '25': 'rgba(104, 124, 244, 0.25)',
    '30': 'rgba(104, 124, 244, 0.3)',
    '35': 'rgba(104, 124, 244, 0.35)',
    '60': 'rgba(104, 124, 244, 0.6)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '36px',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '16px',
    full: '9999px',
  },
  fonts: {
    family: `'NexonLv2Gothic', -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif`,
    h1: '700 16px/1.4 "NexonLv2Gothic"',
    h2: '700 14px/1.4 "NexonLv2Gothic"',
    body: '300 14px/1.6 "NexonLv2Gothic"',
    button: '500 12px/1.4 "NexonLv2Gothic"',
    caption: '300 12px/1.4 "NexonLv2Gothic"',
  },
  input: {
    borderRadius: '16px',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    focusBorderColor: '#687CF4',
  },
  section: {
    paddingY: '36px',
    paddingX: {
      mobile: '16px',
      tablet: '24px',
      desktop: '32px',
    },
    gap: '24px',
  },
  card: {
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    gap: '12px',
  },
  layout: {
    maxWidth: '1280px',
    pagePadding: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
  },
  breakpoints: {
    tablet: '640px',
    desktop: '1024px',
  },
};

export type AppTheme = typeof theme;

