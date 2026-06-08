/** Livbee 디자인 토큰 SSOT */
export const theme = {
  colors: {
    primary: '#6B4EFF',
    primaryHover: '#5A3FE8',
    primaryLight: '#F3F0FF',
    text: '#1A1A2E',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    borderFocus: '#6B4EFF',
    background: '#FFFFFF',
    backgroundSubtle: '#F9FAFB',
    error: '#EF4444',
    success: '#10B981',
    white: '#FFFFFF',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
  },
  font: {
    family: "'Pretendard', system-ui, -apple-system, sans-serif",
  },
} as const

export type AppTheme = typeof theme
