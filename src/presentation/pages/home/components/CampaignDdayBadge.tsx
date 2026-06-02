import React from 'react';
import styled from 'styled-components';
import { CaptionMedium } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';

const BadgeWrap = styled(Badge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.surface};

  ${CaptionMedium} {
    color: ${({ theme }) => theme.colors.surface};
  }
`;

interface CampaignDdayBadgeProps {
  label: string;
}

export const CampaignDdayBadge: React.FC<CampaignDdayBadgeProps> = ({ label }) => (
  <BadgeWrap>
    <CaptionMedium>{label}</CaptionMedium>
  </BadgeWrap>
);
