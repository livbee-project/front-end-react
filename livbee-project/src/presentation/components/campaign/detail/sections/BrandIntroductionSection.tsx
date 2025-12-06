import React from 'react';
import { Building2 } from 'lucide-react';
import { Section, SectionHeader, IconCircle, SectionTitle, SectionContent } from '@/presentation/components/campaign/detail/styles/CampaignInfoSection.styles';

interface BrandIntroductionSectionProps {
  brandIntroduction: string;
}

export const BrandIntroductionSection: React.FC<BrandIntroductionSectionProps> = ({ brandIntroduction }) => {
  if (!brandIntroduction) {
    return null;
  }

  return (
    <Section>
      <SectionHeader>
        <IconCircle>
          <Building2 size={20} strokeWidth={2.5} />
        </IconCircle>
        <SectionTitle>브랜드 소개</SectionTitle>
      </SectionHeader>
      <SectionContent>{brandIntroduction}</SectionContent>
    </Section>
  );
};

