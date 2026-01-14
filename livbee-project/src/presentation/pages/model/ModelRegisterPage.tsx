import React from 'react';
import {
  PageWrapper,
  FormContainer,
  RegisterForm,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import {
  ProfileImageSection,
  BasicInfoSection,
  ContactSection,
  SnsSection,
  PortfolioFilesSection,
  TagsSection,
  GallerySection,
} from '@/presentation/components/forms/portfolio/sections';
import { FormSubmitSection } from '@/presentation/components/forms/common/FormSubmitSection';
import { RegisterPageHeader } from '@/presentation/components/forms/common/RegisterPageHeader';
import { useModelRegisterForm } from '@/presentation/components/forms/model/useModelRegisterForm';
import { LoadingOverlay } from '@/presentation/components/states/LoadingOverlay';

const ModelRegisterPage: React.FC = () => {
  const {
    formData,
    toggles,
    mainThumbnailUrl,
    galleryImageUrls,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect,
    handleGalleryImageSelect,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    handlePortfolioFileSelect,
    handlePortfolioFileRemove,
    handleFileError,
    handleSubmit,
  } = useModelRegisterForm();

  // 포트폴리오 폼과 호환되도록 websites 배열 변환
  const websitesArray = formData.websites.map((w) => w.content || '');

  return (
    <PageWrapper>
      <RegisterPageHeader title="등록하기" />
      <FormContainer>
          <RegisterForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
            websites={websitesArray}
            websiteToggles={toggles.websites}
            onInputChange={(value, index) => {
              handleInputChange('websites', value, index, 'content');
            }}
            onToggleChange={(index) => handleToggleChange('websites', index)}
          />
          <PortfolioFilesSection
            resumeFileInfo={null}
            portfolioFileInfo={portfolioFileUrl || null}
            onFileAdd={handlePortfolioFileSelect}
            onResumeRemove={() => {}}
            onPortfolioRemove={handlePortfolioFileRemove}
            onFileError={handleFileError}
          />
          <TagsSection
            tags={formData.tags.map((t) => (typeof t === 'object' ? t.value || '' : t))}
            tagToggles={toggles.tags}
            onInputChange={(value, index) => {
              handleInputChange('tags', value, index);
            }}
            onToggleChange={(index) => handleToggleChange('tags', index)}
          />
          <GallerySection
            images={galleryImageUrls}
            onSelectImage={handleGalleryImageSelect}
            onReplaceImage={handleGalleryImageReplace}
            onRemoveImage={handleGalleryImageRemove}
          />
          <FormSubmitSection
            disabled={isSubmitting || isImageUploading}
            isSubmitting={isSubmitting}
            submitType="submit"
          />
          </RegisterForm>
        </FormContainer>
      {isSubmitting && <LoadingOverlay message="등록 중..." />}
      </PageWrapper>
  );
};

export default ModelRegisterPage;

