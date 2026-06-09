import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  getHomeScrollCardWidth,
  homeResponsive,
  type HomeScrollPreset,
} from '@/presentation/pages/home/styles/homeResponsive';

const accentPink = '#ff5a9a';
const primaryLight = '#f1ebff';
const sectionDivider = '#f2f3f5';
const homeContentMaxWidth = '1120px';

export const HomePageRoot = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
`;

export const HomeMain = styled.main`
  max-width: ${homeContentMaxWidth};
  margin: 0 auto;
  padding: 18px ${homeResponsive.sectionBleed} 2rem;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    padding: 22px ${({ theme }) => theme.layout.pagePadding.tablet} 2.5rem;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    padding: 22px ${({ theme }) => theme.layout.pagePadding.desktop} 3rem;
  }
`;

export const HomeHero = styled.section`
  position: relative;
  width: 100%;
  min-height: 236px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f4e9ff 0%, #fff0f7 100%);
  box-shadow: 0 8px 24px rgba(36, 33, 43, 0.06);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    min-height: 300px;
  }
`;

export const HomeHeroImage = styled.img`
  position: absolute;
  inset: 0 0 0 auto;
  width: 66%;
  height: 100%;
  object-fit: cover;
  object-position: 56% top;
  display: block;
`;

export const HomeHeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.96) 0%,
    rgba(255, 255, 255, 0.78) 43%,
    rgba(255, 255, 255, 0.06) 100%
  );
  pointer-events: none;
`;

export const HomeHeroCopy = styled.div`
  position: relative;
  z-index: 1;
  width: 71%;
  padding: 22px 0 0 20px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    padding: 34px 0 0 34px;
  }
`;

export const HomeHeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 11px;
  font-weight: 900;
`;

export const HomeHeroTitle = styled.h1`
  margin: 12px 0 9px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
  line-height: 1.13;
  letter-spacing: -1.15px;
  white-space: pre-line;
  font-weight: 900;

  &::first-line {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    font-size: 38px;
  }
`;

export const HomeHeroDescription = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 13px;
  line-height: 1.52;
  font-weight: 650;
`;

export const HomeHeroCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  min-width: 118px;
  padding: 0 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 13px;
  font-weight: 900;
  box-shadow: 0 10px 20px rgba(123, 77, 255, 0.22);
  text-decoration: none;
`;

export const HomeHeroPagination = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  display: inline-flex;
  gap: 7px;
  color: #d7d1e3;
  font-size: 9px;

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HomeSectionBlock = styled.section`
  position: relative;
  margin: 0 calc(-1 * ${homeResponsive.sectionBleed});
  padding: 28px ${homeResponsive.sectionBleed} 32px;
  border-top: 8px solid ${sectionDivider};
  box-shadow: inset 0 1px 0 rgba(36, 33, 43, 0.04);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    margin-right: 0;
    margin-left: 0;
    padding: 28px 0 32px;
  }
`;

export const HomeSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 14px;
`;

export const HomeSectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  line-height: 1.16;
  letter-spacing: -0.7px;
  font-weight: 900;

  em {
    color: ${({ theme }) => theme.colors.primary};
    font-style: normal;
  }

  i {
    color: ${accentPink};
    font-style: normal;
  }
`;

export const HomeSectionSubtitle = styled.p`
  margin: 5px 0 0;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 12.5px;
  line-height: 1.36;
  font-weight: 650;
`;

export const HomeSectionMoreLink = styled(Link)`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 12px;
  font-weight: 900;
  text-decoration: none;

  &::after {
    content: '›';
    font-size: 21px;
    line-height: 1;
  }
`;

export const HomeScrollTrack = styled.div<{ $preset: HomeScrollPreset }>`
  display: flex;
  gap: ${homeResponsive.scrollGap.mobile};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin-right: calc(-1 * ${homeResponsive.sectionBleed});
  padding: 2px ${homeResponsive.sectionBleed} 11px 1px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex: 0 0 ${({ $preset }) => getHomeScrollCardWidth($preset, 'mobile')};
    min-width: ${({ $preset }) => getHomeScrollCardWidth($preset, 'mobile')};
    scroll-snap-align: start;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    gap: ${homeResponsive.scrollGap.tablet};
    margin-right: 0;
    padding-right: 2px;

    & > * {
      flex-basis: ${({ $preset }) => getHomeScrollCardWidth($preset, 'tablet')};
      min-width: ${({ $preset }) => getHomeScrollCardWidth($preset, 'tablet')};
    }
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    & > * {
      flex-basis: ${({ $preset }) => getHomeScrollCardWidth($preset, 'wide')};
      min-width: ${({ $preset }) => getHomeScrollCardWidth($preset, 'wide')};
    }
  }
`;

export const HomeNewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${homeResponsive.scrollGap.mobile};

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    gap: ${homeResponsive.scrollGap.tablet};
  }
`;

const cardLinkBase = `
  display: block;
  min-width: 0;
  color: inherit;
  text-decoration: none;
`;

export const HomeCardLink = styled(Link)`
  ${cardLinkBase}
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);
`;

export const RatioMedia = styled.div<{ $ratio: string }>`
  position: relative;
  overflow: hidden;
  background: #f7f5fb;
  aspect-ratio: ${({ $ratio }) => $ratio};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
`;

export const LiveBadge = styled.span`
  position: absolute;
  left: 9px;
  top: 9px;
  display: inline-flex;
  align-items: center;
  height: 23px;
  padding: 0 8px;
  border-radius: 7px;
  background: ${accentPink};
  color: #fff;
  font-size: 10px;
  font-weight: 900;
`;

export const LiveCardBody = styled.div`
  padding: 11px 11px 12px;

  strong {
    display: -webkit-box;
    min-height: 2.56em;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13.5px;
    line-height: 1.28;
    font-weight: 900;
    letter-spacing: -0.3px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }

  small {
    display: block;
    margin-top: 10px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const LiveProductRow = styled.div`
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  margin-top: 10px;
  padding: 8px;
  border-radius: 12px;
  background: #faf8ff;
`;

export const LiveProductThumb = styled.div`
  width: 34px;
  height: 34px;
  overflow: hidden;
  border-radius: 9px;
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const LiveProductLabel = styled.span`
  display: block;
  color: #a39caf;
  font-size: 9.5px;
  line-height: 1.15;
  font-weight: 850;
`;

export const LiveProductName = styled.p`
  display: block;
  margin: 3px 0 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  font-size: 11.5px;
  line-height: 1.22;
  font-weight: 900;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PaymentBadge = styled.span`
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(123, 77, 255, 0.94);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  white-space: nowrap;
`;

export const BrandCardBody = styled.div`
  padding: 13px 14px 14px;

  strong {
    display: block;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    line-height: 1.25;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -0.3px;
  }

  p {
    margin: 7px 0 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    line-height: 1.42;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const CampaignInfoList = styled.dl`
  display: grid;
  gap: 6px;
  margin: 12px 0 0;

  div {
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
  }

  dt {
    color: ${({ theme }) => theme.colors.text};
    font-size: 12px;
    font-weight: 900;

    &::before {
      content: '◎';
      margin-right: 4px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  dd {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text};
    font-size: 12px;
    font-weight: 850;
  }
`;

export const ClipCardLink = styled(Link)`
  ${cardLinkBase}
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
`;

export const ClipMedia = styled(RatioMedia)`
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.07);
`;

export const PlayButton = styled.span`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 38px;
  height: 38px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 900;
`;

export const ClipCardBody = styled.div`
  padding: 8px 0 0;

  strong {
    display: block;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    line-height: 1.3;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -0.3px;
  }

  p {
    margin: 4px 0 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11px;
    line-height: 1.42;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const ProfileCardBody = styled.div`
  padding: 12px;

  p {
    margin: 8px 0 0;
    min-height: 3.84em;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    line-height: 1.28;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export const ProfileTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;

  strong {
    min-width: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    line-height: 1.25;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: -0.3px;
  }
`;

export const ModelRoleChip = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  max-width: 58px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 9.5px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MessageIcon = styled.span`
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-left: auto;
  border: 1px solid #eadff8;
  border-radius: 50%;
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 9px;
  font-weight: 900;
`;

export const ProfileMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 11px;

  span {
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    padding: 0 8px;
    border-radius: 999px;
    background: ${primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10.5px;
    font-weight: 900;
  }

  span:last-child {
    background: #faf8ff;
    color: ${({ theme }) => theme.colors.subText};
  }
`;

export const NewsCardLink = styled(Link)`
  ${cardLinkBase}
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.04);
`;

export const NewsThumb = styled.div`
  position: relative;
  overflow: hidden;
  background: #f7f5fb;
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  span {
    position: absolute;
    top: 9px;
    left: 9px;
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 11px;
    font-weight: 900;
  }
`;

export const NewsCardBody = styled.div`
  padding: 11px 12px 13px;

  strong {
    display: -webkit-box;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    line-height: 1.35;
    font-weight: 900;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    letter-spacing: -0.3px;
  }

  p {
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11px;
    font-weight: 650;
  }
`;

export const HomeJoinCta = styled.section`
  display: block;
  margin: 18px 0 0;
  padding: 24px 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: linear-gradient(135deg, #fff9fd 0%, #f4eeff 100%);

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.text};
    font-size: 23px;
    line-height: 1.32;
    font-weight: 900;
    letter-spacing: -0.5px;

    em {
      color: ${({ theme }) => theme.colors.primary};
      font-style: normal;
    }
  }

  p {
    margin: 10px 0 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 13px;
    font-weight: 650;
    line-height: 1.5;
  }
`;

export const HomeJoinCtaButton = styled(Link)`
  width: 100%;
  margin-top: 18px;
  display: inline-grid;
  place-items: center;
  height: 50px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(123, 77, 255, 0.18);
`;
