import React from 'react';
import { DetailContent, Separator } from './styles/CampaignInfoSection.styles';
import { CampaignIntroSection } from './sections/CampaignIntroSection';
import { QualificationsSection } from './sections/QualificationsSection';
import { ShootInfoSection } from './sections/ShootInfoSection';
import { ProductInfoSection } from './sections/ProductInfoSection';

interface CampaignInfoSectionProps {
  campaignIntro: string;
  qualifications: string[];
  location: string;
  shootDate: string;
  shootTime: string;
  deadline: string;
  fee: string;
  productInfo: string;
}

export const CampaignInfoSection: React.FC<CampaignInfoSectionProps> = ({
  campaignIntro,
  qualifications,
  location,
  shootDate,
  shootTime,
  deadline,
  fee,
  productInfo,
}) => {
  return (
    <DetailContent>
      <Separator />
      <CampaignIntroSection campaignIntro={campaignIntro} />

      <Separator />
      <QualificationsSection qualifications={qualifications} />

      <Separator />
      <ShootInfoSection location={location} shootDate={shootDate} shootTime={shootTime} deadline={deadline} fee={fee} />

      <Separator />
      <ProductInfoSection productInfo={productInfo} />
    </DetailContent>
  );
};

