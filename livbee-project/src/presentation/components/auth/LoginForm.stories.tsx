import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '@/presentation/components/auth/LoginForm';
import {
  DefaultLoginDemo,
  ErrorLoginDemo,
  LoadingLoginDemo,
  LoginInputStatesDemo,
} from '@/presentation/components/auth/LoginFormStoryContent';

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '로그인 폼 컴포넌트입니다. 이메일과 비밀번호를 입력받아 로그인할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    email: {
      control: 'text',
      description: '이메일 주소',
    },
    password: {
      control: 'text',
      description: '비밀번호',
    },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
    onEmailChange: {
      action: 'email changed',
      description: '이메일이 변경될 때 호출되는 함수',
    },
    onPasswordChange: {
      action: 'password changed',
      description: '비밀번호가 변경될 때 호출되는 함수',
    },
    onLogin: {
      action: 'login clicked',
      description: '로그인 버튼 클릭 시 호출되는 함수',
    },
    onSignUp: {
      action: 'signup clicked',
      description: '회원가입 링크 클릭 시 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: () => <DefaultLoginDemo />,
  parameters: {
    docs: {
      description: {
        story: '기본 로그인 폼입니다. 이메일과 비밀번호를 입력할 수 있습니다.',
      },
    },
  },
};

// ===== 로딩 상태 =====
export const Loading: Story = {
  render: () => <LoadingLoginDemo />,
  parameters: {
    docs: {
      description: {
        story: '로딩 중인 상태의 로그인 폼입니다. 버튼이 비활성화되고 "로그인 중..." 텍스트가 표시됩니다.',
      },
    },
  },
};

// ===== 에러 상태 =====
export const WithError: Story = {
  render: () => <ErrorLoginDemo />,
  parameters: {
    docs: {
      description: {
        story: '에러 메시지가 표시되는 로그인 폼입니다.',
      },
    },
  },
};

// ===== 다양한 입력 상태 =====
export const InputStates: Story = {
  render: () => <LoginInputStatesDemo />,
  parameters: {
    docs: {
      description: {
        story: '다양한 입력 상태를 보여줍니다.',
      },
    },
  },
};

