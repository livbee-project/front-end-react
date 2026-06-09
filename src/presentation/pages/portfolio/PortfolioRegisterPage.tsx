import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileImageSection,
  BasicInfoSection,
  ContactSection,
  SnsSection,
  PortfolioFilesSection,
  TagsSection,
  GallerySection,
} from '@/presentation/components/forms/portfolio/sections';
import { usePortfolioRegisterForm } from '@/presentation/components/forms/portfolio/usePortfolioRegisterForm';
import { LoadingOverlay } from '@/presentation/components/states/LoadingOverlay';
import PortfolioRegisterPreview from '@/presentation/pages/portfolio/components/PortfolioRegisterPreview';
import {
  PortfolioBackLink,
  PortfolioCreateTop,
  PortfolioFormCard,
  PortfolioRegisterActions,
  PortfolioRegisterFormBody,
  PortfolioRegisterFormLayout,
  PortfolioRegisterMain,
  PortfolioRegisterPageRoot,
  PortfolioSectionTitleRow,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

const PortfolioRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    toggles,
    mainThumbnailUrl,
    galleryImageUrls,
    resumeFileUrl,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect,
    handleGalleryImageSelect,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    handlePortfolioFileAdd,
    handleResumeFileRemove,
    handlePortfolioFileRemove,
    handleFileError,
    handleSubmitForm,
  } = usePortfolioRegisterForm();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PortfolioRegisterPageRoot>
      <PortfolioRegisterMain>
        <PortfolioCreateTop>
          <PortfolioBackLink to="/portfolios" aria-label="쇼호스트 목록으로 돌아가기">
            ‹
          </PortfolioBackLink>
          <span>쇼호스트</span>
          <h1>프로필 등록</h1>
          <p>브랜드가 제안할 때 확인하는 공개 프로필입니다. 필수 정보부터 먼저 입력해 주세요.</p>
        </PortfolioCreateTop>

        <form onSubmit={handleSubmitForm}>
          <PortfolioRegisterFormLayout>
            <PortfolioRegisterFormBody>
              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>대표 프로필 사진</h2>
                    <p>쇼호스트 목록과 상세페이지에 가장 먼저 보이는 이미지입니다.</p>
                  </div>
                  <span>3:4</span>
                </PortfolioSectionTitleRow>
                <ProfileImageSection
                  thumbnailUrl={mainThumbnailUrl}
                  onSelectImage={handleProfileImageSelect}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>기본 정보</h2>
                    <p>브랜드가 검색하고 비교할 때 사용하는 핵심 정보입니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <BasicInfoSection
                  name={formData.name}
                  oneLineIntro={formData.oneLineIntro}
                  detailedIntro={formData.detailedIntro}
                  onChange={(field, value) => handleInputChange(field, value)}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>연락처</h2>
                    <p>계약 확정 후에만 브랜드에게 공개됩니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <ContactSection
                  contact={formData.contact}
                  openChat={formData.openChat}
                  contactEnabled={toggles.contact}
                  openChatEnabled={toggles.openChat}
                  onInputChange={(field, value) => handleInputChange(field, value)}
                  onToggleChange={(field) => handleToggleChange(field)}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>SNS · 웹사이트</h2>
                    <p>공개 범위를 설정해 노출 여부를 관리할 수 있습니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <SnsSection
                  websites={formData.websites}
                  websiteToggles={toggles.websites}
                  onInputChange={(value, index) => handleInputChange('websites', value, index)}
                  onToggleChange={(index) => handleToggleChange('websites', index)}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>포트폴리오 파일</h2>
                    <p>상세페이지 포트폴리오 탭에서 확인할 수 있습니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <PortfolioFilesSection
                  resumeFileInfo={resumeFileUrl || null}
                  portfolioFileInfo={portfolioFileUrl || null}
                  onFileAdd={handlePortfolioFileAdd}
                  onResumeRemove={handleResumeFileRemove}
                  onPortfolioRemove={handlePortfolioFileRemove}
                  onFileError={handleFileError}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>태그</h2>
                    <p>검색과 매칭에 활용되는 키워드입니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <TagsSection
                  tags={formData.tags}
                  tagToggles={toggles.tags}
                  onInputChange={(value, index) => handleInputChange('tags', value, index)}
                  onToggleChange={(index) => handleToggleChange('tags', index)}
                />
              </PortfolioFormCard>

              <PortfolioFormCard>
                <PortfolioSectionTitleRow>
                  <div>
                    <h2>갤러리</h2>
                    <p>상세페이지 갤러리 탭에 노출됩니다.</p>
                  </div>
                </PortfolioSectionTitleRow>
                <GallerySection
                  images={galleryImageUrls}
                  onSelectImage={handleGalleryImageSelect}
                  onReplaceImage={handleGalleryImageReplace}
                  onRemoveImage={handleGalleryImageRemove}
                />
              </PortfolioFormCard>

              <PortfolioRegisterActions>
                <button type="button" onClick={handleCancel} disabled={isSubmitting || isImageUploading}>
                  취소
                </button>
                <button type="button" disabled={isSubmitting || isImageUploading}>
                  임시저장
                </button>
                <button type="submit" disabled={isSubmitting || isImageUploading}>
                  {isSubmitting ? '등록 중...' : '등록하기'}
                </button>
              </PortfolioRegisterActions>
            </PortfolioRegisterFormBody>

            <PortfolioRegisterPreview
              name={formData.name}
              oneLineIntro={formData.oneLineIntro}
              profileImageUrl={mainThumbnailUrl}
            />
          </PortfolioRegisterFormLayout>
        </form>
      </PortfolioRegisterMain>

      {isSubmitting ? <LoadingOverlay message="등록 중..." /> : null}
    </PortfolioRegisterPageRoot>
  );
};

export default PortfolioRegisterPage;
