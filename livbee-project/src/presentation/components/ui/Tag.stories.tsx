import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';
import { TagVariantsSection, TagClickableSection, TagUsageSection } from './TagStoryContent';

const meta: Meta<typeof Tag> = {
  title: 'UI Components/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '정보 및 태그 섹션에서 사용되는 태그 컴포넌트입니다. 둥근 사각형 또는 원형 스타일을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '태그에 표시될 텍스트',
    },
    variant: {
      control: 'select',
      options: ['rounded', 'circle'],
      description: '태그 스타일 변형',
    },
    onClick: {
      action: 'clicked',
      description: '태그 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// ===== 기본 태그 =====
export const Default: Story = {
  args: {
    label: '태그',
    variant: 'rounded',
  },
};

// ===== Variants =====
export const Variants: Story = {
  render: () => <TagVariantsSection />,
  parameters: {
    docs: {
      description: {
        story: '태그의 두 가지 스타일 변형입니다. Rounded는 둥근 사각형, Circle은 원형입니다. Circle은 보통 1-2글자만 표시합니다.',
      },
    },
  },
};

// ===== 클릭 가능 =====
export const Clickable: Story = {
  render: () => <TagClickableSection />,
  parameters: {
    docs: {
      description: {
        story: 'onClick prop을 전달하면 클릭 가능한 태그가 됩니다. 호버 시 시각적 피드백이 제공됩니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <TagUsageSection />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 카테고리, 필터, 브랜드 등 다양한 용도로 사용할 수 있습니다.',
      },
    },
  },
};

