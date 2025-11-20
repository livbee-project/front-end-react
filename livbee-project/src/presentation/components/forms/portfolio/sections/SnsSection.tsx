import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import { FormSection, SectionTitle, SectionDescription, StyledInput } from '../PortfolioRegisterStyles';
import { SNS_ENTRIES } from '../constants';
import { H2 } from '@/presentation/components/styled/Typography';

interface SnsSectionProps {
  websites: string[];
  websiteToggles: boolean[];
  onInputChange: (value: string, index: number) => void;
  onToggleChange: (index: number) => void;
}

const SnsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SnsItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SnsIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SnsInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SnsLabel = styled(H2)`
  font-weight: 500;
`;

export const SnsSection: React.FC<SnsSectionProps> = ({ websites, websiteToggles, onInputChange, onToggleChange }) => {
  return (
    <FormSection>
      <SectionTitle>SNS / 사이트</SectionTitle>
      <SectionDescription>활동 채널을 등록하면 검색 노출이 향상돼요.</SectionDescription>
      <SnsGroup>
        {SNS_ENTRIES.map((sns) => (
          <SnsItem key={sns.id}>
            <SnsIconWrapper>
              <sns.icon size={20} />
            </SnsIconWrapper>
            <SnsInputWrapper>
              <SnsLabel>{sns.label}</SnsLabel>
              <StyledInput
                as="input"
                value={websites[sns.id]}
                onChange={(event) => onInputChange(event.target.value, sns.id)}
                placeholder={sns.placeholder}
                disabled={!websiteToggles[sns.id]}
              />
            </SnsInputWrapper>
            <ToggleSwitch checked={websiteToggles[sns.id]} onChange={() => onToggleChange(sns.id)} />
          </SnsItem>
        ))}
      </SnsGroup>
    </FormSection>
  );
};

