import { env } from '@/shared/config/env';

/** 홈 화면 API 대신 목데이터 사용 여부 */
export const isHomeMockEnabled = (): boolean => env.useHomeMock;
