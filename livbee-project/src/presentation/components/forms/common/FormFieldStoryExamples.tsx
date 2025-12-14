import React, { useState } from 'react';
import styled from 'styled-components';
import FormField from '@/presentation/components/forms/common/FormField';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import SelectInput from '@/presentation/components/forms/inputs/SelectInput';
import DateInput from '@/presentation/components/forms/inputs/DateInput';
import Button from '@/presentation/components/ui/Button';

export const FormFieldActionExample: React.FC = () => (
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
);

export const FormFieldInputsExample: React.FC = () => {
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
      <FormField label="이름" required description="실명을 입력하세요">
        <TextInput value={text} onChange={(e) => setText(e.target.value)} placeholder="이름을 입력하세요" />
      </FormField>
      <FormField label="카테고리" description="항목을 선택하세요">
        <SelectInput options={options} value={select} onChange={(e) => setSelect(e.target.value)} />
      </FormField>
      <FormField label="생년월일" required helper="만 14세 이상만 가입 가능합니다">
        <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
      </FormField>
    </InputContainer>
  );
};

export const FormFieldUsageExample: React.FC = () => {
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
      <FormField label="이름" required description="실명을 입력하세요">
        <TextInput
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="이름을 입력하세요"
        />
      </FormField>
      <FormField label="이메일" required description="로그인에 사용할 이메일 주소" helper="이메일은 변경할 수 없습니다">
        <TextInput
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="example@email.com"
        />
      </FormField>
      <FormField label="전화번호" description="연락 가능한 전화번호">
        <TextInput
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="010-1234-5678"
        />
      </FormField>
      <FormField label="카테고리" description="관심 카테고리를 선택하세요">
        <SelectInput
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </FormField>
    </InputContainer>
  );
};

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
`;

