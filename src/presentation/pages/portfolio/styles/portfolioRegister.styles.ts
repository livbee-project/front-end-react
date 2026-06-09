import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  portfolioContentMaxWidth,
  portfolioPrimaryLight,
  portfolioSectionDivider,
} from '@/presentation/pages/portfolio/styles/portfolioShared';

export const PortfolioRegisterPageRoot = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

export const PortfolioRegisterMain = styled.main`
  max-width: ${portfolioContentMaxWidth};
  margin: 0 auto;
  padding: 14px 16px 106px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    padding: 28px 22px 88px;
  }
`;

export const PortfolioCreateTop = styled.section`
  position: relative;
  padding: 22px 20px 22px 54px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  background: linear-gradient(135deg, #fff9fd 0%, #f4eeff 100%);
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);

  > span {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 11px;
    font-weight: 900;
  }

  h1 {
    margin: 12px 0 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.8px;
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

export const PortfolioBackLink = styled(Link)`
  position: absolute;
  left: 16px;
  top: 24px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 28px;
  font-weight: 900;
  text-decoration: none;
`;

export const PortfolioRegisterFormLayout = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 16px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    grid-template-columns: minmax(0, 1fr) 320px;
    align-items: start;
  }
`;

export const PortfolioRegisterFormBody = styled.div`
  display: grid;
  gap: 0;
`;

export const PortfolioFormCard = styled.section`
  padding: 18px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: none;

  &:first-child {
    border-radius: 18px 18px 0 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:last-child {
    border-radius: 0 0 18px 18px;
  }

  & + & {
    border-top: 8px solid ${portfolioSectionDivider};
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const PortfolioSectionTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;

  h2 {
    margin: 0 0 5px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 17px;
    line-height: 1.25;
    letter-spacing: -0.35px;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    line-height: 1.45;
    font-weight: 650;
  }

  > span,
  > small {
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

export const PortfolioPreviewCard = styled.aside`
  display: grid;
  gap: 10px;
  align-content: start;
  padding: 18px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  background: linear-gradient(135deg, #fff9fd 0%, #fff 100%);
  box-shadow: 0 6px 18px rgba(36, 33, 43, 0.05);

  @media (max-width: 767px) {
    margin-top: 16px;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    position: sticky;
    top: 88px;
    grid-column: 2 / 3;
    grid-row: 1 / span 2;
    margin-top: 0;
  }

  > span {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    width: fit-content;
  }
`;

export const PortfolioPreviewImage = styled.div`
  width: 112px;
  aspect-ratio: 3 / 4;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 16px;
  background: ${portfolioPrimaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 900;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PortfolioPreviewTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    min-width: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 17px;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  em {
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
    font-style: normal;
    font-weight: 900;
  }
`;

export const PortfolioPreviewSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.subText};
  font-size: 13px;
  line-height: 1.45;
`;

export const PortfolioPreviewChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

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

  span:nth-child(n + 2) {
    background: #faf8ff;
    color: ${({ theme }) => theme.colors.subText};
  }
`;

export const PortfolioRegisterActions = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1fr 1.25fr;
  gap: 8px;
  padding: 12px 0 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff 32%);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    grid-column: 1 / 2;
    position: static;
    background: transparent;
    padding-top: 0;
  }

  button {
    display: grid;
    place-items: center;
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 14px;
    background: #fff;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  button:last-child {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    box-shadow: 0 10px 20px rgba(123, 77, 255, 0.18);
  }
`;
