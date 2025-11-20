import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiInformationLine, RiErrorWarningLine } from 'react-icons/ri';
import { P } from '@/presentation/components/styled/Typography';

/**
 * Toast 타입 (variant)
 */
export type ToastVariant = 'info' | 'error';

/**
 * Toast 컴포넌트가 받을 props 타입을 정의합니다.
 * @param message - 표시할 메시지
 * @param duration - 표시 시간 (밀리초, 기본값: 2000)
 * @param variant - 토스트 타입 ('info' 또는 'error', 기본값: 'info')
 * @param onClose - 토스트가 닫힐 때 호출되는 함수
 */
interface ToastProps {
  message: string;
  duration?: number;
  variant?: ToastVariant;
  onClose: () => void;
}

/**
 * 토스트 애니메이션 상태
 */
type ToastAnimationState = 'entering' | 'visible' | 'exiting';

/**
 * 토스트 메시지 컴포넌트입니다.
 * variant에 따라 색상이 변경됩니다.
 * - info: 오렌지색 배경 (기본값)
 * - error: 빨간색 배경
 * 아래에서 위로 올라오는 애니메이션과 위에서 아래로 내려가는 애니메이션을 포함합니다.
 */
const Toast: React.FC<ToastProps> = ({ message, duration = 2000, variant = 'info', onClose }) => {
  const [animationState, setAnimationState] = useState<ToastAnimationState>('entering');

  /**
   * 애니메이션 및 자동 닫기 효과
   */
  useEffect(() => {
    // 1. 등장 애니메이션 (300ms)
    const enterTimer = setTimeout(() => {
      setAnimationState('visible');
    }, 10); // 약간의 지연으로 애니메이션 트리거

    // 2. 표시 시간 (duration)
    const visibleTimer = setTimeout(() => {
      setAnimationState('exiting');
    }, 10 + 300 + duration); // enter 애니메이션 시간 + 표시 시간

    // 3. 퇴장 애니메이션 후 닫기 (300ms)
    const exitTimer = setTimeout(() => {
      onClose();
    }, 10 + 300 + duration + 300); // enter + visible + exit 애니메이션 시간

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(visibleTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  return (
    <ToastContainer $variant={variant} $animationState={animationState}>
      {variant === 'error' ? (
        <IconWrapper>
          <RiErrorWarningLine size={20} />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <RiInformationLine size={20} />
        </IconWrapper>
      )}
      <MessageText>{message}</MessageText>
    </ToastContainer>
  );
};

const ToastContainer = styled.div<{
  $variant: ToastVariant;
  $animationState: ToastAnimationState;
}>`
  background-color: ${({ $variant }) => ($variant === 'error' ? '#E53E3E' : '#FF6B35')};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  max-width: calc(100vw - 32px);
  width: fit-content;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform: ${({ $animationState }) =>
    $animationState === 'visible' ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${({ $animationState }) => ($animationState === 'visible' ? 1 : 0)};
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
`;

const MessageText = styled(P)`
  color: ${({ theme }) => theme.colors.primaryForeground};
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
`;

export default Toast;

