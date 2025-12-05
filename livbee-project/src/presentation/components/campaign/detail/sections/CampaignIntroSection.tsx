import React from 'react';
import { Sparkles } from 'lucide-react';
import { Section, SectionHeader, IconCircle, SectionTitle, SectionContent } from '../styles/CampaignInfoSection.styles';

interface CampaignIntroSectionProps {
  campaignIntro: string;
}

export const CampaignIntroSection: React.FC<CampaignIntroSectionProps> = ({ campaignIntro }) => {
  return (
    <Section>
      <SectionHeader>
        <IconCircle>
          <Sparkles size={20} strokeWidth={2.5} />
        </IconCircle>
        <SectionTitle>캠페인 소개</SectionTitle>
      </SectionHeader>
      <SectionContent>{campaignIntro}</SectionContent>
    </Section>
  );
};

