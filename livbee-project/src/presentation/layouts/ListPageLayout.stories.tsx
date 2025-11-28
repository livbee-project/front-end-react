import type { Meta, StoryObj } from '@storybook/react';
import ListPageLayout from './ListPageLayout';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import {
  CampaignPageDemo,
  ListContentWrapper,
  PortfolioPageDemo,
} from './ListPageLayoutStoryContent';
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard';
import { createMockCampaign } from '@/presentation/stories/mocks/campaign';

const meta: Meta<typeof ListPageLayout> = {
  title: 'Layouts/ListPageLayout',
  component: ListPageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '리스트 페이지의 공통 레이아웃 컴포넌트입니다. 검색 입력, 안내 문구, 플로팅 액션 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    searchPlaceholder: {
      control: 'text',
      description: '검색 입력 필드 placeholder',
    },
    hintText: {
      control: 'text',
      description: '안내 문구 텍스트',
    },
    floatingActionButtonPath: {
      control: 'text',
      description: '플로팅 액션 버튼 클릭 시 이동할 경로',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListPageLayout>;

// ===== 기본 레이아웃 =====
export const Default: Story = {
  args: {
    searchPlaceholder: '검색',
    hintText: '카드를 누르면 상세 정보를 보실 수 있습니다.',
    floatingActionButtonPath: '/campaigns/register',
    children: (
      <ListContentWrapper>
        {[1, 2, 3].map((index) => (
          <CampaignCard
            key={index}
            campaign={createMockCampaign({
              id: `cmp-default-${index}`,
              brandName: `브랜드 ${index}`,
              title: `공고 제목 ${index}`,
              content: `공고 내용 ${index}`,
            })}
            isScrapped={index === 2}
            onCardClick={() => {}}
            onScrapClick={(event) => event.stopPropagation()}
          />
        ))}
      </ListContentWrapper>
    ),
  },
};

// ===== 모집공고 페이지 =====
export const CampaignPage: Story = {
  render: () => <CampaignPageDemo />,
  parameters: {
    docs: {
      description: {
        story: '모집공고 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

// ===== 포트폴리오 페이지 =====
export const PortfolioPage: Story = {
  render: () => <PortfolioPageDemo />,
  parameters: {
    docs: {
      description: {
        story: '포트폴리오 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

// ===== 안내 문구 없음 =====
export const WithoutHint: Story = {
  args: {
    searchPlaceholder: '검색',
    floatingActionButtonPath: '/register',
    children: (
      <ListContentWrapper>
        <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px' }}>
          리스트 아이템
        </div>
      </ListContentWrapper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '안내 문구가 없는 레이아웃입니다.',
      },
    },
  },
};

