import type { Meta, StoryObj } from '@storybook/react';
import TimeInput from '@/presentation/components/forms/inputs/TimeInput';
import {
  TimeInputDefaultStory,
  TimeInputDisabledStory,
  TimeInputUsageStory,
  TimeInputVariationsStory,
} from '@/presentation/components/forms/inputs/TimeInputStoryContent';

const meta: Meta<typeof TimeInput> = {
  title: 'Forms/TimeInput',
  component: TimeInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '시간 입력 필드 컴포넌트입니다. 시와 분을 선택할 수 있는 시간 선택기를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 시간 값 (HH:MM 형식)',
    },
    onChange: {
      action: 'changed',
      description: '시간이 변경될 때 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeInput>;

export const Default: Story = {
  render: () => <TimeInputDefaultStory />,
  parameters: {
    docs: {
      description: {
        story: '기본 시간 입력 필드입니다. 시계 아이콘이 오른쪽에 표시됩니다.',
      },
    },
  },
};

export const TimeVariations: Story = {
  render: () => <TimeInputVariationsStory />,
  parameters: {
    docs: {
      description: {
        story: '다양한 시간을 선택할 수 있습니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => <TimeInputDisabledStory />,
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 시간 입력 필드입니다.',
      },
    },
  },
};

export const UsageExample: Story = {
  render: () => <TimeInputUsageStory />,
  parameters: {
    docs: {
      description: {
        story: '시작 시간과 종료 시간을 선택하는 예시입니다.',
      },
    },
  },
};

