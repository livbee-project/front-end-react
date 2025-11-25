import type { Meta, StoryObj } from '@storybook/react';
import TimeInput from './TimeInput';
import { useState } from 'react';
import styled from 'styled-components';

const meta: Meta<typeof TimeInput> = {
  title: 'Forms/TimeInput',
  component: TimeInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '시간 입력 필드 컴포넌트입니다. 시와 분을 선택할 수 있는 시간 선택기를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 시간 값 (HH:MM 형식)',
    },
    onChange: {
      action: 'changed',
      description: '시간이 변경될 때 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeInput>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

// ===== 기본 시간 입력 =====
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('09:00');

    return (
      <Container>
        <TimeInput value={value} onChange={(e) => setValue(e.target.value)} />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          선택된 시간: {value || '없음'}
        </p>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 시간 입력 필드입니다. 시계 아이콘이 오른쪽에 표시됩니다.',
      },
    },
  },
};

// ===== 다양한 시간 =====
export const TimeVariations: Story = {
  render: () => {
    const [morning, setMorning] = useState('09:00');
    const [afternoon, setAfternoon] = useState('14:30');
    const [evening, setEvening] = useState('18:00');

    return (
      <Container>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            오전 시간
          </label>
          <TimeInput value={morning} onChange={(e) => setMorning(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            오후 시간
          </label>
          <TimeInput value={afternoon} onChange={(e) => setAfternoon(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            저녁 시간
          </label>
          <TimeInput value={evening} onChange={(e) => setEvening(e.target.value)} />
        </div>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 시간을 선택할 수 있습니다.',
      },
    },
  },
};

// ===== 비활성화 상태 =====
export const Disabled: Story = {
  render: () => {
    return (
      <Container>
        <TimeInput value="12:00" onChange={() => {}} disabled />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          비활성화된 시간 입력 필드입니다.
        </p>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 시간 입력 필드입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExample: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');

    return (
      <Container>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            시작 시간
          </label>
          <TimeInput value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            종료 시간
          </label>
          <TimeInput value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          <strong>선택된 시간대:</strong> {startTime} ~ {endTime}
        </div>
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '시작 시간과 종료 시간을 선택하는 예시입니다.',
      },
    },
  },
};

