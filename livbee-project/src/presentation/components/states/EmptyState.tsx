import React from 'react';

interface EmptyStateProps {
  message?: string;
  padding?: string;
}

/**
 * 빈 상태를 표시하는 컴포넌트
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = '등록된 항목이 없습니다.',
  padding = '20px',
}) => {
  return (
    <div style={{ padding, textAlign: 'center' }}>
      <p>{message}</p>
    </div>
  );
};

