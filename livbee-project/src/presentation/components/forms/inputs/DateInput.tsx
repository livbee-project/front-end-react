import React from 'react';
import styled from 'styled-components';
import { Input } from '@/presentation/components/styled/CommonStyles';
import type { DateInputProps } from '@/types/forms';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input).attrs({ type: 'date' })`
  padding-right: ${({ theme }) => theme.spacing['3xl']};

  &::-webkit-calendar-picker-indicator {
    background: none;
    z-index: 1;
    cursor: pointer;
  }
`;

const DateInput: React.FC<DateInputProps> = ({ value, onChange, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput value={value} onChange={onChange} {...props} />
    </InputWrapper>
  );
};

export default DateInput;

