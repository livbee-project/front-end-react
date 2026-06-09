import React from 'react';
import {
  HomeSectionBlock,
  HomeSectionHeader,
  HomeSectionMoreLink,
  HomeSectionSubtitle,
  HomeSectionTitle,
} from '@/presentation/pages/home/styles/homeDesign.styles';

interface HomeSectionShellProps {
  title: React.ReactNode;
  subtitle: string;
  moreHref?: string;
  children: React.ReactNode;
}

// test_codex SectionHeader 레이아웃 래퍼
const HomeSectionShell: React.FC<HomeSectionShellProps> = ({ title, subtitle, moreHref, children }) => (
  <HomeSectionBlock>
    <HomeSectionHeader>
      <div>
        <HomeSectionTitle>{title}</HomeSectionTitle>
        <HomeSectionSubtitle>{subtitle}</HomeSectionSubtitle>
      </div>
      {moreHref ? <HomeSectionMoreLink to={moreHref}>전체보기</HomeSectionMoreLink> : null}
    </HomeSectionHeader>
    {children}
  </HomeSectionBlock>
);

export default HomeSectionShell;
