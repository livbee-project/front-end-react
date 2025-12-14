import type { Meta, StoryObj } from '@storybook/react';
import Toast from '@/presentation/components/ui/Toast';
import {
  ErrorToastDemo,
  InfoToastDemo,
  ToastDurationVariations,
  ToastMessageVariations,
} from '@/presentation/components/ui/ToastStoryContent';

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

export const Info: Story = {
  render: () => <InfoToastDemo />,
  parameters: {
    docs: {
      description: {
        story: '기본 정보 토스트 메시지입니다. 오렌지색 배경으로 표시됩니다.',
      },
    },
  },
};

export const Error: Story = {
  render: () => <ErrorToastDemo />,
  parameters: {
    docs: {
      description: {
        story: '에러 토스트 메시지입니다. 빨간색 배경으로 표시됩니다.',
      },
    },
  },
};

export const MessageVariations: Story = {
  render: () => <ToastMessageVariations />,
  parameters: {
    docs: {
      description: {
        story: '다양한 길이의 메시지를 표시할 수 있습니다.',
      },
    },
  },
};

export const DurationVariations: Story = {
  render: () => <ToastDurationVariations />,
  parameters: {
    docs: {
      description: {
        story: 'duration prop을 통해 토스트가 표시되는 시간을 조절할 수 있습니다.',
      },
    },
  },
};

