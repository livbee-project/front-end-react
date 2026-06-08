/** 반응형 브레이크포인트 SSOT */
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
} as const

/** 미디어 쿼리 헬퍼 — max-width */
export const media = {
  mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  tabletUp: `@media (min-width: ${breakpoints.tablet}px)`,
  desktopUp: `@media (min-width: ${breakpoints.desktop}px)`,
} as const
