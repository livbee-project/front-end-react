import type { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';
import { useState } from 'react';
import Button from './Button';
import styled from 'styled-components';

const meta: Meta<typeof Toast> = {
  title: 'UI Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '토스트 메시지 컴포넌트입니다. 정보 메시지와 에러 메시지를 표시할 수 있으며, 자동으로 사라지는 애니메이션을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '표시할 메시지',
    },
    duration: {
      control: 'number',
      description: '표시 시간 (밀리초)',
    },
    variant: {
      control: 'select',
      options: ['info', 'error'],
      description: '토스트 타입',
    },
    onClose: {
      action: 'closed',
      description: '토스트가 닫힐 때 호출되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  min-height: 200px;
  justify-content: center;
`;

// ===== 기본 정보 토스트 =====
export const Info: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <Container>
        <Button onClick={() => setShow(true)}>정보 토스트 표시</Button>
        {show && (
          <Toast
            message="작업이 완료되었습니다."
            variant="info"
            duration={2000}
            onClose={() => setShow(false)}
          />
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 정보 토스트 메시지입니다. 오렌지색 배경으로 표시됩니다.',
      },
    },
  },
};

// ===== 에러 토스트 =====
export const Error: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <Container>
        <Button onClick={() => setShow(true)} variant="outline">
          에러 토스트 표시
        </Button>
        {show && (
          <Toast
            message="오류가 발생했습니다. 다시 시도해주세요."
            variant="error"
            duration={3000}
            onClose={() => setShow(false)}
          />
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '에러 토스트 메시지입니다. 빨간색 배경으로 표시됩니다.',
      },
    },
  },
};

// ===== 다양한 메시지 =====
export const MessageVariations: Story = {
  render: () => {
    const [showInfo, setShowInfo] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showLong, setShowLong] = useState(false);

    return (
      <Container>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => setShowInfo(true)}>짧은 메시지</Button>
          <Button onClick={() => setShowError(true)} variant="outline">
            에러 메시지
          </Button>
          <Button onClick={() => setShowLong(true)} variant="secondary">
            긴 메시지
          </Button>
        </div>
        {showInfo && (
          <Toast
            message="저장되었습니다."
            variant="info"
            duration={2000}
            onClose={() => setShowInfo(false)}
          />
        )}
        {showError && (
          <Toast
            message="네트워크 오류가 발생했습니다."
            variant="error"
            duration={3000}
            onClose={() => setShowError(false)}
          />
        )}
        {showLong && (
          <Toast
            message="이 작업은 시간이 다소 걸릴 수 있습니다. 잠시만 기다려주세요."
            variant="info"
            duration={4000}
            onClose={() => setShowLong(false)}
          />
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 길이의 메시지를 표시할 수 있습니다.',
      },
    },
  },
};

// ===== 지속 시간 조절 =====
export const DurationVariations: Story = {
  render: () => {
    const [showShort, setShowShort] = useState(false);
    const [showMedium, setShowMedium] = useState(false);
    const [showLong, setShowLong] = useState(false);

    return (
      <Container>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button onClick={() => setShowShort(true)}>1초</Button>
          <Button onClick={() => setShowMedium(true)} variant="outline">
            3초
          </Button>
          <Button onClick={() => setShowLong(true)} variant="secondary">
            5초
          </Button>
        </div>
        {showShort && (
          <Toast
            message="1초 후 사라집니다."
            variant="info"
            duration={1000}
            onClose={() => setShowShort(false)}
          />
        )}
        {showMedium && (
          <Toast
            message="3초 후 사라집니다."
            variant="info"
            duration={3000}
            onClose={() => setShowMedium(false)}
          />
        )}
        {showLong && (
          <Toast
            message="5초 후 사라집니다."
            variant="info"
            duration={5000}
            onClose={() => setShowLong(false)}
          />
        )}
      </Container>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'duration prop을 통해 토스트가 표시되는 시간을 조절할 수 있습니다.',
      },
    },
  },
};

