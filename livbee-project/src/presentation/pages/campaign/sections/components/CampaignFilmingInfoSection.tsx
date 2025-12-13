import React, { useState } from 'react';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection as BaseFormSection,
  SectionTitle,
  InputGroup,
  StyledInput,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import styled from 'styled-components';
import {
  FeeContainer as BaseFeeContainer,
  FeeInputWrapper as BaseFeeInputWrapper,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
} from '../styles/campaignRegisterSectionStyles';
import Calendar from '@/presentation/components/ui/Calendar';
import TimePicker from '@/presentation/components/ui/TimePicker';

const FeeContainer = styled(BaseFeeContainer)`
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const FeeInputWrapper = styled(BaseFeeInputWrapper)`
  width: 100%;
  box-sizing: border-box;
`;

const FormSection = styled(BaseFormSection)`
  margin-bottom: 24px;
`;

const SplitInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  margin: 0;
  box-sizing: border-box;
`;

const InputField = styled.input`
  flex: 1;
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px 0 0 16px;
  padding: 16px 20px;
  font-size: 15px;
  color: #111111;
  transition: all 0.2s;
  font-family: inherit;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconArea = styled.button`
  width: 56px;
  height: 56px;
  background-color: #E5E7EB;
  border: none;
  border-radius: 0 16px 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;
  position: relative;
  box-sizing: border-box;

  &:hover {
    background-color: #D1D5DB;
  }

  &:active {
    background-color: #9CA3AF;
  }

  /* 브라우저 기본 아이콘 스타일 */
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const TimeIconArea = styled(IconArea)`
  &::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E");
  }
`;

const UnitArea = styled.div`
  width: 56px;
  height: 56px;
  background-color: #E5E7EB;
  border-radius: 0 16px 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const UnitText = styled.span`
  color: #6B7280;
  font-size: 15px;
`;

const DateInputWrapper = styled.div`
  width: 100%;
  position: static;
  overflow: visible;
  box-sizing: border-box;
`;

// 날짜 포맷팅 함수
const formatDateDisplay = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}.`;
};

// 시간 포맷팅 함수
const formatTimeDisplay = (timeString: string): string => {
  if (!timeString) return '';
  return timeString; // HH:MM 형식 그대로 반환
};

const TimeInputWrapper = styled.div`
  width: 100%;
  position: static;
  overflow: visible;
  box-sizing: border-box;
`;

const FeeInput = styled(InputField)`
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

interface CampaignFilmingInfoSectionProps {
  location: string;
  filmingDate: string;
  startTime: string;
  endTime: string;
  deadline: string;
  fee: string;
  feeNegotiable: boolean;
  onLocationChange: (value: string) => void;
  onFilmingDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onDeadlineChange: (value: string) => void;
  onFeeChange: (value: string) => void;
  onFeeNegotiableChange: (checked: boolean) => void;
}

export const CampaignFilmingInfoSection: React.FC<CampaignFilmingInfoSectionProps> = ({
  location,
  filmingDate,
  startTime,
  endTime,
  deadline,
  fee,
  feeNegotiable,
  onLocationChange,
  onFilmingDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onDeadlineChange,
  onFeeChange,
  onFeeNegotiableChange,
}) => {
  const [openCalendar, setOpenCalendar] = useState<'filmingDate' | 'deadline' | null>(null);
  const [openTimePicker, setOpenTimePicker] = useState<'startTime' | 'endTime' | null>(null);

  const handleFilmingDateClick = () => {
    setOpenCalendar(openCalendar === 'filmingDate' ? null : 'filmingDate');
  };

  const handleDeadlineClick = () => {
    setOpenCalendar(openCalendar === 'deadline' ? null : 'deadline');
  };

  const handleFilmingDateChange = (date: string) => {
    onFilmingDateChange(date);
    setOpenCalendar(null);
  };

  const handleDeadlineChange = (date: string) => {
    onDeadlineChange(date);
    setOpenCalendar(null);
  };

  const handleStartTimeClick = () => {
    setOpenTimePicker(openTimePicker === 'startTime' ? null : 'startTime');
  };

  const handleEndTimeClick = () => {
    setOpenTimePicker(openTimePicker === 'endTime' ? null : 'endTime');
  };

  const handleStartTimeChange = (time: string) => {
    onStartTimeChange(time);
    setOpenTimePicker(null);
  };

  const handleEndTimeChange = (time: string) => {
    onEndTimeChange(time);
    setOpenTimePicker(null);
  };

  // 오늘 날짜를 최소 날짜로 설정
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <FormSection>
      <SectionTitle>촬영 정보</SectionTitle>
      <InputGroup>
        <FormField label="장소">
          <StyledInput
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="촬영 장소를 입력해주세요"
          />
        </FormField>
        <FormField label="촬영일" required>
          <DateInputWrapper>
            <SplitInputContainer>
              <InputField
                type="text"
                value={formatDateDisplay(filmingDate)}
                onChange={() => {}}
                placeholder="연도. 월. 일."
                readOnly
              />
              <IconArea
                type="button"
                onClick={handleFilmingDateClick}
                aria-label="날짜 선택"
              />
            </SplitInputContainer>
            {openCalendar === 'filmingDate' && (
              <Calendar
                value={filmingDate}
                onChange={handleFilmingDateChange}
                onClose={() => setOpenCalendar(null)}
                minDate={today}
              />
            )}
          </DateInputWrapper>
        </FormField>
        <FormField label="시작시간" required>
          <TimeInputWrapper>
            <SplitInputContainer>
              <InputField
                type="text"
                value={formatTimeDisplay(startTime)}
                onChange={() => {}}
                placeholder="09:00"
                readOnly
              />
              <TimeIconArea
                type="button"
                onClick={handleStartTimeClick}
                aria-label="시간 선택"
              />
            </SplitInputContainer>
            {openTimePicker === 'startTime' && (
              <TimePicker
                value={startTime}
                onChange={handleStartTimeChange}
                onClose={() => setOpenTimePicker(null)}
              />
            )}
          </TimeInputWrapper>
        </FormField>
        <FormField label="종료시간" required>
          <TimeInputWrapper>
            <SplitInputContainer>
              <InputField
                type="text"
                value={formatTimeDisplay(endTime)}
                onChange={() => {}}
                placeholder="18:00"
                readOnly
              />
              <TimeIconArea
                type="button"
                onClick={handleEndTimeClick}
                aria-label="시간 선택"
              />
            </SplitInputContainer>
            {openTimePicker === 'endTime' && (
              <TimePicker
                value={endTime}
                onChange={handleEndTimeChange}
                onClose={() => setOpenTimePicker(null)}
              />
            )}
          </TimeInputWrapper>
        </FormField>
        <FormField label="공고마감일" required>
          <DateInputWrapper>
            <SplitInputContainer>
              <InputField
                type="text"
                value={formatDateDisplay(deadline)}
                onChange={() => {}}
                placeholder="연도. 월. 일."
                readOnly
              />
              <IconArea
                type="button"
                onClick={handleDeadlineClick}
                aria-label="날짜 선택"
              />
            </SplitInputContainer>
            {openCalendar === 'deadline' && (
              <Calendar
                value={deadline}
                onChange={handleDeadlineChange}
                onClose={() => setOpenCalendar(null)}
                minDate={today}
              />
            )}
          </DateInputWrapper>
        </FormField>
        <FormField label="출연료" required>
          <FeeContainer>
            <FeeInputWrapper>
              <SplitInputContainer>
                <FeeInput
                  type="number"
                  placeholder="출연료를 입력해주세요"
                  value={fee}
                  onChange={(e) => onFeeChange(e.target.value)}
                  disabled={feeNegotiable}
                />
                {!feeNegotiable && (
                  <UnitArea>
                    <UnitText>만원</UnitText>
                  </UnitArea>
                )}
              </SplitInputContainer>
            </FeeInputWrapper>
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                id="feeNegotiable"
                checked={feeNegotiable}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  onFeeNegotiableChange(isChecked);
                  // 협의 가능으로 체크하면 수당 필드 초기화
                  if (isChecked) {
                    onFeeChange('');
                  }
                }}
              />
              <CheckboxLabel htmlFor="feeNegotiable">협의 가능</CheckboxLabel>
            </CheckboxContainer>
          </FeeContainer>
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

