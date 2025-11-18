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
  radii: {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '14px',
  },
  fonts: {
    family: `'NexonLv2Gothic', -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", sans-serif`,
    h1: '700 16px/1.4 "NexonLv2Gothic"',
    h2: '700 14px/1.4 "NexonLv2Gothic"',
    body: '300 14px/1.6 "NexonLv2Gothic"',
    button: '500 12px/1.4 "NexonLv2Gothic"',
    caption: '300 12px/1.4 "NexonLv2Gothic"',
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

