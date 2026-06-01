import React from 'react';
import styled, { keyframes } from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';

interface LoadingOverlayProps {
  message?: string;
}

/**
 * 전체 화면을 덮는 반투명 로딩 오버레이 컴포넌트
 * 등록 중 다른 UI 조작을 방지하기 위해 사용
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = '등록 중...',
}) => {
  return (
    <Overlay>
      <Content>
        <Spinner />
        <Message as={P}>{message}</Message>
      </Content>
    </Overlay>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: all;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.primaryOpacity['10']};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled(P)`
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;
