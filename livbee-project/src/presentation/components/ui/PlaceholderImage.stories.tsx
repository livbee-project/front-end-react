import type { Meta, StoryObj } from '@storybook/react';
import PlaceholderImage from './PlaceholderImage';
import {
  PlaceholderOpacitySection,
  PlaceholderSizesSection,
  PlaceholderUsageSection,
} from './PlaceholderImageStoryContent';

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
export const Sizes: Story = {
  render: () => <PlaceholderSizesSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 플레이스홀더 이미지입니다.',
      },
    },
  },
};

// ===== 다양한 투명도 =====
export const Opacities: Story = {
  render: () => <PlaceholderOpacitySection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 투명도의 플레이스홀더 이미지입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <PlaceholderUsageSection />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 이미지가 없을 때 다양한 크기와 투명도로 사용할 수 있습니다.',
      },
    },
  },
};

