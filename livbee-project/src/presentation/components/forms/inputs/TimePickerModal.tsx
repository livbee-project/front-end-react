import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import Modal from '@/presentation/components/ui/Modal';
import '@/presentation/styles/global.css';

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ isOpen, onClose, selectedTime, onTimeSelect }) => {
  const parseTime = (timeStr?: string): { hour: number; minute: number; period: 'AM' | 'PM' } => {
    if (!timeStr) {
      const now = new Date();
      const hour24 = now.getHours();
      const minute = now.getMinutes();
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      return { hour: hour12, minute, period: hour24 >= 12 ? 'PM' : 'AM' };
    }

    const pmMatch = timeStr.match(/(\d+)\s*:\s*(\d+)\s*(PM|AM)/i);
    if (pmMatch) {
      const hour = parseInt(pmMatch[1], 10);
      const minute = parseInt(pmMatch[2], 10);
      const period = pmMatch[3].toUpperCase() as 'AM' | 'PM';
      return { hour, minute, period };
    }

    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hour24 = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const period = hour24 >= 12 ? 'PM' : 'AM';
      return { hour: hour12, minute, period };
    }

    const now = new Date();
    const hour24 = now.getHours();
    const minute = now.getMinutes();
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    return { hour: hour12, minute, period: hour24 >= 12 ? 'PM' : 'AM' };
  };

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
  const isInitializing = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isInitializing.current = true;
      const parsed = parseTime(selectedTime);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
      setTimeout(() => {
        isInitializing.current = false;
      }, 0);
    }
  }, [isOpen, selectedTime]);

  useEffect(() => {
    if (isOpen && !isInitializing.current) {
      const time24 = formatTo24Hour(hour, minute, period);
      onTimeSelect(time24);
    }
  }, [hour, minute, period, isOpen, onTimeSelect]);

  const incrementHour = () => {
    setHour((prev) => (prev >= 12 ? 1 : prev + 1));
  };

  const incrementMinute = () => {
    setMinute((prev) => (prev >= 59 ? 0 : prev + 1));
  };

  const decrementHour = () => {
    setHour((prev) => (prev <= 1 ? 12 : prev - 1));
  };

  const decrementMinute = () => {
    setMinute((prev) => (prev <= 0 ? 59 : prev - 1));
  };

  const pickerContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px',
  };

  const pickerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

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

  const numberStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--black)',
    minWidth: '60px',
    textAlign: 'center',
  };

  const colonStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--black)',
    padding: '0 8px',
  };

  const segmentContainerStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#F7F8FA',
    borderRadius: '8px',
    padding: '4px',
    gap: '4px',
  };

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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="320px" width="90%" padding="24px">
      <div style={pickerContainerStyle}>
        <div style={pickerStyle}>
          <button style={arrowButtonStyle} onClick={incrementHour}>
            <RiArrowUpSLine size={24} />
          </button>
          <div style={numberStyle}>{hour}</div>
          <button style={arrowButtonStyle} onClick={decrementHour}>
            <RiArrowDownSLine size={24} />
          </button>
        </div>
        <div style={colonStyle}>:</div>
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

      <div style={segmentContainerStyle}>
        <button style={getSegmentButtonStyle(period === 'AM')} onClick={() => setPeriod('AM')}>
          AM
        </button>
        <button style={getSegmentButtonStyle(period === 'PM')} onClick={() => setPeriod('PM')}>
          PM
        </button>
      </div>
    </Modal>
  );
};

export default TimePickerModal;

