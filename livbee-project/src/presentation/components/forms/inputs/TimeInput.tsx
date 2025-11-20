import React, { useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TimePickerModal from './TimePickerModal';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import InputIcon from '@/presentation/components/forms/inputs/InputIcon';
import { INPUT_BASE_STYLE } from '@/presentation/styles/constants';

interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value, onChange, ...rest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    color: value ? 'var(--black)' : 'var(--dark-gray)',
    cursor: 'pointer',
  };

  const formatTimeTo12Hour = (time24?: string): string => {
    if (!time24) return '';
    const [hourStr, minuteStr] = time24.split(':');
    const hour24 = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12} : ${String(minute).padStart(2, '0')} ${period}`;
  };

  const handleTimeSelect = (time24: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: time24 },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const displayValue = formatTimeTo12Hour(value);

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
          value={displayValue}
          readOnly
          onClick={() => setIsModalOpen(true)}
          placeholder={rest.placeholder || '시간을 선택해주세요'}
          {...rest}
        />
        <InputIcon icon={RiTimeLine} color="var(--primary)" />
      </InputWrapper>

      <TimePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTime={value}
        onTimeSelect={handleTimeSelect}
      />
    </div>
  );
};

export default TimeInput;

