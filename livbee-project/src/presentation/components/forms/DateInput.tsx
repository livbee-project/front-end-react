import React, { useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import DatePickerModal from './DatePickerModal';
import InputWrapper from '@/presentation/components/forms/InputWrapper';
import InputIcon from '@/presentation/components/forms/InputIcon';
import { INPUT_BASE_STYLE } from '@/presentation/styles/constants';

/**
 * DateInput이 받을 props 타입을 정의합니다.
 */
interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 날짜 입력 컴포넌트
 * 입력 필드를 클릭하면 모달 형식의 커스텀 캘린더가 나타납니다.
 */
const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, ...rest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * 입력 필드 스타일
   */
  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    cursor: 'pointer',
  };

  /**
   * 날짜를 Date 객체로 변환
   */
  const getDateFromValue = (): Date | undefined => {
    if (!value) return undefined;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  };

  /**
   * Date 객체를 YYYY-MM-DD 형식 문자열로 변환
   */
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * 날짜 선택 핸들러
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      const formattedDate = formatDateToString(date);
      // onChange 이벤트를 시뮬레이션
      const syntheticEvent = {
        target: { value: formattedDate },
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
          onClick={handleInputClick}
          placeholder={rest.placeholder || '날짜를 선택해주세요'}
          {...rest}
        />
        <InputIcon icon={RiCalendarLine} />
      </InputWrapper>

      {/* 날짜 선택 모달 */}
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

