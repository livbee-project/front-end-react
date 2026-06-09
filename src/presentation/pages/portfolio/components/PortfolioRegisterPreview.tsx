import React from 'react';
import {
  PortfolioPreviewCard,
  PortfolioPreviewChips,
  PortfolioPreviewImage,
  PortfolioPreviewSummary,
  PortfolioPreviewTitleRow,
} from '@/presentation/pages/portfolio/styles/portfolioRegister.styles';

interface PortfolioRegisterPreviewProps {
  name: string;
  oneLineIntro: string;
  profileImageUrl?: string;
  experienceLabel?: string;
}

// 등록 폼 실시간 미리보기 카드
const PortfolioRegisterPreview: React.FC<PortfolioRegisterPreviewProps> = ({
  name,
  oneLineIntro,
  profileImageUrl,
  experienceLabel = '경력 미입력',
}) => (
  <PortfolioPreviewCard>
    <span>미리보기</span>
    <PortfolioPreviewImage>
      {profileImageUrl ? (
        <img src={profileImageUrl} alt="" />
      ) : (
        '3:4 이미지'
      )}
    </PortfolioPreviewImage>
    <PortfolioPreviewTitleRow>
      <strong>{name || '활동명'}</strong>
      <em>M</em>
    </PortfolioPreviewTitleRow>
    <PortfolioPreviewSummary>
      {oneLineIntro || '한줄 소개가 여기에 표시됩니다.'}
    </PortfolioPreviewSummary>
    <PortfolioPreviewChips>
      <span>쇼호스트</span>
      <span>{experienceLabel}</span>
    </PortfolioPreviewChips>
  </PortfolioPreviewCard>
);

export default PortfolioRegisterPreview;
