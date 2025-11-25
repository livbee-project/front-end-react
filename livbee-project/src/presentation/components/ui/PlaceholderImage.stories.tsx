import type { Meta, StoryObj } from '@storybook/react';
import PlaceholderImage from './PlaceholderImage';
import styled from 'styled-components';
import React from 'react';

const meta: Meta<typeof PlaceholderImage> = {
  title: 'UI Components/PlaceholderImage',
  component: PlaceholderImage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '공통 플레이스홀더 이미지 컴포넌트입니다. 이미지가 없을 때 표시되는 아이콘을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128, step: 8 },
      description: '아이콘 크기 (픽셀)',
    },
    color: {
      control: 'color',
      description: '아이콘 색상',
    },
    opacity: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: '투명도 (0-1)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlaceholderImage>;

// ===== 기본 플레이스홀더 =====
export const Default: Story = {
  args: {
    size: 48,
  },
};

// ===== 다양한 크기 =====
const SizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const SizeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SizeLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Sizes: Story = {
  render: () => (
    <SizeContainer>
      <SizeItem>
        <PlaceholderImage size={24} />
        <SizeLabel>24px</SizeLabel>
      </SizeItem>
      <SizeItem>
        <PlaceholderImage size={32} />
        <SizeLabel>32px</SizeLabel>
      </SizeItem>
      <SizeItem>
        <PlaceholderImage size={48} />
        <SizeLabel>48px (기본값)</SizeLabel>
      </SizeItem>
      <SizeItem>
        <PlaceholderImage size={64} />
        <SizeLabel>64px</SizeLabel>
      </SizeItem>
      <SizeItem>
        <PlaceholderImage size={96} />
        <SizeLabel>96px</SizeLabel>
      </SizeItem>
    </SizeContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 플레이스홀더 이미지입니다.',
      },
    },
  },
};

// ===== 다양한 투명도 =====
const OpacityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const OpacityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const OpacityLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Opacities: Story = {
  render: () => (
    <OpacityContainer>
      <OpacityItem>
        <PlaceholderImage size={48} opacity={1.0} />
        <OpacityLabel>opacity: 1.0</OpacityLabel>
      </OpacityItem>
      <OpacityItem>
        <PlaceholderImage size={48} opacity={0.7} />
        <OpacityLabel>opacity: 0.7</OpacityLabel>
      </OpacityItem>
      <OpacityItem>
        <PlaceholderImage size={48} opacity={0.5} />
        <OpacityLabel>opacity: 0.5 (기본값)</OpacityLabel>
      </OpacityItem>
      <OpacityItem>
        <PlaceholderImage size={48} opacity={0.3} />
        <OpacityLabel>opacity: 0.3</OpacityLabel>
      </OpacityItem>
    </OpacityContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 투명도의 플레이스홀더 이미지입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExampleCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleImageContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const UsageExamples: Story = {
  render: () => (
    <ExampleContainer>
      <ExampleCard>
        <ExampleImageContainer>
          <PlaceholderImage size={24} />
        </ExampleImageContainer>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>상품 카드</div>
          <div style={{ fontSize: '14px', color: '#717182' }}>이미지가 없을 때 플레이스홀더 표시</div>
        </div>
      </ExampleCard>
      <ExampleCard>
        <ExampleImageContainer>
          <PlaceholderImage size={32} />
        </ExampleImageContainer>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>프로필 이미지</div>
          <div style={{ fontSize: '14px', color: '#717182' }}>프로필 이미지가 없을 때</div>
        </div>
      </ExampleCard>
      <ExampleCard>
        <ExampleImageContainer>
          <PlaceholderImage size={48} opacity={0.3} />
        </ExampleImageContainer>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>낮은 투명도</div>
          <div style={{ fontSize: '14px', color: '#717182' }}>배경과 잘 어울리도록 낮은 투명도 사용</div>
        </div>
      </ExampleCard>
    </ExampleContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 이미지가 없을 때 다양한 크기와 투명도로 사용할 수 있습니다.',
      },
    },
  },
};

