/**
 * 테두리 반경 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const RadiusSection: React.FC = () => (
  <Section>
    <SectionTitle>테두리 반경 (Border Radius)</SectionTitle>
    <SectionDescription>컴포넌트의 모서리를 둥글게 만드는 반경 값입니다. 카드, 버튼, 입력 필드 등에 사용됩니다.</SectionDescription>
    <RadiusGrid>
      {Object.entries(theme.radii).map(([name, value]) => (
        <RadiusCard key={name} $radius={value}>
          <RadiusLabel>{name}</RadiusLabel>
          <RadiusValue>{value}</RadiusValue>
        </RadiusCard>
      ))}
    </RadiusGrid>
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

const RadiusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const RadiusCard = styled.div<{ $radius: string }>`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ $radius }) => $radius};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const RadiusLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.foreground};
`;

const RadiusValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

