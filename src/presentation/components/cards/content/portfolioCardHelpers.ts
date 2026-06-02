import type { Portfolio } from '@/domain/entities/Portfolio';
import { formatExperience } from '@/shared/utils/badgeUtils';

export const buildPortfolioSupplementary = (portfolio: Portfolio): string =>
  portfolio.oneLineIntro || '소개 없음';

export const buildPortfolioRating = (portfolio: Portfolio): string | undefined => {
  if (portfolio.experienceYears != null && portfolio.experienceYears > 0) {
    return formatExperience(portfolio.experienceYears);
  }
  return undefined;
};
