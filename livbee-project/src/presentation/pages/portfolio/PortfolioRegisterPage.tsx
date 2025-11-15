import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FileUpload from '@/presentation/components/upload/FileUpload';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import Button from '@/presentation/components/ui/Button';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/forms/FormSection';
import FormRow from '@/presentation/components/forms/FormRow';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';

/**
 * 포트폴리오 등록 페이지
 */
const PortfolioRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();

  // portfolioRepository를 useRepository 훅으로 관리
  const portfolioRepository = useRepository(PortfolioRepository);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    registrationType: '',
    name: '',
    oneLineIntro: '',
    detailedIntro: '',
    websites: ['', '', ''],
    recentLiveLink: '',
    contact: '',
    openChat: '',
    tags: ['', '', '', '', ''],
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
  const [resumeFileUrl, setResumeFileUrl] = useState<string>('');
  const [portfolioFileUrl, setPortfolioFileUrl] = useState<string>('');

  // 업로드할 파일 객체 저장 (등록하기 버튼 클릭 시 업로드)
  const [mainThumbnailFile, setMainThumbnailFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string, index?: number) => {
    if (index !== undefined) {
      if (field === 'websites' || field === 'tags') {
        const newArray = [...formData[field as keyof typeof formData] as string[]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
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
   * 이력서 파일 선택 핸들러 (파일만 저장, 업로드는 나중에)
   */
  const handleResumeFileSelect = (file: File) => {
    // 파일 객체 저장
    setResumeFile(file);
    // 파일명 표시용 (URL은 나중에 업로드 후 설정)
    setResumeFileUrl(file.name);
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
   * 폼 제출 핸들러
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 이미지 및 파일들을 Cloudinary에 업로드
      let uploadedMainThumbnailUrl: string | undefined;
      const uploadedGalleryUrls: string[] = [];
      let uploadedAttachedFileUrl: string | undefined;

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

      // 이력서 또는 포트폴리오 파일 업로드 (우선순위: 이력서 > 포트폴리오)
      if (resumeFile) {
        const url = await uploadFile(resumeFile, { type: 'raw' });
        if (!url) {
          showToast('이력서 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedAttachedFileUrl = url;
      } else if (portfolioFile) {
        const url = await uploadFile(portfolioFile, { type: 'raw' });
        if (!url) {
          showToast('포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedAttachedFileUrl = url;
      }

      // 웹사이트 배열을 개별 URL 필드로 매핑
      const websiteUrl = formData.websites[0]?.trim() || undefined;
      const instagramUrl = formData.websites[1]?.trim() || undefined;
      const youtubeUrl = formData.websites[2]?.trim() || undefined;

      // 최근 라이브 링크를 배열로 변환
      const recentLives = formData.recentLiveLink.trim()
        ? [
            {
              url: formData.recentLiveLink.trim(),
              title: undefined,
              date: undefined,
            },
          ]
        : undefined;

      // 요청 데이터 구성
      const request: CreatePortfolioRequest = {
        nickname: formData.name.trim() || undefined,
        oneLineIntro: formData.oneLineIntro.trim() || undefined,
        detailedIntro: formData.detailedIntro.trim() || undefined,
        mainThumbnailUrl: uploadedMainThumbnailUrl,
        subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
        websiteUrl,
        instagramUrl,
        youtubeUrl,
        recentLives,
        attachedFileUrl: uploadedAttachedFileUrl,
        // 기본값은 백엔드에서 설정
        status: 'published',
        publicScope: '전체공개',
        isAgePublic: true,
        isSizingPublic: true,
        isReceivingOffers: true,
      };

      // API 호출
      const response = await portfolioRepository.createPortfolio(request);

      if (response.ok) {
        showToast('포트폴리오가 등록되었습니다.');
        navigate('/portfolios', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '포트폴리오 등록에 실패했습니다.';
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
            <div
              style={{
                fontSize: '12px',
                color: 'var(--dark-gray)',
                marginBottom: '12px',
              }}
            >
              P.농해물과 백두산이 마르고 덮도록
            </div>
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
                  fontSize: '12px',
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
          placeholder="내용을 입력해주세요."
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </FormSection>

      {/* 이름 (두 번째) */}
      <FormSection>
        <TextInput
          label="이름"
          placeholder="내용을 입력해주세요."
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </FormSection>

      {/* 한줄 소개 */}
      <FormSection>
        <TextInput
          label="한줄 소개"
          placeholder="내용을 입력해주세요."
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </FormSection>

      {/* 상세소개 */}
      <FormSection>
        <TextInput
          label="상세소개"
          placeholder="내용을 입력해주세요."
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
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      flexShrink: 0,
                      width: '80px',
                    }}
                  >
                    관리자 입력
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="내용을 입력해주세요."
                      value={formData.websites[index]}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index)
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

      {/* 최근 라이브 링크 */}
      <FormSection>
        <TextInput
          label="최근 라이브 링크"
          placeholder="내용을 입력해주세요."
          value={formData.recentLiveLink}
          onChange={(e) => handleInputChange('recentLiveLink', e.target.value)}
        />
      </FormSection>

      {/* 포트폴리오 */}
      <FormSection title="포트폴리오">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FileUpload
            label="이력서"
            onFileSelect={handleResumeFileSelect}
          />
          {resumeFileUrl && (
            <div style={{ fontSize: '12px', color: 'var(--primary)' }}>
              ✓ 이력서 파일이 업로드되었습니다.
            </div>
          )}
          <FileUpload
            label="포트폴리오"
            onFileSelect={handlePortfolioFileSelect}
          />
          {portfolioFileUrl && (
            <div style={{ fontSize: '12px', color: 'var(--primary)' }}>
              ✓ 포트폴리오 파일이 업로드되었습니다.
            </div>
          )}
        </div>
      </FormSection>

      {/* 연락처 */}
      <FormSection title="연락처">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요."
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
              placeholder="내용을 입력해주세요."
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
          {[0, 1, 2, 3, 4].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <FormRow>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--dark-gray)',
                    flexShrink: 0,
                    width: '80px',
                  }}
                >
                  관리자 입력
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TextInput
                    placeholder="내용을 입력해주세요."
                    value={formData.tags[index]}
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
            <div style={{ fontSize: '12px', color: 'var(--dark-gray)' }}>
              갤러리 이미지는 최대 5개까지 업로드 가능합니다.
            </div>
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

export default PortfolioRegisterPage;

