import React, { useState } from 'react';
import TextInput from '@/presentation/components/forms/TextInput';
import SelectInput from '@/presentation/components/forms/SelectInput';
import DateInput from '@/presentation/components/forms/DateInput';
import TimeInput from '@/presentation/components/forms/TimeInput';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import Button from '@/presentation/components/ui/Button';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/FormSection';

/**
 * 모집공고 등록 페이지
 */
const CampaignRegisterPage: React.FC = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    brandName: '',
    title: '',
    content: '',
    detailedContent: '',
    recruitmentType: 'store',
    category: 'food',
    location: '',
    filmingDate: '',
    deadline: '',
    startTime: '',
    endTime: '',
    productName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('모집공고 등록:', formData);
    // TODO: 실제 등록 로직 구현
  };

  const recruitmentTypeOptions = [
    { value: 'store', label: '스토스트 모집' },
    { value: 'model', label: '모델 모집' },
    { value: 'showhost', label: '쇼호스트 모집' },
  ];

  const categoryOptions = [
    { value: 'food', label: '식품' },
    { value: 'fashion', label: '패션' },
    { value: 'beauty', label: '뷰티' },
    { value: 'electronics', label: '전자제품' },
  ];

  return (
    <RegisterPageLayout>
      {/* 대표이미지 1:2 */}
      <FormSection title="대표이미지 1:2*">
        <ImageUpload size={200} aspectRatio="1:2" />
      </FormSection>

      {/* 브랜드명 */}
      <FormSection>
        <TextInput
          label="브랜드명*"
          placeholder="내용을 입력해주세요"
          value={formData.brandName}
          onChange={(e) => handleInputChange('brandName', e.target.value)}
        />
      </FormSection>

      {/* 제목 */}
      <FormSection>
        <TextInput
          label="제목*"
          placeholder="내용을 입력해주세요"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </FormSection>

      {/* 내용 */}
      <FormSection>
        <TextInput
          label="내용*"
          placeholder="내용을 입력해주세요"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
        />
      </FormSection>

      {/* 상세 내용 */}
      <FormSection>
        <TextInput
          label="상세 내용*"
          placeholder="내용을 입력해주세요"
          value={formData.detailedContent}
          onChange={(e) => handleInputChange('detailedContent', e.target.value)}
        />
      </FormSection>

      {/* 모집구분 */}
      <FormSection>
        <SelectInput
          label="모집구분*"
          options={recruitmentTypeOptions}
          value={formData.recruitmentType}
          onChange={(e) => handleInputChange('recruitmentType', e.target.value)}
        />
      </FormSection>

      {/* 카테고리 */}
      <FormSection>
        <SelectInput
          label="카테고리*"
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
        />
      </FormSection>

      {/* 장소 */}
      <FormSection>
        <TextInput
          label="장소"
          placeholder="내용을 입력해주세요"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </FormSection>

      {/* 촬영일 */}
      <FormSection>
        <DateInput
          label="촬영일*"
          placeholder="내용을 입력해주세요"
          value={formData.filmingDate}
          onChange={(e) => handleInputChange('filmingDate', e.target.value)}
        />
      </FormSection>

      {/* 공고 마감일 */}
      <FormSection>
        <DateInput
          label="공고 마감일*"
          placeholder="내용을 입력해주세요"
          value={formData.deadline}
          onChange={(e) => handleInputChange('deadline', e.target.value)}
        />
      </FormSection>

      {/* 시작시간, 종료시간 */}
      <FormSection>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <TimeInput
            label="시작시간"
            value={formData.startTime}
            onChange={(e) => handleInputChange('startTime', e.target.value)}
          />
          <TimeInput
            label="종료시간"
            value={formData.endTime}
            onChange={(e) => handleInputChange('endTime', e.target.value)}
          />
        </div>
      </FormSection>

      {/* 상품명 */}
      <FormSection>
        <TextInput
          label="상품명"
          placeholder="내용을 입력해주세요"
          value={formData.productName}
          onChange={(e) => handleInputChange('productName', e.target.value)}
        />
      </FormSection>

      {/* 상품 이미지 1:1 */}
      <FormSection title="상품 이미지 1:1">
        <ImageUpload size={200} aspectRatio="1:1" />
      </FormSection>

      {/* 쇼핑라이브 커버 3:4 */}
      <FormSection title="쇼핑라이브 커버 3:4">
        <ImageUpload size={200} aspectRatio="3:4" />
      </FormSection>

      {/* 하단 버튼 */}
      <div style={{ marginTop: '32px' }}>
        <Button
          variant="primary"
          size="medium"
          fullWidth
          onClick={handleSubmit}
        >
          BUTTON
        </Button>
      </div>
    </RegisterPageLayout>
  );
};

export default CampaignRegisterPage;

