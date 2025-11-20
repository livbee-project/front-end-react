import React from 'react';
import styled from 'styled-components';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import { PMuted } from '@/presentation/components/styled/Typography';
import type { FormSectionProps } from '@/types/forms';

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <SectionWrapper>
      {title && (
        <SectionTitle variant="default" marginBottom="12px">
          {title}
        </SectionTitle>
      )}
      {description && <SectionDescription>{description}</SectionDescription>}
      {children}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionDescription = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

export default FormSection;

