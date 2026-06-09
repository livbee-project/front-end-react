import React, { useMemo, useState } from 'react';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import {
  getPortfolioMockDetailExtra,
  getPortfolioMockGallery,
} from '@/data/sources/mocks/portfolioMockData';
import type { PortfolioDetailTab } from '@/presentation/pages/portfolio/types/portfolioView';
import {
  PortfolioActionRow,
  PortfolioBasicMeta,
  PortfolioBioSection,
  PortfolioDetailMain,
  PortfolioDetailNavButton,
  PortfolioDetailPageRoot,
  PortfolioDetailPhoto,
  PortfolioDetailShareButton,
  PortfolioDetailTabs,
  PortfolioDetailTopbar,
  PortfolioFileCard,
  PortfolioFileIcon,
  PortfolioFileList,
  PortfolioGalleryGrid,
  PortfolioInfoList,
  PortfolioLiveLinkCard,
  PortfolioLiveLinkList,
  PortfolioNameRow,
  PortfolioPrivateCard,
  PortfolioProfileSection,
  PortfolioProfileSummary,
  PortfolioRoleText,
  PortfolioStatRow,
  PortfolioTabPanel,
  PortfolioTagRow,
} from '@/presentation/pages/portfolio/styles/portfolioDetail.styles';

const DETAIL_TABS: ReadonlyArray<{ key: PortfolioDetailTab; label: string }> = [
  { key: 'intro', label: '소개' },
  { key: 'portfolio', label: '포트폴리오' },
  { key: 'live', label: '라이브' },
  { key: 'gallery', label: '갤러리' },
];

interface PortfolioDetailViewProps {
  portfolio: PortfolioDetail;
  listItemCategory?: string;
  onOffer?: () => void;
  onShare?: () => void;
}

// test_codex HostDetailPage 레이아웃 렌더
const PortfolioDetailView: React.FC<PortfolioDetailViewProps> = ({
  portfolio,
  listItemCategory,
  onOffer,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<PortfolioDetailTab>('intro');
  const extra = getPortfolioMockDetailExtra(portfolio.id);
  const galleryImages = useMemo(() => getPortfolioMockGallery(portfolio.id), [portfolio.id]);

  const category = listItemCategory ?? extra.tags[0] ?? '확인 중';
  const meta = [
    category,
    portfolio.experienceYears ? `경력 ${portfolio.experienceYears}년` : '경력 확인 중',
    portfolio.detailedRegion ?? extra.location ?? '협의 가능',
    extra.responseTone,
  ].filter(Boolean);

  const portfolioFiles = [
    {
      id: 'main-file',
      fileName: extra.portfolioFileName,
      fileType: 'PDF' as const,
      fileSize: '2.4MB',
      uploadedAt: extra.joinedAt,
    },
  ];

  const recentLiveLinks = [
    {
      id: 'recent-live',
      title: extra.recentLiveTitle,
      url: extra.recentLiveUrl,
      label: extra.liveUrlLabel,
      uploadedAt: extra.joinedAt,
    },
  ];

  return (
    <PortfolioDetailPageRoot>
      <PortfolioDetailMain>
        <PortfolioDetailTopbar>
          <PortfolioDetailNavButton to="/portfolios" aria-label="목록으로 돌아가기">
            ‹
          </PortfolioDetailNavButton>
          <strong>{portfolio.nickname ?? '쇼호스트'}</strong>
          <PortfolioDetailShareButton type="button" aria-label="공유하기" onClick={onShare}>
            ↗
          </PortfolioDetailShareButton>
        </PortfolioDetailTopbar>

        <PortfolioProfileSection>
          <PortfolioDetailPhoto>
            <img
              src={portfolio.mainThumbnailUrl ?? ''}
              alt={`${portfolio.nickname ?? '쇼호스트'} 프로필`}
            />
          </PortfolioDetailPhoto>
          <PortfolioProfileSummary>
            <PortfolioNameRow>
              <h1>{portfolio.nickname}</h1>
              <span>M</span>
            </PortfolioNameRow>
            <PortfolioRoleText>{extra.registerType}</PortfolioRoleText>
            <PortfolioBasicMeta>
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </PortfolioBasicMeta>
          </PortfolioProfileSummary>
        </PortfolioProfileSection>

        <PortfolioStatRow aria-label="쇼호스트 활동 요약">
          <div>
            <strong>{portfolioFiles.length}</strong>
            <span>포트폴리오</span>
          </div>
          <div>
            <strong>{recentLiveLinks.length}</strong>
            <span>라이브</span>
          </div>
          <div>
            <strong>{galleryImages.length}</strong>
            <span>갤러리</span>
          </div>
        </PortfolioStatRow>

        <PortfolioBioSection>
          <strong>{portfolio.oneLineIntro}</strong>
          {portfolio.detailedIntro ? <p>{portfolio.detailedIntro}</p> : null}
          <p>{extra.mainStrength}</p>
          {extra.tags.length > 0 ? (
            <PortfolioTagRow>
              {extra.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </PortfolioTagRow>
          ) : null}
        </PortfolioBioSection>

        <PortfolioActionRow>
          <button type="button" onClick={onOffer}>
            제안하기
          </button>
        </PortfolioActionRow>

        <PortfolioPrivateCard>
          <div>
            <strong>계약 후 공개 정보</strong>
            <p>계약 확정 전에는 민감한 정보가 노출되지 않습니다.</p>
          </div>
          <span>잠금</span>
        </PortfolioPrivateCard>

        <PortfolioDetailTabs aria-label="상세 탭">
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
        </PortfolioDetailTabs>

        <PortfolioTabPanel>
          {activeTab === 'intro' ? (
            <PortfolioInfoList>
              <div>
                <dt>전문 카테고리</dt>
                <dd>{category}</dd>
              </div>
              <div>
                <dt>경력</dt>
                <dd>{portfolio.experienceYears ?? 1}년</dd>
              </div>
              <div>
                <dt>활동 지역</dt>
                <dd>{portfolio.detailedRegion ?? extra.location ?? '협의 가능'}</dd>
              </div>
              <div>
                <dt>등록구분</dt>
                <dd>{extra.registerType}</dd>
              </div>
              <div>
                <dt>진행 톤</dt>
                <dd>{extra.responseTone}</dd>
              </div>
              <div>
                <dt>가입일</dt>
                <dd>{extra.joinedAt}</dd>
              </div>
              <div>
                <dt>노출 상태</dt>
                <dd>{extra.profileStatus}</dd>
              </div>
            </PortfolioInfoList>
          ) : null}

          {activeTab === 'portfolio' ? (
            <PortfolioFileList>
              {portfolioFiles.map((file) => (
                <PortfolioFileCard key={file.id}>
                  <PortfolioFileIcon>{file.fileType}</PortfolioFileIcon>
                  <section>
                    <strong>{file.fileName}</strong>
                    <p>쇼호스트 등록페이지에서 업로드한 포트폴리오 파일입니다.</p>
                    <span>
                      {file.fileSize} · 등록일 {file.uploadedAt}
                    </span>
                  </section>
                </PortfolioFileCard>
              ))}
            </PortfolioFileList>
          ) : null}

          {activeTab === 'live' ? (
            <PortfolioLiveLinkList>
              {recentLiveLinks.map((live) => (
                <PortfolioLiveLinkCard
                  key={live.id}
                  href={live.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PortfolioFileIcon>URL</PortfolioFileIcon>
                  <section>
                    <strong>{live.title}</strong>
                    <p>{live.url}</p>
                    <span>
                      {live.label} · 등록일 {live.uploadedAt}
                    </span>
                  </section>
                </PortfolioLiveLinkCard>
              ))}
            </PortfolioLiveLinkList>
          ) : null}

          {activeTab === 'gallery' ? (
            <PortfolioGalleryGrid>
              {galleryImages.map((image, index) => (
                <button key={`${image}-${index}`} type="button">
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </PortfolioGalleryGrid>
          ) : null}
        </PortfolioTabPanel>
      </PortfolioDetailMain>
    </PortfolioDetailPageRoot>
  );
};

export default PortfolioDetailView;
