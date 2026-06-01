import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Input } from '@/presentation/components/styled/CommonStyles';
import type { DateInputProps } from '@/types/forms';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input).attrs({ type: 'date' })`
  padding-right: ${({ theme }) => theme.spacing['3xl']};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-calendar-picker-indicator {
    background: none;
    z-index: 1;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  &:focus {
    &::-webkit-calendar-picker-indicator {
      transform: scale(1.1);
    }
  }

  &:hover:not(:disabled) {
    &::-webkit-calendar-picker-indicator {
      transform: scale(1.05);
    }
  }
`;

const DateInput: React.FC<DateInputProps> = ({ value, onChange, ...props }) => {
  // onChange 핸들러 최적화
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange]
  );

  return (
    <InputWrapper>
      <StyledInput value={value} onChange={handleChange} {...props} />
    </InputWrapper>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(DateInput);

