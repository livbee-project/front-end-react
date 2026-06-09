import { env } from '@/shared/config/env';

/** 쇼호스트 목록·상세·등록 API 대신 목데이터 사용 여부 */
export const isPortfolioMockEnabled = (): boolean => env.usePortfolioMock;
