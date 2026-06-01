import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

interface GlobalErrorFallbackProps {
  message?: string;
  onReset: () => void;
}

export const GlobalErrorFallback: React.FC<GlobalErrorFallbackProps> = ({ message, onReset }) => {
  return (
    <Wrapper>
      <Content>
        <Title>문제가 발생했습니다</Title>
        <Description>{message || '잠시 후 다시 시도해주세요.'}</Description>
        <Button variant="primary" onClick={onReset}>
          홈으로 이동
        </Button>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primaryOpacity['05']};
  padding: ${({ theme }) => theme.spacing['3xl']};
`;

const Content = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  text-align: center;
  max-width: 420px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Description = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

