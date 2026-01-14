import React from 'react';
import {
  PageWrapper,
  FormContainer,
  RegisterForm,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { RegisterPageHeader } from '@/presentation/components/forms/common/RegisterPageHeader';
import {
  ProfileImageSection,
  BasicInfoSection,
  ContactSection,
  SnsSection,
  PortfolioFilesSection,
  TagsSection,
  GallerySection,
} from '@/presentation/components/forms/portfolio/sections';
import { usePortfolioRegisterForm } from '@/presentation/components/forms/portfolio/usePortfolioRegisterForm';
import { useNavigate } from 'react-router-dom';
import { LoadingOverlay } from '@/presentation/components/states/LoadingOverlay';

const PortfolioRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    toggles,
    mainThumbnailUrl,
    galleryImageUrls,
    resumeFileUrl,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect,
    handleGalleryImageSelect,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    handlePortfolioFileAdd,
    handleResumeFileRemove,
    handlePortfolioFileRemove,
    handleFileError,
    handleSubmitForm,
  } = usePortfolioRegisterForm();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageWrapper>
      <RegisterPageHeader title="등록하기" />
      <FormContainer>
        <RegisterForm onSubmit={handleSubmitForm}>
          <ProfileImageSection
            thumbnailUrl={mainThumbnailUrl}
            onSelectImage={handleProfileImageSelect}
          />
          <BasicInfoSection
            name={formData.name}
            oneLineIntro={formData.oneLineIntro}
            detailedIntro={formData.detailedIntro}
            onChange={(field, value) => handleInputChange(field, value)}
          />
          <ContactSection
            contact={formData.contact}
            openChat={formData.openChat}
            contactEnabled={toggles.contact}
            openChatEnabled={toggles.openChat}
            onInputChange={(field, value) => handleInputChange(field, value)}
            onToggleChange={(field) => handleToggleChange(field)}
          />
          <SnsSection
            websites={formData.websites}
            websiteToggles={toggles.websites}
            onInputChange={(value, index) => handleInputChange('websites', value, index)}
            onToggleChange={(index) => handleToggleChange('websites', index)}
          />
          <PortfolioFilesSection
            resumeFileInfo={resumeFileUrl || null}
            portfolioFileInfo={portfolioFileUrl || null}
            onFileAdd={handlePortfolioFileAdd}
            onResumeRemove={handleResumeFileRemove}
            onPortfolioRemove={handlePortfolioFileRemove}
            onFileError={handleFileError}
          />
          <TagsSection
            tags={formData.tags}
            tagToggles={toggles.tags}
            onInputChange={(value, index) => handleInputChange('tags', value, index)}
            onToggleChange={(index) => handleToggleChange('tags', index)}
          />
          <GallerySection
            images={galleryImageUrls}
            onSelectImage={handleGalleryImageSelect}
            onReplaceImage={handleGalleryImageReplace}
            onRemoveImage={handleGalleryImageRemove}
          />
          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel} disabled={isSubmitting || isImageUploading}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting || isImageUploading}>
              {isSubmitting ? '등록 중...' : '등록하기'}
            </SubmitButton>
          </ButtonGroup>
        </RegisterForm>
      </FormContainer>
      {isSubmitting && <LoadingOverlay message="등록 중..." />}
    </PageWrapper>
  );
};

export default PortfolioRegisterPage;

