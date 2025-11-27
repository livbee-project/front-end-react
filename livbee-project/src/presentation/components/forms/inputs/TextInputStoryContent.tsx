import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

export const TextInputStatesStory: React.FC = () => (
  <StateContainer>
    <TextInput label="기본 상태" placeholder="텍스트를 입력하세요" />
    <TextInput label="비활성화" placeholder="입력할 수 없습니다" disabled />
    <TextInput label="값이 있는 상태" placeholder="텍스트를 입력하세요" defaultValue="입력된 값" />
  </StateContainer>
);

export const TextInputUsageExamplesStory: React.FC = () => {
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
};

