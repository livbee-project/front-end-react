import React from 'react';
import { MODEL_PROFILE_CARD_RATIO_LABEL } from '@/presentation/pages/model/config/modelRegisterContent';
import {
  PortfolioPreviewCard,
  PortfolioPreviewCardBody,
  PortfolioPreviewCardShell,
  PortfolioPreviewChipRow,
  PortfolioPreviewImage,
  PortfolioPreviewPanelHeader,
  PortfolioPreviewSummary,
  PortfolioPreviewTagRow,
  PortfolioPreviewTitleRow,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

interface ModelRegisterPreviewProps {
  name: string;
  oneLineIntro: string;
  profileImageUrl?: string;
  modelType?: string;
  height?: number;
  location?: string;
  tags?: string[];
}

// test_codex 모델 목록 카드 미리보기 패널
const ModelRegisterPreview: React.FC<ModelRegisterPreviewProps> = ({
  name,
  oneLineIntro,
  profileImageUrl,
  modelType = '모델 유형',
  height,
  location,
  tags = [],
}) => (
  <PortfolioPreviewCard>
    <PortfolioPreviewPanelHeader>
      <span>목록 카드 미리보기</span>
      <small>홈/목록 {MODEL_PROFILE_CARD_RATIO_LABEL}</small>
    </PortfolioPreviewPanelHeader>

    <PortfolioPreviewCardShell>
      <PortfolioPreviewImage>
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="모델 프로필 카드 미리보기" />
        ) : (
          <span>{MODEL_PROFILE_CARD_RATIO_LABEL}</span>
        )}
      </PortfolioPreviewImage>

      <PortfolioPreviewCardBody>
        <PortfolioPreviewTitleRow>
          <strong>{name || '활동명'}</strong>
          <em>M</em>
        </PortfolioPreviewTitleRow>
        <PortfolioPreviewSummary>
          {oneLineIntro || '브랜드에게 보여질 한 줄 소개가 표시됩니다.'}
        </PortfolioPreviewSummary>
        <PortfolioPreviewChipRow>
          <em>{modelType}</em>
          {height ? <em>키 {height}cm</em> : null}
          {location ? <em>{location}</em> : null}
        </PortfolioPreviewChipRow>
        {tags.length > 0 ? (
          <PortfolioPreviewTagRow>
            {tags.map((tag) => (
              <i key={tag}>#{tag}</i>
            ))}
          </PortfolioPreviewTagRow>
        ) : null}
      </PortfolioPreviewCardBody>
    </PortfolioPreviewCardShell>
  </PortfolioPreviewCard>
);

export default ModelRegisterPreview;
