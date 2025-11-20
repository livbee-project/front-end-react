import React from 'react';
import styled from 'styled-components';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import SelectInput from '@/presentation/components/forms/inputs/SelectInput';
import DateInput from '@/presentation/components/forms/inputs/DateInput';
import TimeInput from '@/presentation/components/forms/inputs/TimeInput';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import Button from '@/presentation/components/ui/Button';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { Caption } from '@/presentation/components/styled/Typography';
import { useCampaignRegisterForm } from '@/presentation/components/forms/campaign/useCampaignRegisterForm';

const UploadMessage = styled(Caption)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const recruitmentTypeOptions = [
  { value: 'store', label: '스토어 모집' },
  { value: 'model', label: '모델 모집' },
  { value: 'showhost', label: '쇼호스트 모집' },
  { value: 'staff', label: '스태프 모집' },
];

const categoryOptions = [
  { value: 'food', label: '식품' },
  { value: 'fashion', label: '패션' },
  { value: 'beauty', label: '뷰티' },
  { value: 'electronics', label: '전자제품' },
  { value: 'lifestyle', label: '생활/리빙' },
];

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

  return (
    <RegisterPageLayout>
      <FormSection title="대표이미지 1:2*">
        <ImageUpload size={200} aspectRatio="1:2" onImageSelect={(file) => handleImageSelect(file, 'cover')} />
        {coverImageUrl && <UploadMessage>이미지 업로드 완료</UploadMessage>}
      </FormSection>

      <FormSection title="브랜드명*">
        <TextInput placeholder="내용을 입력해주세요" value={formData.brandName} onChange={(e) => handleInputChange('brandName', e.target.value)} />
      </FormSection>

      <FormSection title="제목*">
        <TextInput placeholder="내용을 입력해주세요" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
      </FormSection>

      <FormSection title="내용*">
        <TextInput placeholder="내용을 입력해주세요" value={formData.content} onChange={(e) => handleInputChange('content', e.target.value)} />
      </FormSection>

      <FormSection title="상세 내용*">
        <TextInput placeholder="내용을 입력해주세요" value={formData.detailedContent} onChange={(e) => handleInputChange('detailedContent', e.target.value)} />
      </FormSection>

      <FormSection title="모집구분*">
        <SelectInput value={formData.recruitmentType} options={recruitmentTypeOptions} onChange={(e) => handleInputChange('recruitmentType', e.target.value)} />
      </FormSection>

      <FormSection title="카테고리*">
        <SelectInput value={formData.category} options={categoryOptions} onChange={(e) => handleInputChange('category', e.target.value)} />
      </FormSection>

      <FormSection title="장소">
        <TextInput placeholder="내용을 입력해주세요" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
      </FormSection>

      <FormSection title="촬영일*">
        <DateInput placeholder="내용을 입력해주세요" value={formData.filmingDate} onChange={(e) => handleInputChange('filmingDate', e.target.value)} />
      </FormSection>

      <FormSection title="공고 마감일*">
        <DateInput placeholder="내용을 입력해주세요" value={formData.deadline} onChange={(e) => handleInputChange('deadline', e.target.value)} />
      </FormSection>

      <FormSection title="시작시간*">
        <TimeInput placeholder="내용을 입력해주세요" value={formData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)} />
      </FormSection>

      <FormSection title="종료시간*">
        <TimeInput placeholder="내용을 입력해주세요" value={formData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)} />
      </FormSection>

      <FormSection title="상품명">
        <TextInput placeholder="내용을 입력해주세요" value={formData.productName} onChange={(e) => handleInputChange('productName', e.target.value)} />
      </FormSection>

      <FormSection title="상품 이미지">
        <ImageUpload size={200} onImageSelect={(file) => handleImageSelect(file, 'product')} />
        {productImageUrl && <UploadMessage>이미지 업로드 완료</UploadMessage>}
      </FormSection>

      <FormSection title="라이브 커버 이미지">
        <ImageUpload size={200} onImageSelect={(file) => handleImageSelect(file, 'liveCover')} />
        {liveCoverImageUrl && <UploadMessage>이미지 업로드 완료</UploadMessage>}
      </FormSection>

      <Button
        variant="primary"
        size="medium"
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting || isImageUploading}
      >
        {isSubmitting ? '등록 중...' : '등록하기'}
      </Button>
    </RegisterPageLayout>
  );
};

export default CampaignRegisterPage;

