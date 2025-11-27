import type { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch from './ToggleSwitch';
import {
  ToggleSwitchDefaultStory,
  ToggleSwitchStatesStory,
  ToggleSwitchUsageExamples,
} from './ToggleSwitchStoryContent';

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

export const Default: Story = {
  render: () => <ToggleSwitchDefaultStory />,
};

export const States: Story = {
  render: () => <ToggleSwitchStatesStory />,
  parameters: {
    docs: {
      description: {
        story: '토글 스위치의 두 가지 상태입니다. Off는 비활성화, On은 활성화 상태를 나타냅니다.',
      },
    },
  },
};

export const UsageExamples: Story = {
  render: () => <ToggleSwitchUsageExamples />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 설정 화면에서 옵션을 켜고 끄는 데 사용할 수 있습니다.',
      },
    },
  },
};

