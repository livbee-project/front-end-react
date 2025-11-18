import React from 'react';
import styled from 'styled-components';
import HomeNavigation from './components/HomeNavigation';
import TopTabs from './components/TopTabs';
import StoryHighlightsSection from './StoryHighlightsSection';
import ShoppingLiveSection from './ShoppingLiveSection';
import BrandPickSection from './BrandPickSection';
import HowShowhostSection from './HowShowhostSection';
import RecommendedLiveSection from './RecommendedLiveSection';
import ConceptModelSection from './ConceptModelSection';
import HotClipSection from './HotClipSection';
import LivbeeNewsSection from './LivbeeNewsSection';
import BannerSliderSection from './BannerSliderSection';

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

const Home: React.FC = () => (
  <Page>
    <HomeNavigation />
    <TopTabs />
    <Content>
      <div style={{ margin: '1rem 0' }}>
        <BannerSliderSection />
      </div>
      <StoryHighlightsSection />
      <ShoppingLiveSection />
      <BrandPickSection />
      <HowShowhostSection />
      <RecommendedLiveSection />
      <ConceptModelSection />
      <HotClipSection />
      <LivbeeNewsSection />
    </Content>
  </Page>
);

export default Home;
