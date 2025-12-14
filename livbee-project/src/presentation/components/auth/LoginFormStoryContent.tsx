import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginForm } from '@/presentation/components/auth/LoginForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const DefaultLoginDemo: React.FC = () => {
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
};

export const LoadingLoginDemo: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');

  return (
    <Container>
      <LoginForm
        email={email}
        password={password}
        isLoading
        error={null}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={() => {}}
        onSignUp={() => {}}
      />
    </Container>
  );
};

export const ErrorLoginDemo: React.FC = () => {
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
};

export const LoginInputStatesDemo: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
    <div>
      <h3 style={{ marginBottom: 16 }}>빈 입력</h3>
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
      <h3 style={{ marginBottom: 16 }}>입력 완료</h3>
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

