import React, { useMemo } from 'react';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { FormSubmitSection } from '@/presentation/components/forms/common/FormSubmitSection';
import { RegisterPageHeader } from '@/presentation/components/forms/common/RegisterPageHeader';
import { useCampaignRegisterForm } from '@/presentation/components/forms/campaign/useCampaignRegisterForm';
import { createCampaignRegisterSections } from '@/presentation/pages/campaign/sections/campaignRegisterSections';

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
    handleAddQualification,
    handleRemoveQualification,
    handleQualificationChange,
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
        handleAddQualification,
        handleRemoveQualification,
        handleQualificationChange,
      }),
    [
      coverImageUrl,
      formData,
      productImageUrl,
      liveCoverImageUrl,
      handleImageSelect,
      handleInputChange,
      handleAddQualification,
      handleRemoveQualification,
      handleQualificationChange,
    ]
  );

  return (
    <RegisterPageLayout>
      <RegisterPageHeader title="등록하기" />
      {sections.map(({ key, title, content }) => {
        // basicInfo, recruitmentInfo, filmingInfo, productInfo 섹션은 이미 카드 스타일이므로 FormSection으로 감싸지 않음
        if (key === 'basicInfo' || key === 'recruitmentInfo' || key === 'filmingInfo' || key === 'productInfo') {
          return <React.Fragment key={key}>{content}</React.Fragment>;
        }
        return (
          <FormSection key={key} title={title}>
            {content}
          </FormSection>
        );
      })}

      <FormSubmitSection
        onSubmit={handleSubmit}
        disabled={isSubmitting || isImageUploading}
        isSubmitting={isSubmitting}
      />
    </RegisterPageLayout>
  );
};

export default CampaignRegisterPage;

