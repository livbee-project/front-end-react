import type { Meta, StoryObj } from '@storybook/react';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import {
  CampaignDetailLayoutExample,
  DetailLayoutDefaultChildren,
  LongContentLayoutExample,
  PortfolioDetailLayoutExample,
} from '@/presentation/layouts/DetailPageLayoutStoryContent';

const meta: Meta<typeof DetailPageLayout> = {
  title: 'Layouts/DetailPageLayout',
  component: DetailPageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '상세 페이지의 공통 레이아웃 래퍼 컴포넌트입니다. 모든 상세 페이지에 공통으로 적용되는 스타일을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DetailPageLayout>;

export const Default: Story = {
  args: {
    children: DetailLayoutDefaultChildren,
  },
};

export const CampaignDetail: Story = {
  render: () => <CampaignDetailLayoutExample />,
  parameters: {
    docs: {
      description: {
        story: '모집공고 상세 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

export const PortfolioDetail: Story = {
  render: () => <PortfolioDetailLayoutExample />,
  parameters: {
    docs: {
      description: {
        story: '포트폴리오 상세 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => <LongContentLayoutExample />,
  parameters: {
    docs: {
      description: {
        story: '긴 콘텐츠가 있는 상세 페이지입니다. 최대 너비가 제한되어 있어 가독성이 좋습니다.',
      },
    },
  },
};

