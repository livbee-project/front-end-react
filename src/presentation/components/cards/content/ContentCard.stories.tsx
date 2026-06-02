import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import type { ContentCardVariant } from '@/presentation/components/cards/content/contentCard.types';
import { theme } from '@/presentation/styles/theme';

const bp = theme.grid.breakpoints;
const gridGuideDescription =
  `모바일(${bp.mobileMin}~${bp.mobileMax}): ${theme.grid.columns.mobile}열 가로 스크롤 · ` +
  `태블릿(${bp.tabletMin}~${bp.tabletMax}): ${theme.grid.columns.tablet}열 · ` +
  `웹(${bp.wideMin}+): ${theme.grid.columns.desktop}열`;

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80';

const Showcase = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.h2};
  color: ${({ theme }) => theme.colors.foreground};
`;

const meta: Meta<typeof ContentCard> = {
  title: 'Cards/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '홈·목록 공통 카드(라이브, 쇼호스트/모델, 광고, 뉴스, 플립). 비율 고정·한 줄 말줄임·즐겨찾기 규칙을 따릅니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

const FavoriteCard: React.FC<{
  variant: Extract<ContentCardVariant, 'showhost' | 'ad' | 'flip'>;
  heading: string;
  title?: string;
  supplementary?: string;
  rating?: string;
}> = (props) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <ContentCard
      {...props}
      imageUrl={SAMPLE_IMAGE}
      isFavorite={favorite}
      onFavoriteToggle={() => setFavorite((v) => !v)}
    />
  );
};

export const Live: Story = {
  args: {
    variant: 'live',
    imageUrl: SAMPLE_IMAGE,
    heading: '주주의 뷰티라이브',
    supplementary: '12.3만 시청',
  },
};

export const Showhost: Story = {
  render: () => (
    <FavoriteCard
      variant="showhost"
      heading="유리"
      rating="4.9 (138)"
      supplementary="뷰티/패션 · 팔로워 12.3만"
    />
  ),
};

export const Ad: Story = {
  render: () => (
    <FavoriteCard
      variant="ad"
      heading="Glow Beauty"
      title="신제품 뷰티 라이브 쇼호스트 모집"
      supplementary="~ 05.31 마감"
    />
  ),
};

export const News: Story = {
  args: {
    variant: 'news',
    imageUrl: SAMPLE_IMAGE,
    heading: '2025 라이브커머스 트렌드 리포트',
    supplementary: '라이브 뉴스 · 2025.05.20',
  },
};

export const Flip: Story = {
  render: () => (
    <FavoriteCard
      variant="flip"
      heading="메이크업 꿀팁 대방출!"
      flipEngagement="1.2만"
    />
  ),
};

export const AllVariantsGrid: Story = {
  render: () => (
    <Showcase>
      <Section>
        <SectionTitle>공통 카드 · 반응형 그리드</SectionTitle>
        <ContentCardGrid>
          <ContentCard
            variant="live"
            imageUrl={SAMPLE_IMAGE}
            heading="주주의 뷰티라이브"
            supplementary="12.3만 시청"
          />
          <FavoriteCard
            variant="showhost"
            heading="유리"
            rating="4.9 (138)"
            supplementary="뷰티/패션 · 팔로워 12.3만"
          />
          <FavoriteCard
            variant="ad"
            heading="Glow Beauty"
            title="신제품 뷰티 라이브 쇼호스트 모집"
            supplementary="~ 05.31 마감"
          />
          <ContentCard
            variant="news"
            imageUrl={SAMPLE_IMAGE}
            heading="2025 라이브커머스 트렌드 리포트"
            supplementary="라이브 뉴스 · 2025.05.20"
          />
          <FavoriteCard
            variant="flip"
            heading="메이크업 꿀팁 대방출!"
            flipEngagement="1.2만"
          />
        </ContentCardGrid>
      </Section>
    </Showcase>
  ),
  parameters: {
    docs: {
      description: {
        story: gridGuideDescription,
      },
    },
  },
};
