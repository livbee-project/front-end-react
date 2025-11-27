import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';
import TextInput from '../inputs/TextInput';
import {
  FormFieldActionExample,
  FormFieldInputsExample,
  FormFieldUsageExample,
} from './FormFieldStoryExamples';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '공통 폼 필드 래퍼 컴포넌트입니다. Label, Description, Helper, Action을 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '필드 레이블',
    },
    required: {
      control: 'boolean',
      description: '필수 필드 여부',
    },
    description: {
      control: 'text',
      description: '필드 설명',
    },
    helper: {
      control: 'text',
      description: '도움말 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// ===== 기본 필드 =====
export const Default: Story = {
  args: {
    label: '이름',
    children: <TextInput placeholder="이름을 입력하세요" />,
  },
};

// ===== 필수 필드 =====
export const Required: Story = {
  args: {
    label: '이메일',
    required: true,
    description: '로그인에 사용할 이메일 주소를 입력하세요',
    children: <TextInput type="email" placeholder="example@email.com" />,
  },
};

// ===== Helper 포함 =====
export const WithHelper: Story = {
  args: {
    label: '비밀번호',
    description: '8자 이상의 영문, 숫자, 특수문자를 포함하세요',
    helper: '비밀번호는 안전하게 보관하세요',
    children: <TextInput type="password" placeholder="비밀번호를 입력하세요" />,
  },
};

// ===== Action 포함 =====
export const WithAction: Story = {
  render: () => <FormFieldActionExample />,
  parameters: {
    docs: {
      description: {
        story: 'Action prop을 사용하여 필드 레이블 옆에 버튼이나 링크를 추가할 수 있습니다.',
      },
    },
  },
};

// ===== 다양한 입력 필드 =====
export const WithDifferentInputs: Story = {
  render: () => <FormFieldInputsExample />,
  parameters: {
    docs: {
      description: {
        story: '다양한 입력 필드와 함께 사용할 수 있습니다. TextInput, SelectInput, DateInput 등과 함께 사용합니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <FormFieldUsageExample />,
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 사용하는 예시입니다. 여러 필드를 일관된 스타일로 구성할 수 있습니다.',
      },
    },
  },
};

