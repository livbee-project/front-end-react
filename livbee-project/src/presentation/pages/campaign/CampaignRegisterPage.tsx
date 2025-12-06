import React, { useMemo } from 'react';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { FormSubmitSection } from '@/presentation/components/forms/common/FormSubmitSection';
import { useCampaignRegisterForm } from '@/presentation/components/forms/campaign/useCampaignRegisterForm';
import { createCampaignRegisterSections } from './sections/campaignRegisterSections';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';

const CampaignRegisterPage: React.FC = () => {
  const {
    formData,
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleImageSelect,
    handleSubmit,
  } = useCampaignRegisterForm();

  const sections = useMemo(
    () =>
      createCampaignRegisterSections({
        formData,
        coverImageUrl,
        productImageUrl,
        liveCoverImageUrl,
        handleInputChange,
        handleImageSelect,
      }),
    [coverImageUrl, formData, productImageUrl, liveCoverImageUrl, handleImageSelect, handleInputChange]
  );

  return (
    <>
      <StickyHeader title="모집공고 등록" />
      <RegisterPageLayout>
        {sections.map(({ key, title, content }) => (
          <FormSection key={key} title={title}>
            {content}
          </FormSection>
        ))}

        <FormSubmitSection
          onSubmit={handleSubmit}
          disabled={isSubmitting || isImageUploading}
          isSubmitting={isSubmitting}
        />
      </RegisterPageLayout>
    </>
  );
};

export default CampaignRegisterPage;

