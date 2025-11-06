import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

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
    width: '100%',
    padding: '12px 16px',
    paddingRight: '40px',
    backgroundColor: 'var(--white)',
    borderRadius: 12,
    border: '1px solid var(--paint-gray, #E5E7ED)',
    fontSize: 'var(--h3)', // 16px
    color: 'var(--black)',
    fontWeight: 400,
    outline: 'none',
    boxSizing: 'border-box',
    appearance: 'none',
    cursor: 'pointer',
  };

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'var(--dark-gray)',
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
      <div style={wrapperStyle}>
        <select style={selectStyle} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <RiArrowDownSLine size={20} style={iconStyle} />
      </div>
    </div>
  );
};

export default SelectInput;

