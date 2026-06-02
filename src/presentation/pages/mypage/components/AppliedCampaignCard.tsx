import React from 'react';
import styled from 'styled-components';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import type { AppliedCampaign } from '@/domain/entities/AppliedCampaign';
import { getStatusLabel } from '@/presentation/pages/mypage/utils/appliedCampaignUtils';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { Caption, PMuted } from '@/presentation/components/styled/Typography';

interface AppliedCampaignCardProps {
  campaign: AppliedCampaign;
  onClick: (campaignId: string) => void;
}

const AppliedCampaignCard: React.FC<AppliedCampaignCardProps> = ({ campaign, onClick }) => {
  return (
    <ContentCard
      variant="ad"
      heading={campaign.companyName}
      title={campaign.campaignTitle}
      supplementary={`${campaign.category} · ${campaign.date}`}
      onClick={() => onClick(campaign.id)}
      footer={
        <FooterStack>
          <StatusRow>
            {campaign.statuses.map((status) => (
              <StatusBadge key={`${campaign.id}-${status}`} $variant={status}>
                {getStatusLabel(status)}
              </StatusBadge>
            ))}
          </StatusRow>
          <InfoRow>
            <InfoItem>
              <MapPin size={14} />
              <span>{campaign.location}</span>
            </InfoItem>
            <InfoItem>
              <Calendar size={14} />
              <span>{campaign.date}</span>
            </InfoItem>
          </InfoRow>
          <Requirement as={PMuted}>{campaign.requirement}</Requirement>
          <CompensationRow>
            <DollarSign size={16} />
            <span>{campaign.compensation}</span>
            <ApplicationDate as={Caption}>지원일: {campaign.applicationDate}</ApplicationDate>
          </CompensationRow>
        </FooterStack>
      }
    />
  );
};

const FooterStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const StatusBadge = styled.span<{ $variant: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  font: ${({ theme }) => theme.fonts.caption};
  font-weight: 600;
  background: ${({ theme }) => theme.primaryOpacity['10']};
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const Requirement = styled(PMuted)`
  margin: 0;
`;

const CompensationRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  font: ${({ theme }) => theme.fonts.p2};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const ApplicationDate = styled(Caption)`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.muted};
`;

export default AppliedCampaignCard;
