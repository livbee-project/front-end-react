import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.input.padding};
  padding-right: ${({ theme }) => theme.spacing['3xl']};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-radius: ${({ theme }) => theme.input.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.input.fontSize};
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 400;
  outline: none;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.input.focusBorderColor};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ChevronIcon = styled(ChevronDown)`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`;

const SelectInput: React.FC<SelectInputProps> = ({ options, value, onChange, ...props }) => {
  return (
    <SelectWrapper>
      <StyledSelect value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <ChevronIcon size={18} />
    </SelectWrapper>
  );
};

export default SelectInput;

