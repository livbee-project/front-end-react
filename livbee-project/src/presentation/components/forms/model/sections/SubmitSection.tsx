import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

interface SubmitSectionProps {
  disabled: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ disabled, onSubmit, isSubmitting }) => {
  return (
    <Container>
      <Button variant="primary" size="medium" fullWidth onClick={onSubmit} disabled={disabled}>
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

