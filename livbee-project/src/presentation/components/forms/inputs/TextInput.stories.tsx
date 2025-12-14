import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import { TextInputStatesStory, TextInputUsageExamplesStory } from '@/presentation/components/forms/inputs/TextInputStoryContent';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '텍스트 입력 필드 컴포넌트입니다. Label과 Description을 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 레이블',
    },
    description: {
      control: 'text',
      description: '입력 필드 설명',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithLabelAndDescription: Story = {
  args: {
    label: '이메일',
    description: '로그인에 사용할 이메일 주소를 입력하세요',
    placeholder: 'example@email.com',
  },
};

export const States: Story = {
  render: () => <TextInputStatesStory />,
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 다양한 상태입니다. 기본, 비활성화, 값이 있는 상태를 보여줍니다.',
      },
    },
  },
};

export const UsageExamples: Story = {
  render: () => <TextInputUsageExamplesStory />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 폼에서 다양한 입력 필드로 사용할 수 있습니다.',
      },
    },
  },
};

