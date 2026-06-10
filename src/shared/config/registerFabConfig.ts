import { env } from '@/shared/config/env';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

const REGISTER_PAGE_PATHS = new Set<string>([
  ROUTE_PATHS.portfolioRegister,
  ROUTE_PATHS.modelRegister,
  ROUTE_PATHS.campaignRegister,
]);

/** 목록 페이지 등록 FAB 노출 여부 */
export const isRegisterFabEnabled = (): boolean => env.registerFabEnabled;

/** true면 FAB·등록 페이지에서 로그인·권한 검사 생략 */
export const isRegisterFabAuthSkipped = (): boolean => env.registerFabAuthSkipped;

/** 등록 페이지 AuthGuard 우회 여부 */
export const isRegisterPageAuthSkipped = (pathname: string): boolean =>
  isRegisterFabAuthSkipped() && REGISTER_PAGE_PATHS.has(pathname);
