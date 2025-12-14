import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection as BaseFormSection,
  SectionTitle,
  InputGroup,
  StyledInput,
  StyledTextarea,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import styled from 'styled-components';
import { QualificationsSection } from '@/presentation/pages/campaign/sections/components/QualificationsSection';
import { ArrowUp } from 'lucide-react';
import { saveScrollPositionBeforeCrop } from '@/shared/utils/scrollPosition';

const FormSection = styled(BaseFormSection)`
  margin-bottom: 24px;
`;

const ImageUploadButton = styled.div<{ $hasImage: boolean; $aspectRatio?: string; $width?: string }>`
  width: ${({ $width }) => $width || '67.5%'};
  aspect-ratio: ${({ $aspectRatio }) => {
    if ($aspectRatio === '1:2') return '1 / 2';
    if ($aspectRatio === '2:1') return '2 / 1';
    return '1';
  }};
  margin: 12px auto 0;
  border: 2px dashed ${({ $hasImage }) => ($hasImage ? 'transparent' : '#D1D5DB')};
  border-radius: 16px;
  background-color: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#F9FAFB')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#9CA3AF')};
    background-color: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#F3F4F6')};
  }

  ${({ $hasImage }) =>
    $hasImage &&
    `
    border: none;
    padding: 0;
  `}
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const UploadText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #111111;
  margin: 0 0 4px 0;
`;

const RatioText = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface CampaignBasicInfoSectionProps {
  coverImageUrl?: string;
  brandName: string;
  brandIntroduction: string;
  title: string;
  content: string;
  qualifications: string[];
  onCoverImageSelect: (file: File) => void;
  onBrandNameChange: (value: string) => void;
  onBrandIntroductionChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onAddQualification: () => void;
  onRemoveQualification: (index: number) => void;
  onQualificationChange: (index: number, value: string) => void;
}

export const CampaignBasicInfoSection: React.FC<CampaignBasicInfoSectionProps> = ({
  coverImageUrl,
  brandName,
  brandIntroduction,
  title,
  content,
  qualifications,
  onCoverImageSelect,
  onBrandNameChange,
  onBrandIntroductionChange,
  onTitleChange,
  onContentChange,
  onAddQualification,
  onRemoveQualification,
  onQualificationChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageClick = () => {
    coverImageInputRef.current?.click();
  };

  const handleCoverImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 크롭 페이지로 이동
    saveScrollPositionBeforeCrop(location.pathname);
    const imageUrl = URL.createObjectURL(file);

    // 콜백을 전역 이벤트로 등록
    let callbackKey: string | undefined;
    if (onCoverImageSelect) {
      callbackKey = `imageCrop_${Date.now()}_${Math.random()}`;
      if (!window.__imageCropCallbacks) {
        window.__imageCropCallbacks = {};
      }
      // 타입 맞추기 위해 래퍼 함수 사용
      window.__imageCropCallbacks[callbackKey] = (file: File) => {
        onCoverImageSelect(file);
      };
    }

    navigate('/image/crop', {
      replace: true,
      state: {
        imageUrl,
        imageFileName: file.name,
        returnPath: location.pathname,
        callbackKey,
        aspectRatio: '2:1', // 대표 이미지는 2:1 비율
      },
    });

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };

  return (
    <FormSection>
      <SectionTitle>기본 정보</SectionTitle>
      <InputGroup>
        <FormField label="대표이미지 (2:1 비율)" required>
          <ImageUploadButton
            $hasImage={!!coverImageUrl}
            $aspectRatio="2:1"
            $width="95%"
            onClick={handleCoverImageClick}
          >
            {coverImageUrl ? (
              <PreviewImage src={coverImageUrl} alt="대표 이미지" />
            ) : (
              <>
                <IconContainer>
                  <ArrowUp size={24} color="#6B7280" />
                </IconContainer>
                <UploadText>이미지 업로드</UploadText>
                <RatioText>2:1 비율</RatioText>
              </>
            )}
            <HiddenInput
              ref={coverImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverImageFileChange}
            />
          </ImageUploadButton>
        </FormField>
        <FormField label="브랜드명" required>
          <StyledInput
            value={brandName}
            onChange={(e) => onBrandNameChange(e.target.value)}
            placeholder="브랜드명을 입력해주세요"
          />
        </FormField>
        <FormField label="브랜드 소개">
          <StyledTextarea
            value={brandIntroduction}
            onChange={(e) => onBrandIntroductionChange(e.target.value)}
            placeholder="브랜드에 대해 간단히 소개해주세요"
            rows={4}
          />
        </FormField>
        <FormField label="제목" required>
          <StyledInput
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="캠페인 제목을 입력해주세요"
          />
        </FormField>
        <FormField label="내용" required>
          <StyledTextarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="캠페인 상세 내용을 입력해주세요"
            rows={3}
          />
        </FormField>
        <FormField label="자격요건">
          <QualificationsSection
            qualifications={Array.isArray(qualifications) ? qualifications : ['']}
            onAdd={onAddQualification}
            onRemove={onRemoveQualification}
            onChange={onQualificationChange}
          />
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

