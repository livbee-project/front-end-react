import type { MouseEvent, ReactNode } from 'react';

export type ContentCardVariant = 'live' | 'showhost' | 'ad' | 'news' | 'flip';

export interface ContentCardProps {
  variant: ContentCardVariant;
  imageUrl?: string;
  imageAlt?: string;
  /** 브랜드명·이름 또는 라이브/뉴스 제목 */
  heading: string;
  /** 광고 설명 등 heading과 구분되는 한 줄 요약 */
  title?: string;
  /** 조회수·마감일·출처 등 보조 텍스트 */
  supplementary?: string;
  /** 플립 카드 좋아요 수 (있으면 ♡ 행 표시) */
  flipEngagement?: string;
  /** 쇼호스트 평점 (예: "4.9 (138)") */
  rating?: string;
  /** 이미지 위 오버레이 (D-day, 재생시간 등) */
  mediaOverlay?: ReactNode;
  /** 본문 하단 확장 영역 (CTA, 상품 정보 등) */
  footer?: ReactNode;
  isFavorite?: boolean;
  onFavoriteToggle?: (event: MouseEvent<HTMLButtonElement>) => void;
  onClick?: () => void;
  className?: string;
}
