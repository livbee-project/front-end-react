import React from 'react';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection as BaseFormSection,
  SectionTitle,
  InputGroup,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import styled from 'styled-components';
import { recruitmentTypeOptions, categoryOptions } from '../constants/campaignRegisterOptions';

const FormSection = styled(BaseFormSection)`
  margin-bottom: 24px;
`;

interface CampaignRecruitmentInfoSectionProps {
  recruitmentType: string;
  category: string;
  onRecruitmentTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  padding: 12px 20px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#F9FAFB'};
  color: ${({ $selected, theme }) => 
    $selected ? '#FFFFFF' : '#374151'};

  &:hover {
    background-color: ${({ $selected, theme }) => 
      $selected ? theme.colors.primary : '#F3F4F6'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CampaignRecruitmentInfoSection: React.FC<CampaignRecruitmentInfoSectionProps> = ({
  recruitmentType,
  category,
  onRecruitmentTypeChange,
  onCategoryChange,
}) => {
  return (
    <FormSection>
      <SectionTitle>모집 정보</SectionTitle>
      <InputGroup>
        <FormField label="모집구분" required>
          <ButtonGroup>
            {recruitmentTypeOptions.map((option) => (
              <OptionButton
                key={option.value}
                type="button"
                $selected={recruitmentType === option.value}
                onClick={() => onRecruitmentTypeChange(option.value)}
              >
                {option.label}
              </OptionButton>
            ))}
          </ButtonGroup>
        </FormField>
        <FormField label="카테고리" required>
          <ButtonGroup>
            {categoryOptions.map((option) => (
              <OptionButton
                key={option.value}
                type="button"
                $selected={category === option.value}
                onClick={() => onCategoryChange(option.value)}
              >
                {option.label}
              </OptionButton>
            ))}
          </ButtonGroup>
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

