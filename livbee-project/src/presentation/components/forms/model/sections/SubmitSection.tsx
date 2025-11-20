import React from 'react';
import Button from '@/presentation/components/ui/Button';

interface SubmitSectionProps {
  disabled: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ disabled, onSubmit, isSubmitting }) => {
  return (
    <div style={{ marginTop: '32px' }}>
      <Button variant="primary" size="medium" fullWidth onClick={onSubmit} disabled={disabled}>
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>
    </div>
  );
};

