import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Plus, X } from 'lucide-react';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  HiddenInput,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { saveScrollPositionBeforeCrop } from '@/shared/utils/scrollPosition';

/**
 * 전역 타입 확장
 * ImageUpload.tsx와 타입 일치를 위해 type 파라미터를 optional로 선언
 */
declare global {
  interface Window {
    __imageCropCallbacks?: {
      [key: string]: (file: File, type?: 'cover' | 'product' | 'liveCover') => void;
    };
  }
}

interface GallerySectionProps {
  images: string[];
  onSelectImage: (file: File) => void;
  onReplaceImage?: (index: number, file: File) => void;
  onRemoveImage: (index: number) => void;
}

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const GalleryItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #F3F4F6;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid #F3F4F6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const AddImageButton = styled.button`
  aspect-ratio: 1;
  background-color: #F9FAFB;
  border: 2px dashed #D1D5DB;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}05;
  }

  svg {
    width: 32px;
    height: 32px;
    color: #9CA3AF;
    margin-bottom: 8px;
  }

  p {
    font-size: 12px;
    color: #6B7280;
    font-weight: 500;
    margin: 0;
  }
`;

export const GallerySection: React.FC<GallerySectionProps> = ({ images, onSelectImage, onReplaceImage, onRemoveImage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, replaceIndex?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 현재 스크롤 위치 저장 (크롭 페이지에서 돌아올 때 복원하기 위해)
    saveScrollPositionBeforeCrop(location.pathname);

    // 파일을 Blob URL로 변환하여 전달
    const imageUrl = URL.createObjectURL(file);
    
    // 교체인지 추가인지에 따라 콜백 결정
    const callback = replaceIndex !== undefined && onReplaceImage
      ? (file: File) => onReplaceImage(replaceIndex, file)
      : onSelectImage;
    
    // 콜백을 전역 이벤트로 등록
    const callbackKey = `galleryImageCrop_${Date.now()}_${Math.random()}`;
    if (!window.__imageCropCallbacks) {
      window.__imageCropCallbacks = {};
    }
    window.__imageCropCallbacks[callbackKey] = callback;
    
    // 크롭 페이지로 이동
    navigate('/image/crop', {
      replace: true,
      state: {
        imageUrl,
        imageFileName: file.name,
        returnPath: location.pathname,
        callbackKey,
      },
    });

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    event.target.value = '';
  };

  const handleImageClick = (index: number) => {
    // 이미지 클릭 시 파일 선택 다이얼로그 열기 (교체)
    if (onReplaceImage) {
      // 해당 인덱스의 input이 없으면 생성
      if (!replaceInputRefs.current[index]) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        input.onchange = (e) => {
          // HTMLInputElement의 onchange 이벤트를 React.ChangeEvent로 변환
          if (e && e.target && 'files' in e.target) {
            const reactEvent = {
              target: e.target,
              currentTarget: e.currentTarget || e.target,
            } as React.ChangeEvent<HTMLInputElement>;
            handleFileChange(reactEvent, index);
          }
        };
        document.body.appendChild(input);
        replaceInputRefs.current[index] = input;
      }
      replaceInputRefs.current[index]?.click();
    }
  };

  const handleRemoveClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // 이미지 클릭 이벤트 방지
    onRemoveImage(index);
  };

  return (
    <FormSection>
      <SectionTitle>갤러리</SectionTitle>
      <SectionDescription>최대 9장까지 업로드할 수 있습니다</SectionDescription>
      <GalleryGrid>
        {images.map((url, index) => (
          <GalleryItem key={`${url}-${index}`} onClick={() => handleImageClick(index)}>
            <GalleryImage src={url} alt={`갤러리 ${index + 1}`} />
            <DeleteButton
              type="button"
              onClick={(e) => handleRemoveClick(e, index)}
              aria-label="이미지 삭제"
            >
              <X size={16} />
            </DeleteButton>
          </GalleryItem>
        ))}
        {images.length < 9 && (
          <AddImageButton type="button" onClick={() => fileInputRef.current?.click()}>
            <Plus size={32} />
            <p>추가</p>
            <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
          </AddImageButton>
        )}
      </GalleryGrid>
    </FormSection>
  );
};

