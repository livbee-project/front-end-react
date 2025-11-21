import React from 'react';
import {
  PageWrapper,
  FormContainer,
  RegisterForm,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import {
  ProfileImageSection,
  RegistrationTypeSection,
  BasicInfoSection,
  ContactSection,
  SnsSection,
  PortfolioFilesSection,
  TagsSection,
  GallerySection,
  SubmitSection,
} from '@/presentation/components/forms/portfolio/sections';
import { usePortfolioRegisterForm } from '@/presentation/components/forms/portfolio/usePortfolioRegisterForm';

const PortfolioRegisterPage: React.FC = () => {
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
    handleGalleryImageRemove,
    handlePortfolioFileAdd,
    handleResumeFileRemove,
    handlePortfolioFileRemove,
    handleSubmitForm,
  } = usePortfolioRegisterForm();

  return (
    <PageWrapper>
      <FormContainer>
        <RegisterForm onSubmit={handleSubmitForm}>
          <ProfileImageSection
            thumbnailUrl={mainThumbnailUrl}
            onSelectImage={handleProfileImageSelect}
          />
          <RegistrationTypeSection
            value={formData.registrationType}
            onChange={(value) => handleInputChange('registrationType', value)}
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
            resumeFileInfo={resumeFileUrl}
            portfolioFileInfo={portfolioFileUrl}
            onFileAdd={handlePortfolioFileAdd}
            onResumeRemove={handleResumeFileRemove}
            onPortfolioRemove={handlePortfolioFileRemove}
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
            onRemoveImage={handleGalleryImageRemove}
          />
          <SubmitSection disabled={isSubmitting || isImageUploading} isSubmitting={isSubmitting} />
        </RegisterForm>
      </FormContainer>
    </PageWrapper>
  );
};

export default PortfolioRegisterPage;

