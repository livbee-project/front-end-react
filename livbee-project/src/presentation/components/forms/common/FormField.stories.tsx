import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';
import TextInput from '../inputs/TextInput';
import SelectInput from '../inputs/SelectInput';
import DateInput from '../inputs/DateInput';
import Button from '@/presentation/components/ui/Button';
import styled from 'styled-components';
import React, { useState } from 'react';

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
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export const WithAction: Story = {
  render: () => (
    <ActionContainer>
      <FormField
        label="이메일"
        action={
          <Button size="small" variant="outline">
            중복 확인
          </Button>
        }
      >
        <TextInput type="email" placeholder="example@email.com" />
      </FormField>
      <FormField
        label="전화번호"
        action={
          <Button size="small" variant="outline">
            인증하기
          </Button>
        }
      >
        <TextInput type="tel" placeholder="010-1234-5678" />
      </FormField>
    </ActionContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Action prop을 사용하여 필드 레이블 옆에 버튼이나 링크를 추가할 수 있습니다.',
      },
    },
  },
};

// ===== 다양한 입력 필드 =====
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export const WithDifferentInputs: Story = {
  render: () => {
    const [text, setText] = useState('');
    const [select, setSelect] = useState('');
    const [date, setDate] = useState('');

    const options = [
      { value: '', label: '선택하세요' },
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ];

    return (
      <InputContainer>
        <FormField
          label="이름"
          required
          description="실명을 입력하세요"
        >
          <TextInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </FormField>
        <FormField
          label="카테고리"
          description="항목을 선택하세요"
        >
          <SelectInput
            options={options}
            value={select}
            onChange={(e) => setSelect(e.target.value)}
          />
        </FormField>
        <FormField
          label="생년월일"
          required
          helper="만 14세 이상만 가입 가능합니다"
        >
          <DateInput
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormField>
      </InputContainer>
    );
  },
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
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      category: '',
    });

    const categoryOptions = [
      { value: '', label: '카테고리 선택' },
      { value: 'fashion', label: '패션' },
      { value: 'beauty', label: '뷰티' },
      { value: 'lifestyle', label: '라이프스타일' },
    ];

    return (
      <InputContainer>
        <FormField
          label="이름"
          required
          description="실명을 입력하세요"
        >
          <TextInput
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름을 입력하세요"
          />
        </FormField>
        <FormField
          label="이메일"
          required
          description="로그인에 사용할 이메일 주소"
          helper="이메일은 변경할 수 없습니다"
        >
          <TextInput
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="example@email.com"
          />
        </FormField>
        <FormField
          label="전화번호"
          description="연락 가능한 전화번호"
        >
          <TextInput
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="010-1234-5678"
          />
        </FormField>
        <FormField
          label="카테고리"
          description="관심 카테고리를 선택하세요"
        >
          <SelectInput
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </FormField>
      </InputContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 폼에서 사용하는 예시입니다. 여러 필드를 일관된 스타일로 구성할 수 있습니다.',
      },
    },
  },
};

