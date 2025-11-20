import React, { useRef } from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';
import { FormSection, SectionTitle, SectionDescription, HiddenInput, SmallText } from '../PortfolioRegisterStyles';
import { PMuted, H2 } from '@/presentation/components/styled/Typography';

interface ProfileImageSectionProps {
  thumbnailUrl: string;
  onSelectImage: (file: File) => void;
}

const ProfileSectionWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const ProfileLabel = styled(PMuted)``;

const ProfileTitle = styled(H2)`
  font-weight: 600;
`;

const ProfileImageButton = styled.button<{ $hasImage: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme, $hasImage }) => ($hasImage ? theme.colors.secondary : '#ffffff')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ thumbnailUrl, onSelectImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectImage(file);
      event.target.value = '';
    }
  };

  return (
    <FormSection>
      <SectionTitle>프로필 사진</SectionTitle>
      <SectionDescription>활동 시 사용할 대표 이미지를 등록해주세요.</SectionDescription>
      <ProfileSectionWrapper>
        <ProfileInfo>
          <ProfileLabel>대표 프로필</ProfileLabel>
          <ProfileTitle>프로필 사진을 업로드하세요</ProfileTitle>
          <SmallText>최대 10MB, JPG/PNG 권장</SmallText>
        </ProfileInfo>
        <ProfileImageButton
          type="button"
          onClick={() => fileInputRef.current?.click()}
          $hasImage={Boolean(thumbnailUrl)}
          aria-label="프로필 이미지 업로드"
        >
          {thumbnailUrl ? (
            <>
              <ProfileImage src={thumbnailUrl} alt="프로필 미리보기" />
              <ProfileOverlay>변경하기</ProfileOverlay>
            </>
          ) : (
            <>
              <Upload size={40} />
              <span>이미지 업로드</span>
            </>
          )}
          <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
        </ProfileImageButton>
      </ProfileSectionWrapper>
    </FormSection>
  );
};

