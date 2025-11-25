import type { Meta, StoryObj } from '@storybook/react';
import PortraitCard from './PortraitCard';
import styled from 'styled-components';

const meta: Meta<typeof PortraitCard> = {
  title: 'Cards/PortraitCard',
  component: PortraitCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '세로형 이미지(3:4 비율) 기반의 카드 컴포넌트입니다. 컨셉 모델 및 HOT CLIP 섹션에서 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '이미지 URL (3:4 비율 권장)',
    },
    title: {
      control: 'text',
      description: '카드 제목 (모델명 또는 클립명)',
    },
    content: {
      control: 'text',
      description: '카드 부제목 (한 줄 소개)',
    },
    width: {
      control: 'text',
      description: '카드 너비 (기본값: 300px)',
    },
    onPress: {
      action: 'clicked',
      description: '카드 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PortraitCard>;

// ===== 기본 카드 =====
export const Default: Story = {
  args: {
    title: '모델명',
    content: '한 줄 소개가 여기에 표시됩니다.',
  },
};

// ===== 이미지 포함 =====
export const WithImage: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/300x400',
    title: '모델명',
    content: '한 줄 소개가 여기에 표시됩니다.',
  },
};

// ===== 다양한 크기 =====
const SizeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

export const Sizes: Story = {
  render: () => (
    <SizeContainer>
      <PortraitCard
        title="작은 카드"
        content="너비 200px"
        width={200}
      />
      <PortraitCard
        title="기본 카드"
        content="너비 300px (기본값)"
        width={300}
      />
      <PortraitCard
        title="큰 카드"
        content="너비 400px"
        width={400}
      />
    </SizeContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 너비의 카드입니다. width prop으로 크기를 조절할 수 있습니다.',
      },
    },
  },
};

// ===== 가로 스크롤 예시 =====
const ScrollContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollContainer>
      <PortraitCard
        title="모델 1"
        content="한 줄 소개"
        onPress={() => alert('카드 1 클릭')}
      />
      <PortraitCard
        title="모델 2"
        content="한 줄 소개"
        onPress={() => alert('카드 2 클릭')}
      />
      <PortraitCard
        title="모델 3"
        content="한 줄 소개"
        onPress={() => alert('카드 3 클릭')}
      />
      <PortraitCard
        title="모델 4"
        content="한 줄 소개"
        onPress={() => alert('카드 4 클릭')}
      />
      <PortraitCard
        title="모델 5"
        content="한 줄 소개"
        onPress={() => alert('카드 5 클릭')}
      />
    </ScrollContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '가로 스크롤 리스트에서 사용하는 예시입니다. 홈 화면의 컨셉 모델 섹션에서 사용됩니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => (
    <SizeContainer>
      <PortraitCard
        imageUrl="https://via.placeholder.com/300x400"
        title="김모델"
        content="패션 모델, 5년 경력"
        onPress={() => alert('김모델 클릭')}
      />
      <PortraitCard
        imageUrl="https://via.placeholder.com/300x400"
        title="이모델"
        content="뷰티 모델, 3년 경력"
        onPress={() => alert('이모델 클릭')}
      />
      <PortraitCard
        imageUrl="https://via.placeholder.com/300x400"
        title="박모델"
        content="라이프스타일 모델, 신인"
        onPress={() => alert('박모델 클릭')}
      />
    </SizeContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 모델 카드나 클립 카드로 사용할 수 있습니다.',
      },
    },
  },
};

