import { env } from '@/shared/config/env';

/** 모델 목록·상세·등록 API 대신 목데이터 사용 여부 */
export const isModelMockEnabled = (): boolean => env.useModelMock;
