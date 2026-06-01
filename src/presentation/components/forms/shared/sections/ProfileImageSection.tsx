import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Camera, User } from 'lucide-react';
import {
  FormSection,
  SectionTitle,
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

interface ProfileImageSectionProps {
  thumbnailUrl: string;
  onSelectImage: (file: File) => void;
}

const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  cursor: pointer;
`;

const AvatarImage = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #F3F4F6;
  border: 2px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  transition: all 0.2s;
  overflow: hidden;

  ${({ $hasImage }) =>
    $hasImage &&
    `
    border-color: transparent;
  `}

  ${AvatarWrapper}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const ProfileLabel = styled.p`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 0;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ thumbnailUrl, onSelectImage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 현재 스크롤 위치 저장 (크롭 페이지에서 돌아올 때 복원하기 위해)
    saveScrollPositionBeforeCrop(location.pathname);

    // 파일을 Blob URL로 변환하여 전달
    const imageUrl = URL.createObjectURL(file);
    
    // 콜백을 전역 이벤트로 등록
    const callbackKey = `profileImageCrop_${Date.now()}_${Math.random()}`;
    if (!window.__imageCropCallbacks) {
      window.__imageCropCallbacks = {};
    }
    window.__imageCropCallbacks[callbackKey] = onSelectImage;
    
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

  return (
    <FormSection>
      <SectionTitle>프로필 사진</SectionTitle>
      <SectionContent>
        <AvatarWrapper onClick={() => fileInputRef.current?.click()}>
          <AvatarImage $hasImage={Boolean(thumbnailUrl)}>
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="프로필 미리보기" />
            ) : (
              <User size={48} />
            )}
          </AvatarImage>
          <CameraIconWrapper>
            <Camera size={18} />
          </CameraIconWrapper>
          <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
        </AvatarWrapper>
        <ProfileLabel>프로필에 적합한 사진을 업로드해주세요</ProfileLabel>
      </SectionContent>
    </FormSection>
  );
};

