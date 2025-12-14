import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/presentation/components/ui/Button';
import {
  ButtonCombinationsSection,
  ButtonSizesSection,
  ButtonStatesSection,
  ButtonVariantsSection,
} from '@/presentation/components/ui/ButtonStoryContent';

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '공통 버튼 컴포넌트입니다. 다양한 스타일(variant)과 크기(size)를 지원하며, 전체 너비 옵션과 비활성화 상태를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => <ButtonVariantsSection />,
  parameters: {
    docs: {
      description: {
        story: '버튼의 세 가지 스타일 변형입니다. Primary는 주요 액션, Secondary는 보조 액션, Outline은 경계선이 있는 스타일입니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => <ButtonSizesSection />,
  parameters: {
    docs: {
      description: {
        story: '버튼의 세 가지 크기입니다. Small은 작은 공간에, Medium은 일반적인 용도에, Large는 강조가 필요한 경우에 사용합니다.',
      },
    },
  },
};

export const States: Story = {
  render: () => <ButtonStatesSection />,
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태입니다. Disabled는 비활성화 상태, Full Width는 전체 너비를 차지합니다.',
      },
    },
  },
};

export const Combinations: Story = {
  render: () => <ButtonCombinationsSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 variant와 size의 조합 예시입니다.',
      },
    },
  },
};

