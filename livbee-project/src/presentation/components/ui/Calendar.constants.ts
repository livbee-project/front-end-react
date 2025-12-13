/**
 * 캘린더 관련 상수
 */
export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const CALENDAR_COLORS = {
  SUNDAY: '#ef4444',
  SATURDAY: '#3b82f6',
  BLACK: '#000000',
  WHITE: '#ffffff',
} as const;

export const CALENDAR_OPACITY = {
  OUTSIDE_MONTH: 0.67,
  OUTSIDE_MONTH_HOVER: 0.8,
} as const;

export const CALENDAR_TIMING = {
  INITIAL_DELAY: 50,
  BUTTON_CLICK_DEBOUNCE: 30,
  MUTATION_DEBOUNCE: 30,
} as const;

export const WEEKDAY_STYLES = {
  FONT_SIZE: '13px',
  FONT_WEIGHT: '700',
  COLOR: '#000000',
} as const;

