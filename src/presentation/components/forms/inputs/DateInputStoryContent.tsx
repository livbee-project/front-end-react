import React, { useState } from 'react';
import styled from 'styled-components';
import DateInput from '@/presentation/components/forms/inputs/DateInput';

const Container = styled.div`
  max-width: 400px;
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

export const BasicDateInput: React.FC = () => {
  const [date, setDate] = useState('');

  return (
    <Container>
      <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
    </Container>
  );
};

export const DateInputStates: React.FC = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('2024-01-15');
  const [date3, setDate3] = useState('');

  return (
    <StateContainer>
      <DateInput value={date1} onChange={(e) => setDate1(e.target.value)} />
      <DateInput value={date2} onChange={(e) => setDate2(e.target.value)} />
      <DateInput value={date3} onChange={(e) => setDate3(e.target.value)} disabled />
    </StateContainer>
  );
};

export const DateInputWithMinMax: React.FC = () => {
  const [date, setDate] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <Container>
      <DateInput value={date} onChange={(e) => setDate(e.target.value)} min={today} max={maxDateStr} />
      <HelperText>오늘부터 1년 후까지 선택 가능</HelperText>
    </Container>
  );
};

export const DateInputUsageExamples: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <StateContainer>
      <Field>
        <Label>생년월일</Label>
        <DateInput value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      </Field>
      <Field>
        <Label>시작일</Label>
        <DateInput value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </Field>
      <Field>
        <Label>종료일</Label>
        <DateInput value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || undefined} />
      </Field>
    </StateContainer>
  );
};

const HelperText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Field = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

