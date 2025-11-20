import React from 'react';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';

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
    <Container $padding={padding}>
      <Message as={P}>{message}</Message>
    </Container>
  );
};

const Container = styled.div<{ $padding: string }>`
  padding: ${({ $padding }) => $padding};
  text-align: center;
`;

const Message = styled(P)`
  color: ${({ theme }) => theme.colors.muted};
`;

