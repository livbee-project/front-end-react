import React from 'react';
import styled from 'styled-components';
import { Input, Label, LabelDescription } from '@/presentation/components/styled/CommonStyles';
import type { TextInputProps } from '@/types/forms';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

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

