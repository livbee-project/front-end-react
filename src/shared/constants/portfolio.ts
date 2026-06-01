/**
 * 포트폴리오 관련 상수 정의
 */

import type { MyPortfolioItem } from '@/types/portfolio';

export const PORTFOLIO_FILTERS: Array<{ label: string; value: string }> = [
  { label: '전체', value: '전체' },
  { label: '뷰티', value: '뷰티' },
  { label: '패션', value: '패션' },
  { label: '식품', value: '식품' },
  { label: '가전', value: '가전' },
  { label: '생활/리빙', value: '생활/리빙' },
];

export const ITEMS_PER_PAGE = 3;

export const MOCK_PORTFOLIOS: MyPortfolioItem[] = [
  {
    id: 1,
    title: '패션 쇼핑라이브 포트폴리오',
    summary: '봄/여름 시즌 패션 아이템 라이브 진행 영상 모음',
    categories: ['패션', '뷰티'],
    updatedAt: '2024-11-01',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    isPinned: true,
    isDefault: true,
    role: 'showhost',
  },
  {
    id: 2,
    title: '뷰티 제품 리뷰',
    summary: '스킨케어 및 메이크업 제품 상세 리뷰 영상',
    categories: ['뷰티'],
    updatedAt: '2024-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    role: 'showhost',
  },
  {
    id: 3,
    title: '홈리빙 큐레이션',
    summary: '인테리어 소품 및 생활용품 소개 라이브 영상',
    categories: ['리빙', '홈데코'],
    updatedAt: '2024-09-20',
    imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80',
    role: 'showhost',
  },
  {
    id: 4,
    title: '하이패션 룩북',
    summary: 'FW 시즌 하이패션 의상 촬영 컷 & 라이브 영상',
    categories: ['패션'],
    updatedAt: '2024-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    role: 'model',
    isPinned: true,
    isDefault: true,
  },
  {
    id: 5,
    title: '바디 프로필 & 워킹 영상',
    summary: '바디 프로필 촬영 및 런웨이 워킹 영상 모음',
    categories: ['피트니스'],
    updatedAt: '2024-08-12',
    role: 'model',
  },
];

