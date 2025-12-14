import type { Meta, StoryObj } from '@storybook/react';
import { HomeCard } from '@/presentation/components/cards/HomeCard';
import {
  HomeCardDefaultContent,
  HomeCardExamplesSection,
  HomeCardLongText,
  HomeCardNoImage,
} from '@/presentation/components/cards/HomeCardStoryContent';

const meta: Meta<typeof HomeCard> = {
  title: 'Cards/HomeCard',
  component: HomeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '홈 화면에서 사용되는 카드 컴포넌트입니다. 이미지, 브랜드, 제목, 설명, 메타 정보를 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 기본 카드 =====
export const Default: Story = {
  render: () => HomeCardDefaultContent,
};

// ===== 다양한 예시 =====
export const Examples: Story = {
  render: () => <HomeCardExamplesSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 홈 카드 예시입니다. 가로 스크롤 리스트로 사용됩니다.',
      },
    },
  },
};

// ===== 이미지 없음 =====
export const WithoutImage: Story = {
  render: () => <HomeCardNoImage />,
  parameters: {
    docs: {
      description: {
        story: '이미지가 없을 때 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: () => <HomeCardLongText />,
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

