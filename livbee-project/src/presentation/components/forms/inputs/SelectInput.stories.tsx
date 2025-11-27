import type { Meta, StoryObj } from '@storybook/react';
import SelectInput from './SelectInput';
import {
  selectSampleOptions,
  SelectInputOptionsDemo,
  SelectInputStatesDemo,
  SelectInputUsageDemo,
} from './SelectInputStoryContent';

const meta: Meta<typeof SelectInput> = {
  title: 'Forms/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '선택 입력 필드 컴포넌트입니다. 드롭다운 메뉴에서 옵션을 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '선택 가능한 옵션 리스트',
    },
    value: {
      control: 'text',
      description: '선택된 값',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

// ===== 기본 선택 =====
export const Default: Story = {
  args: {
    options: selectSampleOptions,
    value: '',
    onChange: () => {},
  },
};

export const Options: Story = {
  render: () => <SelectInputOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story: '다양한 옵션을 가진 선택 필드입니다.',
      },
    },
  },
};

// ===== 상태 =====
export const States: Story = {
  render: () => <SelectInputStatesDemo />,
  parameters: {
    docs: {
      description: {
        story: '선택 필드의 다양한 상태입니다. 기본, 선택됨, 비활성화 상태를 보여줍니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <SelectInputUsageDemo />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 폼에서 다양한 선택 필드로 사용할 수 있습니다.',
      },
    },
  },
};

