export const theme = {
  colors: {
    primary: '#687CF4',
    primaryForeground: '#ffffff',
    secondary: '#F5F6FF',
    background: '#ffffff',
    foreground: '#030213',
    muted: '#717182',
    border: 'rgba(0, 0, 0, 0.1)',
    card: '#ffffff',
    inputBackground: '#f3f3f5',
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

