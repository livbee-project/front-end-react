import type { Meta, StoryObj } from '@storybook/react';
import CampaignCard from './CampaignCard';
import {
  CampaignCardExamples,
  CampaignCardListExample,
  CampaignCardLongText,
} from './CampaignCardStoryContent';

const meta: Meta<typeof CampaignCard> = {
  title: 'Cards/CampaignCard',
  component: CampaignCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '모집 공고 리스트 페이지 전용 카드 컴포넌트입니다. 브랜드명, 제목, 내용을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    brandName: {
      control: 'text',
      description: '브랜드명 (파란색 텍스트)',
    },
    title: {
      control: 'text',
      description: '공고 제목',
    },
    content: {
      control: 'text',
      description: '공고 내용',
    },
    onPress: {
      action: 'clicked',
      description: '카드 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignCard>;

// ===== 기본 카드 =====
export const Default: Story = {
  args: {
    brandName: '브랜드명',
    title: '공고 제목',
    content: '공고 내용이 여기에 표시됩니다.',
  },
};

// ===== 다양한 예시 =====
export const Examples: Story = {
  render: () => <CampaignCardExamples />,
  parameters: {
    docs: {
      description: {
        story: '다양한 모집 공고 카드 예시입니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: () => <CampaignCardLongText />,
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 리스트 예시 =====
export const ListExample: Story = {
  render: () => <CampaignCardListExample />,
  parameters: {
    docs: {
      description: {
        story: '리스트 페이지에서 사용하는 예시입니다.',
      },
    },
  },
};

