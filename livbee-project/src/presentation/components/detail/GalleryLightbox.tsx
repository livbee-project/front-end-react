import React from 'react';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  showControls?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  z-index: 999;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.card};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $position }) => ($position === 'left' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.card};
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  image,
  isOpen,
  onClose,
  onPrev,
  onNext,
  showControls = false,
}) => {
  if (!isOpen || !image) {
    return null;
  }

  return (
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <LightboxContent onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="닫기">
          <X size={20} />
        </CloseButton>
        {showControls && onPrev && (
          <NavButton type="button" onClick={onPrev} $position="left" aria-label="이전 이미지">
            <ChevronLeft size={24} />
          </NavButton>
        )}
        <LightboxImage src={image} alt="선택한 갤러리 이미지" />
        {showControls && onNext && (
          <NavButton type="button" onClick={onNext} $position="right" aria-label="다음 이미지">
            <ChevronRight size={24} />
          </NavButton>
        )}
      </LightboxContent>
    </Overlay>
  );
};

export default GalleryLightbox;

