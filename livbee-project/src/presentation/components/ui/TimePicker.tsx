import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Picker from 'react-mobile-picker';
import styled from 'styled-components';

interface TimePickerProps {
  value?: string; // HH:MM 형식
  onChange: (time: string) => void;
  onClose: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, onClose }) => {
  const [pickerValue, setPickerValue] = useState<{ hour: string; minute: string }>(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      return {
        hour: hour || '09',
        minute: minute || '00',
      };
    }
    return { hour: '09', minute: '00' };
  });

  // value prop이 변경될 때 업데이트
  useEffect(() => {
    if (value) {
      const [hour, minute] = value.split(':');
      setPickerValue({
        hour: hour || '09',
        minute: minute || '00',
      });
    }
  }, [value]);

  // 초기 스크롤 위치를 중간으로 설정 및 무한 스크롤 처리
  useEffect(() => {
    const container = timePickerRef.current;
    if (!container) return;

    const itemHeight = 36; // 실제 아이템 높이 (콘솔에서 확인: 36px)
    const containerHeight = 216; // TimePicker Body 높이 (콘솔에서 확인: 216px)
    const centerOffset = containerHeight / 2; // 중앙 위치 = 108px (아이템 높이의 절반을 빼야 함)
    
    // 중간 세트의 시작 위치 계산
    // 5번 반복된 세트 중 3번째 세트(인덱스 2)의 시작 위치
    const hourSingleSetHeight = 24 * itemHeight; // 한 세트의 높이 (24시간) = 864px
    const minuteSingleSetHeight = 60 * itemHeight; // 한 세트의 높이 (60분) = 2160px
    const hourMiddleSetStart = hourSingleSetHeight * 2; // 중간 세트 시작 위치 (3번째 세트) = 1728px
    const minuteMiddleSetStart = minuteSingleSetHeight * 2; // 중간 세트 시작 위치 (3번째 세트) = 4320px

    let hourColumn: HTMLElement | null = null;
    let minuteColumn: HTMLElement | null = null;
    let isInitialScrollDone = false;
    const hourScrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const minuteScrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId: number | null = null;

    const findPickerColumns = () => {
      // data-column-name 속성으로 컬럼 찾기
      const hourCol = container.querySelector('[data-column-name="hour"]') as HTMLElement;
      const minuteCol = container.querySelector('[data-column-name="minute"]') as HTMLElement;
      
      if (hourCol && minuteCol) {
        hourColumn = hourCol;
        minuteColumn = minuteCol;
        return true;
      }
      return false;
    };
    
    // transform 값에서 Y 위치 추출
    const getTransformY = (element: HTMLElement): number => {
      const style = window.getComputedStyle(element);
      const transform = style.transform;
      if (!transform || transform === 'none') return 0;
      
      const matrix = transform.match(/matrix\([^)]+\)/) || transform.match(/matrix3d\([^)]+\)/);
      if (matrix) {
        const values = matrix[0].split(',');
        // matrix3d의 경우 14번째 값이 translateY
        // matrix의 경우 5번째 값이 translateY
        if (values.length >= 6) {
          return parseFloat(values[values.length === 6 ? 5 : 13] || '0');
        }
      }
      
      // translate3d 형식 파싱
      const translate3d = transform.match(/translate3d\([^)]+\)/);
      if (translate3d) {
        const values = translate3d[0].match(/[\d.-]+/g);
        if (values && values.length >= 2) {
          return parseFloat(values[1]);
        }
      }
      
      return 0;
    };
    
    // transform Y 값 설정
    const setTransformY = (element: HTMLElement, y: number) => {
      element.style.transform = `translate3d(0px, ${y}px, 0px)`;
    };


    // 지속적인 모니터링 함수 (requestAnimationFrame 사용) - transform 기반
    const monitorScroll = () => {
      if (!findPickerColumns()) {
        animationFrameId = requestAnimationFrame(monitorScroll);
        return;
      }
      
      // transform 위치를 강제로 설정 (라이브러리가 덮어쓸 수 있으므로 지속적으로 재설정)
      if (hourColumn) {
        const currentHour = parseInt(pickerValue.hour, 10);
        // 선택된 항목이 중앙에 오도록 계산
        // 중간 세트의 시작 위치 + 현재 시간 * 아이템 높이 = 선택된 항목의 절대 위치
        // 선택된 항목의 중앙이 컨테이너 중앙에 오려면: 절대 위치 - 컨테이너 중앙 + 아이템 높이의 절반
        const selectedItemTop = hourMiddleSetStart + (currentHour * itemHeight);
        const selectedItemCenter = selectedItemTop + (itemHeight / 2);
        const targetY = -(selectedItemCenter - centerOffset);
        const currentY = getTransformY(hourColumn);
        
        // 항상 목표 위치로 설정 (차이가 있으면)
        if (Math.abs(currentY - targetY) > 0.5) {
          setTransformY(hourColumn, targetY);
        }
      }

      if (minuteColumn) {
        const currentMinute = parseInt(pickerValue.minute, 10);
        // 선택된 항목이 중앙에 오도록 계산
        // 중간 세트의 시작 위치 + 현재 분 * 아이템 높이 = 선택된 항목의 절대 위치
        // 선택된 항목의 중앙이 컨테이너 중앙에 오려면: 절대 위치 - 컨테이너 중앙 + 아이템 높이의 절반
        const selectedItemTop = minuteMiddleSetStart + (currentMinute * itemHeight);
        const selectedItemCenter = selectedItemTop + (itemHeight / 2);
        const targetY = -(selectedItemCenter - centerOffset);
        const currentY = getTransformY(minuteColumn);
        
        // 항상 목표 위치로 설정 (차이가 있으면)
        if (Math.abs(currentY - targetY) > 0.5) {
          setTransformY(minuteColumn, targetY);
        }
      }
      
      // transform이 정확히 설정되었는지 확인
      if (!isInitialScrollDone && hourColumn && minuteColumn) {
        const currentHour = parseInt(pickerValue.hour, 10);
        const currentMinute = parseInt(pickerValue.minute, 10);
        const hourSelectedTop = hourMiddleSetStart + (currentHour * itemHeight);
        const minuteSelectedTop = minuteMiddleSetStart + (currentMinute * itemHeight);
        const hourSelectedCenter = hourSelectedTop + (itemHeight / 2);
        const minuteSelectedCenter = minuteSelectedTop + (itemHeight / 2);
        const hourTarget = -(hourSelectedCenter - centerOffset);
        const minuteTarget = -(minuteSelectedCenter - centerOffset);
        
        const hourIsCorrect = Math.abs(getTransformY(hourColumn) - hourTarget) <= 1;
        const minuteIsCorrect = Math.abs(getTransformY(minuteColumn) - minuteTarget) <= 1;
        
        if (hourIsCorrect && minuteIsCorrect) {
          isInitialScrollDone = true;
        }
      }

      animationFrameId = requestAnimationFrame(monitorScroll);
    };
    
    // 즉시 모니터링 시작 (초기 스크롤 설정 포함)
    animationFrameId = requestAnimationFrame(monitorScroll);



    // MutationObserver로 DOM 변경 감지 (라이브러리가 DOM을 변경할 때마다 isInitialScrollDone 리셋)
    const observer = new MutationObserver(() => {
      // 라이브러리가 DOM을 변경하면 컬럼을 다시 찾고 초기 스크롤 상태를 리셋
      findPickerColumns();
      if (isInitialScrollDone) {
        isInitialScrollDone = false;
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true, // transform 속성 변경 감지
      attributeFilter: ['style'], // style 속성 변경만 감지
    });

    return () => {
      observer.disconnect();
      if (hourScrollTimeout) {
        clearTimeout(hourScrollTimeout);
      }
      if (minuteScrollTimeout) {
        clearTimeout(minuteScrollTimeout);
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [pickerValue]);

  // 시간 옵션 생성 (00-23) - 무한 스크롤을 위해 여러 번 반복
  const hourOptions = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    // 무한 스크롤을 위해 5번 반복 (충분한 스크롤 공간 확보)
    return [...hours, ...hours, ...hours, ...hours, ...hours];
  }, []);

  // 분 옵션 생성 (00-59) - 무한 스크롤을 위해 여러 번 반복
  const minuteOptions = useMemo(() => {
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    // 무한 스크롤을 위해 5번 반복 (충분한 스크롤 공간 확보)
    return [...minutes, ...minutes, ...minutes, ...minutes, ...minutes];
  }, []);

  // 값 변경 핸들러
  const handlePickerChange = useCallback((newValue: { hour: string; minute: string }) => {
    setPickerValue(newValue);
  }, []);

  // 확인 버튼 클릭
  const handleConfirmClick = useCallback(() => {
    const timeString = `${pickerValue.hour}:${pickerValue.minute}`;
    onChange(timeString);
    onClose();
  }, [pickerValue, onChange, onClose]);

  // 취소 버튼 클릭
  const handleCancelClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // 배경 스크롤 비활성화
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 외부 클릭 감지
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  const timePickerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <TimePickerOverlay onClick={handleCancelClick} />
      <TimePickerContainer ref={timePickerRef}>
        <TimePickerHeader>
          <TimeLabel>시간 선택</TimeLabel>
        </TimePickerHeader>
        <TimePickerBody>
          <PickerWrapper>
            <Picker value={pickerValue} onChange={handlePickerChange} wheelMode="natural">
              <Picker.Column name="hour" data-column-name="hour">
                {hourOptions.map((hour, index) => (
                  <Picker.Item key={`hour-${index}-${hour}`} value={hour}>
                    {hour}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="minute" data-column-name="minute">
                {minuteOptions.map((minute, index) => (
                  <Picker.Item key={`minute-${index}-${minute}`} value={minute}>
                    {minute}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </PickerWrapper>
        </TimePickerBody>
        <TimePickerFooter>
          <CancelButton onClick={handleCancelClick}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirmClick}>선택</ConfirmButton>
        </TimePickerFooter>
      </TimePickerContainer>
    </>
  );
};

const TimePickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const TimePickerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
  z-index: 100000;
  min-width: 280px;
  max-width: calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right));
  width: calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right));
  max-height: calc(100dvh - 150px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  box-sizing: border-box;
  overscroll-behavior: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    transform: none;
    min-width: 360px;
    padding: 20px;
    width: auto;
    max-width: none;
    max-height: none;
    overflow-y: visible;
    overscroll-behavior: auto;
  }
`;

const TimePickerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
`;

const TimeLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const TimePickerBody = styled.div`
  min-height: 200px;
  max-height: 300px;
  overflow: hidden;
  position: relative;
`;

const PickerWrapper = styled.div`
  width: 100%;
  height: 100%;

  /* react-mobile-picker 스타일 오버라이드 */
  .picker-columns {
    display: flex;
    justify-content: center;
    gap: 8px;
    height: 100%;
  }

  .picker-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .picker-column-label {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
    text-align: center;
  }

  .picker-items {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    /* 초기 스크롤 위치를 중간으로 설정하기 위한 패딩 */
    padding-top: calc(50% - 22px);
    padding-bottom: calc(50% - 22px);
    box-sizing: content-box;
  }

  .picker-item {
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 18px;
    padding: 10px 0;
    text-align: center;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    
    @media (max-width: 480px) {
      font-size: 16px;
      height: 40px;
    }
  }

  .picker-item-selected {
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 600;
  }

  .picker-highlight {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 44px;
    border-top: 2px solid ${({ theme }) => theme.colors.primary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    background: transparent;
    pointer-events: none;
    z-index: 1;
    
    @media (max-width: 480px) {
      height: 40px;
    }
  }

  .picker-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.background} 0%,
      transparent 20%,
      transparent 80%,
      ${({ theme }) => theme.colors.background} 100%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const TimePickerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
  }
`;

const ButtonBase = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
    font-size: 14px;
  }
`;

const CancelButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const ConfirmButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default TimePicker;
