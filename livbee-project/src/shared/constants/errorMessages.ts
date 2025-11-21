/**
 * 에러 메시지 상수 정의
 * 향후 i18n 지원을 위한 준비
 */

export const ERROR_MESSAGES = {
  // 공통 에러
  GENERIC: '오류가 발생했습니다.',
  NOT_FOUND: '데이터를 찾을 수 없습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',

  // 모델 관련
  MODEL_LIST_FAILED: '모델 목록을 불러오는 중 오류가 발생했습니다.',
  MODEL_DETAIL_FAILED: '모델을 불러오는데 실패했습니다.',
  MODEL_NOT_FOUND: '모델을 찾을 수 없습니다.',
  MODEL_CREATE_FAILED: '모델 등록에 실패했습니다.',

  // 포트폴리오 관련
  PORTFOLIO_LIST_FAILED: '포트폴리오 목록을 불러오는 중 오류가 발생했습니다.',
  PORTFOLIO_DETAIL_FAILED: '포트폴리오를 불러오는데 실패했습니다.',
  PORTFOLIO_NOT_FOUND: '포트폴리오를 찾을 수 없습니다.',

  // 캠페인 관련
  CAMPAIGN_LIST_FAILED: '캠페인 목록을 불러오는 중 오류가 발생했습니다.',
  CAMPAIGN_DETAIL_FAILED: '공고를 불러오는데 실패했습니다.',
  CAMPAIGN_NOT_FOUND: '공고를 찾을 수 없습니다.',

  // 쇼핑 라이브 관련
  SHOPPING_LIVE_LIST_FAILED: '쇼핑 라이브 목록을 불러오는 중 오류가 발생했습니다.',
  BRAND_PICK_LIST_FAILED: '브랜드 픽 목록을 불러오는 중 오류가 발생했습니다.',

  // 쇼호스트 관련
  SHOWHOST_LIST_FAILED: '쇼호스트 목록을 불러오는 중 오류가 발생했습니다.',
} as const;

