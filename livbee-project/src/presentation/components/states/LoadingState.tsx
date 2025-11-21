import React from 'react';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';
import type { StateComponentProps } from '@/types/components';

/**
 * 로딩 상태를 표시하는 컴포넌트
 */
export const LoadingState: React.FC<StateComponentProps> = ({
  message = '로딩 중...',
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
  color: ${({ theme }) => theme.colors.foreground};
`;

