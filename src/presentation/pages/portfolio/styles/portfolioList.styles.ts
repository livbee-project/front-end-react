import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  portfolioContentMaxWidth,
  portfolioPrimaryLight,
  portfolioSectionDivider,
} from '@/presentation/pages/portfolio/styles/portfolioShared';

export const PortfolioListPageRoot = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const PortfolioListMain = styled.main`
  max-width: ${portfolioContentMaxWidth};
  margin: 0 auto;
  padding: 14px 16px 106px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    padding: 28px 22px 88px;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    padding: 28px 24px 88px;
  }
`;

export const PortfolioFilterBar = styled.section`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin: 16px -16px 0;
  padding: 0 16px 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    margin-right: 0;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
    flex-wrap: wrap;
    overflow: visible;
  }
`;

export const PortfolioFilterButton = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  height: 34px;
  padding: 0 14px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ $active }) => ($active ? portfolioPrimaryLight : '#fff')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.subText)};
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
`;

export const PortfolioListSection = styled.section`
  margin: 22px -16px 0;
  padding: 28px 16px 32px;
  border-top: 8px solid ${portfolioSectionDivider};

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    margin-right: 0;
    margin-left: 0;
    padding-right: 0;
    padding-left: 0;
  }
`;

export const PortfolioSectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 22px;
    line-height: 1.16;
    letter-spacing: -0.7px;
    font-weight: 900;
  }

  h2 em {
    color: ${({ theme }) => theme.colors.primary};
    font-style: normal;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12.5px;
    line-height: 1.45;
    font-weight: 650;
  }

  > span {
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    font-weight: 900;
  }
`;

export const PortfolioCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
`;

export const PortfolioListCardLink = styled(Link)`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);
  text-decoration: none;
  color: inherit;
`;

export const PortfolioCardImage = styled.div`
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: #f7f5fb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PortfolioCardBody = styled.div`
  padding: 12px;
`;

export const PortfolioCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    min-width: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    font-weight: 900;
  }
`;

export const PortfolioMessageIcon = styled.span`
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

export const PortfolioCardSummary = styled.p`
  min-height: 3.84em;
  margin: 8px 0 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 12px;
  line-height: 1.28;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const PortfolioCardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 11px;

  span {
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

  span:last-child {
    background: #faf8ff;
    color: ${({ theme }) => theme.colors.subText};
  }
`;

export const PortfolioRegisterFab = styled.button`
  position: fixed;
  right: 18px;
  bottom: 92px;
  z-index: 70;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 34px;
  font-weight: 800;
  box-shadow: 0 12px 26px rgba(123, 77, 255, 0.35);
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    right: 24px;
    bottom: 32px;
  }
`;
