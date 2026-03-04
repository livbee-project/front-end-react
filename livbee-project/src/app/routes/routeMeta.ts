import type { UserRole } from '@/domain/entities/User';

export const ROUTE_PATHS = {
  home: '/',
  clips: '/clips',
  campaigns: '/campaigns',
  campaignRegister: '/campaigns/register',
  campaignDetail: '/campaigns/:id',
  models: '/models',
  modelRegister: '/models/register',
  modelDetail: '/models/:id',
  portfolios: '/portfolios',
  portfolioRegister: '/portfolios/register',
  portfolioDetail: '/portfolios/:id',
  myPortfolio: '/mypage/portfolios',
  myClips: '/mypage/clips',
  myAppliedCampaigns: '/mypage/applied-campaigns',
  myMessages: '/mypage/messages',
  myPage: '/mypage',
  chat: '/chat',
  chatRoom: '/chat/:roomId',
  login: '/login',
  signup: '/signup',
  kakaoCallback: '/kakao-callback',
  news: '/news',
  live: '/live',
  event: '/event',
  service: '/service',
  imageCrop: '/image/crop',
};

export const PROTECTED_ROUTES = new Set<string>([
  ROUTE_PATHS.campaignRegister,
  ROUTE_PATHS.modelRegister,
  ROUTE_PATHS.portfolioRegister,
  ROUTE_PATHS.myPortfolio,
  ROUTE_PATHS.myClips,
  ROUTE_PATHS.myAppliedCampaigns,
  ROUTE_PATHS.myMessages,
  ROUTE_PATHS.myPage,
  ROUTE_PATHS.chat,
]);

export const PROTECTED_ROUTE_PREFIXES = ['/chat/'];

export const GUEST_ONLY_ROUTES = new Set<string>([ROUTE_PATHS.login, ROUTE_PATHS.signup]);

export const ROUTE_ROLE_PERMISSIONS: Partial<Record<string, UserRole[]>> = {
  [ROUTE_PATHS.campaignRegister]: ['brand'],
  [ROUTE_PATHS.modelRegister]: ['showhost'],
  [ROUTE_PATHS.portfolioRegister]: ['showhost'],
  [ROUTE_PATHS.myPortfolio]: ['showhost'],
  [ROUTE_PATHS.myClips]: ['showhost'],
  [ROUTE_PATHS.myAppliedCampaigns]: ['showhost'],
};

