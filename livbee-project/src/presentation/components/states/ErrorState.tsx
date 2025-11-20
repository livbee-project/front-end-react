import React from 'react';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';
import { PrimaryButton } from '@/presentation/components/styled/CommonStyles';

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
    <Container $padding={padding}>
      <ErrorMessage as={P}>{message}</ErrorMessage>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          {retryLabel}
        </RetryButton>
      )}
    </Container>
  );
};

const Container = styled.div<{ $padding: string }>`
  padding: ${({ $padding }) => $padding};
  text-align: center;
`;

const ErrorMessage = styled(P)`
  color: ${({ theme }) => theme.colors.error};
`;

const RetryButton = styled(PrimaryButton)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

