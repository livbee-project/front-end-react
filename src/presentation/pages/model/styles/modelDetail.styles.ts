import styled from 'styled-components';
import {
  PortfolioActionRow,
  PortfolioBasicMeta,
  PortfolioBioSection,
  PortfolioDetailMain,
  PortfolioDetailNavButton,
  PortfolioDetailPageRoot,
  PortfolioDetailPhoto,
  PortfolioDetailShareButton,
  PortfolioDetailTabs,
  PortfolioDetailTopbar,
  PortfolioFileCard,
  PortfolioFileIcon,
  PortfolioFileList,
  PortfolioGalleryGrid,
  PortfolioInfoList,
  PortfolioNameRow,
  PortfolioPrivateCard,
  PortfolioProfileSection,
  PortfolioProfileSummary,
  PortfolioRoleText,
  PortfolioStatRow,
  PortfolioTabPanel,
  PortfolioTagRow,
} from '@/presentation/pages/portfolio/styles/portfolioDetail.styles';

export const ModelDetailPageRoot = PortfolioDetailPageRoot;
export const ModelDetailMain = PortfolioDetailMain;
export const ModelDetailTopbar = PortfolioDetailTopbar;
export const ModelDetailNavButton = PortfolioDetailNavButton;
export const ModelDetailShareButton = PortfolioDetailShareButton;
export const ModelProfileSection = PortfolioProfileSection;
export const ModelDetailPhoto = PortfolioDetailPhoto;
export const ModelProfileSummary = PortfolioProfileSummary;
export const ModelNameRow = PortfolioNameRow;
export const ModelRoleText = PortfolioRoleText;
export const ModelBasicMeta = PortfolioBasicMeta;
export const ModelStatRow = PortfolioStatRow;
export const ModelBioSection = PortfolioBioSection;
export const ModelTagRow = PortfolioTagRow;
export const ModelActionRow = PortfolioActionRow;
export const ModelPrivateCard = PortfolioPrivateCard;
export const ModelTabPanel = PortfolioTabPanel;
export const ModelInfoList = PortfolioInfoList;
export const ModelFileList = PortfolioFileList;
export const ModelFileCard = PortfolioFileCard;
export const ModelFileIcon = PortfolioFileIcon;
export const ModelGalleryGrid = PortfolioGalleryGrid;

// test_codex model-detail-tabs — 3탭(소개·포트폴리오·갤러리)
export const ModelDetailTabs = styled(PortfolioDetailTabs)`
  grid-template-columns: repeat(3, 1fr);
`;
