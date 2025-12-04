import React from 'react';
import styled, { css } from 'styled-components';
import { Star } from 'lucide-react';
import { H2, H3, CaptionMedium } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { Card, CardHeader, CardFooter } from '@/presentation/components/styled/SectionStyles';
import { calculateDDay, formatRelativeTime } from '@/shared/utils/dateUtils';
import { formatFee, getDeadlineLabel } from '@/shared/utils/formatUtils';
import { buildCampaignBadgeItems } from '@/shared/utils/badgeUtils';
import type { Campaign } from '@/domain/entities/Campaign';

interface CampaignCardProps {
  campaign: Campaign;
  isScrapped: boolean;
  onCardClick: () => void;
  onScrapClick: (event: React.MouseEvent) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  isScrapped,
  onCardClick,
  onScrapClick,
}) => {
  return (
    <CardContainer onClick={onCardClick}>
      <StyledCardHeader>
        <BrandName>{campaign.brandName || '브랜드명'}</BrandName>
        <ScrapButton
          type="button"
          aria-label="스크랩"
          aria-pressed={isScrapped}
          onClick={onScrapClick}
        >
          <StyledStar size={20} $active={isScrapped} aria-hidden="true" />
        </ScrapButton>
      </StyledCardHeader>

      <CampaignTitle as={H2}>{campaign.title}</CampaignTitle>

      <BadgeContainer>
        {buildCampaignBadgeItems(campaign).map((badge) => (
          <Badge key={`${campaign.id}-${badge}`} $variant="secondary" as="span">
            {badge}
          </Badge>
        ))}
      </BadgeContainer>

      <StyledCardFooter>
        <FeeText>{formatFee(campaign.fee)}</FeeText>
        <DeadlineText>
          {getDeadlineLabel(campaign.closeAt, calculateDDay, formatRelativeTime)}
        </DeadlineText>
      </StyledCardFooter>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px ${({ theme }) => theme.primaryOpacity['10']};
    transform: translateY(-2px);
  }
`;

const StyledCardHeader = styled(CardHeader)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BrandName = styled(H3)``;

const ScrapButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
`;

const StyledStar = styled(Star)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  ${({ $active, theme }) =>
    $active &&
    css`
      fill: ${theme.colors.primary};
    `}
  transition: color 0.2s, fill 0.2s;
  ${ScrapButton}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CampaignTitle = styled(H2)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledCardFooter = styled(CardFooter)``;

const FeeText = styled(CaptionMedium)`
  color: ${({ theme }) => theme.colors.primary};
`;

const DeadlineText = styled(CaptionMedium)`
  color: ${({ theme }) => theme.colors.error};
`;

