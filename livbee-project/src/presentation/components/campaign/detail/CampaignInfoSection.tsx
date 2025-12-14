import React from 'react';
import { DetailContent, Separator } from '@/presentation/components/campaign/detail/styles/CampaignInfoSection.styles';
import { BrandIntroductionSection } from '@/presentation/components/campaign/detail/sections/BrandIntroductionSection';
import { CampaignIntroSection } from '@/presentation/components/campaign/detail/sections/CampaignIntroSection';
import { QualificationsSection } from '@/presentation/components/campaign/detail/sections/QualificationsSection';
import { ShootInfoSection } from '@/presentation/components/campaign/detail/sections/ShootInfoSection';
import { ProductInfoSection } from '@/presentation/components/campaign/detail/sections/ProductInfoSection';

interface CampaignInfoSectionProps {
  brandIntroduction?: string;
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
  brandIntroduction,
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
      {brandIntroduction && (
        <>
          <Separator />
          <BrandIntroductionSection brandIntroduction={brandIntroduction} />
        </>
      )}

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

