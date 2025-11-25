import type { Meta, StoryObj } from '@storybook/react';
import { theme } from '@/presentation/styles/theme';
import styled from 'styled-components';
import React from 'react';

const meta: Meta = {
  title: 'Design System/Theme',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Livbee 프로젝트의 디자인 토큰 시스템입니다. 색상, 간격, 타이포그래피, 테두리 반경 등의 디자인 요소를 정의합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 색상 팔레트 =====
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

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.foreground};
  
  &:first-child {
    margin-top: 0;
  }
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

export const Colors: Story = {
  render: () => (
    <div>
      <SectionTitle>색상 팔레트 (Colors)</SectionTitle>
      <SectionDescription>
        프로젝트에서 사용하는 주요 색상입니다. Primary 색상은 브랜드 아이덴티티를 나타내며, 
        Secondary, Muted 등은 UI의 계층 구조를 표현하는 데 사용됩니다.
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
      <SectionDescription>
        Primary 색상의 투명도 레벨입니다. 오버레이, 배경 강조 등에 사용됩니다.
      </SectionDescription>
      
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
    </div>
  ),
};

// ===== Spacing =====
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

const SpacingBar = styled.div<{ $size: string; $value: string }>`
  width: ${({ $size }) => $size};
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

export const Spacing: Story = {
  render: () => (
    <div>
      <SectionTitle>간격 시스템 (Spacing)</SectionTitle>
      <SectionDescription>
        컴포넌트 간 간격을 일관되게 유지하기 위한 간격 시스템입니다. 
        padding, margin, gap 등에 사용됩니다.
      </SectionDescription>
      
      <SpacingGrid>
        {Object.entries(theme.spacing).map(([name, value]) => (
          <SpacingItem key={name}>
            <SpacingLabel>{name}</SpacingLabel>
            <SpacingBar $size={value} $value={value} />
            <SpacingValue>{value}</SpacingValue>
          </SpacingItem>
        ))}
      </SpacingGrid>
    </div>
  ),
};

// ===== Border Radius =====
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

export const BorderRadius: Story = {
  render: () => (
    <div>
      <SectionTitle>테두리 반경 (Border Radius)</SectionTitle>
      <SectionDescription>
        컴포넌트의 모서리를 둥글게 만드는 반경 값입니다. 카드, 버튼, 입력 필드 등에 사용됩니다.
      </SectionDescription>
      
      <RadiusGrid>
        {Object.entries(theme.radii).map(([name, value]) => (
          <RadiusCard key={name} $radius={value}>
            <RadiusLabel>{name}</RadiusLabel>
            <RadiusValue>{value}</RadiusValue>
          </RadiusCard>
        ))}
      </RadiusGrid>
    </div>
  ),
};

// ===== Typography =====
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

export const Typography: Story = {
  render: () => (
    <div>
      <SectionTitle>타이포그래피 (Typography)</SectionTitle>
      <SectionDescription>
        프로젝트에서 사용하는 폰트 스타일입니다. NexonLv2Gothic 폰트를 사용하며, 
        제목, 본문, 버튼, 캡션 등 다양한 용도에 맞는 스타일이 정의되어 있습니다.
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
              <TypographyPreview $font={value}>
                {name === 'h1' && '페이지 타이틀 (H1)'}
                {name === 'h2' && '섹션 타이틀, 이름, 브랜드명 (H2)'}
                {name === 'body' && '본문 텍스트 (Body)'}
                {name === 'button' && '버튼 텍스트 (Button)'}
                {name === 'caption' && '캡션, 태그 (Caption)'}
              </TypographyPreview>
              <TypographyDetails>{value}</TypographyDetails>
            </TypographyItem>
          ))}
      </TypographyGrid>
    </div>
  ),
};

// ===== Breakpoints =====
const BreakpointGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BreakpointItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const BreakpointLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const BreakpointValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

export const Breakpoints: Story = {
  render: () => (
    <div>
      <SectionTitle>반응형 브레이크포인트 (Breakpoints)</SectionTitle>
      <SectionDescription>
        반응형 디자인을 위한 화면 크기 기준점입니다. 미디어 쿼리에서 사용됩니다.
      </SectionDescription>
      
      <BreakpointGrid>
        {Object.entries(theme.breakpoints).map(([name, value]) => (
          <BreakpointItem key={name}>
            <BreakpointLabel>{name}</BreakpointLabel>
            <BreakpointValue>{value}</BreakpointValue>
          </BreakpointItem>
        ))}
      </BreakpointGrid>
    </div>
  ),
};

