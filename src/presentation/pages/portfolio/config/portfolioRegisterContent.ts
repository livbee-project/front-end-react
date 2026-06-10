/** 쇼호스트 프로필 등록 폼 옵션·카피 SSOT (test_codex HostProfileCreatePage) */
export const PORTFOLIO_REGISTER_CATEGORIES = [
  '뷰티',
  '패션',
  '푸드',
  '리빙',
  '육아',
  '테크',
  '라이프',
  '기타',
] as const;

export const PORTFOLIO_REGISTER_TYPES = [
  '개인 쇼호스트',
  '소속 쇼호스트',
  '프리랜서',
  '에이전시 소속',
] as const;

export const PORTFOLIO_PROFILE_CARD_RATIO_LABEL = '3:4';
export const PORTFOLIO_PROFILE_CARD_RATIO = 3 / 4;

export type PortfolioRegisterCategory = (typeof PORTFOLIO_REGISTER_CATEGORIES)[number];
export type PortfolioRegisterType = (typeof PORTFOLIO_REGISTER_TYPES)[number];
export type PortfolioRegisterVisibility = 'public' | 'private';
