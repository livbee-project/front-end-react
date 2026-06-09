import { gridBreakpoints } from '@/presentation/styles/tokens';

/** test_codex 홈 카드 가로 스크롤 프리셋 */
export type HomeScrollPreset = 'live' | 'campaign' | 'profile' | 'clip';

/** 구간별 고정 카드 너비 (px) — test_codex home.css 기준 */
export const homeScrollCardWidth: Record<
  HomeScrollPreset,
  { mobile: number; tablet: number; wide: number }
> = {
  live: { mobile: 166, tablet: 190, wide: 204 },
  campaign: { mobile: 246, tablet: 286, wide: 304 },
  profile: { mobile: 148, tablet: 180, wide: 198 },
  clip: { mobile: 112, tablet: 150, wide: 168 },
};

export const homeResponsive = {
  breakpoints: gridBreakpoints,
  scrollGap: { mobile: '12px', tablet: '16px' },
  sectionBleed: '16px',
  cardBodyPadding: { mobile: '14px', wide: '16px 18px' },
} as const;

// 프리셋별 모바일·태블릿·와이드 카드 너비 문자열 반환
export const getHomeScrollCardWidth = (
  preset: HomeScrollPreset,
  tier: 'mobile' | 'tablet' | 'wide',
): string => `${homeScrollCardWidth[preset][tier]}px`;
