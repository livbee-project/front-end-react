/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import type { ReactNode } from 'react';
import Toast from '@/presentation/components/ui/Toast';
import type { ToastVariant } from '@/presentation/components/ui/Toast';

/**
 * Toast 메시지 정보 타입
 */
interface ToastMessage {
  id: string;
  message: string;
  duration?: number;
  variant?: ToastVariant;
}

/**
 * ToastContext의 타입 정의
 */
interface ToastContextType {
  showToast: (message: string, duration?: number, variant?: ToastVariant) => void;
}

/**
 * ToastContext 생성
 */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * ToastProvider 컴포넌트의 props 타입
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * ToastProvider 컴포넌트
 * 전역에서 토스트 메시지를 관리하고 표시합니다.
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  /**
   * 토스트 메시지를 표시하는 함수
   * @param message - 표시할 메시지
   * @param duration - 표시 시간 (밀리초)
   * @param variant - 토스트 타입 ('info' 또는 'error', 기본값: 'info')
   */
  const showToast = useCallback((message: string, duration?: number, variant: ToastVariant = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, duration, variant }]);
  }, []);

  /**
   * 토스트를 제거하는 함수
   */
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* 토스트 메시지들을 렌더링 */}
      <ToastContainer>
        {toasts.map((toast, index) => (
          <ToastWrapper key={toast.id} $bottom={80 + index * 80}>
            <Toast
              message={toast.message}
              duration={toast.duration}
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
            />
          </ToastWrapper>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
`;

const ToastWrapper = styled.div<{ $bottom: number }>`
  position: absolute;
  bottom: ${({ $bottom }) => $bottom}px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
`;

/**
 * useToast 훅
 * ToastContext를 사용하기 위한 커스텀 훅
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

