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

const accentPink = '#ff5a9a';

export const PortfolioOptionalFormCard = styled(PortfolioFormCard)`
  border-top: 8px solid ${portfolioSectionDivider};
`;

export const PortfolioContactPolicyFormCard = styled(PortfolioOptionalFormCard)`
  ${PortfolioSectionTitleRow} > small {
    background: #fff0f6;
    color: ${accentPink};
  }
`;

export const PortfolioFormFieldGrid = styled.div`
  display: grid;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const PortfolioCreateField = styled.label`
  position: relative;
  display: grid;
  gap: 8px;
  margin-top: 12px;

  &:first-child {
    margin-top: 0;
  }

  > span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    font-weight: 900;

    em {
      color: ${accentPink};
      font-style: normal;
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 14px;
    background: #fff;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 650;
    outline: none;
  }

  input,
  select {
    height: 46px;
    padding: 0 14px;
  }

  textarea {
    min-height: 120px;
    padding: 14px;
    resize: vertical;
    line-height: 1.5;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.subText};
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(123, 77, 255, 0.12);
  }

  b,
  small {
    justify-self: end;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11px;
    font-weight: 700;
  }
`;

export const PortfolioProfileUploader = styled.label<{ $hasFile?: boolean }>`
  display: grid;
  place-items: center;
  width: min(168px, 100%);
  min-height: auto;
  aspect-ratio: 3 / 4;
  margin: 0 auto;
  padding: ${({ $hasFile }) => ($hasFile ? '0' : '14px')};
  border: 1px dashed #d8caef;
  border-style: ${({ $hasFile }) => ($hasFile ? 'solid' : 'dashed')};
  border-radius: 16px;
  background: ${({ $hasFile }) => ($hasFile ? '#fff' : '#faf8ff')};
  overflow: ${({ $hasFile }) => ($hasFile ? 'hidden' : 'visible')};
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  @media (max-width: 767px) {
    width: 148px;
  }
`;

export const PortfolioFileUploader = styled.label<{ $hasFile?: boolean; $compact?: boolean }>`
  display: grid;
  place-items: center;
  min-height: ${({ $compact }) => ($compact ? '92px' : '108px')};
  padding: 16px;
  margin-top: 12px;
  border: 1px dashed #d8caef;
  border-style: ${({ $hasFile }) => ($hasFile ? 'solid' : 'dashed')};
  border-radius: 16px;
  background: ${({ $hasFile }) => ($hasFile ? '#fff' : '#faf8ff')};
  text-align: ${({ $hasFile }) => ($hasFile ? 'left' : 'center')};
  cursor: pointer;

  input {
    display: none;
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-weight: 900;
  }

  p {
    margin: 6px 0 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 12px;
    font-weight: 650;
  }
`;

export const PortfolioUploadSymbol = styled.div<{ $small?: boolean }>`
  display: grid;
  place-items: center;
  width: ${({ $small }) => ($small ? '32px' : '42px')};
  height: ${({ $small }) => ($small ? '32px' : '42px')};
  margin-bottom: ${({ $small }) => ($small ? '8px' : '9px')};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ $small }) => ($small ? '18px' : '23px')};
  font-weight: 900;
`;

export const PortfolioUploadedProfilePreview = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 16px;
  background: #f7f5fb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  span {
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: rgba(36, 33, 43, 0.72);
    color: #fff;
    font-size: 11px;
    font-weight: 900;
  }
`;

export const PortfolioSelectedFileSummary = styled.div<{ $ratioOk?: boolean }>`
  display: grid;
  gap: 4px;
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid
    ${({ $ratioOk }) => ($ratioOk ? 'rgba(18, 168, 148, 0.24)' : '#eadff8')};
  border-radius: 14px;
  background: ${({ $ratioOk }) => ($ratioOk ? '#f7fffd' : '#faf8ff')};
  text-align: left;

  strong {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11.5px;
    font-weight: 650;
    line-height: 1.35;
  }
`;

export const PortfolioSelectedPortfolioCard = styled.div`
  display: grid;
  gap: 4px;
  width: 100%;
  padding: 12px;
  border: 1px solid #eadff8;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff9fd 0%, #faf8ff 100%);
  text-align: left;

  > span {
    justify-self: start;
    display: inline-flex;
    align-items: center;
    height: 23px;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10.5px;
    font-weight: 900;
  }

  strong {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11.5px;
    font-weight: 650;
    line-height: 1.35;
  }
`;

export const PortfolioGalleryLocalPreview = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
`;

export const PortfolioGalleryPreviewHeader = styled.div`
  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 13px;
    font-weight: 900;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11.5px;
    font-weight: 650;
    line-height: 1.35;
  }
`;

export const PortfolioGalleryPreviewStrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  figure {
    flex: 0 0 68px;
    margin: 0;
  }

  img {
    width: 100%;
    height: 68px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: #f7f5fb;
    object-fit: cover;
    display: block;
  }

  figcaption {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 10px;
    font-weight: 750;
    text-align: center;
  }
`;

export const PortfolioContactPolicyBox = styled.div`
  display: grid;
  gap: 5px;
  margin: 0 0 14px;
  padding: 13px 14px;
  border: 1px solid #eadff8;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff9fd 0%, #faf8ff 100%);

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 13px;
    font-weight: 900;
    letter-spacing: -0.2px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11.5px;
    font-weight: 700;
    line-height: 1.45;
  }
`;

export const PortfolioContactValidationMessage = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.45;
`;

export const PortfolioPreviewCard = styled.aside`
  display: grid;
  gap: 14px;
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
`;

export const PortfolioPreviewPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

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

  > small {
    color: ${({ theme }) => theme.colors.subText};
    font-size: 11px;
    font-weight: 800;
  }
`;

export const PortfolioPreviewCardShell = styled.div`
  width: min(168px, 100%);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(36, 33, 43, 0.08);

  @media (max-width: 767px) {
    width: 148px;
  }
`;

export const PortfolioPreviewImage = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 36%, rgba(123, 77, 255, 0.22), transparent 34%),
    linear-gradient(135deg, #f7f2ff 0%, #fff0f6 100%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 900;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  > span {
    display: inline-grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 6px 16px rgba(123, 77, 255, 0.12);
  }
`;

export const PortfolioPreviewCardBody = styled.div`
  padding: 12px;
`;

export const PortfolioPreviewTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  strong {
    min-width: 0;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    line-height: 1.25;
    font-weight: 900;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  em {
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
    font-style: normal;
    font-weight: 900;
  }
`;

export const PortfolioPreviewSummary = styled.p`
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

export const PortfolioPreviewChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 11px;

  em {
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${portfolioPrimaryLight};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 10.5px;
    font-style: normal;
    font-weight: 900;
  }

  em:nth-child(n + 2) {
    background: #faf8ff;
    color: ${({ theme }) => theme.colors.subText};
  }
`;

export const PortfolioPreviewTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 11px;

  i {
    display: inline-flex;
    align-items: center;
    min-height: 23px;
    padding: 0 8px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: #fff0f6;
    color: ${accentPink};
    font-size: 10.5px;
    font-style: normal;
    font-weight: 900;
  }
`;

export const PortfolioRegisterCancelLink = styled.button`
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
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
