import React from 'react';
import { Gift } from 'lucide-react';
import { Section, SectionHeader, IconCircle, SectionTitle, SectionContent } from '@/presentation/components/campaign/detail/styles/CampaignInfoSection.styles';

interface ProductInfoSectionProps {
  productInfo: string;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ productInfo }) => {
  return (
    <Section>
      <SectionHeader>
        <IconCircle>
          <Gift size={20} strokeWidth={2.5} />
        </IconCircle>
        <SectionTitle>상품 정보</SectionTitle>
      </SectionHeader>
      <SectionContent>{productInfo}</SectionContent>
    </Section>
  );
};

