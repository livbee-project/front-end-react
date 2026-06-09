import React from 'react';
import type { PortfolioListItemView } from '@/presentation/pages/portfolio/types/portfolioView';
import {
  PortfolioCardBody,
  PortfolioCardImage,
  PortfolioCardMeta,
  PortfolioCardSummary,
  PortfolioCardTitleRow,
  PortfolioListCardLink,
  PortfolioMessageIcon,
} from '@/presentation/pages/portfolio/styles/portfolioList.styles';

interface PortfolioListCardProps {
  item: PortfolioListItemView;
}

// test_codex HostListPage 카드 1건 렌더
const PortfolioListCard: React.FC<PortfolioListCardProps> = ({ item }) => (
  <PortfolioListCardLink to={`/portfolios/${item.id}`}>
    <PortfolioCardImage>
      <img src={item.profileImage} alt="" loading="lazy" />
    </PortfolioCardImage>
    <PortfolioCardBody>
      <PortfolioCardTitleRow>
        <strong>{item.name}</strong>
        <PortfolioMessageIcon>M</PortfolioMessageIcon>
      </PortfolioCardTitleRow>
      <PortfolioCardSummary>{item.summary}</PortfolioCardSummary>
      <PortfolioCardMeta>
        <span>{item.category}</span>
        <span>경력 {item.experienceYears}년</span>
      </PortfolioCardMeta>
    </PortfolioCardBody>
  </PortfolioListCardLink>
);

export default PortfolioListCard;
