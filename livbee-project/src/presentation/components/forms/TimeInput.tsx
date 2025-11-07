import React, { useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TimePickerModal from './TimePickerModal';
import InputWrapper from '@/presentation/components/forms/InputWrapper';
import InputIcon from '@/presentation/components/forms/InputIcon';
import { INPUT_BASE_STYLE } from '@/presentation/styles/constants';

/**
 * TimeInput이 받을 props 타입을 정의합니다.
 */
interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 시간 입력 컴포넌트
 * 입력 필드를 클릭하면 모달 형식의 커스텀 시간 선택기가 나타납니다.
 */
const TimeInput: React.FC<TimeInputProps> = ({ label, value, onChange, ...rest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 입력 필드 스타일
   */
  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    color: value ? 'var(--black)' : 'var(--dark-gray)',
    cursor: 'pointer',
  };

  /**
   * 시간을 "HH:mm" 형식에서 "6 : 10 PM" 형식으로 변환
   */
  const formatTimeTo12Hour = (time24?: string): string => {
    if (!time24) return '';
    
    const [hourStr, minuteStr] = time24.split(':');
    const hour24 = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    
    return `${hour12} : ${String(minute).padStart(2, '0')} ${period}`;
  };

  /**
   * 시간 선택 핸들러
   */
  const handleTimeSelect = (time24: string) => {
    if (onChange) {
      // onChange 이벤트를 시뮬레이션
      const syntheticEvent = {
        target: { value: time24 },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  /**
   * 입력 필드 클릭 핸들러
   */
  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  /**
   * 표시할 시간 텍스트
   */
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
          onClick={handleInputClick}
          placeholder={rest.placeholder || '시간을 선택해주세요'}
          {...rest}
        />
        <InputIcon icon={RiTimeLine} color="var(--primary)" />
      </InputWrapper>

      {/* 시간 선택 모달 */}
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


