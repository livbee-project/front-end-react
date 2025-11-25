import type { Meta, StoryObj } from '@storybook/react';
import DateInput from './DateInput';
import styled from 'styled-components';
import React, { useState } from 'react';

const meta: Meta<typeof DateInput> = {
  title: 'Forms/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '날짜 입력 필드 컴포넌트입니다. 날짜 선택 UI를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: '선택된 날짜 (YYYY-MM-DD 형식)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// ===== 기본 날짜 입력 =====
const BasicDateWrapper = () => {
  const [date, setDate] = useState('');

  return (
    <div style={{ maxWidth: '400px' }}>
      <DateInput
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <BasicDateWrapper />,
};

// ===== 다양한 상태 =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

export const States: Story = {
  render: () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('2024-01-15');
    const [date3, setDate3] = useState('');

    return (
      <StateContainer>
        <DateInput
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
        />
        <DateInput
          value={date2}
          onChange={(e) => setDate2(e.target.value)}
        />
        <DateInput
          value={date3}
          onChange={(e) => setDate3(e.target.value)}
          disabled
        />
      </StateContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '날짜 입력 필드의 다양한 상태입니다. 기본, 값이 있는 상태, 비활성화 상태를 보여줍니다.',
      },
    },
  },
};

// ===== 날짜 범위 제한 =====
export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    return (
      <div style={{ maxWidth: '400px' }}>
        <DateInput
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          max={maxDateStr}
        />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#717182' }}>
          오늘부터 1년 후까지 선택 가능
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'min과 max 속성으로 선택 가능한 날짜 범위를 제한할 수 있습니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => {
    const [birthDate, setBirthDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
      <StateContainer>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            생년월일
          </label>
          <DateInput
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            시작일
          </label>
          <DateInput
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            종료일
          </label>
          <DateInput
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </div>
      </StateContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 생년월일, 기간 선택 등 다양한 용도로 사용할 수 있습니다.',
      },
    },
  },
};

