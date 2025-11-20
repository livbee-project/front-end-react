import React, { useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import DatePickerModal from './DatePickerModal';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import InputIcon from '@/presentation/components/forms/inputs/InputIcon';
import { INPUT_BASE_STYLE } from '@/presentation/styles/constants';

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, ...rest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    cursor: 'pointer',
  };

  const getDateFromValue = (): Date | undefined => {
    if (!value) return undefined;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  };

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      const formattedDate = formatDateToString(date);
      const syntheticEvent = {
        target: { value: formattedDate },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
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
        <input
          type="text"
          style={inputStyle}
          value={value || ''}
          readOnly
          onClick={() => setIsModalOpen(true)}
          placeholder={rest.placeholder || '날짜를 선택해주세요'}
          {...rest}
        />
        <InputIcon icon={RiCalendarLine} />
      </InputWrapper>

      <DatePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={getDateFromValue()}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default DateInput;

