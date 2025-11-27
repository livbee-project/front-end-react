import type { Meta, StoryObj } from '@storybook/react';
import {
  LoadingStatesSection,
  EmptyStatesSection,
  ErrorStatesSection,
  StatesUsageExamples,
} from './StatesStoryContent';

const meta: Meta = {
  title: 'UI Components/States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '상태 컴포넌트입니다. 로딩, 빈 상태, 에러 상태를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 로딩 상태 =====
export const Loading: Story = {
  render: () => <LoadingStatesSection />,
  parameters: {
    docs: {
      description: {
        story: '로딩 상태 컴포넌트입니다. 데이터를 불러오는 중일 때 표시합니다.',
      },
    },
  },
};

// ===== 빈 상태 =====
export const Empty: Story = {
  render: () => <EmptyStatesSection />,
  parameters: {
    docs: {
      description: {
        story: '빈 상태 컴포넌트입니다. 데이터가 없을 때 표시합니다.',
      },
    },
  },
};

// ===== 에러 상태 =====
export const Error: Story = {
  render: () => <ErrorStatesSection />,
  parameters: {
    docs: {
      description: {
        story: '에러 상태 컴포넌트입니다. 오류가 발생했을 때 표시하며, 재시도 버튼을 포함할 수 있습니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <StatesUsageExamples />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 리스트 페이지에서 다양한 상태를 표시할 때 사용합니다.',
      },
    },
  },
};

