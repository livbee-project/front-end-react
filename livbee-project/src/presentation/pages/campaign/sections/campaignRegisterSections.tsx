/**
 * 캠페인 등록 페이지 섹션 정의
 */

import React from 'react';
import { CampaignBasicInfoSection } from '@/presentation/pages/campaign/sections/components/CampaignBasicInfoSection';
import { CampaignRecruitmentInfoSection } from '@/presentation/pages/campaign/sections/components/CampaignRecruitmentInfoSection';
import { CampaignFilmingInfoSection } from '@/presentation/pages/campaign/sections/components/CampaignFilmingInfoSection';
import { CampaignProductInfoSection } from '@/presentation/pages/campaign/sections/components/CampaignProductInfoSection';

export interface CampaignRegisterSection {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface CampaignRegisterSectionsParams {
  formData: {
    brandName: string;
    brandIntroduction: string;
    title: string;
    content: string;
    recruitmentType: string;
    category: string;
    location: string;
    filmingDate: string;
    deadline: string;
    startTime: string;
    endTime: string;
    productName: string;
    fee: string;
    feeNegotiable: boolean;
    qualifications: string[];
  };
  coverImageUrl?: string;
  productImageUrl?: string;
  liveCoverImageUrl?: string;
  handleInputChange: <K extends keyof CampaignRegisterSectionsParams['formData']>(field: K, value: string | boolean, index?: number) => void;
  handleImageSelect: (file: File, type: 'cover' | 'product' | 'liveCover') => void;
  handleAddQualification: () => void;
  handleRemoveQualification: (index: number) => void;
  handleQualificationChange: (index: number, value: string) => void;
}


export const createCampaignRegisterSections = ({
  formData,
  coverImageUrl,
  productImageUrl,
  liveCoverImageUrl,
  handleInputChange,
  handleImageSelect,
  handleAddQualification,
  handleRemoveQualification,
  handleQualificationChange,
}: CampaignRegisterSectionsParams): CampaignRegisterSection[] => [
  {
    key: 'basicInfo',
    title: '',
    content: (
      <CampaignBasicInfoSection
        coverImageUrl={coverImageUrl}
        brandName={formData.brandName}
        brandIntroduction={formData.brandIntroduction}
        title={formData.title}
        content={formData.content}
        qualifications={formData.qualifications}
        onCoverImageSelect={(file) => handleImageSelect(file, 'cover')}
        onBrandNameChange={(value) => handleInputChange('brandName', value)}
        onBrandIntroductionChange={(value) => handleInputChange('brandIntroduction', value)}
        onTitleChange={(value) => handleInputChange('title', value)}
        onContentChange={(value) => handleInputChange('content', value)}
        onAddQualification={handleAddQualification}
        onRemoveQualification={handleRemoveQualification}
        onQualificationChange={handleQualificationChange}
      />
    ),
  },
  {
    key: 'recruitmentInfo',
    title: '',
    content: (
      <CampaignRecruitmentInfoSection
        recruitmentType={formData.recruitmentType}
        category={formData.category}
        onRecruitmentTypeChange={(value) => handleInputChange('recruitmentType', value)}
        onCategoryChange={(value) => handleInputChange('category', value)}
      />
    ),
  },
  {
    key: 'filmingInfo',
    title: '',
    content: (
      <CampaignFilmingInfoSection
        location={formData.location}
        filmingDate={formData.filmingDate}
        startTime={formData.startTime}
        endTime={formData.endTime}
        deadline={formData.deadline}
        fee={formData.fee}
        feeNegotiable={formData.feeNegotiable}
        onLocationChange={(value) => handleInputChange('location', value)}
        onFilmingDateChange={(value) => handleInputChange('filmingDate', value)}
        onStartTimeChange={(value) => handleInputChange('startTime', value)}
        onEndTimeChange={(value) => handleInputChange('endTime', value)}
        onDeadlineChange={(value) => handleInputChange('deadline', value)}
        onFeeChange={(value) => handleInputChange('fee', value)}
        onFeeNegotiableChange={(checked) => handleInputChange('feeNegotiable', checked)}
      />
    ),
  },
  {
    key: 'productInfo',
    title: '',
    content: (
      <CampaignProductInfoSection
        productName={formData.productName}
        productImageUrl={productImageUrl}
        liveCoverImageUrl={liveCoverImageUrl}
        onProductNameChange={(value) => handleInputChange('productName', value)}
        onProductImageSelect={(file) => handleImageSelect(file, 'product')}
        onLiveCoverImageSelect={(file) => handleImageSelect(file, 'liveCover')}
      />
    ),
  },
];

