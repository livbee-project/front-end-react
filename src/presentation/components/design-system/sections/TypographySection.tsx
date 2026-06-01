/**
 * 타이포그래피 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

const TYPOGRAPHY_DESCRIPTION: Record<string, string> = {
  h1: '페이지 타이틀 (H1) — 28px / 700',
  h2: '섹션 타이틀 (H2) — 22px / 700',
  h3: '카드 타이틀 (H3) — 18px / 600',
  body: '본문 P1 — 14px / 400',
  p1: '본문 P1 — 14px / 400',
  p2: '보조 P2 — 13px / 400',
  button: '버튼·P2 — 13px / 400',
  caption: '캡션 — 12px / 400',
};

export const TypographySection: React.FC = () => (
  <Section>
    <SectionTitle>타이포그래피 (Typography)</SectionTitle>
    <SectionDescription>
      프로젝트에서 사용하는 폰트 스타일입니다. NexonLv2Gothic 폰트를 사용하며, 제목, 본문, 버튼, 캡션 등 다양한 용도에 맞는 스타일이 정의되어 있습니다.
    </SectionDescription>
    <TypographyGrid>
      <TypographyItem>
        <TypographyLabel>Font Family</TypographyLabel>
        <TypographyDetails>{theme.fonts.family}</TypographyDetails>
      </TypographyItem>

      {Object.entries(theme.fonts)
        .filter(([key]) => key !== 'family')
        .map(([name, value]) => (
          <TypographyItem key={name}>
            <TypographyLabel>fonts.{name}</TypographyLabel>
            <TypographyPreview $font={value}>{TYPOGRAPHY_DESCRIPTION[name] ?? 'Sample Text'}</TypographyPreview>
            <TypographyDetails>{value}</TypographyDetails>
          </TypographyItem>
        ))}
    </TypographyGrid>
  </Section>
);

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.foreground};
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const TypographyGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TypographyItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const TypographyLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: monospace;
`;

const TypographyPreview = styled.div<{ $font: string }>`
  font: ${({ $font }) => $font};
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TypographyDetails = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

