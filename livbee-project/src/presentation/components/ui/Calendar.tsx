import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import 'react-day-picker/dist/style.css';
import { useCalendarDOM } from '@/presentation/components/ui/Calendar.hooks';
import {
  CalendarContainer,
  CalendarOverlay,
  StyledDayPicker,
  CalendarFooter,
  CancelButton,
  ConfirmButton,
} from '@/presentation/components/ui/Calendar.styles';
import { formatDateToString, parseDateString } from '@/presentation/components/ui/Calendar.utils';

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
  const [isClosing, setIsClosing] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // value prop이 변경될 때 selectedDate 업데이트 (메모이제이션)
  const parsedValue = useMemo(() => parseDateString(value), [value]);
  useEffect(() => {
    setSelectedDate(parsedValue);
  }, [parsedValue]);

  // 배경 스크롤 비활성화 (body scroll lock)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 외부 클릭 감지 (메모이제이션)
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 200); // 애니메이션 시간과 맞춤
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
      // 햅틱 피드백 (지원되는 경우)
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  }, []);

  const handleConfirmClick = useCallback(() => {
    // 선택 버튼 클릭 시에만 날짜 적용 및 창 닫기
    if (selectedDate) {
      onChange(formatDateToString(selectedDate));
    }
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 시간과 맞춤
  }, [selectedDate, onChange, onClose]);

  const handleCancelClick = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 시간과 맞춤
  }, [onClose]);

  // 키보드 이벤트 처리 (ESC 키로 닫기)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancelClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCancelClick]);

  return (
    <>
      <CalendarOverlay onClick={handleCancelClick} $isClosing={isClosing} />
      <CalendarContainer ref={calendarRef} $isClosing={isClosing}>
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
          <CancelButton onClick={handleCancelClick} type="button">
            취소
          </CancelButton>
          <ConfirmButton onClick={handleConfirmClick} disabled={!selectedDate} type="button">
            선택
          </ConfirmButton>
        </CalendarFooter>
      </CalendarContainer>
    </>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(Calendar);

