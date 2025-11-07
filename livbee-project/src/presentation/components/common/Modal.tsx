import React, { useEffect } from 'react';

/**
 * Modal 컴포넌트가 받을 props 타입을 정의합니다.
 * @param isOpen - 모달 열림/닫힘 상태
 * @param onClose - 모달 닫기 함수
 * @param children - 모달 내부에 렌더링될 컨텐츠
 * @param maxWidth - 모달 최대 너비 (기본값: '400px')
 * @param width - 모달 너비 (기본값: '90%')
 * @param padding - 모달 패딩 (기본값: '24px')
 * @param closeOnOverlayClick - 오버레이 클릭 시 닫기 여부 (기본값: true)
 * @param closeOnEscape - ESC 키로 닫기 여부 (기본값: true)
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  width?: string;
  padding?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

/**
 * 공통 모달 베이스 컴포넌트입니다.
 * 오버레이, 컨테이너, 닫기 기능을 제공합니다.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = '400px',
  width = '90%',
  padding = '24px',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  /**
   * 모달이 열려있지 않으면 렌더링하지 않음
   */
  if (!isOpen) return null;

  /**
   * 오버레이 스타일 (배경)
   */
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  /**
   * 모달 컨테이너 스타일
   */
  const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--white)',
    borderRadius: '16px',
    padding,
    maxWidth,
    width,
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  };

  /**
   * 오버레이 클릭 핸들러
   */
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  /**
   * 모달 컨테이너 클릭 핸들러 (이벤트 전파 방지)
   */
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

