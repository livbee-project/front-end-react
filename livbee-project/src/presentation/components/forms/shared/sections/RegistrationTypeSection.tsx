import React from 'react';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { StyledSelect } from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';

interface RegistrationTypeSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const RegistrationTypeSection: React.FC<RegistrationTypeSectionProps> = ({ value, onChange }) => {
  return (
    <FormSection title="등록 구분">
      <StyledSelect value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">등록 유형을 선택하세요</option>
        <option value="showhost">쇼호스트 - 라이브 커머스 진행</option>
        <option value="model">모델 - 촬영 및 홍보 활동</option>
      </StyledSelect>
    </FormSection>
  );
};

