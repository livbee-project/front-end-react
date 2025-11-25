import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';
import styled from 'styled-components';
import React, { useState } from 'react';

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

// ===== 기본 입력 =====
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// ===== Label 포함 =====
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

// ===== Label과 Description =====
export const WithLabelAndDescription: Story = {
  args: {
    label: '이메일',
    description: '로그인에 사용할 이메일 주소를 입력하세요',
    placeholder: 'example@email.com',
  },
};

// ===== 다양한 상태 =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

export const States: Story = {
  render: () => (
    <StateContainer>
      <TextInput
        label="기본 상태"
        placeholder="텍스트를 입력하세요"
      />
      <TextInput
        label="비활성화"
        placeholder="입력할 수 없습니다"
        disabled
      />
      <TextInput
        label="값이 있는 상태"
        placeholder="텍스트를 입력하세요"
        defaultValue="입력된 값"
      />
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 다양한 상태입니다. 기본, 비활성화, 값이 있는 상태를 보여줍니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export const UsageExamples: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <ExampleContainer>
        <TextInput
          label="이름"
          description="실명을 입력하세요"
          placeholder="홍길동"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="이메일"
          description="로그인에 사용할 이메일 주소"
          placeholder="example@email.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="전화번호"
          description="연락 가능한 전화번호를 입력하세요"
          placeholder="010-1234-5678"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </ExampleContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 폼에서 다양한 입력 필드로 사용할 수 있습니다.',
      },
    },
  },
};

