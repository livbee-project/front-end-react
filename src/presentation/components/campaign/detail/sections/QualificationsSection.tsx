import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Section,
  SectionHeader,
  IconCircle,
  SectionTitle,
  BulletList,
  BulletItem,
  BulletDot,
} from '@/presentation/components/campaign/detail/styles/CampaignInfoSection.styles';

interface QualificationsSectionProps {
  qualifications: string[];
}

export const QualificationsSection: React.FC<QualificationsSectionProps> = ({ qualifications }) => {
  return (
    <Section>
      <SectionHeader>
        <IconCircle>
          <CheckCircle2 size={20} strokeWidth={2.5} />
        </IconCircle>
        <SectionTitle>자격요건</SectionTitle>
      </SectionHeader>
      <BulletList>
        {qualifications.map((qualification, index) => (
          <BulletItem key={index}>
            <BulletDot />
            <span>{qualification}</span>
          </BulletItem>
        ))}
      </BulletList>
    </Section>
  );
};

