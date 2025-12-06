import type { Campaign } from '@/domain/entities/Campaign';
import type { Portfolio } from '@/domain/entities/Portfolio';
import type { Model } from '@/domain/entities/Model';
import { formatDate } from '@/shared/utils/dateUtils';

/**
 * 캠페인의 배지 아이템을 생성합니다.
 */
export const buildCampaignBadgeItems = (campaign: Campaign): string[] => {
  const badges: string[] = [];
  if (campaign.location) {
    badges.push(campaign.location);
  }
  if (campaign.prefix) {
    badges.push(campaign.prefix);
  }
  if (campaign.category) {
    badges.push(campaign.category);
  }
  if (campaign.shootDate) {
    badges.push(`촬영 ${formatDate(campaign.shootDate)}`);
  }
  return badges;
};

/**
 * 포트폴리오의 배지 아이템을 생성합니다.
 */
export const buildPortfolioBadgeItems = (portfolio: Portfolio): string[] => {
  const badges: string[] = [];
  // TODO: 카테고리 데이터 추가 시 categories 사용
  if (portfolio.detailedRegion) {
    badges.push(portfolio.detailedRegion);
  }
  return badges;
};

/**
 * 모델의 배지 아이템을 생성합니다.
 * Model 타입은 목록 조회용으로 제한된 필드만 포함하므로, height와 experienceYears만 사용합니다.
 */
export const buildModelBadgeItems = (model: Model): string[] => {
  const badges: string[] = [];
  if (model.height) {
    badges.push(`${model.height}cm`);
  }
  if (model.experienceYears != null && model.experienceYears > 0) {
    badges.push(`${model.experienceYears}년 경력`);
  }
  return badges;
};

/**
 * 경력 포맷팅 함수
 */
export const formatExperience = (years: number | null): string => {
  if (years == null || years === 0) return '';
  return `· 경력 ${years}년`;
};

