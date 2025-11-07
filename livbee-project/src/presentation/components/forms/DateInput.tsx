import React, { useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import DatePickerModal from './DatePickerModal';

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
    cursor: 'pointer',
  };

  /**
   * 래퍼 스타일
   */
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  /**
   * 아이콘 스타일
   */
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'var(--dark-gray)',
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
      <div style={wrapperStyle}>
        <input
          type="text"
          style={inputStyle}
          value={value || ''}
          readOnly
          onClick={handleInputClick}
          placeholder={rest.placeholder || '날짜를 선택해주세요'}
          {...rest}
        />
        <RiCalendarLine size={20} style={iconStyle} />
      </div>

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

