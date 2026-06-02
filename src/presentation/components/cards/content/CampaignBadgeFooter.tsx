import React from 'react';
import styled from 'styled-components';
import { Badge } from '@/presentation/components/styled/CommonStyles';

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface CampaignBadgeFooterProps {
  badges: string[];
  campaignId: string;
}

export const CampaignBadgeFooter: React.FC<CampaignBadgeFooterProps> = ({ badges, campaignId }) => {
  if (badges.length === 0) return null;

  return (
    <BadgeRow>
      {badges.map((badge) => (
        <Badge key={`${campaignId}-${badge}`} $variant="secondary" as="span">
          {badge}
        </Badge>
      ))}
    </BadgeRow>
  );
};
