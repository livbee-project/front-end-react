import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection as BaseFormSection,
  SectionTitle,
  InputGroup,
  StyledInput,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { saveScrollPositionBeforeCrop } from '@/shared/utils/scrollPosition';

const FormSection = styled(BaseFormSection)`
  margin-bottom: 24px;
`;


const ImageUploadButton = styled.div<{ $hasImage: boolean; $aspectRatio?: string }>`
  width: 67.5%; /* 56.25% * 1.2 = 67.5% */
  aspect-ratio: ${({ $aspectRatio }) => ($aspectRatio === '1:2' ? '1 / 2' : '1')};
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
  background-color: ${({ theme }) => theme.colors.border};
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

interface CampaignProductInfoSectionProps {
  productName: string;
  productImageUrl?: string;
  liveCoverImageUrl?: string;
  onProductNameChange: (value: string) => void;
  onProductImageSelect: (file: File) => void;
  onLiveCoverImageSelect: (file: File) => void;
}

export const CampaignProductInfoSection: React.FC<CampaignProductInfoSectionProps> = ({
  productName,
  productImageUrl,
  liveCoverImageUrl,
  onProductNameChange,
  onProductImageSelect,
  onLiveCoverImageSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const liveCoverImageInputRef = useRef<HTMLInputElement>(null);

  const handleProductImageClick = () => {
    productImageInputRef.current?.click();
  };

  const handleProductImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 크롭 페이지로 이동
    saveScrollPositionBeforeCrop(location.pathname);
    const imageUrl = URL.createObjectURL(file);

    // 콜백을 전역 이벤트로 등록
    let callbackKey: string | undefined;
    if (onProductImageSelect) {
      callbackKey = `imageCrop_${Date.now()}_${Math.random()}`;
      if (!window.__imageCropCallbacks) {
        window.__imageCropCallbacks = {};
      }
      // 타입 맞추기 위해 래퍼 함수 사용
      window.__imageCropCallbacks[callbackKey] = (file: File) => {
        onProductImageSelect(file);
      };
    }

    navigate('/image/crop', {
      replace: true,
      state: {
        imageUrl,
        imageFileName: file.name,
        returnPath: location.pathname,
        callbackKey,
        aspectRatio: '1:1', // 상품 이미지는 1:1 비율
      },
    });

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    if (productImageInputRef.current) {
      productImageInputRef.current.value = '';
    }
  };

  const handleLiveCoverImageClick = () => {
    liveCoverImageInputRef.current?.click();
  };

  const handleLiveCoverImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 크롭 페이지로 이동
    saveScrollPositionBeforeCrop(location.pathname);
    const imageUrl = URL.createObjectURL(file);

    // 콜백을 전역 이벤트로 등록
    let callbackKey: string | undefined;
    if (onLiveCoverImageSelect) {
      callbackKey = `imageCrop_${Date.now()}_${Math.random()}`;
      if (!window.__imageCropCallbacks) {
        window.__imageCropCallbacks = {};
      }
      // 타입 맞추기 위해 래퍼 함수 사용
      window.__imageCropCallbacks[callbackKey] = (file: File) => {
        onLiveCoverImageSelect(file);
      };
    }

    navigate('/image/crop', {
      replace: true,
      state: {
        imageUrl,
        imageFileName: file.name,
        returnPath: location.pathname,
        callbackKey,
        aspectRatio: '1:2', // 라이브 커버 이미지는 1:2 비율
      },
    });

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    if (liveCoverImageInputRef.current) {
      liveCoverImageInputRef.current.value = '';
    }
  };

  return (
    <FormSection>
      <SectionTitle>상품 정보</SectionTitle>
      <InputGroup>
        <FormField label="상품명" required>
          <StyledInput
            value={productName}
            onChange={(e) => onProductNameChange(e.target.value)}
            placeholder="상품명을 입력해주세요"
          />
        </FormField>
        <FormField label="상품 이미지 (1:1 비율 권장)">
          <ImageUploadButton
            $hasImage={!!productImageUrl}
            $aspectRatio="1:1"
            onClick={handleProductImageClick}
          >
            {productImageUrl ? (
              <PreviewImage src={productImageUrl} alt="상품 이미지" />
            ) : (
              <>
                <IconContainer>
                  <ArrowUp size={24} color="#6B7280" />
                </IconContainer>
                <UploadText>이미지 업로드</UploadText>
                <RatioText>1:1 비율 권장</RatioText>
              </>
            )}
            <HiddenInput
              ref={productImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleProductImageFileChange}
            />
          </ImageUploadButton>
        </FormField>
        <FormField label="라이브 커버 이미지 (1:2 비율)">
          <ImageUploadButton
            $hasImage={!!liveCoverImageUrl}
            $aspectRatio="1:2"
            onClick={handleLiveCoverImageClick}
          >
            {liveCoverImageUrl ? (
              <PreviewImage src={liveCoverImageUrl} alt="라이브 커버 이미지" />
            ) : (
              <>
                <IconContainer>
                  <ArrowUp size={24} color="#6B7280" />
                </IconContainer>
                <UploadText>이미지 업로드</UploadText>
                <RatioText>1:2 비율</RatioText>
              </>
            )}
            <HiddenInput
              ref={liveCoverImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleLiveCoverImageFileChange}
            />
          </ImageUploadButton>
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

