import React, { useState } from 'react';
import styled from 'styled-components';
import TimeInput from '@/presentation/components/forms/inputs/TimeInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const TimeInputDefaultStory: React.FC = () => {
  const [value, setValue] = useState('09:00');

  return (
    <Container>
      <TimeInput value={value} onChange={(e) => setValue(e.target.value)} />
      <HelperText>선택된 시간: {value || '없음'}</HelperText>
    </Container>
  );
};

export const TimeInputVariationsStory: React.FC = () => {
  const [morning, setMorning] = useState('09:00');
  const [afternoon, setAfternoon] = useState('14:30');
  const [evening, setEvening] = useState('18:00');

  return (
    <Container>
      <div>
        <Label>오전 시간</Label>
        <TimeInput value={morning} onChange={(e) => setMorning(e.target.value)} />
      </div>
      <div>
        <Label>오후 시간</Label>
        <TimeInput value={afternoon} onChange={(e) => setAfternoon(e.target.value)} />
      </div>
      <div>
        <Label>저녁 시간</Label>
        <TimeInput value={evening} onChange={(e) => setEvening(e.target.value)} />
      </div>
    </Container>
  );
};

export const TimeInputDisabledStory: React.FC = () => (
  <Container>
    <TimeInput value="12:00" onChange={() => {}} disabled />
    <HelperText>비활성화된 시간 입력 필드입니다.</HelperText>
  </Container>
);

export const TimeInputUsageStory: React.FC = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  return (
    <Container>
      <div>
        <Label>시작 시간</Label>
        <TimeInput value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <Label>종료 시간</Label>
        <TimeInput value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <SummaryBox>
        <strong>선택된 시간대:</strong> {startTime} ~ {endTime}
      </SummaryBox>
    </Container>
  );
};

const SummaryBox = styled.div`
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
`;

