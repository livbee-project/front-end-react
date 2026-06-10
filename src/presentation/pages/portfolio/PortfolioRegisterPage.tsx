import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioRegisterForm } from '@/presentation/components/forms/portfolio/usePortfolioRegisterForm';
import { LoadingOverlay } from '@/presentation/components/states/LoadingOverlay';
import PortfolioRegisterFormView from '@/presentation/pages/portfolio/components/PortfolioRegisterFormView';
import {
  PortfolioBackLink,
  PortfolioCreateTop,
  PortfolioRegisterFormLayout,
  PortfolioRegisterMain,
  PortfolioRegisterPageRoot,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

const PortfolioRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    mainThumbnailUrl,
    galleryImageUrls,
    portfolioFile,
    resumeFile,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleProfileImageSelect,
    handleGalleryImageSelect,
    handlePortfolioFileAdd,
    handleSubmitForm,
    handleDraftSave,
  } = usePortfolioRegisterForm();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleGalleryImagesSelect = useCallback(
    (files: File[]) => {
      files.forEach((file) => handleGalleryImageSelect(file));
    },
    [handleGalleryImageSelect]
  );

  return (
    <PortfolioRegisterPageRoot>
      <PortfolioRegisterMain>
        <PortfolioCreateTop>
          <PortfolioBackLink to="/portfolios" aria-label="쇼호스트 목록으로 돌아가기">
            ‹
          </PortfolioBackLink>
          <span>쇼호스트</span>
          <h1>프로필 등록</h1>
          <p>브랜드가 제안할 때 확인하는 공개 프로필입니다. 필수 정보부터 먼저 입력해 주세요.</p>
        </PortfolioCreateTop>

        <form onSubmit={handleSubmitForm}>
          <PortfolioRegisterFormLayout>
            <PortfolioRegisterFormView
              formData={formData}
              mainThumbnailUrl={mainThumbnailUrl}
              galleryImageUrls={galleryImageUrls}
              portfolioFileName={portfolioFile?.name ?? null}
              portfolioFileSize={portfolioFile?.size ?? null}
              resumeFileName={resumeFile?.name ?? null}
              resumeFileSize={resumeFile?.size ?? null}
              isSubmitting={isSubmitting}
              isImageUploading={isImageUploading}
              onInputChange={handleInputChange}
              onProfileImageSelect={handleProfileImageSelect}
              onGalleryImagesSelect={handleGalleryImagesSelect}
              onPortfolioFileSelect={handlePortfolioFileAdd}
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

export default PortfolioRegisterPage;
