import React, { useEffect, useMemo, useState } from 'react';
import type { PortfolioFormData } from '@/presentation/components/forms/portfolio/types';
import PortfolioRegisterPreview from '@/presentation/pages/portfolio/components/PortfolioRegisterPreview';
import {
  PORTFOLIO_PROFILE_CARD_RATIO,
  PORTFOLIO_PROFILE_CARD_RATIO_LABEL,
  PORTFOLIO_REGISTER_CATEGORIES,
  PORTFOLIO_REGISTER_TYPES,
  type PortfolioRegisterVisibility,
} from '@/presentation/pages/portfolio/config/portfolioRegisterContent';
import {
  PortfolioContactPolicyBox,
  PortfolioContactPolicyFormCard,
  PortfolioContactValidationMessage,
  PortfolioCreateField,
  PortfolioFileUploader,
  PortfolioFormCard,
  PortfolioFormFieldGrid,
  PortfolioGalleryLocalPreview,
  PortfolioGalleryPreviewHeader,
  PortfolioGalleryPreviewStrip,
  PortfolioOptionalFormCard,
  PortfolioProfileUploader,
  PortfolioRegisterActions,
  PortfolioRegisterCancelLink,
  PortfolioRegisterFormBody,
  PortfolioSectionTitleRow,
  PortfolioSelectedFileSummary,
  PortfolioSelectedPortfolioCard,
  PortfolioUploadedProfilePreview,
  PortfolioUploadSymbol,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

interface ImageRatioMeta {
  width: number;
  height: number;
  isMatched: boolean;
}

interface PortfolioRegisterFormViewProps {
  formData: PortfolioFormData;
  mainThumbnailUrl?: string;
  galleryImageUrls: string[];
  portfolioFileName?: string | null;
  portfolioFileSize?: number | null;
  resumeFileName?: string | null;
  resumeFileSize?: number | null;
  isSubmitting: boolean;
  isImageUploading: boolean;
  onInputChange: (field: keyof PortfolioFormData, value: string, index?: number) => void;
  onProfileImageSelect: (file: File) => void;
  onGalleryImagesSelect: (files: File[]) => void;
  onPortfolioFileSelect: (file: File) => void;
  onDraftSave: () => void;
  onCancel: () => void;
}

// test_codex HostProfileCreatePage 태그 문자열 파싱
const parseTagsInput = (value: string) =>
  value
    .split(/[#,\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 5);

// test_codex 파일 크기 표시 포맷
const formatDisplayFileSize = (size: number) => {
  if (size >= 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)}MB`;
  if (size >= 1024) return `${Math.round(size / 1024)}KB`;
  return `${size}B`;
};

// 프로필 이미지 비율 안내 문구 생성
const getRatioText = (meta?: ImageRatioMeta) => {
  if (!meta) return '이미지 크기를 확인하고 있어요.';

  const currentRatio = meta.width / meta.height;
  const ratioStatus = meta.isMatched
    ? '목록 카드에 알맞은 비율입니다.'
    : `${PORTFOLIO_PROFILE_CARD_RATIO_LABEL} 카드에 맞춰 중앙 기준으로 잘려 보일 수 있어요.`;

  return `${meta.width}×${meta.height}px · 현재 ${currentRatio.toFixed(2)}:1 · ${ratioStatus}`;
};

// test_codex 기준 쇼호스트 등록 폼 본문
const PortfolioRegisterFormView: React.FC<PortfolioRegisterFormViewProps> = ({
  formData,
  mainThumbnailUrl,
  galleryImageUrls,
  portfolioFileName,
  portfolioFileSize,
  resumeFileName,
  resumeFileSize,
  isSubmitting,
  isImageUploading,
  onInputChange,
  onProfileImageSelect,
  onGalleryImagesSelect,
  onPortfolioFileSelect,
  onDraftSave,
  onCancel,
}) => {
  const [registerType, setRegisterType] = useState<string>(PORTFOLIO_REGISTER_TYPES[0]);
  const [category, setCategory] = useState<string>(PORTFOLIO_REGISTER_CATEGORIES[0]);
  const [experienceYears, setExperienceYears] = useState(1);
  const [location, setLocation] = useState('');
  const [recentLiveTitle, setRecentLiveTitle] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [email, setEmail] = useState('');
  const [visibility, setVisibility] = useState<PortfolioRegisterVisibility>('public');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileRatioMeta, setProfileRatioMeta] = useState<ImageRatioMeta | undefined>();
  const [showContactError, setShowContactError] = useState(false);

  const previewTags = useMemo(() => parseTagsInput(tagsInput), [tagsInput]);
  const hasContractContact = Boolean(formData.contact.trim() || formData.openChat.trim());
  const attachedPortfolioFile = portfolioFileName
    ? { name: portfolioFileName, size: portfolioFileSize ?? 0 }
    : resumeFileName
      ? { name: resumeFileName, size: resumeFileSize ?? 0 }
      : null;

  const requiredProgress = [
    profileFile || mainThumbnailUrl,
    formData.name.trim(),
    category,
    experienceYears,
    formData.oneLineIntro.trim(),
    hasContractContact,
  ].filter(Boolean).length;

  useEffect(() => {
    if (!profileFile) {
      setProfileRatioMeta(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(profileFile);
    const image = new Image();
    image.onload = () => {
      const currentRatio = image.naturalWidth / image.naturalHeight;
      setProfileRatioMeta({
        width: image.naturalWidth,
        height: image.naturalHeight,
        isMatched: Math.abs(currentRatio - PORTFOLIO_PROFILE_CARD_RATIO) <= 0.04,
      });
    };
    image.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile]);

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = parseTagsInput(value);
    tags.forEach((tag, index) => onInputChange('tags', tag, index));
    for (let index = tags.length; index < 5; index += 1) {
      onInputChange('tags', '', index);
    }
  };

  const handleProfileFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    onProfileImageSelect(file);
    event.target.value = '';
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) onGalleryImagesSelect(files);
    event.target.value = '';
  };

  const handlePortfolioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onPortfolioFileSelect(file);
    event.target.value = '';
  };

  return (
    <>
      <PortfolioRegisterFormBody>
        <PortfolioFormCard>
          <PortfolioSectionTitleRow>
            <div>
              <h2>대표 프로필 사진</h2>
              <p>쇼호스트 목록과 상세페이지에 가장 먼저 보이는 이미지입니다.</p>
            </div>
            <span>{PORTFOLIO_PROFILE_CARD_RATIO_LABEL}</span>
          </PortfolioSectionTitleRow>

          <PortfolioProfileUploader $hasFile={Boolean(mainThumbnailUrl)}>
            <input type="file" accept="image/*" onChange={handleProfileFileChange} />
            {mainThumbnailUrl ? (
              <PortfolioUploadedProfilePreview>
                <img src={mainThumbnailUrl} alt="선택한 대표 프로필 미리보기" />
                <span>사진 변경</span>
              </PortfolioUploadedProfilePreview>
            ) : (
              <>
                <PortfolioUploadSymbol>＋</PortfolioUploadSymbol>
                <strong>프로필 사진 선택</strong>
                <p>
                  얼굴이 잘 보이는 상반신 사진을 권장합니다. 목록에서는 {PORTFOLIO_PROFILE_CARD_RATIO_LABEL} 비율로
                  표시됩니다.
                </p>
              </>
            )}
          </PortfolioProfileUploader>

          {profileFile ? (
            <PortfolioSelectedFileSummary $ratioOk={profileRatioMeta?.isMatched}>
              <strong>{profileFile.name}</strong>
              <span>
                {formatDisplayFileSize(profileFile.size)} · {getRatioText(profileRatioMeta)}
              </span>
            </PortfolioSelectedFileSummary>
          ) : null}
        </PortfolioFormCard>

        <PortfolioFormCard>
          <PortfolioSectionTitleRow>
            <div>
              <h2>기본 정보</h2>
              <p>브랜드가 검색하고 비교할 때 사용하는 핵심 정보입니다.</p>
            </div>
            <small>필수 {requiredProgress}/6</small>
          </PortfolioSectionTitleRow>

          <PortfolioFormFieldGrid>
            <PortfolioCreateField>
              <span>
                활동명 <em>*</em>
              </span>
              <input
                placeholder="예: 메이"
                maxLength={20}
                value={formData.name}
                onChange={(event) => onInputChange('name', event.target.value)}
              />
            </PortfolioCreateField>

            <PortfolioCreateField>
              <span>활동 형태</span>
              <select value={registerType} onChange={(event) => setRegisterType(event.target.value)}>
                {PORTFOLIO_REGISTER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </PortfolioCreateField>

            <PortfolioCreateField>
              <span>
                전문 카테고리 <em>*</em>
              </span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {PORTFOLIO_REGISTER_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </PortfolioCreateField>

            <PortfolioCreateField>
              <span>
                라이브 경력 <em>*</em>
              </span>
              <input
                type="number"
                min={0}
                max={30}
                value={experienceYears}
                onChange={(event) => setExperienceYears(Number(event.target.value) || 0)}
              />
            </PortfolioCreateField>
          </PortfolioFormFieldGrid>

          <PortfolioCreateField>
            <span>활동 가능 지역</span>
            <input
              placeholder="예: 서울 / 수도권 / 전국 가능"
              maxLength={30}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </PortfolioCreateField>
        </PortfolioFormCard>

        <PortfolioFormCard>
          <PortfolioSectionTitleRow>
            <div>
              <h2>프로필 소개</h2>
              <p>진행 톤과 강점이 잘 드러날수록 제안 가능성이 높아집니다.</p>
            </div>
          </PortfolioSectionTitleRow>

          <PortfolioCreateField>
            <span>
              한 줄 소개 <em>*</em>
            </span>
            <input
              placeholder="예: 밝고 자연스러운 진행으로 제품의 매력을 쉽게 전달합니다."
              maxLength={80}
              value={formData.oneLineIntro}
              onChange={(event) => onInputChange('oneLineIntro', event.target.value)}
            />
            <b>{formData.oneLineIntro.length}/80</b>
          </PortfolioCreateField>

          <PortfolioCreateField>
            <span>상세 소개</span>
            <textarea
              placeholder="주요 진행 카테고리, 말투와 진행 스타일, 강점, 라이브 경험을 구체적으로 작성해주세요."
              maxLength={500}
              value={formData.detailedIntro}
              onChange={(event) => onInputChange('detailedIntro', event.target.value)}
            />
            <b>{formData.detailedIntro.length}/500</b>
          </PortfolioCreateField>

          <PortfolioCreateField>
            <span>검색 태그</span>
            <input
              placeholder="#뷰티 #라이브커머스 #차분한진행 #식품전문"
              value={tagsInput}
              onChange={(event) => handleTagsChange(event.target.value)}
            />
            <b>최대 5개</b>
          </PortfolioCreateField>
        </PortfolioFormCard>

        <PortfolioOptionalFormCard>
          <PortfolioSectionTitleRow>
            <div>
              <h2>활동 자료</h2>
              <p>최근 라이브와 포트폴리오를 등록하면 브랜드가 역량을 더 빠르게 확인할 수 있습니다.</p>
            </div>
          </PortfolioSectionTitleRow>

          <PortfolioCreateField>
            <span>최근 진행 라이브 제목</span>
            <input
              placeholder="예: 톤업 선케어 신제품 라이브"
              maxLength={60}
              value={recentLiveTitle}
              onChange={(event) => setRecentLiveTitle(event.target.value)}
            />
            <b>{recentLiveTitle.length}/60</b>
          </PortfolioCreateField>

          <PortfolioCreateField>
            <span>최근 진행 라이브 링크</span>
            <input
              type="url"
              placeholder="라이브 다시보기 또는 포트폴리오 링크를 입력해주세요."
              value={formData.recentLiveLink}
              onChange={(event) => onInputChange('recentLiveLink', event.target.value)}
            />
          </PortfolioCreateField>

          <PortfolioFileUploader $hasFile={Boolean(attachedPortfolioFile)}>
            <input type="file" accept=".pdf,.ppt,.pptx,.jpg,.png" onChange={handlePortfolioFileChange} />
            {attachedPortfolioFile ? (
              <PortfolioSelectedPortfolioCard>
                <span>업로드 완료</span>
                <strong>{attachedPortfolioFile.name}</strong>
                <p>
                  {formatDisplayFileSize(attachedPortfolioFile.size)} · 브랜드가 포트폴리오 탭에서 확인합니다.
                </p>
              </PortfolioSelectedPortfolioCard>
            ) : (
              <>
                <PortfolioUploadSymbol $small>＋</PortfolioUploadSymbol>
                <strong>포트폴리오 파일 첨부</strong>
                <p>소개서, 제안서, 진행 이력 파일을 PDF/PPT/이미지로 등록할 수 있습니다.</p>
              </>
            )}
          </PortfolioFileUploader>

          <PortfolioFileUploader $compact $hasFile={galleryImageUrls.length > 0}>
            <input type="file" multiple accept="image/*" onChange={handleGalleryChange} />
            {galleryImageUrls.length > 0 ? (
              <PortfolioGalleryLocalPreview>
                <PortfolioGalleryPreviewHeader>
                  <strong>갤러리 이미지 {galleryImageUrls.length}개 선택</strong>
                  <p>상세페이지 갤러리에서 이미지가 노출됩니다.</p>
                </PortfolioGalleryPreviewHeader>
                <PortfolioGalleryPreviewStrip>
                  {galleryImageUrls.map((url, index) => (
                    <figure key={`${url}-${index}`}>
                      <img src={url} alt="" />
                      <figcaption>#{index + 1}</figcaption>
                    </figure>
                  ))}
                </PortfolioGalleryPreviewStrip>
              </PortfolioGalleryLocalPreview>
            ) : (
              <>
                <PortfolioUploadSymbol $small>＋</PortfolioUploadSymbol>
                <strong>갤러리 이미지 추가</strong>
                <p>방송 현장, 제품 시연, 프로필 이미지를 추가로 보여줄 수 있습니다.</p>
              </>
            )}
          </PortfolioFileUploader>
        </PortfolioOptionalFormCard>

        <PortfolioContactPolicyFormCard>
          <PortfolioSectionTitleRow>
            <div>
              <h2>계약 후 연락 정보</h2>
              <p>계약이 확정된 브랜드에게만 공개되는 안전 연락 정보입니다.</p>
            </div>
            <small>계약 전 비공개</small>
          </PortfolioSectionTitleRow>

          <PortfolioContactPolicyBox>
            <strong>연락처 또는 오픈채팅 링크 중 1개 이상 입력</strong>
            <p>개인 간 무단 연락을 막기 위해 계약 확정 전에는 어떤 연락처도 공개하지 않습니다.</p>
          </PortfolioContactPolicyBox>

          <PortfolioFormFieldGrid>
            <PortfolioCreateField>
              <span>
                연락처 <em>*</em>
              </span>
              <input
                placeholder="010-0000-0000"
                value={formData.contact}
                onChange={(event) => {
                  setShowContactError(false);
                  onInputChange('contact', event.target.value);
                }}
              />
            </PortfolioCreateField>

            <PortfolioCreateField>
              <span>
                오픈채팅 링크 <em>*</em>
              </span>
              <input
                placeholder="카카오 오픈채팅 링크를 입력해주세요."
                value={formData.openChat}
                onChange={(event) => {
                  setShowContactError(false);
                  onInputChange('openChat', event.target.value);
                }}
              />
            </PortfolioCreateField>
          </PortfolioFormFieldGrid>

          {!hasContractContact && showContactError ? (
            <PortfolioContactValidationMessage>
              계약 후 연락을 위해 연락처 또는 오픈채팅 링크 중 하나를 입력해주세요.
            </PortfolioContactValidationMessage>
          ) : null}

          <PortfolioCreateField>
            <span>이메일</span>
            <input
              type="email"
              placeholder="브랜드 제안 알림을 받을 이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </PortfolioCreateField>

          <PortfolioCreateField>
            <span>
              프로필 공개 설정 <em>*</em>
            </span>
            <select
              value={visibility}
              onChange={(event) => setVisibility(event.target.value as PortfolioRegisterVisibility)}
            >
              <option value="public">공개 - 목록과 검색에 노출, 연락처는 계약 전 비공개</option>
              <option value="private">비공개 - 관리자 검토용으로만 저장</option>
            </select>
          </PortfolioCreateField>
        </PortfolioContactPolicyFormCard>
      </PortfolioRegisterFormBody>

      <PortfolioRegisterPreview
        name={formData.name}
        oneLineIntro={formData.oneLineIntro}
        profileImageUrl={mainThumbnailUrl}
        category={category}
        experienceYears={experienceYears}
        location={location}
        tags={previewTags}
      />

      <PortfolioRegisterActions>
        <PortfolioRegisterCancelLink type="button" onClick={onCancel} disabled={isSubmitting || isImageUploading}>
          취소
        </PortfolioRegisterCancelLink>
        <button type="button" onClick={onDraftSave} disabled={isSubmitting || isImageUploading}>
          임시저장
        </button>
        <button type="submit" disabled={isSubmitting || isImageUploading}>
          {isSubmitting ? '등록 중...' : '프로필 등록'}
        </button>
      </PortfolioRegisterActions>
    </>
  );
};

export default PortfolioRegisterFormView;
