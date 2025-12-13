import React from 'react';
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

const FeeContainer = styled(BaseFeeContainer)`
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const FeeInputWrapper = styled(BaseFeeInputWrapper)`
  width: 100%;
`;

const FormSection = styled(BaseFormSection)`
  margin-bottom: 24px;
`;

const SplitInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  margin: 0;
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
`;

const UnitText = styled.span`
  color: #6B7280;
  font-size: 15px;
`;

const DateInputWrapper = styled.div`
  width: 100%;
`;

const TimeInputWrapper = styled.div`
  width: 100%;
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
                type="date"
                value={filmingDate}
                onChange={(e) => onFilmingDateChange(e.target.value)}
                placeholder="날짜를 선택해주세요"
              />
              <IconArea
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  input?.showPicker?.();
                }}
                aria-label="날짜 선택"
              />
            </SplitInputContainer>
          </DateInputWrapper>
        </FormField>
        <FormField label="시작시간" required>
          <TimeInputWrapper>
            <SplitInputContainer>
              <InputField
                type="time"
                value={startTime}
                onChange={(e) => onStartTimeChange(e.target.value)}
                placeholder="09:00"
              />
              <TimeIconArea
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  input?.showPicker?.();
                }}
                aria-label="시간 선택"
              />
            </SplitInputContainer>
          </TimeInputWrapper>
        </FormField>
        <FormField label="종료시간" required>
          <TimeInputWrapper>
            <SplitInputContainer>
              <InputField
                type="time"
                value={endTime}
                onChange={(e) => onEndTimeChange(e.target.value)}
                placeholder="18:00"
              />
              <TimeIconArea
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  input?.showPicker?.();
                }}
                aria-label="시간 선택"
              />
            </SplitInputContainer>
          </TimeInputWrapper>
        </FormField>
        <FormField label="공고마감일" required>
          <DateInputWrapper>
            <SplitInputContainer>
              <InputField
                type="date"
                value={deadline}
                onChange={(e) => onDeadlineChange(e.target.value)}
                placeholder="날짜를 선택해주세요"
              />
              <IconArea
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  input?.showPicker?.();
                }}
                aria-label="날짜 선택"
              />
            </SplitInputContainer>
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

