import React from 'react';

interface ErrorStateProps {
  message: string;
  padding?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * 에러 상태를 표시하는 컴포넌트
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  padding = '20px',
  onRetry,
  retryLabel = '다시 시도',
}) => {
  return (
    <div style={{ padding, textAlign: 'center' }}>
      <p style={{ color: 'var(--error, #FF0000)' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
};

