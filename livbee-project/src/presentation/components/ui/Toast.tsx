import React, { useEffect, useState } from 'react';
import { RiInformationLine, RiErrorWarningLine } from 'react-icons/ri';
import { FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, BORDER_RADIUS, SPACING, GAP } from '@/presentation/styles/constants';

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

  /**
   * 토스트 컨테이너 스타일
   * 그림자 효과를 포함합니다.
   * 위치는 ToastContext에서 제어됩니다.
   * 애니메이션 상태에 따라 transform과 opacity가 변경됩니다.
   * variant에 따라 배경색이 변경됩니다.
   */
  const getToastStyle = (): React.CSSProperties => {
    const backgroundColor = variant === 'error' ? '#E53E3E' : '#FF6B35'; // error: 빨간색, info: 오렌지색
    
    const baseStyle: React.CSSProperties = {
      backgroundColor,
      borderRadius: BORDER_RADIUS.XL,
      padding: `${SPACING.MD} ${SPACING.XXL}`,
      display: 'flex',
      alignItems: 'center',
      gap: GAP.MD,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '200px',
      maxWidth: 'calc(100vw - 32px)', // 화면 양쪽에 16px씩 여백
      width: 'fit-content',
      transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
    };

    switch (animationState) {
      case 'entering':
        return {
          ...baseStyle,
          transform: 'translateY(100%)',
          opacity: 0,
        };
      case 'visible':
        return {
          ...baseStyle,
          transform: 'translateY(0)',
          opacity: 1,
        };
      case 'exiting':
        return {
          ...baseStyle,
          transform: 'translateY(100%)',
          opacity: 0,
        };
      default:
        return baseStyle;
    }
  };

  /**
   * 정보 아이콘 스타일
   */
  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    color: TEXT_COLOR.WHITE,
  };

  /**
   * 메시지 텍스트 스타일
   */
  const messageStyle: React.CSSProperties = {
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.NORMAL,
    color: TEXT_COLOR.WHITE,
    lineHeight: 1.5,
    whiteSpace: 'pre-line', // \n을 줄바꿈으로 처리
  };

  return (
    <div style={getToastStyle()}>
      {variant === 'error' ? (
        <RiErrorWarningLine size={20} style={iconStyle} />
      ) : (
        <RiInformationLine size={20} style={iconStyle} />
      )}
      <span style={messageStyle}>{message}</span>
    </div>
  );
};

export default Toast;

