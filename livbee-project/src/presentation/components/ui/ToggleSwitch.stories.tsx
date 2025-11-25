import type { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch from './ToggleSwitch';
import styled from 'styled-components';
import React, { useState } from 'react';
import { P } from '@/presentation/components/styled/Typography';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'UI Components/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '토글 스위치 컴포넌트입니다. On/Off 상태를 전환할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글 스위치의 활성화 상태',
    },
    onChange: {
      action: 'changed',
      description: '상태 변경 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

// ===== 기본 토글 =====
const BasicToggleWrapper = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <ToggleSwitch checked={checked} onChange={setChecked} />
      <P>{checked ? '켜짐' : '꺼짐'}</P>
    </div>
  );
};

export const Default: Story = {
  render: () => <BasicToggleWrapper />,
};

// ===== 상태 =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StateLabel = styled.div`
  min-width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const States: Story = {
  render: () => {
    const [offState, setOffState] = useState(false);
    const [onState, setOnState] = useState(true);

    return (
      <StateContainer>
        <StateRow>
          <StateLabel>Off</StateLabel>
          <ToggleSwitch checked={offState} onChange={setOffState} />
        </StateRow>
        <StateRow>
          <StateLabel>On</StateLabel>
          <ToggleSwitch checked={onState} onChange={setOnState} />
        </StateRow>
      </StateContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '토글 스위치의 두 가지 상태입니다. Off는 비활성화, On은 활성화 상태를 나타냅니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExampleCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const ExampleLabel = styled(P)`
  color: ${({ theme }) => theme.colors.foreground};
`;

export const UsageExamples: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
      <ExampleContainer>
        <ExampleCard>
          <ExampleTitle>알림 설정</ExampleTitle>
          <ExampleRow>
            <ExampleLabel>푸시 알림</ExampleLabel>
            <ToggleSwitch checked={notifications} onChange={setNotifications} />
          </ExampleRow>
          <ExampleRow>
            <ExampleLabel>이메일 알림</ExampleLabel>
            <ToggleSwitch checked={emailAlerts} onChange={setEmailAlerts} />
          </ExampleRow>
          <ExampleRow>
            <ExampleLabel>다크 모드</ExampleLabel>
            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
          </ExampleRow>
        </ExampleCard>
      </ExampleContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 설정 화면에서 옵션을 켜고 끄는 데 사용할 수 있습니다.',
      },
    },
  },
};

const ExampleTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground};
`;

