import React from 'react';
import { ButtonGroup, SubmitButton } from '../PortfolioRegisterStyles';

interface SubmitSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ disabled, isSubmitting }) => {
  return (
    <ButtonGroup>
      <SubmitButton type="submit" disabled={disabled}>
        {isSubmitting ? '등록 중...' : '등록하기'}
      </SubmitButton>
    </ButtonGroup>
  );
};

