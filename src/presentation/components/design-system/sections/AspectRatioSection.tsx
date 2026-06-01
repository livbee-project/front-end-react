import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const AspectRatioSection: React.FC = () => (
  <Section>
    <SectionTitle>이미지 비율 (Aspect Ratio)</SectionTitle>
    <SectionDescription>MVP 카드·썸네일 비율입니다.</SectionDescription>
    <Grid>
      {Object.entries(theme.aspectRatio).map(([name, value]) => (
        <RatioCard key={name}>
          <RatioBox $ratio={value} />
          <RatioLabel>{name}</RatioLabel>
          <RatioValue>{value}</RatioValue>
        </RatioCard>
      ))}
    </Grid>
  </Section>
);

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.h2};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionDescription = styled.p`
  font: ${({ theme }) => theme.fonts.p1};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const RatioCard = styled.div`
  text-align: center;
`;

const RatioBox = styled.div<{ $ratio: string }>`
  width: 100%;
  max-width: 120px;
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
  aspect-ratio: ${({ $ratio }) => $ratio};
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const RatioLabel = styled.div`
  font: ${({ theme }) => theme.fonts.p2};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const RatioValue = styled.div`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;
