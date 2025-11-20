import React from 'react';
import styled from 'styled-components';
import { PMuted } from '@/presentation/components/styled/Typography';

interface FormFieldProps {
  label?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
  helper?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  description,
  helper,
  action,
  children,
}) => {
  return (
    <FieldWrapper>
      {(label || action) && (
        <LabelRow>
          {label && (
            <FieldLabel>
              {label}
              {required && <RequiredBadge>*</RequiredBadge>}
            </FieldLabel>
          )}
          {action}
        </LabelRow>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldBody>{children}</FieldBody>
      {helper && <FieldHelper>{helper}</FieldHelper>}
    </FieldWrapper>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FieldLabel = styled(PMuted)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const RequiredBadge = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const FieldDescription = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

const FieldBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FieldHelper = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.85rem;
`;

export default FormField;

