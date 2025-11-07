import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import InputWrapper from '@/presentation/components/common/InputWrapper';
import InputIcon from '@/presentation/components/common/InputIcon';
import { INPUT_BASE_STYLE } from '@/presentation/styles/constants';

/**
 * SelectInput이 받을 props 타입을 정의합니다.
 */
interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

/**
 * 드롭다운 선택 컴포넌트
 */
const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  ...rest
}) => {
  const selectStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    appearance: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              fontSize: 'var(--h3)',
              fontWeight: 400,
              color: 'var(--black)',
            }}
          >
            {label}
          </span>
        </div>
      )}
      <InputWrapper>
        <select style={selectStyle} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <InputIcon icon={RiArrowDownSLine} />
      </InputWrapper>
    </div>
  );
};

export default SelectInput;

