import type { Meta, StoryObj } from '@storybook/react';
import SectionTitle from './SectionTitle';
import styled from 'styled-components';
import React from 'react';

const meta: Meta<typeof SectionTitle> = {
  title: 'UI Components/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '섹션 제목 컴포넌트입니다. 다양한 variant와 bullet 옵션을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtitle', 'detail'],
      description: '제목 스타일 변형',
    },
    showBullet: {
      control: 'boolean',
      description: 'Bullet 표시 여부',
    },
    marginBottom: {
      control: 'text',
      description: '하단 마진',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

// ===== 기본 제목 =====
export const Default: Story = {
  args: {
    children: '섹션 제목',
  },
};

// ===== Variants =====
const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Variants: Story = {
  render: () => (
    <VariantContainer>
      <div>
        <SectionTitle variant="default">Default 제목</SectionTitle>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#717182' }}>
          기본 스타일: 14px, Bold 700
        </p>
      </div>
      <div>
        <SectionTitle variant="subtitle">Subtitle 제목</SectionTitle>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#717182' }}>
          부제목 스타일: 14px, Medium 500, Muted 색상
        </p>
      </div>
      <div>
        <SectionTitle variant="detail">Detail 제목</SectionTitle>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#717182' }}>
          상세 페이지 스타일: 14px, Bold 700
        </p>
      </div>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '세 가지 variant 스타일입니다. Default는 일반 섹션, Subtitle은 부제목, Detail은 상세 페이지에 사용됩니다.',
      },
    },
  },
};

// ===== Bullet 포함 =====
export const WithBullet: Story = {
  render: () => (
    <VariantContainer>
      <SectionTitle showBullet>Bullet이 있는 제목</SectionTitle>
      <SectionTitle showBullet variant="detail">Detail 스타일 + Bullet</SectionTitle>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'showBullet prop을 사용하면 제목 앞에 Primary 색상의 bullet이 표시됩니다.',
      },
    },
  },
};

// ===== 다양한 마진 =====
export const DifferentMargins: Story = {
  render: () => (
    <VariantContainer>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
        <SectionTitle marginBottom="8px">작은 마진 (8px)</SectionTitle>
        <p>콘텐츠가 바로 이어집니다.</p>
      </div>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
        <SectionTitle marginBottom="16px">기본 마진 (16px)</SectionTitle>
        <p>콘텐츠가 적당한 간격으로 이어집니다.</p>
      </div>
      <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px' }}>
        <SectionTitle marginBottom="24px">큰 마진 (24px)</SectionTitle>
        <p>콘텐츠가 넓은 간격으로 이어집니다.</p>
      </div>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'marginBottom prop으로 하단 마진을 조절할 수 있습니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => (
    <VariantContainer>
      <div>
        <SectionTitle>홈 섹션 제목</SectionTitle>
        <p style={{ marginTop: '8px' }}>섹션 내용이 여기에 표시됩니다.</p>
      </div>
      <div>
        <SectionTitle variant="subtitle">부제목</SectionTitle>
        <p style={{ marginTop: '8px' }}>부제목 아래 내용이 표시됩니다.</p>
      </div>
      <div>
        <SectionTitle variant="detail" showBullet>상세 페이지 섹션</SectionTitle>
        <p style={{ marginTop: '8px' }}>상세 페이지의 섹션 내용입니다.</p>
      </div>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 다양한 페이지에서 섹션 제목으로 사용할 수 있습니다.',
      },
    },
  },
};

