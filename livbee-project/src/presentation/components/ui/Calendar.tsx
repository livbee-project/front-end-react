import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'react-day-picker/dist/style.css';
import { useCalendarDOM } from './Calendar.hooks';
import {
  CalendarContainer,
  StyledDayPicker,
  CalendarFooter,
  CancelButton,
  ConfirmButton,
} from './Calendar.styles';
import { formatDateToString, parseDateString } from './Calendar.utils';

interface CalendarProps {
  value?: string; // YYYY-MM-DD 형식
  onChange: (date: string) => void;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  onClose,
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    parseDateString(value)
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  // value prop이 변경될 때 selectedDate 업데이트
  useEffect(() => {
    setSelectedDate(parseDateString(value));
  }, [value]);

  // 외부 클릭 감지 (메모이제이션)
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // DOM 조작 로직을 커스텀 훅으로 분리
  useCalendarDOM({ calendarRef });

  const handleDateSelect = useCallback((date: Date | undefined) => {
    // 날짜 선택 시 임시로 상태만 업데이트 (적용은 하지 않음)
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleConfirmClick = useCallback(() => {
    // 선택 버튼 클릭 시에만 날짜 적용 및 창 닫기
    if (selectedDate) {
      onChange(formatDateToString(selectedDate));
    }
    onClose();
  }, [selectedDate, onChange, onClose]);

  const handleCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <CalendarContainer ref={calendarRef}>
      <StyledDayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        showOutsideDays
        fixedWeeks
        fromDate={minDate}
        toDate={maxDate}
      />
      <CalendarFooter>
        <CancelButton onClick={handleCancelClick}>취소</CancelButton>
        <ConfirmButton onClick={handleConfirmClick} disabled={!selectedDate}>
          선택
        </ConfirmButton>
      </CalendarFooter>
    </CalendarContainer>
  );
};

export default Calendar;

