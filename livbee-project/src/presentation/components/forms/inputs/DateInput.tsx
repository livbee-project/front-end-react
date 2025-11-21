import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';
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

const IconWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const DateInput: React.FC<DateInputProps> = ({ value, onChange, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput value={value} onChange={onChange} {...props} />
      <IconWrapper>
        <Calendar size={18} />
      </IconWrapper>
    </InputWrapper>
  );
};

export default DateInput;

