import React from 'react';
import styled from 'styled-components';
// import StoryHighlightsSection from '@/presentation/pages/home/StoryHighlightsSection';
import ShoppingLiveSection from '@/presentation/pages/home/ShoppingLiveSection';
import HowShowhostSection from '@/presentation/pages/home/HowShowhostSection';
import RecommendedLiveSection from '@/presentation/pages/home/RecommendedLiveSection';
import ConceptModelSection from '@/presentation/pages/home/ConceptModelSection';
import HotClipSection from '@/presentation/pages/home/HotClipSection';
import LivbeeNewsSection from '@/presentation/pages/home/LivbeeNewsSection';
import BannerSliderSection from '@/presentation/pages/home/BannerSliderSection';

const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.pagePadding.mobile} 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.tablet} 4rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.desktop} 4rem;
  }
`;

const BannerWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const Home: React.FC = () => (
  <Page>
    <Content>
      <BannerWrapper>
        <BannerSliderSection />
      </BannerWrapper>
      {/* <StoryHighlightsSection /> */}
      <ShoppingLiveSection />
      <RecommendedLiveSection />
      <HowShowhostSection />
      <ConceptModelSection />
      <HotClipSection />
      <LivbeeNewsSection />
    </Content>
  </Page>
);

export default Home;
