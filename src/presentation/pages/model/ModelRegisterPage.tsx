import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModelRegisterForm } from '@/presentation/components/forms/model/useModelRegisterForm';
import { LoadingOverlay } from '@/presentation/components/states/LoadingOverlay';
import ModelRegisterFormView from '@/presentation/pages/model/components/ModelRegisterFormView';
import {
  PortfolioBackLink,
  PortfolioCreateTop,
  PortfolioRegisterFormLayout,
  PortfolioRegisterMain,
  PortfolioRegisterPageRoot,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

const ModelRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    mainThumbnailUrl,
    galleryImageUrls,
    portfolioFile,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleProfileImageSelect,
    handleGalleryImageSelect,
    handlePortfolioFileSelect,
    handleSubmitForm,
    handleDraftSave,
  } = useModelRegisterForm();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleGalleryImagesSelect = useCallback(
    (files: File[]) => {
      files.forEach((file) => handleGalleryImageSelect(file));
    },
    [handleGalleryImageSelect]
  );

  const handleSimpleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      handleInputChange(field, value);
    },
    [handleInputChange]
  );

  return (
    <PortfolioRegisterPageRoot>
      <PortfolioRegisterMain>
        <PortfolioCreateTop>
          <PortfolioBackLink to="/models" aria-label="모델 목록으로 돌아가기">
            ‹
          </PortfolioBackLink>
          <span>모델</span>
          <h1>프로필 등록</h1>
          <p>브랜드가 촬영 제안을 보낼 때 확인하는 공개 프로필입니다. 이미지와 소개를 정확히 입력해 주세요.</p>
        </PortfolioCreateTop>

        <form onSubmit={handleSubmitForm}>
          <PortfolioRegisterFormLayout>
            <ModelRegisterFormView
              formData={formData}
              mainThumbnailUrl={mainThumbnailUrl}
              galleryImageUrls={galleryImageUrls}
              portfolioFileName={portfolioFile?.name ?? null}
              portfolioFileSize={portfolioFile?.size ?? null}
              isSubmitting={isSubmitting}
              isImageUploading={isImageUploading}
              onInputChange={handleSimpleInputChange}
              onProfileImageSelect={handleProfileImageSelect}
              onGalleryImagesSelect={handleGalleryImagesSelect}
              onPortfolioFileSelect={handlePortfolioFileSelect}
              onDraftSave={handleDraftSave}
              onCancel={handleCancel}
            />
          </PortfolioRegisterFormLayout>
        </form>
      </PortfolioRegisterMain>

      {isSubmitting ? <LoadingOverlay message="등록 중..." /> : null}
    </PortfolioRegisterPageRoot>
  );
};

export default ModelRegisterPage;
