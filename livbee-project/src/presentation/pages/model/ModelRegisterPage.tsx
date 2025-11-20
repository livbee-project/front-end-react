import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import Button from '@/presentation/components/ui/Button';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/FormSection';
import FormRow from '@/presentation/components/forms/FormRow';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { CreateModelRequest } from '@/domain/entities/Model';
import { Caption, Small } from '@/presentation/components/styled/Typography';

const HelperText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const SuccessText = styled(Caption)`
  color: ${({ theme }) => theme.colors.primary};
`;

const PortfolioUploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 20px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

/**
 * 모델 등록 페이지
 */
const ModelRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();

  // modelRepository를 useRepository 훅으로 관리
  const modelRepository = useRepository(ModelRepository);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    registrationType: '',
    oneLineIntro: '',
    detailedIntro: '',
    websites: [
      { related: '', content: '' },
      { related: '', content: '' },
      { related: '', content: '' },
    ],
    contact: '',
    openChat: '',
    tags: [
      { label: '키', value: '' },
      { label: '몸무게', value: '' },
      { label: '사이즈', value: '' },
      { label: '경력', value: '' },
      { label: '나이', value: '' },
    ],
  });

  const [toggles, setToggles] = useState({
    websites: [true, true, true],
    contact: true,
    openChat: true,
    tags: [true, true, true, true, true],
  });

  // 이미지 및 파일 URL 상태 관리 (미리보기용)
  const [mainThumbnailUrl, setMainThumbnailUrl] = useState<string>('');
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>([]);
  const [portfolioFileUrl, setPortfolioFileUrl] = useState<string>('');

  // 업로드할 파일 객체 저장 (등록하기 버튼 클릭 시 업로드)
  const [mainThumbnailFile, setMainThumbnailFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const portfolioInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    field: string,
    value: string,
    index?: number,
    subField?: string
  ) => {
    if (index !== undefined) {
      if (field === 'websites') {
        const newArray = [...formData.websites];
        if (subField) {
          newArray[index] = { ...newArray[index], [subField]: value };
        }
        setFormData({ ...formData, websites: newArray });
      } else if (field === 'tags') {
        const newArray = [...formData.tags];
        newArray[index] = { ...newArray[index], value };
        setFormData({ ...formData, tags: newArray });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleToggleChange = (field: string, index?: number) => {
    if (index !== undefined) {
      const newArray = [...toggles[field as keyof typeof toggles] as boolean[]];
      newArray[index] = !newArray[index];
      setToggles({ ...toggles, [field]: newArray });
    } else {
      setToggles({ ...toggles, [field]: !toggles[field as keyof typeof toggles] });
    }
  };

  /**
   * 프로필 이미지 선택 핸들러 (크롭 후 파일만 저장, 업로드는 나중에)
   */
  const handleProfileImageSelect = (file: File) => {
    // 파일 객체 저장
    setMainThumbnailFile(file);
    // 미리보기를 위한 Blob URL 생성
    const blobUrl = URL.createObjectURL(file);
    setMainThumbnailUrl(blobUrl);
  };

  /**
   * 갤러리 이미지 선택 핸들러 (크롭 후 파일만 저장, 업로드는 나중에)
   */
  const handleGalleryImageSelect = (file: File) => {
    if (galleryImageFiles.length >= 5) {
      showToast('갤러리 이미지는 최대 5개까지 업로드 가능합니다.', undefined, 'error');
      return;
    }
    
    // 파일 객체 저장
    setGalleryImageFiles([...galleryImageFiles, file]);
    // 미리보기를 위한 Blob URL 생성
    const blobUrl = URL.createObjectURL(file);
    setGalleryImageUrls([...galleryImageUrls, blobUrl]);
  };

  /**
   * 포트폴리오 파일 선택 핸들러 (파일만 저장, 업로드는 나중에)
   */
  const handlePortfolioFileSelect = (file: File) => {
    // 파일 객체 저장
    setPortfolioFile(file);
    // 파일명 표시용 (URL은 나중에 업로드 후 설정)
    setPortfolioFileUrl(file.name);
  };

  /**
   * 갤러리 이미지 삭제 핸들러
   */
  const handleGalleryImageRemove = (index: number) => {
    // Blob URL 정리
    const urlToRemove = galleryImageUrls[index];
    if (urlToRemove && urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove);
    }
    // 파일 객체와 URL 모두 삭제
    setGalleryImageFiles(galleryImageFiles.filter((_, i) => i !== index));
    setGalleryImageUrls(galleryImageUrls.filter((_, i) => i !== index));
  };

  /**
   * 숫자로 변환하는 헬퍼 함수
   */
  const parseNumber = (value: string): number | undefined => {
    const num = parseFloat(value.trim());
    return isNaN(num) ? undefined : num;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 이미지 파일들을 Cloudinary에 업로드
      let uploadedMainThumbnailUrl: string | undefined;
      const uploadedGalleryUrls: string[] = [];
      let uploadedPortfolioFileUrl: string | undefined;

      // 프로필 이미지 업로드
      if (mainThumbnailFile) {
        const url = await uploadFile(mainThumbnailFile, { type: 'image' });
        if (!url) {
          showToast('프로필 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedMainThumbnailUrl = url;
      }

      // 갤러리 이미지 업로드
      for (const file of galleryImageFiles) {
        const url = await uploadFile(file, { type: 'image' });
        if (!url) {
          showToast('갤러리 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedGalleryUrls.push(url);
      }

      // 포트폴리오 파일 업로드
      if (portfolioFile) {
        const url = await uploadFile(portfolioFile, { type: 'raw' });
        if (!url) {
          showToast('포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedPortfolioFileUrl = url;
      }

      // 웹사이트 배열을 개별 URL 필드로 매핑
      const websiteUrl = formData.websites[0]?.content?.trim() || undefined;
      const instagramUrl = formData.websites[1]?.content?.trim() || undefined;
      const youtubeUrl = formData.websites[2]?.content?.trim() || undefined;

      // 태그 배열을 개별 필드로 매핑
      const height = parseNumber(formData.tags[0]?.value || '');
      const weight = parseNumber(formData.tags[1]?.value || '');
      const topSize = formData.tags[2]?.value?.trim() || undefined;
      const experienceYears = parseNumber(formData.tags[3]?.value || '');
      const age = parseNumber(formData.tags[4]?.value || '');

      // 요청 데이터 구성
      const request: CreateModelRequest = {
        nickname: formData.name.trim() || undefined,
        oneLineIntro: formData.oneLineIntro.trim() || undefined,
        detailedIntro: formData.detailedIntro.trim() || undefined,
        mainThumbnailUrl: uploadedMainThumbnailUrl,
        subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
        websiteUrl,
        instagramUrl,
        youtubeUrl,
        attachedFileUrl: uploadedPortfolioFileUrl,
        height,
        weight,
        topSize,
        experienceYears,
        age,
        // 기본값은 백엔드에서 설정
        status: 'published',
        publicScope: '전체공개',
        isAgePublic: true,
        isSizingPublic: true,
        isReceivingOffers: true,
      };

      // API 호출
      const response = await modelRepository.createModel(request);

      if (response.ok) {
        showToast('모델이 등록되었습니다.');
        navigate('/models', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '모델 등록에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterPageLayout>
      {/* 이름 섹션 (이미지 업로드 포함) */}
      <FormSection>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <SectionTitle variant="default" marginBottom="12px">이름</SectionTitle>
            <TextInput
              placeholder="내용을 입력해주세요"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          {mainThumbnailUrl ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={mainThumbnailUrl}
                alt="프로필"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid var(--paint-gray)',
                }}
              />
              <button
                onClick={() => {
                  // Blob URL 정리
                  if (mainThumbnailUrl && mainThumbnailUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(mainThumbnailUrl);
                  }
                  setMainThumbnailFile(null);
                  setMainThumbnailUrl('');
                }}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: 'var(--error)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <ImageUpload
              size={100}
              onImageSelect={handleProfileImageSelect}
            />
          )}
        </div>
      </FormSection>

      {/* 등록구분 */}
      <FormSection>
        <TextInput
          label="등록구분"
          placeholder="내용을 입력해주세요"
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </FormSection>

      {/* 한 줄 소개 */}
      <FormSection>
        <TextInput
          label="한 줄 소개"
          placeholder="내용을 입력해주세요"
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </FormSection>

      {/* 상세 소개 */}
      <FormSection>
        <TextInput
          label="상세 소개"
          placeholder="내용을 입력해주세요"
          value={formData.detailedIntro}
          onChange={(e) => handleInputChange('detailedIntro', e.target.value)}
        />
      </FormSection>

      {/* 웹사이트 */}
      <FormSection title="웹사이트">
        <VerticalList showDividers={false}>
          {[0, 1, 2].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FormRow>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="관련 입력값"
                      value={formData.websites[index].related}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index, 'related')
                      }
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="내용을 입력해주세요"
                      value={formData.websites[index].content}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index, 'content')
                      }
                    />
                  </div>
                  <ToggleSwitch
                    checked={toggles.websites[index]}
                    onChange={() => handleToggleChange('websites', index)}
                  />
                </FormRow>
              </div>
            </ListItem>
          ))}
        </VerticalList>
      </FormSection>

      {/* 포트폴리오 */}
      <FormSection title="포트폴리오">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="file"
            ref={portfolioInputRef}
            style={{ display: 'none' }}
            accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handlePortfolioFileSelect(file);
                event.target.value = '';
              }
            }}
          />
          {!portfolioFileUrl ? (
            <PortfolioUploadButton
              type="button"
              onClick={() => portfolioInputRef.current?.click()}
            >
              <Small>추가된 파일이 없습니다</Small>
            </PortfolioUploadButton>
          ) : (
            <SuccessText>✓ 포트폴리오 파일이 업로드되었습니다.</SuccessText>
          )}
        </div>
      </FormSection>

      {/* 연락처 */}
      <FormSection title="연락처">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
            />
          </div>
          <ToggleSwitch
            checked={toggles.contact}
            onChange={() => handleToggleChange('contact')}
          />
        </FormRow>
      </FormSection>

      {/* 오픈채팅방 */}
      <FormSection title="오픈채팅방">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요"
              value={formData.openChat}
              onChange={(e) => handleInputChange('openChat', e.target.value)}
            />
          </div>
          <ToggleSwitch
            checked={toggles.openChat}
            onChange={() => handleToggleChange('openChat')}
          />
        </FormRow>
      </FormSection>

      {/* 태그 */}
      <FormSection title="태그">
        <VerticalList showDividers={false}>
          {formData.tags.map((tag, index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <FormRow>
                <HelperText
                  style={{
                    flexShrink: 0,
                    width: '60px',
                  }}
                >
                  {tag.label}
                </HelperText>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TextInput
                    placeholder="내용을 입력해주세요"
                    value={tag.value}
                    onChange={(e) =>
                      handleInputChange('tags', e.target.value, index)
                    }
                  />
                </div>
                <ToggleSwitch
                  checked={toggles.tags[index]}
                  onChange={() => handleToggleChange('tags', index)}
                />
              </FormRow>
            </ListItem>
          ))}
        </VerticalList>
      </FormSection>

      {/* 갤러리 */}
      <FormSection title="갤러리">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {galleryImageUrls.length < 5 && (
            <ImageUpload
              size={120}
              onImageSelect={handleGalleryImageSelect}
            />
          )}
          {galleryImageUrls.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {galleryImageUrls.map((url, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={url}
                    alt={`갤러리 ${index + 1}`}
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid var(--paint-gray)',
                    }}
                  />
                  <button
                    onClick={() => handleGalleryImageRemove(index)}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'var(--error)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {galleryImageUrls.length >= 5 && (
            <HelperText>갤러리 이미지는 최대 5개까지 업로드 가능합니다.</HelperText>
          )}
        </div>
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
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </RegisterPageLayout>
  );
};

export default ModelRegisterPage;

