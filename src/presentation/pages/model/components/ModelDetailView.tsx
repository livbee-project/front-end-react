import React, { useMemo, useState } from 'react';
import type { ModelDetail } from '@/domain/entities/Model';
import {
  getModelMockDetailExtra,
  getModelMockGallery,
  getModelMockListItem,
  getModelMockShootMoodCount,
} from '@/data/sources/mocks/modelMockData';
import type { ModelDetailTab } from '@/presentation/pages/model/types/modelView';
import {
  ModelActionRow,
  ModelBasicMeta,
  ModelBioSection,
  ModelDetailMain,
  ModelDetailNavButton,
  ModelDetailPageRoot,
  ModelDetailPhoto,
  ModelDetailShareButton,
  ModelDetailTabs,
  ModelDetailTopbar,
  ModelFileCard,
  ModelFileIcon,
  ModelFileList,
  ModelGalleryGrid,
  ModelInfoList,
  ModelNameRow,
  ModelPrivateCard,
  ModelProfileSection,
  ModelProfileSummary,
  ModelRoleText,
  ModelStatRow,
  ModelTabPanel,
  ModelTagRow,
} from '@/presentation/pages/model/styles/modelDetail.styles';

const DETAIL_TABS: ReadonlyArray<{ key: ModelDetailTab; label: string }> = [
  { key: 'intro', label: '소개' },
  { key: 'portfolio', label: '포트폴리오' },
  { key: 'gallery', label: '갤러리' },
];

interface ModelDetailViewProps {
  model: ModelDetail;
  onOffer?: () => void;
  onShare?: () => void;
}

// test_codex ModelDetailPage 레이아웃 렌더
const ModelDetailView: React.FC<ModelDetailViewProps> = ({ model, onOffer, onShare }) => {
  const [activeTab, setActiveTab] = useState<ModelDetailTab>('intro');
  const listItem = getModelMockListItem(model.id);
  const extra = getModelMockDetailExtra(model.id);
  const galleryImages = useMemo(() => getModelMockGallery(model.id), [model.id]);
  const shootMoodCount = getModelMockShootMoodCount(model.id);

  const meta = [
    listItem?.modelType ?? '확인 중',
    model.height ? `키 ${model.height}cm` : undefined,
    model.detailedRegion ?? listItem?.location ?? '협의 가능',
  ].filter(Boolean);

  const portfolioFiles = [
    {
      id: 'main-file',
      fileName: extra.portfolioFileName,
      fileType: 'PDF' as const,
      fileSize: extra.fileSize,
      uploadedAt: extra.joinedAt,
    },
  ];

  const tags = listItem?.tags ?? extra.tags;

  return (
    <ModelDetailPageRoot>
      <ModelDetailMain>
        <ModelDetailTopbar>
          <ModelDetailNavButton to="/models" aria-label="모델 목록으로 돌아가기">
            ‹
          </ModelDetailNavButton>
          <strong>{model.nickname ?? '모델'}</strong>
          <ModelDetailShareButton type="button" aria-label="공유하기" onClick={onShare}>
            ↗
          </ModelDetailShareButton>
        </ModelDetailTopbar>

        <ModelProfileSection>
          <ModelDetailPhoto>
            <img src={model.mainThumbnailUrl ?? ''} alt={`${model.nickname ?? '모델'} 프로필`} />
          </ModelDetailPhoto>
          <ModelProfileSummary>
            <ModelNameRow>
              <h1>{model.nickname ?? '모델'}</h1>
              <span>M</span>
            </ModelNameRow>
            <ModelRoleText>{extra.mood}</ModelRoleText>
            <ModelBasicMeta>
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </ModelBasicMeta>
          </ModelProfileSummary>
        </ModelProfileSection>

        <ModelStatRow aria-label="모델 활동 요약">
          <div>
            <strong>{portfolioFiles.length}</strong>
            <span>포트폴리오</span>
          </div>
          <div>
            <strong>{shootMoodCount}</strong>
            <span>촬영무드</span>
          </div>
          <div>
            <strong>{galleryImages.length}</strong>
            <span>갤러리</span>
          </div>
        </ModelStatRow>

        <ModelBioSection>
          <strong>{model.oneLineIntro ?? listItem?.summary}</strong>
          {model.detailedIntro ? <p>{model.detailedIntro}</p> : null}
          <p>{extra.mainStrength}</p>
          {tags.length > 0 ? (
            <ModelTagRow>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </ModelTagRow>
          ) : null}
        </ModelBioSection>

        <ModelActionRow>
          <button type="button" onClick={onOffer}>
            제안하기
          </button>
        </ModelActionRow>

        <ModelPrivateCard>
          <div>
            <strong>계약 후 공개 정보</strong>
            <p>계약 확정 전에는 민감한 정보가 노출되지 않습니다.</p>
          </div>
          <span>잠금</span>
        </ModelPrivateCard>

        <ModelDetailTabs aria-label="모델 상세 탭">
          {DETAIL_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={activeTab === tab.key ? 'active' : undefined}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </ModelDetailTabs>

        <ModelTabPanel>
          {activeTab === 'intro' ? (
            <ModelInfoList>
              <div>
                <dt>모델 유형</dt>
                <dd>{listItem?.modelType ?? '확인 중'}</dd>
              </div>
              <div>
                <dt>키</dt>
                <dd>{model.height ? `${model.height}cm` : '미입력'}</dd>
              </div>
              <div>
                <dt>활동 지역</dt>
                <dd>{model.detailedRegion ?? listItem?.location ?? '협의 가능'}</dd>
              </div>
              <div>
                <dt>이미지 무드</dt>
                <dd>{extra.mood}</dd>
              </div>
              <div>
                <dt>가입일</dt>
                <dd>{extra.joinedAt}</dd>
              </div>
              <div>
                <dt>노출 상태</dt>
                <dd>{extra.profileStatus}</dd>
              </div>
            </ModelInfoList>
          ) : null}

          {activeTab === 'portfolio' ? (
            <ModelFileList>
              {portfolioFiles.map((file) => (
                <ModelFileCard key={file.id}>
                  <ModelFileIcon>{file.fileType}</ModelFileIcon>
                  <section>
                    <strong>{file.fileName}</strong>
                    <p>모델 등록페이지에서 업로드한 포트폴리오 파일입니다.</p>
                    <span>
                      {file.fileSize} · 등록일 {file.uploadedAt}
                    </span>
                  </section>
                </ModelFileCard>
              ))}
            </ModelFileList>
          ) : null}

          {activeTab === 'gallery' ? (
            <ModelGalleryGrid>
              {galleryImages.map((image, index) => (
                <button key={`${image}-${index}`} type="button">
                  <img src={image} alt="" />
                </button>
              ))}
            </ModelGalleryGrid>
          ) : null}
        </ModelTabPanel>
      </ModelDetailMain>
    </ModelDetailPageRoot>
  );
};

export default ModelDetailView;
