import React from 'react';

interface LoadingStateProps {
  message?: string;
  padding?: string;
}

/**
 * 로딩 상태를 표시하는 컴포넌트
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = '로딩 중...',
  padding = '20px',
}) => {
  return (
    <div style={{ padding, textAlign: 'center' }}>
      <p>{message}</p>
    </div>
  );
};

