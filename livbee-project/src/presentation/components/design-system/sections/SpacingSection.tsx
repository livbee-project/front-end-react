/**
 * 간격 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const SpacingSection: React.FC = () => (
  <Section>
    <SectionTitle>간격 시스템 (Spacing)</SectionTitle>
    <SectionDescription>컴포넌트 간 간격을 일관되게 유지하기 위한 간격 시스템입니다. padding, margin, gap 등에 사용됩니다.</SectionDescription>
    <SpacingGrid>
      {Object.entries(theme.spacing).map(([name, value]) => (
        <SpacingItem key={name}>
          <SpacingLabel>{name}</SpacingLabel>
          <SpacingBar $value={value} />
          <SpacingValue>{value}</SpacingValue>
        </SpacingItem>
      ))}
    </SpacingGrid>
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

const SpacingGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SpacingItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SpacingBar = styled.div<{ $value: string }>`
  width: ${({ $value }) => $value};
  max-width: 200px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  flex-shrink: 0;
`;

const SpacingLabel = styled.div`
  min-width: 80px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const SpacingValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

