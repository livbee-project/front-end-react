import type { Meta, StoryObj } from '@storybook/react';
import DateInput from '@/presentation/components/forms/inputs/DateInput';
import {
  BasicDateInput,
  DateInputStates,
  DateInputUsageExamples,
  DateInputWithMinMax,
} from '@/presentation/components/forms/inputs/DateInputStoryContent';

const meta: Meta<typeof DateInput> = {
  title: 'Forms/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '날짜 입력 필드 컴포넌트입니다. 날짜 선택 UI를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: '선택된 날짜 (YYYY-MM-DD 형식)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  render: () => <BasicDateInput />,
};

export const States: Story = {
  render: () => <DateInputStates />,
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드의 다양한 상태입니다. 기본, 값이 있는 상태, 비활성화 상태를 보여줍니다.',
      },
    },
  },
};

export const WithMinMax: Story = {
  render: () => <DateInputWithMinMax />,
  parameters: {
    docs: {
      description: {
        story: 'min과 max 속성으로 선택 가능한 날짜 범위를 제한할 수 있습니다.',
      },
    },
  },
};

export const UsageExamples: Story = {
  render: () => <DateInputUsageExamples />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 생년월일, 기간 선택 등 다양한 용도로 사용할 수 있습니다.',
      },
    },
  },
};

