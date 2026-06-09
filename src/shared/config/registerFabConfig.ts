import { env } from '@/shared/config/env';

/** 목록 페이지 등록 FAB(로그인·권한·등록 이동) 사용 여부 */
export const isRegisterFabEnabled = (): boolean => env.registerFabEnabled;
