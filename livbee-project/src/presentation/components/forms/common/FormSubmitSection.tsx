import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

interface FormSubmitSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit?: () => void;
  submitType?: 'button' | 'submit';
  label?: string;
}

export const FormSubmitSection: React.FC<FormSubmitSectionProps> = ({
  disabled,
  isSubmitting,
  onSubmit,
  submitType = 'button',
  label = '등록하기',
}) => (
  <Container>
    <Button
      variant="primary"
      size="medium"
      fullWidth
      onClick={submitType === 'button' ? onSubmit : undefined}
      type={submitType}
      disabled={disabled}
    >
      {isSubmitting ? '등록 중...' : label}
    </Button>
  </Container>
);

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

