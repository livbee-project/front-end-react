import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '@/presentation/components/forms/TextInput';
import SelectInput from '@/presentation/components/forms/SelectInput';
import DateInput from '@/presentation/components/forms/DateInput';
import TimeInput from '@/presentation/components/forms/TimeInput';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import Button from '@/presentation/components/ui/Button';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/FormSection';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { CreateCampaignRequest } from '@/domain/entities/Campaign';
import { Caption } from '@/presentation/components/styled/Typography';

const UploadMessage = styled(Caption)`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

/**
 * 모집공고 등록 페이지
 */
const CampaignRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();

  // campaignRepository를 useRepository 훅으로 관리
  const campaignRepository = useRepository(CampaignRepository);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    brandName: '',
    title: '',
    content: '',
    detailedContent: '',
    recruitmentType: 'showhost',
    category: 'food',
    location: '',
    filmingDate: '',
    deadline: '',
    startTime: '',
    endTime: '',
    productName: '',
  });

  // 이미지 URL 상태 관리 (미리보기용)
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [productImageUrl, setProductImageUrl] = useState<string>('');
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState<string>('');

  // 업로드할 파일 객체 저장 (등록하기 버튼 클릭 시 업로드)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  /**
   * 날짜를 ISO 8601 형식으로 변환
   */
  const convertToISO8601 = (dateString: string): string => {
    if (!dateString) return '';
    // YYYY-MM-DD 형식을 ISO 8601로 변환 (자정 시간)
    return `${dateString}T00:00:00.000Z`;
  };

  /**
   * 시간 차이 계산 (durationHours)
   */
  const calculateDurationHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    const diffMinutes = endMinutes - startMinutes;
    return Math.round((diffMinutes / 60) * 10) / 10; // 소수점 첫째 자리까지
  };

  /**
   * 모집구분 코드 매핑 (store → showhost)
   */
  const mapRecruitmentType = (type: string): 'showhost' | 'staff' | 'model' | 'other' => {
    const typeMap: Record<string, 'showhost' | 'staff' | 'model' | 'other'> = {
      store: 'showhost',
      showhost: 'showhost',
      model: 'model',
      staff: 'staff',
      other: 'other',
    };
    return typeMap[type] || 'showhost';
  };

  /**
   * 이미지 선택 핸들러 (크롭 후 파일만 저장, 업로드는 나중에)
   */
  const handleImageSelect = (
    file: File,
    type: 'cover' | 'product' | 'liveCover'
  ) => {
    // 파일 객체 저장
    if (type === 'cover') {
      setCoverImageFile(file);
      const blobUrl = URL.createObjectURL(file);
      setCoverImageUrl(blobUrl);
    } else if (type === 'product') {
      setProductImageFile(file);
      const blobUrl = URL.createObjectURL(file);
      setProductImageUrl(blobUrl);
    } else if (type === 'liveCover') {
      setLiveCoverImageFile(file);
      const blobUrl = URL.createObjectURL(file);
      setLiveCoverImageUrl(blobUrl);
    }
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async () => {
    // 입력 검증
    if (!formData.brandName.trim()) {
      showToast('브랜드명을 입력해주세요.', undefined, 'error');
      return;
    }
    if (!formData.title.trim()) {
      showToast('제목을 입력해주세요.', undefined, 'error');
      return;
    }
    if (!formData.filmingDate) {
      showToast('촬영일을 선택해주세요.', undefined, 'error');
      return;
    }
    if (!formData.deadline) {
      showToast('공고 마감일을 선택해주세요.', undefined, 'error');
      return;
    }
    if (!formData.startTime) {
      showToast('시작시간을 선택해주세요.', undefined, 'error');
      return;
    }
    if (!formData.endTime) {
      showToast('종료시간을 선택해주세요.', undefined, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // 시간 검증
      if (formData.startTime && formData.endTime) {
        const durationHours = calculateDurationHours(formData.startTime, formData.endTime);
        if (durationHours <= 0) {
          showToast('종료시간은 시작시간보다 늦어야 합니다.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
      }

      // 이미지 파일들을 Cloudinary에 업로드
      let uploadedCoverImageUrl: string | undefined;
      let uploadedProductImageUrl: string | undefined;
      let uploadedLiveCoverImageUrl: string | undefined;

      // 커버 이미지 업로드
      if (coverImageFile) {
        const url = await uploadFile(coverImageFile, { type: 'image' });
        if (!url) {
          showToast('커버 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedCoverImageUrl = url;
      }

      // 상품 이미지 업로드
      if (productImageFile) {
        const url = await uploadFile(productImageFile, { type: 'image' });
        if (!url) {
          showToast('상품 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedProductImageUrl = url;
      }

      // 라이브 커버 이미지 업로드
      if (liveCoverImageFile) {
        const url = await uploadFile(liveCoverImageFile, { type: 'image' });
        if (!url) {
          showToast('라이브 커버 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedLiveCoverImageUrl = url;
      }

      // 요청 데이터 구성
      const request: CreateCampaignRequest = {
        brandName: formData.brandName.trim(),
        title: formData.title.trim(),
        shootDate: convertToISO8601(formData.filmingDate),
        closeAt: convertToISO8601(formData.deadline),
        startTime: formData.startTime,
        endTime: formData.endTime,
        // durationHours는 백엔드에서 자동 계산되므로 생략 가능
        prefix: mapRecruitmentType(formData.recruitmentType),
        category: formData.category as 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle',
        content: formData.content.trim() || undefined,
        detailedContent: formData.detailedContent.trim() || undefined, // 별도 필드로 전송
        location: formData.location.trim() || undefined,
        productName: formData.productName.trim() || undefined,
        coverImageUrl: uploadedCoverImageUrl,
        productThumbnailUrl: uploadedProductImageUrl,
        liveVerticalCoverUrl: uploadedLiveCoverImageUrl,
        isPublic: true,
      };

      // API 호출
      const response = await campaignRepository.createCampaign(request);

      if (response.ok) {
        showToast('모집 공고가 등록되었습니다.');
        navigate('/campaigns', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '모집 공고 등록에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
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
        <ImageUpload
          size={200}
          aspectRatio="1:2"
          onImageSelect={(file) => handleImageSelect(file, 'cover')}
        />
        {coverImageUrl && (
          <UploadMessage>이미지 업로드 완료</UploadMessage>
        )}
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
        <ImageUpload
          size={200}
          aspectRatio="1:1"
          onImageSelect={(file) => handleImageSelect(file, 'product')}
        />
        {productImageUrl && (
          <UploadMessage>이미지 업로드 완료</UploadMessage>
        )}
      </FormSection>

      {/* 쇼핑라이브 커버 3:4 */}
      <FormSection title="쇼핑라이브 커버 3:4">
        <ImageUpload
          size={200}
          aspectRatio="3:4"
          onImageSelect={(file) => handleImageSelect(file, 'liveCover')}
        />
        {liveCoverImageUrl && (
          <UploadMessage>이미지 업로드 완료</UploadMessage>
        )}
      </FormSection>

      {/* 하단 버튼 */}
      <div style={{ marginTop: '32px' }}>
        <Button
          variant="primary"
          size="medium"
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting || isImageUploading}
        >
          {isSubmitting || isImageUploading ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </RegisterPageLayout>
  );
};

export default CampaignRegisterPage;

