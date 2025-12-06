/**
 * 캠페인 등록 페이지 섹션 정의
 */

import React from 'react';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import SelectInput from '@/presentation/components/forms/inputs/SelectInput';
import DateInput from '@/presentation/components/forms/inputs/DateInput';
import TimeInput from '@/presentation/components/forms/inputs/TimeInput';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import { Textarea } from '@/presentation/components/styled/CommonStyles';
import styled from 'styled-components';

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
    detailedContent: string;
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
  };
  coverImageUrl?: string;
  productImageUrl?: string;
  liveCoverImageUrl?: string;
  handleInputChange: <K extends keyof CampaignRegisterSectionsParams['formData']>(field: K, value: string | boolean) => void;
  handleImageSelect: (file: File, type: 'cover' | 'product' | 'liveCover') => void;
}

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

const StyledTextarea = styled(Textarea)`
  width: 100%;
`;

const FeeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const FeeInputWrapper = styled.div`
  flex: 1;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  user-select: none;
`;

export const createCampaignRegisterSections = ({
  formData,
  coverImageUrl,
  productImageUrl,
  liveCoverImageUrl,
  handleInputChange,
  handleImageSelect,
}: CampaignRegisterSectionsParams): CampaignRegisterSection[] => [
  {
    key: 'cover',
    title: '대표이미지 1:2*',
    content: (
      <ImageUpload
        size={200}
        aspectRatio="1:2"
        imageUrl={coverImageUrl}
        onImageSelect={(file) => handleImageSelect(file, 'cover')}
      />
    ),
  },
  {
    key: 'brandName',
    title: '브랜드명*',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.brandName}
        onChange={(e) => handleInputChange('brandName', e.target.value)}
      />
    ),
  },
  {
    key: 'brandIntroduction',
    title: '브랜드 소개',
    content: (
      <StyledTextarea
        placeholder="브랜드에 대해 간단히 소개해주세요"
        value={formData.brandIntroduction}
        onChange={(e) => handleInputChange('brandIntroduction', e.target.value)}
        rows={4}
      />
    ),
  },
  {
    key: 'title',
    title: '제목*',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
    ),
  },
  {
    key: 'content',
    title: '내용*',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.content}
        onChange={(e) => handleInputChange('content', e.target.value)}
      />
    ),
  },
  {
    key: 'detailedContent',
    title: '상세 내용*',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.detailedContent}
        onChange={(e) => handleInputChange('detailedContent', e.target.value)}
      />
    ),
  },
  {
    key: 'recruitmentType',
    title: '모집구분*',
    content: (
      <SelectInput
        value={formData.recruitmentType}
        options={recruitmentTypeOptions}
        onChange={(e) => handleInputChange('recruitmentType', e.target.value)}
      />
    ),
  },
  {
    key: 'category',
    title: '카테고리*',
    content: (
      <SelectInput
        value={formData.category}
        options={categoryOptions}
        onChange={(e) => handleInputChange('category', e.target.value)}
      />
    ),
  },
  {
    key: 'location',
    title: '장소',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />
    ),
  },
  {
    key: 'filmingDate',
    title: '촬영일*',
    content: (
      <DateInput
        placeholder="내용을 입력해주세요"
        value={formData.filmingDate}
        onChange={(e) => handleInputChange('filmingDate', e.target.value)}
      />
    ),
  },
  {
    key: 'deadline',
    title: '공고 마감일*',
    content: (
      <DateInput
        placeholder="내용을 입력해주세요"
        value={formData.deadline}
        onChange={(e) => handleInputChange('deadline', e.target.value)}
      />
    ),
  },
  {
    key: 'startTime',
    title: '시작시간*',
    content: (
      <TimeInput
        placeholder="내용을 입력해주세요"
        value={formData.startTime}
        onChange={(e) => handleInputChange('startTime', e.target.value)}
      />
    ),
  },
  {
    key: 'endTime',
    title: '종료시간*',
    content: (
      <TimeInput
        placeholder="내용을 입력해주세요"
        value={formData.endTime}
        onChange={(e) => handleInputChange('endTime', e.target.value)}
      />
    ),
  },
  {
    key: 'productName',
    title: '상품명',
    content: (
      <TextInput
        placeholder="내용을 입력해주세요"
        value={formData.productName}
        onChange={(e) => handleInputChange('productName', e.target.value)}
      />
    ),
  },
  {
    key: 'fee',
    title: '수당',
    content: (
      <FeeContainer>
        <FeeInputWrapper>
          <TextInput
            type="number"
            placeholder="금액을 입력해주세요"
            value={formData.fee}
            onChange={(e) => handleInputChange('fee', e.target.value)}
            disabled={formData.feeNegotiable}
          />
        </FeeInputWrapper>
        <CheckboxContainer>
          <CheckboxInput
            type="checkbox"
            id="feeNegotiable"
            checked={formData.feeNegotiable}
            onChange={(e) => {
              const isChecked = e.target.checked;
              handleInputChange('feeNegotiable', isChecked);
              // 협의 가능으로 체크하면 수당 필드 초기화
              if (isChecked) {
                handleInputChange('fee', '');
              }
            }}
          />
          <CheckboxLabel htmlFor="feeNegotiable">협의 가능</CheckboxLabel>
        </CheckboxContainer>
      </FeeContainer>
    ),
  },
  {
    key: 'productImage',
    title: '상품 이미지',
    content: (
      <ImageUpload
        size={200}
        imageUrl={productImageUrl}
        onImageSelect={(file) => handleImageSelect(file, 'product')}
      />
    ),
  },
  {
    key: 'liveCover',
    title: '라이브 커버 이미지',
    content: (
      <ImageUpload
        size={200}
        imageUrl={liveCoverImageUrl}
        onImageSelect={(file) => handleImageSelect(file, 'liveCover')}
      />
    ),
  },
];

