import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { SNS_ENTRIES } from '@/presentation/components/forms/portfolio/constants';

interface SnsSectionProps {
  websites: string[];
  websiteToggles: boolean[];
  onInputChange: (value: string, index: number) => void;
  onToggleChange: (index: number) => void;
}

const SnsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SnsItem = styled.div<{ $disabled: boolean }>`
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SnsIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SnsInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const SnsLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
`;

const SnsInput = styled.input`
  background: transparent;
  border: none;
  padding: 0;
  font-size: 15px;
  color: #111111;
  width: 100%;
  font-family: inherit;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SnsSection: React.FC<SnsSectionProps> = ({ websites, websiteToggles, onInputChange, onToggleChange }) => {
  return (
    <FormSection>
      <SectionTitle>SNS/사이트</SectionTitle>
      <SectionDescription>공개하고 싶은 SNS만 선택하여 주소를 입력해주세요</SectionDescription>
      <SnsGroup>
        {SNS_ENTRIES.map((sns: typeof SNS_ENTRIES[number]) => (
          <SnsItem key={sns.id} $disabled={!websiteToggles[sns.id]}>
            <SnsIconWrapper>
              <sns.icon size={20} />
            </SnsIconWrapper>
            <SnsInputWrapper>
              <SnsLabel>{sns.label}</SnsLabel>
              <SnsInput
                value={websites[sns.id]}
                onChange={(event) => onInputChange(event.target.value, sns.id)}
                placeholder={sns.placeholder}
                disabled={!websiteToggles[sns.id]}
              />
            </SnsInputWrapper>
            <ToggleSwitch
              checked={websiteToggles[sns.id]}
              onChange={() => onToggleChange(sns.id)}
            />
          </SnsItem>
        ))}
      </SnsGroup>
    </FormSection>
  );
};

