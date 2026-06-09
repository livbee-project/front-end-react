import React from 'react';
import { homeContent } from '@/presentation/pages/home/config/homeContent';
import {
  HomeCampaignCard,
  HomeClipCard,
  HomeLiveCard,
  HomeNewsCard,
  HomeProfileCard,
} from '@/presentation/pages/home/components/HomeCards';
import HomeHeroSection from '@/presentation/pages/home/components/HomeHeroSection';
import HomeJoinCtaSection from '@/presentation/pages/home/components/HomeJoinCtaSection';
import HomeSectionShell from '@/presentation/pages/home/components/HomeSectionShell';
import {
  HOME_CAMPAIGN_ITEMS,
  HOME_CLIP_ITEMS,
  HOME_HOST_PROFILES,
  HOME_LIVE_ITEMS,
  HOME_MODEL_PROFILES,
  HOME_NEWS_DISPLAY_COUNT,
  HOME_NEWS_ITEMS,
} from '@/data/sources/mocks/homeMockData';
import { HomeMain, HomeNewsGrid, HomePageRoot, HomeScrollTrack } from '@/presentation/pages/home/styles/homeDesign.styles';

const Home: React.FC = () => (
  <HomePageRoot>
    <HomeMain>
      <HomeHeroSection />

      <HomeSectionShell
        title={
          <>
            지금 뜨는 <em>쇼핑라이브</em>
          </>
        }
        subtitle={homeContent.sections.liveSubtitle}
        moreHref="/campaigns"
      >
        <HomeScrollTrack $preset="live">
          {HOME_LIVE_ITEMS.map((item) => (
            <HomeLiveCard key={item.id} item={item} />
          ))}
        </HomeScrollTrack>
      </HomeSectionShell>

      <HomeSectionShell
        title={
          <>
            브랜드 <em>PICK</em>
          </>
        }
        subtitle={homeContent.sections.brandPickSubtitle}
        moreHref="/campaigns"
      >
        <HomeScrollTrack $preset="campaign">
          {HOME_CAMPAIGN_ITEMS.map((item) => (
            <HomeCampaignCard key={item.id} item={item} />
          ))}
        </HomeScrollTrack>
      </HomeSectionShell>

      <HomeSectionShell
        title={
          <>
            <i>HOT</i> CLIP
          </>
        }
        subtitle={homeContent.sections.clipsSubtitle}
        moreHref="/clips"
      >
        <HomeScrollTrack $preset="clip">
          {HOME_CLIP_ITEMS.map((item) => (
            <HomeClipCard key={item.id} item={item} />
          ))}
        </HomeScrollTrack>
      </HomeSectionShell>

      <HomeSectionShell
        title={
          <>
            추천 <em>쇼호스트</em>
          </>
        }
        subtitle={homeContent.sections.hostsSubtitle}
        moreHref="/portfolios"
      >
        <HomeScrollTrack $preset="profile">
          {HOME_HOST_PROFILES.map((item) => (
            <HomeProfileCard key={item.id} item={item} type="host" />
          ))}
        </HomeScrollTrack>
      </HomeSectionShell>

      <HomeSectionShell
        title={
          <>
            추천 <em>모델</em>
          </>
        }
        subtitle={homeContent.sections.modelsSubtitle}
        moreHref="/models"
      >
        <HomeScrollTrack $preset="profile">
          {HOME_MODEL_PROFILES.map((item) => (
            <HomeProfileCard key={item.id} item={item} type="model" />
          ))}
        </HomeScrollTrack>
      </HomeSectionShell>

      <HomeSectionShell
        title={
          <>
            라이비 <em>뉴스</em>
          </>
        }
        subtitle={homeContent.sections.newsSubtitle}
        moreHref="/news"
      >
        <HomeNewsGrid>
          {HOME_NEWS_ITEMS.slice(0, HOME_NEWS_DISPLAY_COUNT).map((item) => (
            <HomeNewsCard key={item.id} item={item} />
          ))}
        </HomeNewsGrid>
      </HomeSectionShell>

      <HomeJoinCtaSection />
    </HomeMain>
  </HomePageRoot>
);

export default Home;
