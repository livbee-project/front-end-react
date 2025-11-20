import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  Upload,
  Plus,
  Youtube,
  Instagram,
  Video,
  FileText,
  X,
} from 'lucide-react';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';
import { H1, H2, P, PMuted, Small, Caption } from '@/presentation/components/styled/Typography';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 40px 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30px 16px;
  }
`;

const FormContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 12px 32px rgba(3, 2, 19, 0.06);
  padding: 40px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.section`
  padding: 30px 0;
  border-bottom: 1px solid #e5e7eb;
  &:last-of-type {
    border-bottom: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 0;
  }
`;

const SectionTitle = styled(H1)`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const SectionDescription = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const ProfileLabel = styled(PMuted)``;

const ProfileTitle = styled(H2)`
  font-weight: 600;
`;

const ProfileHint = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
`;

const ProfileImageWrapper = styled.button<{ $hasImage: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#f5f5f5')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 1;
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.02);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.2s;
  ${ProfileImageWrapper}:hover & {
    opacity: 1;
  }
`;

const OverlayText = styled(H2)`
  font-weight: 500;
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font: ${({ theme }) => theme.fonts.body};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LabelText = styled(H2)`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LabelNote = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const underlineField = css`
  width: 100%;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  padding: ${({ theme }) => theme.spacing.md} 0;
  font: ${({ theme }) => theme.fonts.body};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  &::placeholder {
    color: #9ca3af;
    font-weight: 300;
  }
  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const StyledInput = styled.input`
  ${underlineField}
`;

const StyledTextarea = styled.textarea`
  ${underlineField};
  min-height: 120px;
  resize: vertical;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SnsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SnsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SnsIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const SnsInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SnsLabel = styled(H2)`
  font-weight: 500;
`;

const SnsInput = styled.input`
  ${underlineField};
  font: ${({ theme }) => theme.fonts.body};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const PortfolioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.2s, background-color 0.2s;
  &:hover {
    background: #f5f5f5;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FileIcon = styled.div<{ $variant: 'video' | 'file' }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.primary}1a`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled(P)`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #ffeeee;
    color: #ff4d4f;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TagLabel = styled.span`
  min-width: 80px;
  font-size: 15px;
  font-weight: 500;
`;

const TagInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TagInput = styled.input`
  ${underlineField};
  font-size: 15px;
  padding: 8px 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 8px;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  cursor: pointer;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background 0.2s, color 0.2s;
  &:hover {
    transform: scale(1.1);
    background: #ff4d4f;
    color: #ffffff;
  }
`;

const AddImageButton = styled.button`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}0d`};
  }
`;

const ButtonGroup = styled.div`
  padding-top: 30px;
  margin-top: 40px;
  border-top: 1px solid #e5e7eb;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primaryOpacity['25']};
  }
`;

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
    if (index !== undefined && (field === 'websites' || field === 'tags')) {
      const currentArray = formData[field as keyof typeof formData] as string[];
      const newArray = [...currentArray];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
      return;
      }
      setFormData({ ...formData, [field]: value });
  };

  const handleToggleChange = (field: string, index?: number) => {
    if (index !== undefined) {
      const currentArray = toggles[field as keyof typeof toggles] as boolean[];
      const newArray = [...currentArray];
      newArray[index] = !newArray[index];
      setToggles({ ...toggles, [field]: newArray });
      return;
    }
    setToggles({ ...toggles, [field]: !toggles[field as keyof typeof toggles] });
  };

  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const portfolioInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 프로필 이미지 선택 핸들러
   */
  const handleProfileImageSelect = (file: File) => {
    setMainThumbnailFile(file);
    const blobUrl = URL.createObjectURL(file);
    setMainThumbnailUrl(blobUrl);
  };

  const handleGalleryImageSelect = (file: File) => {
    if (galleryImageFiles.length >= 9) {
      showToast('갤러리 이미지는 최대 9개까지 업로드 가능합니다.', undefined, 'error');
      return;
    }
    setGalleryImageFiles((prev) => [...prev, file]);
    const blobUrl = URL.createObjectURL(file);
    setGalleryImageUrls((prev) => [...prev, blobUrl]);
  };

  const handlePortfolioFileAdd = (file: File) => {
    if (file.type.startsWith('video')) {
      setPortfolioFile(file);
      setPortfolioFileUrl(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    } else {
    setResumeFile(file);
      setResumeFileUrl(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  };

  const handleResumeFileRemove = () => {
    setResumeFile(null);
    setResumeFileUrl('');
  };

  const handlePortfolioFileRemove = () => {
    setPortfolioFile(null);
    setPortfolioFileUrl('');
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

  const snsEntries = useMemo(
    () => [
      {
        id: 0,
        label: '유튜브',
        placeholder: 'https://youtube.com/...',
        icon: Youtube,
      },
      {
        id: 1,
        label: '인스타그램',
        placeholder: 'https://instagram.com/...',
        icon: Instagram,
      },
      {
        id: 2,
        label: '틱톡',
        placeholder: 'https://tiktok.com/@...',
        icon: Video,
      },
    ],
    []
  );

  const tagEntries = useMemo(
    () => [
      { id: 0, label: '키', placeholder: '165cm' },
      { id: 1, label: '몸무게', placeholder: '50kg' },
      { id: 2, label: '사이즈', placeholder: '55' },
      { id: 3, label: '경력', placeholder: '5년' },
      { id: 4, label: '나이', placeholder: '25세' },
    ],
    []
  );

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitting && !isImageUploading) {
      handleSubmit();
    }
  };

  const renderFileItem = (type: 'resume' | 'portfolio', fileLabel: string, fileInfo: string) => {
    if (!fileInfo) return null;
    const isVideo = type === 'portfolio';
  return (
      <PortfolioItem key={type}>
        <FileIcon $variant={isVideo ? 'video' : 'file'}>
          {isVideo ? <Video size={20} /> : <FileText size={20} />}
        </FileIcon>
        <FileInfo>
          <FileName>{fileInfo.split(' (')[0]}</FileName>
          <FileSize>{fileInfo.split(' (')[1] ? fileInfo.split(' (')[1].replace(')', '') : ''}</FileSize>
        </FileInfo>
        <RemoveButton
          type="button"
          onClick={type === 'resume' ? handleResumeFileRemove : handlePortfolioFileRemove}
          aria-label={`${fileLabel} 삭제`}
        >
          <X size={18} />
        </RemoveButton>
      </PortfolioItem>
    );
  };

  return (
    <PageWrapper>
      <FormContainer>
        <Form onSubmit={handleSubmitForm}>
      <FormSection>
            <SectionTitle>프로필 사진</SectionTitle>
            <SectionDescription>활동 시 사용할 대표 이미지를 등록해주세요.</SectionDescription>
            <ProfileSection>
              <ProfileInfo>
                <ProfileLabel>대표 프로필</ProfileLabel>
                <ProfileTitle>프로필 사진을 업로드하세요</ProfileTitle>
                <ProfileHint>최대 10MB, JPG/PNG 권장</ProfileHint>
              </ProfileInfo>
              <ProfileImageWrapper
                onClick={() => profileInputRef.current?.click()}
                $hasImage={Boolean(mainThumbnailUrl)}
              >
          {mainThumbnailUrl ? (
                  <>
                    <ProfileImage src={mainThumbnailUrl} alt="프로필 미리보기" />
                    <ProfileOverlay>
                      <OverlayText>변경하기</OverlayText>
                    </ProfileOverlay>
                  </>
                ) : (
                  <>
                    <Upload size={40} />
                    <span>이미지 업로드</span>
                  </>
                )}
                <HiddenInput
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleProfileImageSelect(file);
                      event.target.value = '';
                    }
                  }}
                />
              </ProfileImageWrapper>
            </ProfileSection>
      </FormSection>

      <FormSection>
            <SectionTitle>등록 구분</SectionTitle>
            <StyledSelect
          value={formData.registrationType}
              onChange={(event) => handleInputChange('registrationType', event.target.value)}
            >
              <option value="">등록 유형을 선택하세요</option>
              <option value="showhost">쇼호스트 - 라이브 커머스 진행</option>
              <option value="model">모델 - 촬영 및 홍보 활동</option>
            </StyledSelect>
      </FormSection>

      <FormSection>
            <SectionTitle>기본 정보</SectionTitle>
            <SectionDescription>소개에 사용할 기본 정보를 입력해주세요.</SectionDescription>
            <InputGroup>
              <label>
                <LabelText>이름</LabelText>
                <StyledInput
          value={formData.name}
                  onChange={(event) => handleInputChange('name', event.target.value)}
                  placeholder="이름을 입력해주세요."
                />
              </label>

              <label>
                <LabelText>
                  한 줄 소개
                  <LabelNote>최대 50자까지 입력 가능</LabelNote>
                </LabelText>
                <StyledInput
          value={formData.oneLineIntro}
                  onChange={(event) => handleInputChange('oneLineIntro', event.target.value.slice(0, 50))}
                  placeholder="예) 패션 전문 라이브 쇼호스트"
                />
              </label>

              <label>
                <LabelText>상세 소개</LabelText>
                <StyledTextarea
          value={formData.detailedIntro}
                  onChange={(event) => handleInputChange('detailedIntro', event.target.value)}
                  placeholder="활동 이력, 전문 분야 등을 자세히 작성해주세요."
        />
              </label>
            </InputGroup>
      </FormSection>

      <FormSection>
            <SectionTitle>연락처</SectionTitle>
            <SectionDescription>브랜드와의 원활한 소통을 위해 정확히 입력해주세요.</SectionDescription>
            <InputGroup>
              <label>
                <LabelText>
                  연락처
                  <LabelNote>계약 완료 시 브랜드에 전달됩니다</LabelNote>
                </LabelText>
                <FieldRow>
                  <StyledInput
                    value={formData.contact}
                    onChange={(event) => handleInputChange('contact', event.target.value)}
                    placeholder="010-1234-5678"
                    disabled={!toggles.contact}
                  />
                  <ToggleSwitch checked={toggles.contact} onChange={() => handleToggleChange('contact')} />
                </FieldRow>
              </label>

              <label>
                <LabelText>오픈채팅방</LabelText>
                <FieldRow>
                  <StyledInput
                    value={formData.openChat}
                    onChange={(event) => handleInputChange('openChat', event.target.value)}
                    placeholder="https://open.kakao.com/..."
                    disabled={!toggles.openChat}
                  />
                  <ToggleSwitch checked={toggles.openChat} onChange={() => handleToggleChange('openChat')} />
                </FieldRow>
              </label>
            </InputGroup>
      </FormSection>

          <FormSection>
            <SectionTitle>SNS / 사이트</SectionTitle>
            <SectionDescription>활동 채널을 등록하면 검색 노출이 향상돼요.</SectionDescription>
            <SnsGroup>
              {snsEntries.map((sns) => (
                <SnsItem key={sns.id}>
                  <SnsIconWrapper>
                    <sns.icon size={20} />
                  </SnsIconWrapper>
                  <SnsInputWrapper>
                    <SnsLabel>{sns.label}</SnsLabel>
                    <SnsInput
                      value={formData.websites[sns.id]}
                      onChange={(event) => handleInputChange('websites', event.target.value, sns.id)}
                      placeholder={sns.placeholder}
                      disabled={!toggles.websites[sns.id]}
                    />
                  </SnsInputWrapper>
          <ToggleSwitch
                    checked={toggles.websites[sns.id]}
                    onChange={() => handleToggleChange('websites', sns.id)}
          />
                </SnsItem>
              ))}
            </SnsGroup>
      </FormSection>

          <FormSection>
            <SectionTitle>포트폴리오</SectionTitle>
            <SectionDescription>PDF, 영상 등 관련 자료를 업로드해주세요.</SectionDescription>
            <HiddenInput
              ref={portfolioInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  handlePortfolioFileAdd(file);
                  event.target.value = '';
                }
              }}
            />

            <PortfolioList>
              {!resumeFileUrl && !portfolioFileUrl && (
                <EmptyState
                  as="button"
                  type="button"
                  onClick={() => portfolioInputRef.current?.click()}
                  style={{ cursor: 'pointer' }}
                >
                  <Upload size={24} />
                  <div>추가된 파일이 없습니다</div>
                </EmptyState>
              )}

              {renderFileItem('resume', '이력서', resumeFileUrl)}
              {renderFileItem('portfolio', '포트폴리오', portfolioFileUrl)}
            </PortfolioList>
      </FormSection>

          <FormSection>
            <SectionTitle>태그</SectionTitle>
            <SectionDescription>키, 사이즈 등 공개하고 싶은 정보를 선택하세요.</SectionDescription>
            <TagList>
              {tagEntries.map((tag) => (
                <TagItem key={tag.id}>
                  <TagLabel>{tag.label}</TagLabel>
                  <TagInputWrapper>
                    <TagInput
                      value={formData.tags[tag.id]}
                      onChange={(event) => handleInputChange('tags', event.target.value, tag.id)}
                      placeholder={tag.placeholder}
                      disabled={!toggles.tags[tag.id]}
                    />
                <ToggleSwitch
                      checked={toggles.tags[tag.id]}
                      onChange={() => handleToggleChange('tags', tag.id)}
                />
                  </TagInputWrapper>
                </TagItem>
          ))}
            </TagList>
      </FormSection>

          <FormSection>
            <SectionTitle>갤러리</SectionTitle>
            <SectionDescription>최대 9장의 활동 이미지를 등록할 수 있습니다.</SectionDescription>
            <GalleryGrid>
              {galleryImageUrls.map((url, index) => (
                <GalleryItem key={url}>
                  <GalleryImage src={url} alt={`갤러리 ${index + 1}`} />
                  <GalleryOverlay>
                    <DeleteButton type="button" onClick={() => handleGalleryImageRemove(index)}>
                      <X size={18} />
                    </DeleteButton>
                  </GalleryOverlay>
                </GalleryItem>
              ))}
              {galleryImageUrls.length < 9 && (
                <AddImageButton type="button" onClick={() => galleryInputRef.current?.click()}>
                  <Plus size={28} />
                  <span>추가</span>
                  <HiddenInput
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        handleGalleryImageSelect(file);
                        event.target.value = '';
                      }
                    }}
                  />
                </AddImageButton>
              )}
            </GalleryGrid>
      </FormSection>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={isSubmitting || isImageUploading}>
              {isSubmitting ? '등록 중...' : '등록하기'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </PageWrapper>
  );
};

export default PortfolioRegisterPage;

