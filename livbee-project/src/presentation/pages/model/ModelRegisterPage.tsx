import React from 'react';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import {
  NameSection,
  WebsitesSection,
  PortfolioUploadSection,
  ContactSection as ContactGroup,
  TagsSection,
  GallerySection,
} from '@/presentation/components/forms/model/sections';
import { FormSubmitSection } from '@/presentation/components/forms/common/FormSubmitSection';
import { useModelRegisterForm } from '@/presentation/components/forms/model/useModelRegisterForm';

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
    handleProfileImageRemove,
    handleGalleryImageSelect,
    handleGalleryImageRemove,
    handlePortfolioFileSelect,
    handlePortfolioFileRemove,
    handleSubmit,
  } = useModelRegisterForm();

  return (
    <RegisterPageLayout>
      <NameSection
        name={formData.name}
        mainThumbnailUrl={mainThumbnailUrl}
        onNameChange={(value) => handleInputChange('name', value)}
        onImageSelect={handleProfileImageSelect}
        onImageRemove={handleProfileImageRemove}
      />

      <FormSection>
        <SectionTitle variant="default" marginBottom="12px">
          등록구분
        </SectionTitle>
        <TextInput
          placeholder="내용을 입력해주세요"
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </FormSection>

      <FormSection>
        <SectionTitle variant="default" marginBottom="12px">
          한 줄 소개
        </SectionTitle>
        <TextInput
          placeholder="내용을 입력해주세요"
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </FormSection>

      <FormSection>
        <SectionTitle variant="default" marginBottom="12px">
          상세 소개
        </SectionTitle>
        <TextInput
          placeholder="내용을 입력해주세요"
          value={formData.detailedIntro}
          onChange={(e) => handleInputChange('detailedIntro', e.target.value)}
        />
      </FormSection>

      <WebsitesSection
        websites={formData.websites}
        websiteToggles={toggles.websites}
        onWebsiteChange={(index, field, value) => handleInputChange('websites', value, index, field)}
        onToggleChange={(index) => handleToggleChange('websites', index)}
      />

      <PortfolioUploadSection
        fileInfo={portfolioFileUrl}
        onFileSelect={handlePortfolioFileSelect}
        onFileRemove={handlePortfolioFileRemove}
      />

      <ContactGroup
        contact={formData.contact}
        openChat={formData.openChat}
        contactEnabled={toggles.contact}
        openChatEnabled={toggles.openChat}
        onContactChange={(value) => handleInputChange('contact', value)}
        onOpenChatChange={(value) => handleInputChange('openChat', value)}
        onContactToggle={() => handleToggleChange('contact')}
        onOpenChatToggle={() => handleToggleChange('openChat')}
      />

      <TagsSection
        tags={formData.tags}
        tagToggles={toggles.tags}
        onTagChange={(index, value) => handleInputChange('tags', value, index)}
        onToggleChange={(index) => handleToggleChange('tags', index)}
      />

      <GallerySection
        images={galleryImageUrls}
        onSelectImage={handleGalleryImageSelect}
        onRemoveImage={handleGalleryImageRemove}
      />

      <FormSubmitSection
        disabled={isSubmitting || isImageUploading}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </RegisterPageLayout>
  );
};

export default ModelRegisterPage;

