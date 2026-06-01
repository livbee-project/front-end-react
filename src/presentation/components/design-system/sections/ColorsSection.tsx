/**
 * 색상 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const ColorsSection: React.FC = () => (
  <Section>
    <SectionTitle>색상 팔레트 (Colors)</SectionTitle>
    <SectionDescription>
      프로젝트에서 사용하는 주요 색상입니다. Primary 색상은 브랜드 아이덴티티를 나타내며, Secondary, Muted 등은 UI의 계층 구조를 표현하는 데 사용됩니다.
    </SectionDescription>

    <ColorGrid>
      {Object.entries(theme.colors).map(([name, value]) => (
        <ColorCard key={name}>
          <ColorSwatch $color={value} />
          <ColorInfo>
            <ColorName>{name}</ColorName>
            <ColorValue>{value}</ColorValue>
          </ColorInfo>
        </ColorCard>
      ))}
    </ColorGrid>

    <SectionTitle>Primary Opacity</SectionTitle>
    <SectionDescription>Primary 색상의 투명도 레벨입니다. 오버레이, 배경 강조 등에 사용됩니다.</SectionDescription>
    <ColorGrid>
      {Object.entries(theme.primaryOpacity).map(([level, value]) => (
        <ColorCard key={level}>
          <ColorSwatch $color={value} />
          <ColorInfo>
            <ColorName>primaryOpacity.{level}</ColorName>
            <ColorValue>{value}</ColorValue>
          </ColorInfo>
        </ColorCard>
      ))}
    </ColorGrid>
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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ColorCard = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 100%;
  height: 100px;
  background-color: ${({ $color }) => $color};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ColorInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
`;

const ColorName = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.foreground};
`;

const ColorValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

