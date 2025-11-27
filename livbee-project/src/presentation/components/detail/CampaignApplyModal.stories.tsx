import type { Meta, StoryObj } from '@storybook/react';
import CampaignApplyModal from './CampaignApplyModal';
import {
  CampaignApplyModalDefaultStory,
  CampaignApplyModalLongTitleStory,
  CampaignApplyModalVariantsStory,
} from './CampaignApplyModalStoryContent';

const meta: Meta<typeof CampaignApplyModal> = {
  title: 'Detail/CampaignApplyModal',
  component: CampaignApplyModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '캠페인 지원 모달 컴포넌트입니다. 포트폴리오 선택, 메시지 작성, 촬영 가능 일정을 입력할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태',
    },
    campaignId: {
      control: 'text',
      description: '캠페인 ID',
    },
    campaignTitle: {
      control: 'text',
      description: '캠페인 제목',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 함수',
    },
    onApplied: {
      action: 'applied',
      description: '지원 완료 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignApplyModal>;

// ===== 기본 모달 =====
export const Default: Story = {
  render: () => <CampaignApplyModalDefaultStory />,
  parameters: {
    docs: {
      description: {
        story: '기본 캠페인 지원 모달입니다. 포트폴리오 선택, 메시지 작성, 일정 입력이 가능합니다.',
      },
    },
  },
};

// ===== 다양한 캠페인 제목 =====
export const DifferentCampaigns: Story = {
  render: () => <CampaignApplyModalVariantsStory />,
  parameters: {
    docs: {
      description: {
        story: '다양한 캠페인 제목을 가진 지원 모달입니다.',
      },
    },
  },
};

// ===== 긴 캠페인 제목 =====
export const LongCampaignTitle: Story = {
  render: () => <CampaignApplyModalLongTitleStory />,
  parameters: {
    docs: {
      description: {
        story: '긴 캠페인 제목이 표시되는 모달입니다.',
      },
    },
  },
};

