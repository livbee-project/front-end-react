import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  portfolioAccentPink,
  portfolioDetailMaxWidth,
  portfolioPrimaryLight,
  portfolioSectionDivider,
} from '@/presentation/pages/portfolio/styles/portfolioShared';

export const PortfolioDetailPageRoot = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const PortfolioDetailMain = styled.main`
  max-width: ${portfolioDetailMaxWidth};
  margin: 0 auto;
  padding: 0 0 112px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    padding-top: 18px;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    max-width: 640px;
  }
`;

export const PortfolioDetailTopbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  align-items: center;
  height: 52px;
  padding: 0 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 18px;
  }

  strong {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    font-weight: 900;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const PortfolioDetailNavButton = styled(Link)`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 24px;
  font-weight: 900;
  text-decoration: none;
`;

export const PortfolioDetailShareButton = styled.button`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
`;

export const PortfolioProfileSection = styled.section`
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 18px 16px 12px;

  @media (max-width: 374px) {
    grid-template-columns: 104px minmax(0, 1fr);
    gap: 12px;
  }
`;

export const PortfolioDetailPhoto = styled.div`
  overflow: hidden;
  aspect-ratio: 3 / 4;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  background: #f7f5fb;
  box-shadow: 0 8px 20px rgba(36, 33, 43, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PortfolioProfileSummary = styled.div`
  display: grid;
  align-content: start;
  gap: 8px;
  min-width: 0;
  padding-top: 4px;
`;

export const PortfolioNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 22px;
    line-height: 1.16;
    letter-spacing: -0.7px;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    flex: 0 0 auto;
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border: 1px solid #eadff8;
    border-radius: 50%;
    background: #fff;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10px;
    font-weight: 900;
  }
`;

export const PortfolioRoleText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 12.5px;
  line-height: 1.35;
  font-weight: 800;
`;

export const PortfolioBasicMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    display: inline-flex;
    align-items: center;
    min-height: 25px;
    padding: 0 9px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: #faf8ff;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 10.5px;
    font-weight: 900;
  }

  span:first-child {
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PortfolioStatRow = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 0 16px 16px;

  div {
    display: grid;
    gap: 2px;
    padding: 10px 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 14px;
    background: #fff;
    text-align: center;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    font-weight: 900;
  }

  span {
    color: ${({ theme }) => theme.colors.subText};
    font-size: 10.5px;
    font-weight: 800;
  }
`;

export const PortfolioBioSection = styled.section`
  display: grid;
  gap: 8px;
  padding: 0 16px 16px;

  > strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    line-height: 1.38;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    line-height: 1.45;
    font-weight: 650;
  }
`;

export const PortfolioTagRow = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  span {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0 9px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: #fff0f6;
    color: ${portfolioAccentPink};
    font-size: 10.5px;
    font-weight: 900;
  }
`;

export const PortfolioActionRow = styled.section`
  display: grid;
  padding: 0 16px 16px;

  button {
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 15px;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    box-shadow: 0 10px 20px rgba(123, 77, 255, 0.16);
    cursor: pointer;
  }
`;

export const PortfolioPrivateCard = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 0 16px 16px;
  padding: 13px 14px;
  border: 1px solid #eadff8;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff9fd 0%, #faf8ff 100%);

  strong {
    display: block;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 13px;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    line-height: 1.45;
    font-weight: 650;
  }

  > span {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 11px;
    font-weight: 900;
  }
`;

export const PortfolioDetailTabs = styled.nav`
  position: sticky;
  top: 52px;
  z-index: 40;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 8px solid ${portfolioSectionDivider};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(14px);

  button {
    position: relative;
    height: 46px;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    font-weight: 900;
    cursor: pointer;

    &.active {
      color: ${({ theme }) => theme.colors.text};
    }

    &.active::after {
      content: '';
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 0;
      height: 3px;
      border-radius: ${({ theme }) => theme.radii.full};
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const PortfolioTabPanel = styled.section`
  padding: 16px;
`;

export const PortfolioInfoList = styled.dl`
  display: grid;
  overflow: hidden;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: #fff;

  > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: 0;
    }
  }

  dt {
    color: ${({ theme }) => theme.colors.text};
    font-size: 12.5px;
    font-weight: 900;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    font-weight: 700;
    text-align: right;
  }
`;

export const PortfolioFileList = styled.div`
  display: grid;
  gap: 12px;
`;

export const PortfolioFileCard = styled.article`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);

  strong {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    line-height: 1.25;
    font-weight: 900;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    line-height: 1.45;
    font-weight: 650;
  }

  span {
    justify-self: start;
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10.5px;
    font-weight: 900;
  }

  section {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
`;

export const PortfolioFileIcon = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 76px;
  border: 1px solid #eadff8;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff9fd 0%, #faf8ff 100%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
`;

export const PortfolioLiveLinkList = styled.div`
  display: grid;
  gap: 12px;
`;

export const PortfolioLiveLinkCard = styled.a`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);
  text-decoration: none;
  color: inherit;

  strong {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    line-height: 1.25;
    font-weight: 900;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    margin: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    line-height: 1.35;
    font-weight: 650;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    justify-self: start;
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10.5px;
    font-weight: 900;
  }

  section {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
`;

export const PortfolioGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin: 0 -16px;

  button {
    overflow: hidden;
    aspect-ratio: 1 / 1;
    border: 0;
    padding: 0;
    background: #f7f5fb;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
`;
