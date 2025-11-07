import React, { useState } from 'react';
import TextInput from '@/presentation/components/forms/TextInput';
import SelectInput from '@/presentation/components/forms/SelectInput';
import DateInput from '@/presentation/components/forms/DateInput';
import TimeInput from '@/presentation/components/forms/TimeInput';
import ImageUpload from '@/presentation/components/common/ImageUpload';
import Button from '@/presentation/components/common/Button';

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

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'var(--h3)',
    fontWeight: 400,
    color: 'var(--black)',
    marginBottom: '12px',
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
    <div style={{ padding: '16px', paddingBottom: '32px' }}>
      {/* 대표이미지 1:2 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>대표이미지 1:2*</div>
        <ImageUpload size={200} aspectRatio="1:2" />
      </div>

      {/* 브랜드명 */}
      <div style={sectionStyle}>
        <TextInput
          label="브랜드명*"
          placeholder="내용을 입력해주세요"
          value={formData.brandName}
          onChange={(e) => handleInputChange('brandName', e.target.value)}
        />
      </div>

      {/* 제목 */}
      <div style={sectionStyle}>
        <TextInput
          label="제목*"
          placeholder="내용을 입력해주세요"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </div>

      {/* 내용 */}
      <div style={sectionStyle}>
        <TextInput
          label="내용*"
          placeholder="내용을 입력해주세요"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
        />
      </div>

      {/* 상세 내용 */}
      <div style={sectionStyle}>
        <TextInput
          label="상세 내용*"
          placeholder="내용을 입력해주세요"
          value={formData.detailedContent}
          onChange={(e) => handleInputChange('detailedContent', e.target.value)}
        />
      </div>

      {/* 모집구분 */}
      <div style={sectionStyle}>
        <SelectInput
          label="모집구분*"
          options={recruitmentTypeOptions}
          value={formData.recruitmentType}
          onChange={(e) => handleInputChange('recruitmentType', e.target.value)}
        />
      </div>

      {/* 카테고리 */}
      <div style={sectionStyle}>
        <SelectInput
          label="카테고리*"
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
        />
      </div>

      {/* 장소 */}
      <div style={sectionStyle}>
        <TextInput
          label="장소"
          placeholder="내용을 입력해주세요"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>

      {/* 촬영일 */}
      <div style={sectionStyle}>
        <DateInput
          label="촬영일*"
          placeholder="내용을 입력해주세요"
          value={formData.filmingDate}
          onChange={(e) => handleInputChange('filmingDate', e.target.value)}
        />
      </div>

      {/* 공고 마감일 */}
      <div style={sectionStyle}>
        <DateInput
          label="공고 마감일*"
          placeholder="내용을 입력해주세요"
          value={formData.deadline}
          onChange={(e) => handleInputChange('deadline', e.target.value)}
        />
      </div>

      {/* 시작시간, 종료시간 */}
      <div style={sectionStyle}>
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
      </div>

      {/* 상품명 */}
      <div style={sectionStyle}>
        <TextInput
          label="상품명"
          placeholder="내용을 입력해주세요"
          value={formData.productName}
          onChange={(e) => handleInputChange('productName', e.target.value)}
        />
      </div>

      {/* 상품 이미지 1:1 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>상품 이미지 1:1</div>
        <ImageUpload size={200} aspectRatio="1:1" />
      </div>

      {/* 쇼핑라이브 커버 3:4 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>쇼핑라이브 커버 3:4</div>
        <ImageUpload size={200} aspectRatio="3:4" />
      </div>

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
    </div>
  );
};

export default CampaignRegisterPage;

