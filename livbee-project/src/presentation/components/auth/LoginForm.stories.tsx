import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { useState } from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

// ===== 기본 로그인 폼 =====
export const Default: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
      setIsLoading(true);
      setError(null);
      setTimeout(() => {
        setIsLoading(false);
        if (email && password) {
          alert('로그인 성공!');
        } else {
          setError('이메일과 비밀번호를 입력해주세요.');
        }
      }, 1000);
    };

    return (
      <Container>
        <LoginForm
          email={email}
          password={password}
          isLoading={isLoading}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
          onSignUp={() => alert('회원가입 페이지로 이동')}
        />
      </Container>
    );
  },
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
  render: () => {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password123');

    return (
      <Container>
        <LoginForm
          email={email}
          password={password}
          isLoading={true}
          error={null}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={() => {}}
          onSignUp={() => {}}
        />
      </Container>
    );
  },
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
  render: () => {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('wrongpassword');
    const [error, setError] = useState<string | null>('이메일 또는 비밀번호가 올바르지 않습니다.');

    return (
      <Container>
        <LoginForm
          email={email}
          password={password}
          isLoading={false}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={() => setError('로그인에 실패했습니다.')}
          onSignUp={() => {}}
        />
      </Container>
    );
  },
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
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>빈 입력</h3>
          <Container>
            <LoginForm
              email=""
              password=""
              isLoading={false}
              error={null}
              onEmailChange={() => {}}
              onPasswordChange={() => {}}
              onLogin={() => {}}
              onSignUp={() => {}}
            />
          </Container>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px' }}>입력 완료</h3>
          <Container>
            <LoginForm
              email="user@example.com"
              password="password123"
              isLoading={false}
              error={null}
              onEmailChange={() => {}}
              onPasswordChange={() => {}}
              onLogin={() => {}}
              onSignUp={() => {}}
            />
          </Container>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 입력 상태를 보여줍니다.',
      },
    },
  },
};

