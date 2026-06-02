import type { Meta, StoryObj } from '@storybook/react';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import {
  PortraitCardSizesSection,
  PortraitCardScrollSection,
  PortraitCardUsageSection,
} from '@/presentation/components/cards/PortraitCardStoryContent';

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
export const Sizes: Story = {
  render: () => <PortraitCardSizesSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 너비의 카드입니다. width prop으로 크기를 조절할 수 있습니다.',
      },
    },
  },
};

// ===== 가로 스크롤 예시 =====
export const HorizontalScroll: Story = {
  render: () => <PortraitCardScrollSection />,
  parameters: {
    docs: {
      description: {
        story: 'ContentCardGrid 기반 목록 예시입니다. 모바일 2열 가로 스크롤, 태블릿 3열, 웹 4열입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <PortraitCardUsageSection />,
  parameters: {
    docs: {
      description: {
        story: 'ContentCardGrid 안에서 모델 카드 목록으로 사용하는 예시입니다.',
      },
    },
  },
};

