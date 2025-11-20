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
    secondaryForeground: '#030213',
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
    '4xl': '48px',
    '5xl': '60px',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '16px',
    '2xl': '24px',
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
    tablet: '768px',
    desktop: '1024px',
  },
  /**
   * 레거시 호환성을 위한 상수들
   * 기존 constants.ts에서 사용되던 값들을 theme으로 통합
   */
  legacy: {
    /**
     * @deprecated theme.spacing을 사용하세요
     */
    spacing: {
      XS: '4px',
      SM: '8px',
      MD: '12px',
      LG: '16px',
      XL: '20px',
      XXL: '24px',
      XXXL: '32px',
    },
    /**
     * @deprecated theme.spacing을 사용하세요
     */
    gap: {
      XS: '4px',
      SM: '5px',
      MD: '8px',
      LG: '10px',
      XL: '12px',
      XXL: '16px',
    },
    /**
     * @deprecated theme.radii를 사용하세요
     */
    borderRadius: {
      SM: '8px',
      MD: '10px',
      LG: '12px',
      XL: '16px',
      CIRCLE: '50%',
    },
    /**
     * @deprecated theme.fonts를 사용하세요
     */
    fontSize: {
      XS: '12px',
      SM: '14px',
      MD: '16px',
      LG: '18px',
      XL: '20px',
    },
    /**
     * @deprecated theme.fonts를 사용하세요
     */
    fontWeight: {
      NORMAL: 400,
      MEDIUM: 500,
      BOLD: 700,
    },
    /**
     * @deprecated theme.colors를 사용하세요
     */
    textColor: {
      BLACK: '#030213',
      DARK_GRAY: '#717182',
      PRIMARY: '#687CF4',
      WHITE: '#ffffff',
    },
  },
};

export type AppTheme = typeof theme;

