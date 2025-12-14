import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import type { AppliedCampaign } from '@/domain/entities/AppliedCampaign';
import { getStatusLabel } from '@/presentation/pages/mypage/utils/appliedCampaignUtils';
import {
  ApplicationDate,
  CampaignCard,
  CampaignInfo,
  CampaignTitle,
  CardFooter,
  CardHeader,
  CategoryTag,
  CompanyName,
  Compensation,
  InfoItem,
  Requirement,
  StatusBadge,
  StatusBadges,
} from '@/presentation/pages/mypage/styled/MyAppliedCampaignsStyles';

interface AppliedCampaignCardProps {
  campaign: AppliedCampaign;
  onClick: (campaignId: string) => void;
}

const AppliedCampaignCard: React.FC<AppliedCampaignCardProps> = ({ campaign, onClick }) => {
  return (
    <CampaignCard onClick={() => onClick(campaign.id)}>
      <CardHeader>
        <CompanyName>{campaign.companyName}</CompanyName>
        <StatusBadges>
          {campaign.statuses.map((status) => (
            <StatusBadge key={`${campaign.id}-${status}`} $variant={status}>
              {getStatusLabel(status)}
            </StatusBadge>
          ))}
        </StatusBadges>
      </CardHeader>
      <CampaignTitle>{campaign.campaignTitle}</CampaignTitle>
      <CampaignInfo>
        <CategoryTag>{campaign.category}</CategoryTag>
        <InfoItem>
          <Calendar size={16} />
          <span>{campaign.date}</span>
        </InfoItem>
        <InfoItem>
          <MapPin size={16} />
          <span>{campaign.location}</span>
        </InfoItem>
      </CampaignInfo>
      <Requirement>{campaign.requirement}</Requirement>
      <CardFooter>
        <Compensation>
          <DollarSign size={16} />
          <span>{campaign.compensation}</span>
        </Compensation>
        <ApplicationDate>지원일: {campaign.applicationDate}</ApplicationDate>
      </CardFooter>
    </CampaignCard>
  );
};

export default AppliedCampaignCard;

