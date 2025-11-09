import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Modal from '@/presentation/components/ui/Modal';
import '@/presentation/styles/global.css';
import 'react-day-picker/dist/style.css';

/**
 * DatePickerModal 컴포넌트가 받을 props 타입을 정의합니다.
 * @param isOpen - 모달 열림/닫힘 상태
 * @param onClose - 모달 닫기 함수
 * @param selectedDate - 선택된 날짜
 * @param onDateSelect - 날짜 선택 시 실행될 함수
 */
interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
}

/**
 * 날짜 선택 모달 컴포넌트입니다.
 * 이미지 디자인에 맞춘 3단계 네비게이션(날짜/월/연도)을 지원합니다.
 */
const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
}) => {
  const [view, setView] = useState<'date' | 'month' | 'year'>('date');
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  /**
   * 날짜 선택 핸들러
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      onClose();
    }
  };

  /**
   * Today 버튼 클릭 핸들러
   */
  const handleTodayClick = () => {
    const today = new Date();
    onDateSelect(today);
    onClose();
  };

  /**
   * react-day-picker 커스텀 스타일
   */
  const customStyles = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: var(--primary);
      --rdp-background-color: var(--white);
      --rdp-outline: 2px solid var(--primary);
      --rdp-outline-selected: 2px solid var(--primary);
      margin: 0;
    }

    .rdp-months {
      display: flex;
      justify-content: center;
    }

    .rdp-month {
      margin: 0;
    }

    .rdp-caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      margin-bottom: 16px;
    }

    .rdp-caption-hidden {
      display: none !important;
    }

    .rdp-caption_label {
      font-size: var(--h2);
      font-weight: 700;
      color: var(--black);
    }

    .rdp-nav {
      display: flex;
      gap: 8px;
    }

    .rdp-nav_button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--black);
      border-radius: 4px;
    }

    .rdp-nav_button:hover {
      background-color: #f0f0f0;
    }

    .rdp-head_cell {
      font-size: var(--p2);
      font-weight: 400;
      color: var(--dark-gray);
      padding: 8px 0;
    }

    .rdp-day {
      width: var(--rdp-cell-size);
      height: var(--rdp-cell-size);
      border-radius: 8px;
      font-size: var(--p2);
      font-weight: 400;
      color: var(--black);
    }

    .rdp-day:hover:not(.rdp-day_disabled):not(.rdp-day_selected) {
      background-color: #f0f0f0;
    }

    .rdp-day_selected {
      background-color: var(--primary);
      color: var(--white);
      font-weight: 700;
    }

    .rdp-day_today {
      background-color: rgba(104, 124, 244, 0.1);
      color: var(--black);
      font-weight: 400;
    }

    .rdp-day_disabled {
      color: var(--dark-gray);
      opacity: 0.5;
    }

    .rdp-day_outside {
      color: var(--dark-gray);
      opacity: 0.5;
    }
  `;

  /**
   * 월 이름 배열
   */
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  /**
   * 월 선택 뷰 렌더링
   */
  const renderMonthView = () => {
    const currentYear = currentMonth.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i);
    const selectedMonth = selectedDate?.getMonth();

    return (
      <div>
        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => setCurrentMonth(new Date(currentYear - 1, 0))}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <RiArrowLeftSLine size={20} />
          </button>
          <span style={{ fontSize: 'var(--h2)', fontWeight: 700, color: 'var(--black)' }}>
            {currentYear}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentYear + 1, 0))}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        {/* 월 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}
        >
          {months.map((month) => {
            const isSelected = month === selectedMonth && currentYear === selectedDate?.getFullYear();
            return (
              <button
                key={month}
                onClick={() => {
                  const newDate = new Date(currentYear, month, currentMonth.getDate());
                  setCurrentMonth(newDate);
                  setView('date');
                }}
                style={{
                  padding: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                  color: isSelected ? 'var(--white)' : 'var(--black)',
                  fontSize: 'var(--p2)',
                  fontWeight: isSelected ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {monthNames[month]}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * 연도 선택 뷰 렌더링
   */
  const renderYearView = () => {
    const currentYear = currentMonth.getFullYear();
    const decadeStart = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);
    const selectedYear = selectedDate?.getFullYear();

    return (
      <div>
        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button
            onClick={() => setCurrentMonth(new Date(decadeStart - 10, 0))}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <RiArrowLeftSLine size={20} />
          </button>
          <span style={{ fontSize: 'var(--h2)', fontWeight: 700, color: 'var(--black)' }}>
            {decadeStart}-{decadeStart + 9}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(decadeStart + 10, 0))}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        {/* 연도 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}
        >
          {years.map((year) => {
            const isSelected = year === selectedYear;
            const isOutsideRange = year < decadeStart || year > decadeStart + 9;
            return (
              <button
                key={year}
                onClick={() => {
                  const newDate = new Date(year, currentMonth.getMonth(), currentMonth.getDate());
                  setCurrentMonth(newDate);
                  setView('month');
                }}
                style={{
                  padding: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                  color: isSelected ? 'var(--white)' : isOutsideRange ? 'var(--dark-gray)' : 'var(--black)',
                  fontSize: 'var(--p2)',
                  fontWeight: isSelected ? 700 : 400,
                  cursor: 'pointer',
                  opacity: isOutsideRange ? 0.5 : 1,
                }}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{customStyles}</style>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="400px"
        width="90%"
        padding="24px"
      >
        {view === 'date' && (
            <>
              {/* 커스텀 헤더 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth()))}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiArrowLeftSLine size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiArrowLeftSLine size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => setView('month')}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 'var(--h2)',
                      fontWeight: 700,
                      color: 'var(--black)',
                      padding: '4px 8px',
                    }}
                  >
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </button>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiArrowRightSLine size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth()))}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RiArrowRightSLine size={16} />
                    </button>
                  </div>
                </div>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  modifiersClassNames={{
                    selected: 'rdp-day_selected',
                    today: 'rdp-day_today',
                  }}
                  classNames={{
                    months: 'rdp-months',
                    month: 'rdp-month',
                    caption: 'rdp-caption-hidden',
                    nav: 'rdp-nav',
                    nav_button: 'rdp-nav_button',
                  }}
                />
              {/* Today 버튼 */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button
                  onClick={handleTodayClick}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 'var(--p2)',
                    fontWeight: 400,
                    color: 'var(--black)',
                    padding: '8px 16px',
                  }}
                >
                  Today
                </button>
              </div>
            </>
          )}
        {view === 'month' && (
          <>
            {renderMonthView()}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                onClick={() => setView('year')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: 'var(--p2)',
                  fontWeight: 400,
                  color: 'var(--black)',
                  padding: '8px 16px',
                }}
              >
                {currentMonth.getFullYear()}
              </button>
            </div>
          </>
        )}
        {view === 'year' && renderYearView()}
      </Modal>
    </>
  );
};

export default DatePickerModal;

