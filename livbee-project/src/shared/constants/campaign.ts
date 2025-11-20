/**
 * 캠페인 관련 상수 정의
 */

import type { Campaign } from '@/domain/entities/Campaign';

export const CAMPAIGN_FILTERS: Array<{ label: string; value: '전체' | Campaign['category'] }> = [
  { label: '전체', value: '전체' },
  { label: '뷰티', value: '뷰티' },
  { label: '패션', value: '패션' },
  { label: '식품', value: '식품' },
  { label: '가전', value: '가전' },
  { label: '생활/리빙', value: '생활/리빙' },
];

