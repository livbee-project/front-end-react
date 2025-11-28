import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import FormField from '@/presentation/components/forms/common/FormField';
import { StyledInput } from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
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

const StyledFormField = styled(FormField)`
  flex: 1;
`;

export const SnsSection: React.FC<SnsSectionProps> = ({ websites, websiteToggles, onInputChange, onToggleChange }) => {
  return (
    <FormSection title="SNS / 사이트" description="활동 채널을 등록하면 검색 노출이 향상돼요.">
      <SnsGroup>
        {SNS_ENTRIES.map((sns: typeof SNS_ENTRIES[number]) => (
          <SnsItem key={sns.id}>
            <SnsIconWrapper>
              <sns.icon size={20} />
            </SnsIconWrapper>
            <StyledFormField
              label={sns.label}
              action={<ToggleSwitch checked={websiteToggles[sns.id]} onChange={() => onToggleChange(sns.id)} />}
            >
              <StyledInput
                as="input"
                value={websites[sns.id]}
                onChange={(event) => onInputChange(event.target.value, sns.id)}
                placeholder={sns.placeholder}
                disabled={!websiteToggles[sns.id]}
              />
            </StyledFormField>
          </SnsItem>
        ))}
      </SnsGroup>
    </FormSection>
  );
};

