import React from 'react';
import { PORTFOLIO_PROFILE_CARD_RATIO_LABEL } from '@/presentation/pages/portfolio/config/portfolioRegisterContent';
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

interface PortfolioRegisterPreviewProps {
  name: string;
  oneLineIntro: string;
  profileImageUrl?: string;
  category?: string;
  experienceYears?: number;
  location?: string;
  tags?: string[];
}

// test_codex 목록 카드 미리보기 패널
const PortfolioRegisterPreview: React.FC<PortfolioRegisterPreviewProps> = ({
  name,
  oneLineIntro,
  profileImageUrl,
  category = '카테고리',
  experienceYears = 0,
  location,
  tags = [],
}) => (
  <PortfolioPreviewCard>
    <PortfolioPreviewPanelHeader>
      <span>목록 카드 미리보기</span>
      <small>홈/목록 {PORTFOLIO_PROFILE_CARD_RATIO_LABEL}</small>
    </PortfolioPreviewPanelHeader>

    <PortfolioPreviewCardShell>
      <PortfolioPreviewImage>
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="대표 프로필 카드 미리보기" />
        ) : (
          <span>{PORTFOLIO_PROFILE_CARD_RATIO_LABEL}</span>
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
          <em>{category}</em>
          <em>경력 {experienceYears}년</em>
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

export default PortfolioRegisterPreview;
