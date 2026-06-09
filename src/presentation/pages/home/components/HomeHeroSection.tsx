import React from 'react';
import { homeContent } from '@/presentation/pages/home/config/homeContent';
import { HOME_HERO } from '@/data/sources/mocks/homeMockData';
import {
  HomeHero,
  HomeHeroCopy,
  HomeHeroCta,
  HomeHeroDescription,
  HomeHeroEyebrow,
  HomeHeroImage,
  HomeHeroOverlay,
  HomeHeroPagination,
  HomeHeroTitle,
} from '@/presentation/pages/home/styles/homeDesign.styles';

const HomeHeroSection: React.FC = () => (
  <HomeHero aria-label="메인 배너">
    <HomeHeroCopy>
      <HomeHeroEyebrow>{homeContent.hero.eyebrow}</HomeHeroEyebrow>
      <HomeHeroTitle>{homeContent.hero.title}</HomeHeroTitle>
      <HomeHeroDescription>{homeContent.hero.description}</HomeHeroDescription>
      <HomeHeroCta to={HOME_HERO.href}>{homeContent.hero.cta} →</HomeHeroCta>
    </HomeHeroCopy>
    <HomeHeroImage src={HOME_HERO.image} alt="" />
    <HomeHeroOverlay aria-hidden />
    <HomeHeroPagination aria-hidden>
      <strong>●</strong>
      <span>●</span>
      <span>●</span>
      <span>●</span>
    </HomeHeroPagination>
  </HomeHero>
);

export default HomeHeroSection;
