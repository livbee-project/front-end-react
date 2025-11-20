import React from 'react';
import styled from 'styled-components';
import { Input, Label, LabelDescription } from '@/presentation/components/styled/CommonStyles';

/**
 * TextInput이 받을 props 타입을 정의합니다.
 */
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

/**
 * 입력 필드 컨테이너 스타일
 */
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/**
 * 라벨 컨테이너 스타일
 */
const LabelContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 일반 텍스트 입력 필드 컴포넌트
 */
const TextInput: React.FC<TextInputProps> = ({ label, description, ...rest }) => {
  return (
    <InputContainer>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
          {description && <LabelDescription>{description}</LabelDescription>}
        </LabelContainer>
      )}
      <Input type="text" {...rest} />
    </InputContainer>
  );
};

export default TextInput;
