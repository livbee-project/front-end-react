import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import { P } from '@/presentation/components/styled/Typography';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

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

const ExampleTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const ToggleSwitchDefaultStory: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Row>
      <ToggleSwitch checked={checked} onChange={setChecked} />
      <P>{checked ? '켜짐' : '꺼짐'}</P>
    </Row>
  );
};

export const ToggleSwitchStatesStory: React.FC = () => {
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
};

export const ToggleSwitchUsageExamples: React.FC = () => {
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
};

