import React, { useState, useEffect, useRef } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import '@/presentation/styles/global.css';

/**
 * TimePickerModal 컴포넌트가 받을 props 타입을 정의합니다.
 * @param isOpen - 모달 열림/닫힘 상태
 * @param onClose - 모달 닫기 함수
 * @param selectedTime - 선택된 시간 (HH:mm 형식 또는 "6 : 10 PM" 형식)
 * @param onTimeSelect - 시간 선택 시 실행될 함수 (HH:mm 형식으로 전달)
 */
interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
}

/**
 * 시간 선택 모달 컴포넌트입니다.
 * 이미지 디자인에 맞춘 시간/분/AM-PM 선택기를 제공합니다.
 */
const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  onClose,
  selectedTime,
  onTimeSelect,
}) => {
  /**
   * 시간 문자열을 파싱하여 { hour, minute, period } 객체로 변환
   * @param timeStr - "HH:mm" 또는 "6 : 10 PM" 형식
   */
  const parseTime = (timeStr?: string): { hour: number; minute: number; period: 'AM' | 'PM' } => {
    if (!timeStr) {
      const now = new Date();
      const hour24 = now.getHours();
      const minute = now.getMinutes();
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      return { hour: hour12, minute, period: hour24 >= 12 ? 'PM' : 'AM' };
    }

    // "6 : 10 PM" 형식 파싱
    const pmMatch = timeStr.match(/(\d+)\s*:\s*(\d+)\s*(PM|AM)/i);
    if (pmMatch) {
      const hour = parseInt(pmMatch[1], 10);
      const minute = parseInt(pmMatch[2], 10);
      const period = pmMatch[3].toUpperCase() as 'AM' | 'PM';
      return { hour, minute, period };
    }

    // "HH:mm" 형식 파싱
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hour24 = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const period = hour24 >= 12 ? 'PM' : 'AM';
      return { hour: hour12, minute, period };
    }

    // 파싱 실패 시 현재 시간 반환
    const now = new Date();
    const hour24 = now.getHours();
    const minute = now.getMinutes();
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    return { hour: hour12, minute, period: hour24 >= 12 ? 'PM' : 'AM' };
  };

  /**
   * 시간을 "HH:mm" 형식으로 변환
   */
  const formatTo24Hour = (hour: number, minute: number, period: 'AM' | 'PM'): string => {
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 = hour + 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const parsedTime = parseTime(selectedTime);
  const [hour, setHour] = useState(parsedTime.hour);
  const [minute, setMinute] = useState(parsedTime.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsedTime.period);
  
  /**
   * 초기화 중인지 추적하는 ref
   * 모달이 열릴 때 초기화 중에는 onTimeSelect를 호출하지 않음
   */
  const isInitializing = useRef(false);

  /**
   * 모달이 열릴 때 selectedTime으로 상태 초기화
   */
  useEffect(() => {
    if (isOpen) {
      isInitializing.current = true;
      const parsed = parseTime(selectedTime);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
      // 초기화 완료 후 플래그 리셋
      setTimeout(() => {
        isInitializing.current = false;
      }, 0);
    }
  }, [isOpen, selectedTime]);

  /**
   * 시간/분/AM-PM이 변경될 때마다 자동으로 적용
   * 초기화 중이 아닐 때만 적용
   */
  useEffect(() => {
    if (isOpen && !isInitializing.current) {
      const time24 = formatTo24Hour(hour, minute, period);
      onTimeSelect(time24);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, period, isOpen]);

  /**
   * 모달이 열려있지 않으면 렌더링하지 않음
   * 모든 Hooks 호출 후에 조건부 렌더링
   */
  if (!isOpen) return null;

  /**
   * 오버레이 스타일 (배경)
   */
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  /**
   * 모달 컨테이너 스타일
   */
  const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--white)',
    borderRadius: '16px',
    padding: '24px',
    maxWidth: '320px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  };

  /**
   * 시간/분 증가
   */
  const incrementHour = () => {
    setHour((prev) => (prev >= 12 ? 1 : prev + 1));
  };

  const incrementMinute = () => {
    setMinute((prev) => (prev >= 59 ? 0 : prev + 1));
  };

  /**
   * 시간/분 감소
   */
  const decrementHour = () => {
    setHour((prev) => (prev <= 1 ? 12 : prev - 1));
  };

  const decrementMinute = () => {
    setMinute((prev) => (prev <= 0 ? 59 : prev - 1));
  };

  /**
   * 시간 선택기 컨테이너 스타일
   */
  const pickerContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px',
  };

  /**
   * 시간/분 선택기 스타일
   */
  const pickerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  /**
   * 화살표 버튼 스타일
   */
  const arrowButtonStyle: React.CSSProperties = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary)',
  };

  /**
   * 숫자 표시 스타일
   */
  const numberStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--black)',
    minWidth: '60px',
    textAlign: 'center',
  };

  /**
   * 콜론 스타일
   */
  const colonStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--black)',
    padding: '0 8px',
  };

  /**
   * AM/PM 세그먼트 컨트롤 스타일
   */
  const segmentContainerStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#F7F8FA',
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
  };

  /**
   * AM/PM 버튼 스타일
   */
  const getSegmentButtonStyle = (isSelected: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
    color: isSelected ? 'var(--white)' : 'var(--primary)',
    fontSize: 'var(--h3)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* 시간/분 선택기 */}
        <div style={pickerContainerStyle}>
          {/* 시간 선택 */}
          <div style={pickerStyle}>
            <button style={arrowButtonStyle} onClick={incrementHour}>
              <RiArrowUpSLine size={24} />
            </button>
            <div style={numberStyle}>{hour}</div>
            <button style={arrowButtonStyle} onClick={decrementHour}>
              <RiArrowDownSLine size={24} />
            </button>
          </div>

          {/* 콜론 */}
          <div style={colonStyle}>:</div>

          {/* 분 선택 */}
          <div style={pickerStyle}>
            <button style={arrowButtonStyle} onClick={incrementMinute}>
              <RiArrowUpSLine size={24} />
            </button>
            <div style={numberStyle}>{String(minute).padStart(2, '0')}</div>
            <button style={arrowButtonStyle} onClick={decrementMinute}>
              <RiArrowDownSLine size={24} />
            </button>
          </div>
        </div>

        {/* AM/PM 세그먼트 컨트롤 */}
        <div style={segmentContainerStyle}>
          <button
            style={getSegmentButtonStyle(period === 'AM')}
            onClick={() => setPeriod('AM')}
          >
            AM
          </button>
          <button
            style={getSegmentButtonStyle(period === 'PM')}
            onClick={() => setPeriod('PM')}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};


export default TimePickerModal;

